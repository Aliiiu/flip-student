import { FC, useEffect, useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QuestionService from 'src/services/AssesssmentService';
import { auth } from 'src/store/auth';
import questions from '../mock-data/data.json';
import Button from './widget/Button';
import parse from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/hook/useToolkit';
import { revision } from 'src/feature/counter/counterSlice';
import { RadioGroup } from '@headlessui/react';
import { IoCheckmarkCircleSharp, IoEllipseOutline } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import useLoading from '../hook/useLoading';
import AppModal from './widget/Modal/Modal';
import EndModalContent from './UI/EndModalContent';
import { BounceLoader } from 'react-spinners';

interface PayloadType {
	candidate_answer: string;
	question: string;
	question_image: string;
	options: [];
	question_no: number;
	type: string;
	_id: string;
	revise_later: boolean;
}

interface NavigateType {
	index: number;
	setIndex: Function;
	setQuestionData: Function;
	socket: any;
}

const initialState: PayloadType = {
	candidate_answer: '',
	question: '',
	question_image: '',
	question_no: 1,
	options: [],
	type: '',
	_id: '',
	revise_later: false,
};

const Questions: FC<NavigateType> = ({
	index,
	setIndex,
	socket,
	setQuestionData,
}) => {
	const { authUser } = auth.use();
	let dispatch = useDispatch();
	const { questions } = useAppSelector(
		(state: { questions: any }) => state.questions
	);

	const [progess, setProgress] = useState(1);
	const [payload, setPayload] = useState<PayloadType>(initialState);
	const [currOption, setCurrOption] = useState<string>(
		payload.candidate_answer
	);
	// const [searchParams] = useSearchParams();
	// let index = Number(searchParams.get('index')) || 0;
	const [checked, setChecked] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [answer, setAnswer] = useState('');
	// const [questionId, setQuestionId] = useState('');
	let navigate = useNavigate();
	let [plan, setPlan] = useState('');
	const { loading, startLoading, stopLoading } = useLoading();
	const {
		loading: newQuestion,
		startLoading: getNewQuestion,
		stopLoading: stopNewQuestion,
	} = useLoading();

	const clickHandler = (
		option: string,
		questions?: any,
		reviseLater?: boolean
	) => {
		// console.log(option);
		setCurrOption(option);
		startLoading();
		console.log({
			question_index: index,
			option,
			revise_later: checked,
		});
		QuestionService.saveQuestion({
			question_index: index,
			option,
			revise_later: checked,
		})
			.then((res) => {
				questions && setPayload({ ...questions, candidate_answer: option });
				toast.success(res?.data?.message);
			})
			.catch((err) => console.log(err?.response?.error?.message))
			.finally(() => {
				stopLoading();
			});
	};

	const handleNext = () => {
		if (index + 1 < authUser?.assessment?.total_questions) {
			clickHandler(currOption || payload.candidate_answer);
			setIndex((prevState: number) => prevState + 1);
		} else {
			console.log('end');
			clickHandler(currOption || '');
			setShowModal(true);
		}
	};

	const handlePrev = () => {
		if (index > 0) {
			clickHandler(currOption || payload.candidate_answer);
			// navigate(`/exam?index=${index - 1}`);
			setIndex((prevState: number) => prevState - 1);
		}
	};
	useEffect(() => {
		if (index >= 0 && index < authUser?.assessment?.total_questions) {
			getNewQuestion();
			QuestionService.getQuestion({
				question_index: index,
			})
				.then((res) => {
					// console.log(res.data);
					setPayload(res.data.payload.data);
				})
				.catch((err) => console.log(err.response))
				.finally(() => stopNewQuestion());
		}
	}, [index]);

	useEffect(() => {
		setChecked(false);
		setChecked(questions[index]?.revise_later || false);
		setCurrOption('');
	}, [index, questions]);

	useEffect(() => {
		setProgress(((index + 1) * 100) / authUser.assessment.total_questions);
	}, [authUser.assessment.total_questions, index]);

	let progressWidth = {
		width: `${progess}%`,
	};

	useEffect(() => {
		sessionStorage.setItem('index', JSON.stringify(index));
		console.log(questions[index].revise_later);
		// console.log(
		// 	questions.filter((item: any) => {
		// 		return item.question_no === index + 1;
		// 	})[0]._id
		// );
		// setQuestionId(
		// 	questions.filter((item: any) => {
		// 		return item.question_no === index + 1;
		// 	})[0]._id
		// );
	}, [index, questions]);

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

	// useEffect(() => {
	// 	console.log(questionId);
	// 	const reviseHandler = (id: string) => {
	// 		QuestionService.reviseLater(id, { revise_later: String(checked) })
	// 			.then((res) => console.log(res.data))
	// 			.catch((err) => err.response);
	// 	};
	// 	reviseHandler(questionId);
	// }, [checked]);

	return (
		<div>
			<ToastContainer />
			<AppModal
				open={showModal}
				onClose={() => setShowModal(false)}
				content={
					<EndModalContent
						onClick={() => setShowModal(false)}
						onPress={endExamHandler}
					/>
				}
			/>
			<div className='flex justify-between mb-[44px]'>
				<span className='bg-[#FFAD4A] flex justify-center items-center rounded-[8px] text-[20px] w-[45px] h-[43px] text-white'>
					{index + 1}
				</span>
				<label className='flex items-center gap-x-[10px]'>
					<input
						onChange={() => setChecked(!checked)}
						className='rounded-[100%] h-[20px] w-[20px]'
						type='checkbox'
						checked={checked}
					/>
					<p className='text-[14px]'>Revise later</p>
				</label>
			</div>
			<div className='w-full bg-[#06042C] h-[8px] overflow-hidden bg-opacity-20 rounded-[10px]'>
				<div
					style={progressWidth}
					className={`bg-[#0075FF] h-[8px] rounded-l-[8px]`}
				></div>
			</div>
			{!newQuestion ? (
				<div className='bg-white mt-[96px] flex flex-col h-auto justify-between'>
					<div>
						{parse(payload.question)}
						{/* <img
						src={payload.question_image || ''}
						alt=''
						className='h-32 w-full'
					/> */}
						<div className='mt-10'>
							{payload.type === 'short-answer' ? (
								<div className='border-2 border-[#06042c33] flex flex-col rounded-2xl pt-10 overflow-hidden'>
									<hr className='bg-[#06042c33]' />
									<textarea
										name='body'
										value={answer || payload.candidate_answer}
										onChange={(e: any) => setAnswer(e.target.value)}
										className='border-none pt-3 pl-3 outline-none resize-none h-20 w-full'
									/>
									<div className='flex justify-end pb-4 pr-4'>
										<Button
											onClick={() => clickHandler(answer)}
											classes='bg-primary items-end px-5 py-2 text-white'
										>
											Sumbit
										</Button>
									</div>
								</div>
							) : (
								<div>
									<RadioGroup
										value={plan}
										onChange={setPlan}
										className='flex flex-col gap-y-[20px]'
									>
										{payload.options.map((plan) => (
											/* Use the `active` state to conditionally style the active option. */
											/* Use the `checked` state to conditionally style the checked option. */
											<RadioGroup.Option key={plan} value={plan}>
												{({ active, checked }) => (
													<li
														onClick={() => clickHandler(plan, payload)}
														className={`border-2 rounded-2xl p-4 flex items-center gap-4 capitalize border-[#C0C0C0] ${
															payload.candidate_answer === plan || active
																? 'border-blue-500 text-blue-500'
																: 'bg-white text-[#06042C]'
														} `}
													>
														{payload.candidate_answer === plan || active ? (
															<IoCheckmarkCircleSharp
																size={30}
																className='text-blue-600'
															/>
														) : (
															<IoEllipseOutline
																size={30}
																className='text-[#C0C0C0]'
															/>
														)}
														{plan}
													</li>
												)}
											</RadioGroup.Option>
										))}
									</RadioGroup>
								</div>
							)}
						</div>
					</div>
					<div className='flex mt-10 justify-between'>
						{index > 0 && (
							<Button
								disabled={loading}
								onClick={handlePrev}
								classes='flex justify-center text-[#0075FF] border-2 border-primary items-center py-2 w-[150px] gap-x-[9px]'
							>
								<BsArrowLeft /> Previous
							</Button>
						)}
						{index + 1 <= authUser?.assessment?.total_questions && (
							<Button
								disabled={loading}
								onClick={handleNext}
								classes='flex gap-x-[9px] bg-[#0075ff] text-white justify-center py-2 w-[150px] items-center'
							>
								Next
								<BsArrowRight />
							</Button>
						)}
					</div>
					{/* <>
					{Number(searchParams.get('index')) + 1}
					{authUser?.assessment?.total_questions}
				</> */}
				</div>
			) : (
				<div className='h-40 mt-10 w-full flex justify-center items-center'>
					<BounceLoader className='text-[#0075FF]' color='#0075FF' size={60} />
				</div>
			)}
		</div>
	);
};

export default Questions;
