import { Link } from 'react-router-dom';

const ModalContent: React.FC<{
	onClick: () => void;
	content1?: string;
	content2?: string;
	link: string;
	linkContent: string;
}> = ({ onClick, content1, content2, link, linkContent }) => {
	return (
		<div className='flex bg-white flex-col items-center gap-y-[24px] verify_modal_card'>
			<div className='fixed right-0 top-0'>
				<img
					src={'/images/close.png'}
					alt='close'
					width='30px'
					height='30px'
					className='cursor-pointer'
					onClick={onClick}
				/>
			</div>
			<h2 className='font-semibold text-[24px]'>{content1}</h2>
			<p className='text-center text-[20px]'>{content2}</p>
			<div className='flex items-center justify-between w-full'>
				<button
					onClick={onClick}
					className='border py-[14px] px-[45px] rounded-[8px] text-[#E25C5C] border-[#E25C5C]'
				>
					Cancel
				</button>
				<Link
					to={link}
					className='bg-[#0075FF] py-[14px] rounded-[8px] px-[45px] text-white'
				>
					{linkContent}
				</Link>
			</div>
		</div>
	);
};

export default ModalContent;
