import { useEffect, useState } from 'react';
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

interface questionModel {
	id: number;
	questionText: string;
	answerOptions: {
		id?: number | string;
		label?: string;
		answerTex: string;
		isCorrect: boolean;
		checked?: boolean;
	}[];
	questionInstruction?: string;
	reviewLater?: boolean;
}

interface PayloadType {
	candidate_answer?: string;
	options: string[];
	question: any;
	question_image: string;
	type: string;
}
const Questions = () => {
	const { authUser } = auth.use();
	let dispatch = useDispatch();
	const questions = useAppSelector((state) => state.questions);

	const [progess, setProgress] = useState(1);
	const [currOption, setCurrOption] = useState<string>('');
	const [payload, setPayload] = useState<PayloadType>({
		options: [],
		question: '<p></p>',
		question_image: '',
		type: '',
	});
	const [searchParams] = useSearchParams();
	let index = Number(searchParams.get('index')) || 0;
	const [checked, setChecked] = useState(
		() => questions[index].questionStatus === 'revise'
	);
	const [answer, setAnswer] = useState('');
	let [plan, setPlan] = useState('');
	const { loading, startLoading, stopLoading } = useLoading();

	const clickHandler = (option: string) => {
		console.log(option);
		setCurrOption(option);
		startLoading();
		QuestionService.saveQuestion({
			question_index: searchParams.get('index'),
			option,
		})
			.then((res) => {
				console.log(res?.data?.message);
				toast.success(res?.data?.message);
				QuestionService.getQuestion({
					question_index: searchParams.get('index'),
				})
					.then((res) => {
						console.log(res.data);
						setPayload(res.data.payload.data);
					})
					.catch((err) => console.log(err.response));
			})
			.catch((err) => console.log(err?.response?.error?.message))
			.finally(() => stopLoading());
	};
	let navigate = useNavigate();
	const handleNext = () => {
		let body = {
			id: Number(searchParams.get('index')),
			questionStatus: checked
				? 'revise'
				: payload?.candidate_answer || currOption !== ''
				? 'completed'
				: 'uncompleted',
		};
		dispatch(revision(body));
		console.log(JSON.stringify(body));
		if (index >= 0 && index + 1 < questions.length) {
			navigate(`/exam?index=${index + 1}`);
		} else {
			console.log('end');
			clickHandler(currOption || '');
		}
	};

	const handlePrev = () => {
		if (index > 0) {
			navigate(`/exam?index=${index - 1}`);
		}
	};
	useEffect(() => {
		console.log(searchParams.get('index'));
		if (index >= 0) {
			QuestionService.getQuestion({ question_index: searchParams.get('index') })
				.then((res) => {
					console.log(res.data);
					setPayload(res.data.payload.data);
				})
				.catch((err) => console.log(err.response));
		}
	}, [index, searchParams]);

	useEffect(() => {
		setChecked(false);
		setChecked(questions[index].questionStatus === 'revise');
		setCurrOption('');
	}, [index, questions, searchParams]);

	useEffect(() => {
		setProgress(
			((Number(searchParams.get('index')) + 1) * 100) /
				authUser.assessment.total_questions
		);
	}, [authUser.assessment.total_questions, searchParams]);

	let progressWidth = {
		width: `${progess}%`,
	};

	return (
		<div>
			<ToastContainer />
			<div className='flex justify-between mb-[44px]'>
				<span className='bg-[#FFAD4A] flex justify-center items-center rounded-[8px] text-[20px] w-[45px] h-[43px] text-white'>
					{Number(searchParams.get('index')) + 1}
					{/* {Number(searchParams.get('index'))}/
					{authUser?.assessment?.total_questions} */}
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
			<div className='bg-white mt-[96px] flex flex-col h-auto justify-between'>
				<div>
					{/* <p className='mb-[60px] text-[24px]'>
						{question[CurrQuestion].questionText}
					</p> */}
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
									value={payload.candidate_answer || answer}
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
													onClick={() => clickHandler(plan)}
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
					{Number(searchParams.get('index')) > 0 && (
						<Button
							// dataIndex={CurrQuestion - 1}
							disabled={loading}
							onClick={handlePrev}
							classes='flex justify-center text-[#0075FF] border-2 border-primary items-center py-2 w-[150px] gap-x-[9px]'
						>
							<BsArrowLeft /> Previous
						</Button>
					)}
					{Number(searchParams.get('index')) + 1 <=
						authUser?.assessment?.total_questions && (
						<Button
							disabled={loading}
							// dataIndex={CurrQuestion + 1}
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
		</div>
	);
};

export default Questions;
