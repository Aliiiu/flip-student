import { FC, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { auth } from 'src/store/auth';
import CountDownTimer from './CountDownTImer';

const ExamTimer: FC<{
	socket: any;
}> = ({ socket }) => {
	const { authUser } = auth.use();
	let newTime = authUser?.obj_time;
	let setMin = Number(newTime.split(':')[0]) || 1;
	let setSecs = Number(newTime.split(':')[1]) || 59;
	console.log(newTime.split(':'));
	const Timer = setMin * 60 + setSecs;
	// console.log(Timer);
	return (
		<div className='flex items-start mt-[42px] justify-center examTimeCard'>
			<div className='text-center'>
				<CountDownTimer socket={socket} targetTime={Timer} />
			</div>
		</div>
	);
};

export default ExamTimer;
