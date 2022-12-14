import React, { useState } from 'react';
import Header from '../Header';
import Login from '../Login';
import LoginModal from '../UI/LoginModal';

interface Props {
	message: string;
	src: string;
	alt: string;
	classes: string;
}
const AuthPage = () => {
	const [error, setError] = useState<Boolean>();

	const [modalMessage, setModalMessage] = useState<Props>({
		message: '',
		src: '',
		alt: '',
		classes: '',
	});

	const closeModalHandler = () => {
		setError(false);
	};
	return (
		<div className='h-screen mainBg'>
			<Header />
			{error && (
				<LoginModal
					message={modalMessage.message}
					alt={modalMessage.alt}
					src={modalMessage.src}
					classes={modalMessage.classes}
					onClick={closeModalHandler}
				/>
			)}
			<main className='flex items-center justify-center h-[93%]'>
				<div className=''>
					<div className=''>
						<Login />
					</div>
				</div>
			</main>
		</div>
	);
};

export default AuthPage;
