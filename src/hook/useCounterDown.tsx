import { useEffect, useState } from 'react';

const useCountDown = (targetDate: number) => {
	const countDownDate = new Date(targetDate).getTime();
	const [timeInSec, setTimeInSec] = useState(0);

	const [countDown, setCountDown] = useState(
		countDownDate - new Date().getTime()
	);

	// 👇️ get number of full minutes
	const minutes = Math.floor(timeInSec / 60);

	// 👇️ get remainder of seconds
	const seconds = timeInSec % 60;

	function padTo2Digits(num: number) {
		return num.toString().padStart(2, '0');
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setCountDown(countDownDate - new Date().getTime());
		}, 1000);

		return () => clearInterval(interval);
	}, [countDownDate]);

	const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;

	return [`${padTo2Digits(minutes)}}`, `${padTo2Digits(seconds)}`];
};

const getReturnValues = (countDown: number) => {
	// calculate time left
	const hours = Math.floor(
		(countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

	return [hours, minutes, seconds];
};

export { useCountDown };
