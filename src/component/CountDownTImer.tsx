import React, { FC, useEffect, useRef, useState } from 'react';
import { websocket } from 'src/store/websocket';
import { useCountDown } from '../hook/useCounterDown';
import DateTimeDisplay from './DateTimeDisplay';

const ExpiredNotice = () => {
	return (
		<div className='expired-notice'>
			<span>Time is up</span>
		</div>
	);
};

const ShowCounter: FC<{ minutes: number; seconds: number }> = ({
	minutes,
	seconds,
}) => {
	return (
		<div className='flex items-center justify-center'>
			<DateTimeDisplay value={minutes} isDanger={minutes < 3} />
			<span
				className={`text-[32px] ${
					minutes < 3 ? 'text-red-500' : 'text-[#0075FF]'
				}`}
			>
				:
			</span>
			<DateTimeDisplay value={seconds} isDanger={minutes < 3} />
		</div>
	);
};

const CountDownTimer: FC<{ targetTime: number; socket: any }> = ({
	targetTime,
	socket,
}) => {
	const [timeInSec, setTimeInSec] = useState(targetTime);

	// 👇️ get number of full minutes
	const minutes = Math.floor(timeInSec / 60);

	// 👇️ get remainder of seconds
	const seconds = timeInSec % 60;

	function padTo2Digits(num: number) {
		return num.toString().padStart(2, '0');
	}

	useEffect(() => {
		const interval = setTimeout(() => {
			if (timeInSec > 0) {
				setTimeInSec((timeInSec) => timeInSec - 1);
			}
		}, 1000);
		return () => clearTimeout(interval);
	}, [timeInSec]);
	const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
	const [timer, setTimer] = useState(result);
	// console.log('outside', result, timer);
	// const timerRef = useRef(result);

	useEffect(() => {
		// setTimer(result);
		// const jumper = () => {
		// 	console.log(timer);
		// 	console.log('inner', result);
		// };
		// setTimer(() => result);
		console.log('inside useffect', result, seconds);
		if (seconds % 5 === 0) {
			console.log('inner', result);
			socket.emit('time_observer', result);
		}
		// const interval = setInterval(() => {
		// 	// jumper();
		// 	console.log('inner', result, timer);
		// }, 5000);

		// return () => clearInterval(interval);
	}, [result, seconds, socket]);

	// useEffect(() => {
	// 	// console.log('timer', result);
	// 	// console.log('timeref', timerRef);
	// 	// console.log(timer);
	// 	const interval = setInterval(() => {
	// 		// jumper();
	// 		console.log('inner', result, timer);
	// 	}, 5000);

	// 	return () => clearInterval(interval);
	// }, []);

	// useEffect(() => {
	// 	console.log(result);
	// 	const intervalTwo = setInterval(() => {
	// 		console.log('done');
	// 		socket.emit('time_observer', result);
	// 	}, 10000);
	// 	return () => clearInterval(intervalTwo);
	// }, [result, socket]);
	if (timeInSec === 0) {
		return <ExpiredNotice />;
	} else {
		return (
			<>
				<ShowCounter minutes={minutes} seconds={seconds} />
				<p>Time remaining</p>
			</>
		);
	}
};

export default CountDownTimer;
