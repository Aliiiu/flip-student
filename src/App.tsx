import { useState } from 'react';
import Header from './component/Header';
import Login from './component/Login';
import LoginModal from './component/UI/LoginModal';
import VerifyInfo from './component/VerifyInfo';

interface Props {
	message: string;
	src: string;
	alt: string;
	classes: string;
}

function App() {
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
			<div className='container'>
				<Header/>
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
					<Login/>
					</div>
				</div>
				<div><VerifyInfo /></div>
			</main>
		</div>
	);
}

export default App;
