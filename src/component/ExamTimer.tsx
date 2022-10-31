import CountDownTimer from './CountDownTImer';

const ExamTimer = () => {
	const Timer = 4 * 60 * 1000 + new Date().getTime();
	console.log(4 * 60 * 1000)
	return (
		<div className='flex items-start mt-[42px] justify-center examTimeCard'>
			<div className='text-center'>
				{/* <span className='text-[#0075FF] text-[32px] font-semibold'>
					03:15:00
				</span> */}
				<CountDownTimer targetTime={Timer} />
				<p>Time remaining</p>
			</div>
		</div>
	);
};

export default ExamTimer;
