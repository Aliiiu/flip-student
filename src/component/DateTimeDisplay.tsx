import React, { FC } from 'react';

const DateTimeDisplay: FC<{ value: number; isDanger: boolean }> = ({
	value,
	isDanger,
}) => {
	return (
		<div className={isDanger ? 'text-red-500' : 'text-[#0075FF]'}>
			<span className='text-[32px] font-semibold'>
				{value.toString().padStart(2, '0')}
			</span>
		</div>
	);
};

export default DateTimeDisplay;
