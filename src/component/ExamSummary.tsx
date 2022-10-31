import { useState } from 'react';
import Button from './UI/Button';
import ErrorModal from './UI/ErrorModal';
import { auth } from 'src/store/auth';

const ExamSummary = () => {
	const { authUser } = auth.use();

	const [showModal, setShowModal] = useState<boolean | null>(false);
	return (
		<div className='examSummaryCard'>
			<div className='mb-[16px] pr-[20px]'>
				<div className='pb-[16px]'>
					<h4 className='text-[18px] font-semibold capitalize'>{authUser?.assessment?.term} Term Exam {authUser?.assessment?.year}</h4>
					<h6 className='text-[14px]'>{authUser?.assessment?.subject}</h6>
				</div>
				<hr />
				<div className='flex flex-col gap-y-[16px] mt-[16px]'>
					<h5>Test Summary</h5>
					<div className='flex justify-between'>
						<div className='flex gap-x-[10px] items-center'>
							<span className='bg-[#0075FF] h-[14px] rounded-[100%] w-[14px]'></span>{' '}
							<h6 className='text-[14px]'>Attempted</h6>
						</div>{' '}
						<span className='text-[14px]'>16</span>
					</div>
					<div className='flex justify-between'>
						<div className='flex gap-x-[10px] items-center'>
							<span className='bg-[#FFAD4A] h-[14px] rounded-[100%] w-[14px]'></span>{' '}
							<h6 className='text-[14px]'>Revise Later</h6>
						</div>{' '}
						<span className='text-[14px]'>4</span>
					</div>
					<div className='flex justify-between'>
						<div className='flex gap-x-[10px] items-center'>
							<span className='bg-[#C0C0C0] h-[14px] rounded-[100%] w-[14px]'></span>{' '}
							<h6 className='text-[14px]'>Not Attempted</h6>
						</div>{' '}
						<span className='text-[14px]'>32</span>
					</div>
				</div>
				<hr className='mt-[16px]' />
			</div>
			<div>
				<h5>Question List</h5>
				<div className='grid grid-cols-5 gap-y-[10px] mt-[24px] overflow-y-scroll h-[200px] gap-x-[10px]'>
					{Array.from(Array(30).keys()).map((item, idx) => (
						<div
							className='bg-[#0075FF] rounded-[8px] text-[14px] text-white flex justify-center items-center h-[40px] w-[40px]'
							key={idx}
						>
							{item + 1}
						</div>
					))}
				</div>
				<div className='text-center mt-[16px]'>
					{showModal && (
						<ErrorModal
							content2='Are you sure you want to end your exam'
							link='/endExam'
							linkContent='End Exam'
							onClick={() => setShowModal(false)}
						/>
					)}
					<Button onClick={() => setShowModal(true)} classes='text-[#0075FF]'>
						End Exam
					</Button>
					{/* <button className='py-[14px] text-[20px] w-[200px] endExamBtn text-[#0075FF]'>
						End Exam
					</button> */}
				</div>
			</div>
		</div>
	);
};

export default ExamSummary;
