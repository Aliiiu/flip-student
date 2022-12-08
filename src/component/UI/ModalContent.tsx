import { Link } from 'react-router-dom';

const ModalContent: React.FC<{
	onClick: () => void;
	content1?: string;
	content2?: string;
	link?: string;
	btnAction?: () => void;
	linkContent: string;
}> = ({ onClick, content1, content2, link, btnAction, linkContent }) => {
	return (
		<div className='flex w-full bg-white flex-col items-center gap-y-[24px] verify_modal_card'>
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
			<h2 className='font-semibold text-2xl'>{content1}</h2>
			<p className='text-center text-lg'>{content2}</p>
			<div className='flex items-center justify-between gap-6 w-full'>
				<button
					onClick={onClick}
					className='border py-2 px-4 flex-1 rounded-[8px] text-white bg-[#E25C5C]'
				>
					Cancel
				</button>
				{link && (
					<Link
						to={link}
						className='bg-[#0075FF] flex-1 py-2 px-4 rounded-[8px] text-white'
					>
						{linkContent}
					</Link>
				)}
				{btnAction && (
					<button
						onClick={btnAction}
						className='border py-2 px-4 flex-1 rounded-[8px] bg-[#0075FF] text-white'
					>
						{linkContent}
					</button>
				)}
			</div>
		</div>
	);
};

export default ModalContent;
