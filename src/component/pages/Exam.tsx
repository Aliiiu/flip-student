import { useEffect, useState } from 'react';
import ExamSummary from '../ExamSummary';
import ExamTimer from '../ExamTimer';
import Header from '../Header';
import Questions from '../Questions';
import CalculatorApp from '../UI/Calculator';
import { auth } from 'src/store/auth';

const Exam = () => {
	const { authUser } = auth.use();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const [showCalc, setShowCalc] = useState(false);

	const showCalculator = () => {
		setShowCalc((prevState) => !prevState);
	};
	return (
		<div className=''>
			<div className='container'>
				<Header />
			</div>
			<div className='min-h-screen mt-[77px] px-[124px]'>
				<div className='flex justify-between '>
					<div className='w-[60%] flex flex-col justify-between'>
						<div>
							<Questions />
						</div>
					</div>
					<div className='w-[30%]'>
						<div className='flex items-center justify-between w-full'>
							<img
							className='rounded-full'
								src={authUser?.student?.display_picture_url}
								alt='user avatar'
								width={98}
								height={98}
							/>
							<h3 className='text-[20px]'>{authUser?.student?.name}</h3>
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
