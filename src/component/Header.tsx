import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from 'src/utils/AuthUtils';

interface THeader {
	isAuthenticated: Boolean;
	onLogout?: any;
}
const Header = () => {
	const location = useLocation();
	let navigate = useNavigate();
	const showLogoutBtn = location.pathname !== '/' ? true : false;
	return (
		<header className='flex justify-center header_shadow py-[15px] lg:px-10 bg-white'>
			<div className='w-full container'>
				<div className='flex items-center justify-between'>
					<h4 className='text-xl text-[#0075FF] font-bold'>
						Our Savior International School
					</h4>
					<div>
						<Link to={'/'}>
							<img
								src={'/images/logo.png'}
								className='relative h-[43px] w-[85px]'
								alt='Flip logo'
							/>
						</Link>
					</div>
					{showLogoutBtn && (
						<button
							onClick={() => {
								logout(() => navigate('/'));
							}}
							className='bg-[#E25C5C] font-bold flex items-center text-white text-center text-[20px] px-[28px] py-3 rounded-[8px]'
						>
							<img
								src={'/images/logout_icon.png'}
								alt='logout icon'
								width={29}
								height={25}
							/>
							Log Out
						</button>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
