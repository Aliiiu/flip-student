import React, { useState } from 'react';
import { BiLock } from 'react-icons/bi';
import { TbUser } from 'react-icons/tb';
import { AuthService } from 'src/services';
import { setAuthToken } from 'src/utils/AuthUtils';
import { useNavigate } from 'react-router-dom';
import { auth, setAuthUser } from 'src/store/auth';
import useLoading from 'src/hook/useLoading';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
	const navigate = useNavigate();
	const [formState, setFormState] = useState({
		studentId: '',
		examId: '',
	});

	const { loading, startLoading, stopLoading } = useLoading();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		const { studentId, examId } = formState;
		const requestData = { student_ref: studentId, assessment_code: examId };

		startLoading();
		AuthService.studentLogin(requestData)
			.then((res: any) => {
				setAuthToken(res?.data?.payload?.data?.token);
				console.log(res?.data?.payload);
				setAuthUser(res?.data?.payload?.data);
				navigate('/verify-info');
			})
			.catch((err: any) => {
				console.log(err?.response?.data?.error?.message);
				toast.error(err?.response?.data?.error?.message);
			})
			.finally(() => {
				stopLoading();
			});
	};
	return (
		<div className=''>
			<ToastContainer />
			<div className='card w-[450px] max-w-[85%] '>
				<h2 className='text-center font-semibold mb-[15px] text-2xl'>
					STUDENT LOGIN
				</h2>
				<form onSubmit={handleSubmit}>
					<div className='flex flex-col'>
						<label htmlFor='studentId' className={`block mb-[5px] text-lg`}>
							Student ID
						</label>
						<div
							className={`flex items-center border border-black rounded-[8px] bg-white`}
						>
							<TbUser className='text-[25px] ml-[24px]' />
							<input
								type='text'
								placeholder='1258464'
								onChange={handleChange}
								value={formState.studentId}
								name='studentId'
								className='placeholder-[#828282] rounded-tr-[8px] rounded-br-[8px] flex-1 py-[12px] px-[12px] outline-none'
							/>
						</div>
					</div>
					<div className='flex flex-col mt-[20px]'>
						<label htmlFor='studentId' className={`block mb-[5px] text-lg`}>
							Exam ID
						</label>
						<div
							className={`flex items-center border  border-black
							} rounded-[8px] bg-white`}
						>
							<BiLock className='text-[25px] ml-[24px]' />
							<input
								type='text'
								placeholder='*********'
								onChange={handleChange}
								value={formState.examId}
								name='examId'
								className='placeholder-[#828282] rounded-tr-[8px] rounded-br-[8px] flex-1 py-[12px] px-[12px] outline-none'
							/>
						</div>
					</div>
					<button
						type='submit'
						disabled={loading}
						className='bg-[#0075FF] text-white text-lg rounded-[8px] py-3 disabled:bg-opacity-30 disabled:cursor-not-allowed mt-[49px] w-full'
					>
						{loading ? <ClipLoader color='#FFF' size={25} /> : 'Login'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
