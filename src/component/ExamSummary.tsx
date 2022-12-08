import { FC, useEffect, useState } from 'react';
import Button from './widget/Button';
import ErrorModal from './UI/ErrorModal';
import { auth } from 'src/store/auth';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/store';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'src/hook/useToolkit';
import AppModal from './widget/Modal/Modal';
import QuestionService from 'src/services/AssesssmentService';
import { getSessionStorageOrDefault } from 'src/utils';
interface NavigateType {
	index: number;
	setIndex: Function;
}
const ExamSummary: FC<NavigateType> = ({ index, setIndex }) => {
	const { authUser } = auth.use();
	const { questions } = useAppSelector((state) => state.questions);
	let navigate = useNavigate();
	const [showModal, setShowModal] = useState<boolean | null>(false);
	// const [index, setIndex] = useState(getSessionStorageOrDefault('index', 0));
	// const [searchParams] = useSearchParams();

	// useEffect(() => {
	// 	let data = questions.filter((content) => {
	// 		if (content.id == 2) {
	// 			console.log('something');
	// 		} else {
	// 			console.log('something else');
	// 		}
	// 	});
	// }, [searchParams, questions]);
	const endExamHandler = () => {
		QuestionService.endExam()
			.then((res) => {
				console.log(res?.data);
				navigate('/endExam');
			})
			.catch((err) => {
				console.log(err?.response?.error?.message);
			})
			.finally(() => {
				setShowModal(false);
			});
	};
	return (
		<div className='examSummaryCard'>
			<div className='mb-[16px] pr-[20px]'>
				<div className='pb-[16px]'>
					<h4 className='text-[18px] font-semibold capitalize'>
						{authUser?.assessment?.term} Term Exam {authUser?.assessment?.year}
					</h4>
					<h6 className='text-[14px]'>{authUser?.assessment?.subject}</h6>
				</div>
				<hr />
				<div className='flex flex-col gap-y-[16px] mt-[16px]'>
					<h5>Test Summary</h5>
					<div className='flex justify-between'>
						<div className='flex gap-x-[10px] items-center'>
							<span className='bg-[#0075FF] h-[14px] rounded-[100%] w-[14px]'></span>{' '}
							<h6 className='text-[14px]'>Attempted</h6>
						</div>{' '}
						<span className='text-[14px]'>
							{
								questions.filter((item) => item?.candidate_answer !== undefined)
									.length
							}
						</span>
					</div>
					{typeof questions[0]?.candidate_answer}
					<div className='flex justify-between'>
						<div className='flex gap-x-[10px] items-center'>
							<span className='bg-[#FFAD4A] h-[14px] rounded-[100%] w-[14px]'></span>{' '}
							<h6 className='text-[14px]'>Revise Later</h6>
						</div>{' '}
						<span className='text-[14px]'>
							{questions.filter((item) => item?.revise_later === true).length}
						</span>
					</div>
					<div className='flex justify-between'>
						<div className='flex gap-x-[10px] items-center'>
							<span className='bg-[#C0C0C0] h-[14px] rounded-[100%] w-[14px]'></span>{' '}
							<h6 className='text-[14px]'>Not Attempted</h6>
						</div>{' '}
						<span className='text-[14px]'>
							{questions.length -
								questions.filter((item) => item?.candidate_answer !== undefined)
									.length}
						</span>
					</div>
				</div>
				<hr className='mt-[16px]' />
			</div>
			<div>
				<h5>Question List</h5>
				<div className='grid grid-cols-5 gap-y-[10px] mt-[24px] overflow-y-scroll gap-x-[10px]'>
					{questions.map((item, idx) => {
						// let color = 'bg-gray-400';
						// const status =
						// 	questions.length - 1 <= idx
						// 		? questions[item]?.questionStatus
						// 		: 'uncompleted';
						// color =
						// 	status === 'revise'
						// 		? 'bg-yellow-200'
						// 		: status === 'completed'
						// 		? '#0075ff'
						// 		: 'bg-gray-400';

						// console.log(status, color, questions.length, idx);

						return (
							<div
								onClick={() => {
									sessionStorage.setItem('index', JSON.stringify(idx));
									setIndex(idx);
								}}
								className={`${
									item.revise_later
										? 'bg-[#FFAD4A]'
										: item.candidate_answer !== undefined
										? 'bg-[#0075ff]'
										: 'bg-[#C0C0C0]'
								} rounded-[8px] text-[14px] cursor-pointer text-white flex justify-center items-center h-[40px] w-[40px]`}
								key={idx}
							>
								{idx + 1}
							</div>
						);
					})}
				</div>
				<div className='text-center mt-10'>
					<AppModal
						open={showModal}
						onClose={() => setShowModal(false)}
						content={
							<div className='flex flex-col items-center gap-y-[24px] verify_modal_card'>
								<div className='fixed top-0 right-0'>
									<img
										src={'/images/close.png'}
										alt='close'
										width='30px'
										height='30px'
										className='cursor-pointer'
										onClick={() => setShowModal(false)}
									/>
								</div>
								{/* <h2 className='font-semibold text-[24px]'>{content1}</h2> */}
								<p className='text-center text-[20px]'>
									Are you sure you want to end your exam
								</p>
								<div className='flex items-center justify-between w-full'>
									<button
										onClick={() => setShowModal(false)}
										className='border py-[14px] px-[45px] rounded-[8px] text-[#E25C5C] border-[#E25C5C]'
									>
										Cancel
									</button>
									<button
										onClick={endExamHandler}
										className='bg-[#0075FF] py-[14px] rounded-[8px] px-[45px] text-white'
									>
										End Exam
									</button>
								</div>
							</div>
						}
					/>
					{/* {showModal && (
						<ErrorModal
							content2='Are you sure you want to end your exam'
							link='/endExam'
							linkContent='End Exam'
							onClick={() => setShowModal(false)}
						/>
					)} */}
					<Button
						onClick={() => setShowModal(true)}
						classes='text-[#0075FF] border-2 py-2 border-primary'
					>
						End Exam
					</Button>
				</div>
				{/* <>{JSON.stringify(questions)}</> */}
			</div>
			<></>
		</div>
	);
};

export default ExamSummary;
