import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import QuestionService from 'src/services/AssesssmentService';
import { logout } from 'src/utils/AuthUtils';
import ModalContent from './UI/ModalContent';
import AppModal from './widget/Modal/Modal';

interface THeader {
	isAuthenticated: Boolean;
	onLogout?: any;
}
const Header = () => {
	const location = useLocation();
	const [showModal, setShowModal] = useState<boolean | null>(false);
	let navigate = useNavigate();
	const [schoolName, setSchoolName] = useState('');
	const showLogoutBtn = location.pathname !== '/' ? true : false;

	const getSchoolDetails = () => {
		QuestionService.schoolDetails()
			.then((res) => {
				// console.log(res.data);
				setSchoolName(res.data.payload.data.school_name);
			})
			.catch((err) => console.error(err.response));
	};
	useEffect(() => {
		getSchoolDetails();
	}, []);

	return (
		<header className='flex justify-center header_shadow py-[15px] lg:px-10 bg-white'>
			<AppModal
				open={showModal}
				onClose={() => setShowModal(false)}
				content={
					<ModalContent
						// content1='Verify your Information'
						content2='Are you sure you want to end your exam'
						// link='/'
						btnAction={() => {
							logout(() => navigate('/'));
							sessionStorage.clear();
							localStorage.clear();
						}}
						linkContent='End Exam'
						onClick={() => setShowModal(false)}
					/>
				}
			/>
			<div className='w-full container'>
				<div className='flex items-center justify-between'>
					<h4 className='text-xl text-[#0075FF] font-bold'>
						{schoolName || ''}
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
								// logout(() => navigate('/'));
								setShowModal(true);
							}}
							className='bg-[#E25C5C] font-bold flex items-center text-white text-center px-[28px] py-2 rounded-[8px]'
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
