import { Link } from 'react-router-dom';

interface THeader {
	isAuthenticated: Boolean;
	onLogout?: any;
}
const Header = () => {
	return (
		<header className='px-[123px] header_shadow py-[15px] bg-white'>
			<div className='flex items-center justify-between'>
				<h4 className='text-[24px] text-[#0075FF] font-bold'>
					Our Savior International School
				</h4>
				<div>
					<Link to={'/'}>
						<img
							src={'/images/logo.png'}
							className='relative h-[53px] w-[105px]'
							alt='Flip logo'
						/>
					</Link>
				</div>
{/* 
				<button
						className='bg-[#E25C5C] font-bold flex items-center text-white text-center text-[20px] px-[28px] py-[14px] rounded-[8px]'
					>
						<img
							src={'/images/logout_icon.png'}
							alt='logout icon'
							width={29}
							height={25}
						/>
						Log Out
					</button> */}
			</div>
		</header>
	);
};

export default Header;
