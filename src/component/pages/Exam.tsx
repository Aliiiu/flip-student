import { useEffect, useState } from 'react';
import ExamSummary from '../ExamSummary';
import ExamTimer from '../ExamTimer';
import Header from '../Header';
import Questions from '../Questions';
import CalculatorApp from '../UI/Calculator';
import { auth } from 'src/store/auth';
import { useSearchParams } from 'react-router-dom';
import QuestionService from 'src/services/AssesssmentService';
import { useSelector, useDispatch } from 'react-redux';
import { loadDefaultQuestionState } from 'src/feature/counter/counterSlice';

const Exam = () => {
	const { authUser } = auth.use();
	const [searchParams] = useSearchParams();
	let dispatch = useDispatch();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const [showCalc, setShowCalc] = useState(false);

	const showCalculator = () => {
		setShowCalc((prevState) => !prevState);
	};

	const totalQuestions = authUser?.assessment?.total_questions || 0;

	useEffect(() => {
		if (totalQuestions > 0) {
			const defaultQuestionState = Array.from(Array(totalQuestions).keys()).map(
				(q) => ({
					id: q,
					questionStatus: 'uncompleted',
				})
			);

			dispatch(loadDefaultQuestionState(defaultQuestionState));
		}
	}, [dispatch, totalQuestions]);

	return (
		<div className=''>
			<div className=''>
				<Header />
			</div>
			<div className='min-h-screen container pt-[77px] lg:px-10'>
				<div className='flex justify-between '>
					<div className='w-[60%] flex flex-col justify-between'>
						<div>
							<Questions />
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
						<ExamTimer />
						<div className='mt-[42px]'>
							{showCalc ? <CalculatorApp /> : <ExamSummary />}
						</div>
					</div>
				</div>
				<div className='flex justify-end mb-[114px] mt-[155px] w-full'>
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
			</div>
		</div>
	);
};

export default Exam;
