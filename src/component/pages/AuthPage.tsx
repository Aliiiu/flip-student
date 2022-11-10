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
		<div>
			<div className=''>
				<Header />
			</div>
			{error && (
				<LoginModal
					message={modalMessage.message}
					alt={modalMessage.alt}
					src={modalMessage.src}
					classes={modalMessage.classes}
					onClick={closeModalHandler}
				/>
			)}
			<main>
				<div className='mainBg'>
					<div className='container'>
						<Login />
					</div>
				</div>
			</main>
		</div>
	);
};

export default AuthPage;
