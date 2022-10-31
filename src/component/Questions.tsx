import { useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import questions from '../mock-data/data.json';
import Button from './UI/Button';

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
const Questions = () => {
	const [question, setQuestion] = useState<questionModel[]>(
		questions.map((item) => ({
			...item,
			reviewLater: false,
			answerOptions: item.answerOptions.map((value) => ({
				...value,
				checked: false,
			})),
		}))
	);
	const [CurrQuestion, setCurrQuestion] = useState(0);
	const [currOption, setCurrOption] = useState<number | null>(0);

	const clickHandler = (index: number) => {
		if (currOption === index) return setCurrOption(null);
		setCurrOption(index);
	};

	// useEffect(() => {
	// 	const clonedQuestion = JSON.parse(JSON.stringify(questions));
	// 	for (let i = 0; i < clonedQuestion.length; i++) {
	// 		const subQuestions = clonedQuestion[i];
	// 		subQuestions.reviewLater = false;
	// 		for (let j = 0; j < subQuestions.answerOptions.length; j++) {
	// 			const answer = subQuestions.answerOptions[j];
	// 			answer.checked = false;

	// 			// delete answer.isCorrect;
	// 		}
	// 	}
	// 	// console.log(clonedQuestion);
	// 	if (clonedQuestion) setQuestion(clonedQuestion);
	// }, []);

	const changeHandler = (e?: React.MouseEvent<HTMLButtonElement>) => {
		const activeIndex = parseFloat(e?.currentTarget.dataset.index!);
		setCurrQuestion(activeIndex);
	};

	// useEffect(() => {
	// 	console.log(question);
	// }, [question]);

	// console.log(question[CurrQuestion].reviewLater);

	return (
		<div>
			<div className='flex justify-between mb-[44px]'>
				<span className='bg-[#FFAD4A] flex justify-center items-center rounded-[8px] text-[20px] w-[45px] h-[43px] text-white'>
					{CurrQuestion + 1}
				</span>
				<label className='flex items-center gap-x-[10px]'>
					<input
						className='rounded-[100%] h-[20px] w-[20px]'
						type='checkbox'
						checked={true}
					/>
					<p className='text-[14px]'>Revise later</p>
				</label>
			</div>
			<div className='w-full bg-[#06042C] h-[8px] bg-opacity-20 rounded-[10px]'>
				<div className={`bg-[#0075FF] h-[8px] rounded-l-[8px] w-[25%]`}></div>
			</div>
			<div className='bg-white mt-[96px] flex flex-col h-[720px] justify-between'>
				<div>
					<p className='mb-[60px] text-[24px]'>
						{question[CurrQuestion].questionText}
					</p>
					<div className='flex flex-col gap-y-[20px]'>
						{question[CurrQuestion].answerOptions.map((item, idx) => (
							<div
								key={idx}
								onClick={() => clickHandler(idx)}
								className={`flex gap-x-[16px] py-[15px] px-[20px] cursor-pointer options border-2 items-center ${
									currOption === idx ? 'border-[#0075ff]' : 'border-[#C0C0C0]'
								}`}
							>
								<span
									className={`${
										currOption === idx ? 'bg-[#0075ff] text-white' : 'bg-white'
									} flex justify-center items-center border rounded-[100%] h-[32px] w-[32px]`}
								></span>
								<p>{item.answerTex}</p>
							</div>
						))}
					</div>
				</div>
				<div className='flex justify-between'>
					{CurrQuestion > 0 && (
						<Button
							dataIndex={CurrQuestion - 1}
							onClick={changeHandler}
							classes='flex justify-center text-[#0075FF] items-center gap-x-[9px]'
						>
							<BsArrowLeft /> Previous
						</Button>
					)}
					{CurrQuestion < questions.length - 1 && (
						<Button
							dataIndex={CurrQuestion + 1}
							onClick={changeHandler}
							classes='flex gap-x-[9px] bg-[#0075ff] text-white justify-center items-center'
						>
							Next
							<BsArrowRight />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Questions;
