import { useEffect, useState } from 'react';
import ExamSummary from '../ExamSummary';
import ExamTimer from '../ExamTimer';
import Header from '../Header';
import Questions from '../Questions';
import CalculatorApp from '../UI/Calculator';
import { auth } from 'src/store/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QuestionService from 'src/services/AssesssmentService';
import { useSelector, useDispatch } from 'react-redux';
import { loadDefaultQuestionState } from 'src/feature/counter/counterSlice';
import { io } from 'socket.io-client';
import { getSessionStorageOrDefault } from 'src/utils';
import ModalContent from '../UI/ModalContent';
import AppModal from '../widget/Modal/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { logout } from 'src/utils/AuthUtils';

const Exam = () => {
	const { authUser } = auth.use();
	let dispatch = useDispatch();
	const socket = io('wss://demo-assessment-service.flipcbt.com/student', {
		auth: {
			token: authUser?.student?.student_id || '',
		},
		// transports: ['websocket'],
	});
	const [showCalc, setShowCalc] = useState(false);
	const [index, setIndex] = useState(getSessionStorageOrDefault('index', 0));
	const [showModal, setShowModal] = useState<boolean | null>(false);
	const [message, setMessage] = useState('');
	const [questionData, setQuestionData] = useState([]);
	let navigate = useNavigate();

	useEffect(() => {
		// socket.on('authenticated', (data) => {
		// 	console.log('authenticated => ', data); // you will get
		// 	setQuestionData(data.candidate_questions);
		// });
		// console.log(index);
		// socket.on('connect_error', (err) => {
		// 	// toast.warning(err.message);
		// });
		socket.on('logout', (message) => {
			console.log('You are logged out by the admin => ', message); // you will get
			setMessage(message);
			setShowModal(true);
		});
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const showCalculator = () => {
		setShowCalc((prevState) => !prevState);
	};

	useEffect(() => {
		const handleContextmenu = (e: any) => {
			e.preventDefault();
		};
		document.addEventListener('contextmenu', handleContextmenu);
		return function cleanup() {
			document.removeEventListener('contextmenu', handleContextmenu);
		};
	}, []);

	return (
		<div className='h-screen'>
			{/* <ToastContainer /> */}
			<Header />
			<AppModal
				open={showModal}
				onClose={() => {
					// navigate('/');
					// socket.close();
					logout(() => navigate('/'));
					sessionStorage.clear();
					localStorage.clear();
				}}
				content={
					<div className='flex w-full bg-white flex-col items-center gap-y-[24px] verify_modal_card'>
						<div className='fixed right-0 top-0'>
							<img
								src={'/images/close.png'}
								alt='close'
								width='30px'
								height='30px'
								className='cursor-pointer'
								onClick={() => {
									logout(() => navigate('/'));
									sessionStorage.clear();
									localStorage.clear();
								}}
							/>
						</div>
						<h2 className='font-semibold text-2xl'>{message}</h2>
						<p className='text-center text-lg'>
							You are being logged out for the reason above
						</p>
					</div>
				}
			/>
			<main className='h-[93%] container pt-[47px] lg:px-10'>
				<div className='flex justify-between '>
					<div className='w-[60%] flex flex-col justify-between'>
						<div>
							<Questions
								index={index}
								setIndex={setIndex}
								socket={socket}
								// setQuestionData={setQuestionData}
							/>
						</div>
					</div>
					<div className='w-[30%]'>
						<div className='flex items-center gap-8 w-full'>
							<img
								className='rounded-full'
								src={authUser?.student?.display_picture_url}
								alt='user avatar'
								width={98}
								height={98}
							/>
							<h3 className='text-[20px] font-semibold'>
								{authUser?.student?.name}
							</h3>
						</div>
						<ExamTimer socket={socket} />
						<div className='mt-[42px] w-full'>
							{showCalc ? (
								<CalculatorApp />
							) : (
								<ExamSummary index={index} setIndex={setIndex} />
							)}
						</div>
					</div>
				</div>
				<div className='flex justify-end mb-[0px] mt-[35px] w-full'>
					<button
						onClick={showCalculator}
						className='bg-[#FFAD4A] flex justify-center items-center rounded-[100%] h-[100px] w-[100px]'
					>
						<img
							src='/images/calc.png'
							alt='calculator icon'
							width={'55px'}
							height='50px'
						/>
					</button>
				</div>
			</main>
		</div>
	);
};

export default Exam;
