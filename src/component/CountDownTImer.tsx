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
				if (seconds % 5 === 0) {
					console.log('inner', result);
					socket.emit('time_observer', '10:00');
				}
			}
		}, 1000);
		return () => clearTimeout(interval);
	}, [timeInSec]);
	const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;

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
