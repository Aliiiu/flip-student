import { useEffect } from 'react';
import { auth } from 'src/store/auth';
import CountDownTimer from './CountDownTImer';

const ExamTimer = () => {
	const { authUser } = auth.use();
	let newTime = authUser?.assessment?.obj_time;
	let setTime = Number(newTime.split(':').shift()) || 1;
	const Timer = setTime * 60 * 1000 + new Date().getTime();
	// console.log(4 * 60 * 1000);
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
