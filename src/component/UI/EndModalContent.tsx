import React, { FC } from 'react';

interface Props {
	onClick: () => void;
	onPress: () => void;
}
const EndModalContent: FC<Props> = (Props) => {
	return (
		<div className='flex flex-col items-center gap-y-[24px] verify_modal_card'>
			<div className='fixed top-0 right-0'>
				<img
					src={'/images/close.png'}
					alt='close'
					width='30px'
					height='30px'
					className='cursor-pointer'
					onClick={Props.onClick}
				/>
			</div>
			{/* <h2 className='font-semibold text-[24px]'>{content1}</h2> */}
			<p className='text-center text-[20px]'>
				Are you sure you want to end your exam
			</p>
			<div className='flex items-center justify-between w-full'>
				<button
					onClick={Props.onClick}
					className='border py-[14px] px-[45px] rounded-[8px] text-[#E25C5C] border-[#E25C5C]'
				>
					Cancel
				</button>
				<button
					onClick={Props.onPress}
					className='bg-[#0075FF] py-[14px] rounded-[8px] px-[45px] text-white'
				>
					End Exam
				</button>
			</div>
		</div>
	);
};

export default EndModalContent;
