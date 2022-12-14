import React, {
	createRef,
	FC,
	KeyboardEventHandler,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QuestionService from 'src/services/AssesssmentService';
import { auth } from 'src/store/auth';
import questions from '../mock-data/data.json';
import Button from './widget/Button';
import parse from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/hook/useToolkit';
import { questionAnswered, revision } from 'src/feature/counter/counterSlice';
import { RadioGroup } from '@headlessui/react';
import { IoCheckmarkCircleSharp, IoEllipseOutline } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import useLoading from '../hook/useLoading';
import AppModal from './widget/Modal/Modal';
import EndModalContent from './UI/EndModalContent';
import { BounceLoader } from 'react-spinners';
import { logout } from 'src/utils/AuthUtils';
import { useKey } from 'react-use';
import { io } from 'socket.io-client';

interface PayloadType {
	candidate_answer: string;
	question: string;
	question_image: string;
	options: any;
	question_no: number;
	type: string;
	_id: string;
	revise_later: boolean;
}

interface NavigateType {
	index: number;
	setIndex: Function;
	// setQuestionData: Function;
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

const Questions: FC<NavigateType> = ({ index, setIndex }) => {
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
	// const socket = io('wss://demo-assessment-service.flipcbt.com/student', {
	// 	auth: {
	// 		token: authUser?.student?.student_id || '',
	// 	},
	// 	transports: ['websocket'],
	// });

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

	const clickHandler = (data: any, questions?: any) => {
		console.log(data);
		dispatch(questionAnswered({ data, questions }));
		setCurrOption(data.option);
		startLoading();
		QuestionService.saveQuestion(data)
			.then((res) => {
				console.log(res.data);
				questions &&
					setPayload({ ...questions, candidate_answer: data.option });
			})
			.catch((err) => console.log(err?.response?.error?.message))
			.finally(() => {
				stopLoading();
			});
	};

	// useEffect(() => {
	// 	socket.on('authenticated', (data) => {
	// 		console.log('authenticated => ', data); // you will get
	// 		setQuestionData(data.candidate_questions);
	// 	});
	// 	console.log('here');
	// }, [index, payload]);

	const handleNext = () => {
		if (btnRef.current?.innerHTML === 'Next') {
			// clickHandler(payload?.candidate_answer);
			setIndex((prevState: number) => prevState + 1);
		} else {
			console.log('end', index + 1);
			// clickHandler(currOption || '');
			setShowModal(true);
		}
	};

	const handlePrev = () => {
		if (index > 0) {
			// clickHandler(payload?.candidate_answer);
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
					// console.log(res.data.payload);
					setPayload(res.data.payload.data);
				})
				.catch((err) => console.log(err.response))
				.finally(() => stopNewQuestion());
		}
	}, [index]);

	useEffect(() => {
		setChecked(false);
		setChecked(questions[index]?.reviseOption || false);
		setCurrOption(
			questions[index]?.candidate_answer || questions[index]?.selectedOption
		);
	}, [index, questions]);

	useEffect(() => {
		setProgress(((index + 1) * 100) / authUser.assessment.total_questions);
	}, [authUser.assessment.total_questions, index]);

	let progressWidth = {
		width: `${progess}%`,
	};

	useEffect(() => {
		sessionStorage.setItem('index', JSON.stringify(index));
		// console.log(questions[index]?.revise_later);
	}, [index, questions]);

	const endExamHandler = () => {
		QuestionService.endExam()
			.then((res) => {
				console.log(res?.data);
				// navigate('/endExam');
				logout(() => navigate('/endExam'));
				sessionStorage.clear();
				localStorage.clear();
			})
			.catch((err) => {
				console.log(err?.response?.error?.message);
			})
			.finally(() => {
				setShowModal(false);
			});
	};

	useEffect(() => {
		window.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key === 'n' && btnRef.current?.innerHTML === 'Next') {
				handleNext();
			}
			if (e.key === 'p' && prevRef.current?.innerHTML === 'Previous') {
				handlePrev();
			}
		});
		return () =>
			window.removeEventListener('keydown', (e: KeyboardEvent) => {
				if (e.key === 'n' && btnRef.current?.innerHTML === 'Next') {
					handleNext();
				}
				if (e.key === 'p' && prevRef.current?.innerHTML === 'Previous') {
					handlePrev();
				}
			});
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key === 's') {
				endExamHandler();
			}
		});
	}, []);

	const handleHint = useCallback(
		(e: KeyboardEvent) => {
			// console.log(e.key);
			if (e.key === 'a' && questions[index]?.options.length > 0) {
				clickHandler(
					{
						question_index: index,
						option: questions[index]?.options[0],
						revise_later: checked,
					},
					questions[index]
				);
				console.log(questions[index]?.options[0]);
			} else if (e.key === 'b' && questions[index]?.options.length > 0) {
				clickHandler(
					{
						question_index: index,
						option: questions[index]?.options[1],
						revise_later: checked,
					},
					questions[index]
				);
				console.log(questions[index]?.options[1]);
			} else if (e.key === 'c' && questions[index]?.options.length > 0) {
				clickHandler(
					{
						question_index: index,
						option: questions[index]?.options[2],
						revise_later: checked,
					},
					questions[index]
				);
				console.log(questions[index]?.options[2]);
			} else if (e.key === 'd' && questions[index]?.options.length > 0) {
				clickHandler(
					{
						question_index: index,
						option: questions[index]?.options[3],
						revise_later: checked,
					},
					questions[index]
				);
				console.log(questions[index]?.options[3]);
			}
		},
		[clickHandler, payload]
	);

	useEffect(() => {
		// console.log(payload);
		window.addEventListener('keydown', handleHint);

		return () => window.removeEventListener('keydown', handleHint);
	}, [handleHint]);

	useEffect(() => {
		if (
			questions[index]?.candidate_answer &&
			questions[index]?.type === 'short-answer'
		)
			setAnswer(questions[index]?.candidate_answer);
	}, [index, questions]);
	// useEffect(() => {
	// 	if (payload.candidate_answer && payload.type === 'short-answer')
	// 		setAnswer(payload.candidate_answer);
	// }, [payload.candidate_answer, payload.type]);

	const btnRef = useRef<HTMLButtonElement>(null);
	const prevRef = useRef<HTMLButtonElement>(null);

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
						onChange={() => {
							setChecked(!checked);
							console.log(!checked);
							// clickHandler(
							// 	{
							// 		question_index: index,
							// 		option: currOption,
							// 		revise_later: !checked,
							// 	},
							// 	questions[index]
							// );
							dispatch(
								revision({
									revise_option: !checked,
									index,
									questions: questions[index],
								})
							);
						}}
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
			{questions[index] ? (
				<div className='bg-white mt-[96px] flex flex-col h-auto justify-between'>
					<div>
						{parse(questions[index]?.question)}
						{/* <img
						src={payload.question_image || ''}
						alt=''
						className='h-32 w-full'
					/> */}
						<div className='mt-10'>
							{questions[index]?.type === 'short-answer' ? (
								<div className='border-2 border-[#06042c33] flex flex-col rounded-2xl pt-10 overflow-hidden'>
									<hr className='bg-[#06042c33]' />
									<textarea
										name='body'
										value={answer}
										onChange={(e: any) => setAnswer(e.target.value)}
										className='border-none pt-3 pl-3 outline-none resize-none h-20 w-full'
									/>
									<div className='flex justify-end pb-4 pr-4'>
										<Button
											onClick={() =>
												clickHandler(
													{
														question_index: index,
														option: answer,
														revise_later: checked,
													},
													questions[index]
												)
											}
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
										{questions[index]?.options.map((plan: any) => (
											<RadioGroup.Option key={plan} value={plan}>
												{({ active, checked }) => (
													<li
														onClick={() =>
															clickHandler(
																{
																	question_index: index,
																	option: plan,
																	revise_later: checked,
																},
																questions[index]
															)
														}
														className={`border-2 rounded-2xl p-4 flex items-center gap-4 capitalize border-[#C0C0C0] ${
															(questions[index]?.selectedOption ||
																questions[index]?.candidate_answer) === plan ||
															active
																? 'border-blue-500 text-blue-500'
																: 'bg-white text-[#06042C]'
														} `}
													>
														{(questions[index]?.selectedOption ||
															questions[index]?.candidate_answer) === plan ||
														active ? (
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
							// <Button
							// 	disabled={loading}
							// 	onClick={handlePrev}
							// 	classes='flex justify-center text-[#0075FF] border-2 border-primary items-center py-2 w-[150px] gap-x-[9px]'
							// >
							// 	<BsArrowLeft /> Previous
							// </Button>
							<button
								disabled={loading}
								ref={prevRef}
								// onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
								// 	if (e.key === 'p' && btnRef.current?.innerHTML === 'Previous')
								// 		handlePrev();
								// }}
								onClick={handlePrev}
								className='flex justify-center rounded-lg text-[#0075FF] border-2 border-primary items-center py-2 w-[150px] gap-x-[9px]'
							>
								Previous
							</button>
						)}
						{index + 1 <= authUser?.assessment?.total_questions && (
							// <Button
							// 	disabled={loading}
							// 	onClick={handleNext}
							// 	classes='flex gap-x-[9px] bg-[#0075ff] text-white justify-center py-2 w-[150px] items-center'
							// >
							// 	{index + 1 >= authUser?.assessment?.total_questions
							// 		? 'End Exam'
							// 		: 'Next'}
							// 	<BsArrowRight />
							// </Button>
							<button
								disabled={loading}
								ref={btnRef}
								// onKeyDown={handleKeyDown}
								onClick={handleNext}
								className={`rounded-lg disabled:cursor-not-allowed flex gap-x-[9px] bg-[#0075ff] text-white justify-center py-2 w-[150px] items-center`}
							>
								{index + 1 >= authUser?.assessment?.total_questions
									? 'End Exam'
									: 'Next'}
							</button>
						)}
					</div>
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
