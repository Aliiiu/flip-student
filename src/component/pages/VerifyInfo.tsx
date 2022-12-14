import { Popover } from '@headlessui/react';
import { createContext, useEffect, useState } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { auth } from 'src/store/auth';
import Header from '../Header';
import ModalContent from '../UI/ModalContent';
import PopupContent from '../UI/PopModal';
import AppModal from '../widget/Modal/Modal';
import { useDispatch } from 'react-redux';
import { updateTimer } from 'src/feature/timer/timerSlice';
import { io } from 'socket.io-client';
import { loadDefaultQuestionState } from 'src/feature/counter/counterSlice';
interface DArray {
	label: string;
	value: string;
}

const VerifyInfo = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const { authUser } = auth.use();
	const data: DArray[] = [
		{
			label: 'name',
			value: authUser?.student?.name || '',
		},
		{
			label: 'Student ID',
			value: authUser?.student?.student_id || '',
		},
		{
			label: 'Class',
			value: authUser?.student?.class_name || '',
		},
		{
			label: 'Department',
			value: authUser?.student?.department || '',
		},
		{
			label: 'Subject',
			value: authUser?.assessment?.subject || '',
		},
		{
			label: 'Exam ID',
			value: authUser?.assessment_code || '',
		},
		{
			label: 'Exam Duration',
			value: authUser?.obj_time || '',
		},
		{
			label: 'Total Number of Questions',
			value: authUser?.assessment?.total_questions || '',
		},
		{
			label: 'Assessment Status',
			value: authUser?.assessment_status || '',
		},
	];

	const [showModal, setShowModal] = useState<boolean | null>(false);
	let dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateTimer(authUser?.obj_time));
	}, [authUser?.obj_time, dispatch]);

	const clickHandler = () => {
		setShowModal(true);
	};
	const [questionData, setQuestionData] = useState([]);
	const socket = io('wss://demo-assessment-service.flipcbt.com/student', {
		auth: {
			token: authUser?.student?.student_id || '',
		},
		// transports: ['websocket'],
	});

	useEffect(() => {
		socket.on('authenticated', (data) => {
			console.log('authenticated => ', data); // you will get
			setQuestionData(data.candidate_questions);
		});
		// console.log(index);
		// socket.on('connect_error', (err) => {
		// 	// toast.warning(err.message);
		// });
	}, []);

	useEffect(() => {
		if (questionData.length > 0) {
			dispatch(loadDefaultQuestionState(questionData));
			console.log(questionData);
		}
	}, [dispatch, questionData]);

	return (
		<div>
			<AppModal
				open={showModal}
				onClose={() => setShowModal(false)}
				content={
					<ModalContent
						content1='Verify your Information'
						content2='Are you ready to start?'
						link='/exam'
						linkContent='Start Exam'
						onClick={() => setShowModal(false)}
					/>
				}
			/>
			<div className=''>
				<Header />
			</div>
			<div className='container'>
				<div className='pl-[255px] pt-[83px] pb-[213px] pr-[123px]'>
					<div>
						<img
							src={
								authUser?.student?.display_picture_url || '/images/user1.png'
							}
							alt='studentID'
							width={203}
							height={203}
						/>
						<div className='mt-[50px] grid gap-y-[30px] gap-x-[120px] grid-cols-3'>
							{data.map((item, idx) => (
								<div key={idx}>
									<h3 className='text-base capitalize font-semibold'>
										{item.label}
									</h3>
									<p className='text-lg'>{item.value}</p>
								</div>
							))}
						</div>
						<div className='mt-[45px] flex justify-end'>
							<div className='w-[80%] flex justify-between'>
								<button
									onClick={clickHandler}
									className='text-white rounded-lg text-lg w-[50%] py-3 bg-[#0075FF]'
								>
									{authUser?.assessment_status === 'inprogress'
										? 'Continue Exam'
										: 'Start Exam'}
								</button>
								<Popover className='relative'>
									<Popover.Button className='text-white text-sm flex gap-x-[5px] items-center rounded-[40px] px-[30px] py-3 hint_shadow outline-none bg-[#FFAD4A]'>
										<HiOutlineLightBulb className='text-[20px]' />
										<span className='block'>Hints</span>
									</Popover.Button>

									<Popover.Panel className='absolute w-[280px] bg-white rounded-lg top-[-19rem] z-10'>
										<PopupContent />
									</Popover.Panel>
								</Popover>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerifyInfo;
