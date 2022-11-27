import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from 'src/store/auth';
import Header from '../Header';
import { useAppSelector } from 'src/hook/useToolkit';

interface DArray {
	label: string;
	value: string;
}

const EndExam = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { authUser } = auth.use();
	const { questions } = useAppSelector((state) => state.questions);
	const data: DArray[] = [
		{
			label: 'name',
			value: authUser?.student?.name || '',
		},
		{
			label: 'Student ID',
			value: authUser?.student?.student_id || '',
		},
		{
			label: 'Class',
			value: authUser?.student?.class_name || '',
		},
		{
			label: 'Department',
			value: authUser?.student?.department || '',
		},
		{
			label: 'Subject',
			value: authUser?.assessment?.subject || '',
		},
		{
			label: 'Exam ID',
			value: authUser?.assessment?.code || '',
		},
		{
			label: 'Exam Duration',
			value: authUser?.assessment?.obj_time || '',
		},
		{
			label: 'Total Number of Questions',
			value: authUser?.assessment?.total_questions || '',
		},
		{
			label: 'Attempted Questions',
			value: questions.filter((item) => item.candidate_answer !== '').length,
		},
		{
			label: 'Assessment Status',
			value: 'Complete',
		},
	];

	return (
		<div>
			<div className=''>
				<Header />
			</div>
			<div className='container'>
				<div className='pl-[255px] pt-[83px] pb-[213px] pr-[123px]'>
					<div>
						<img
							src={'/images/user1.png'}
							alt='studentID'
							width={203}
							height={203}
						/>
						<div className='mt-[50px] grid gap-y-[50px] gap-x-[100px] grid-cols-3'>
							{data.map((item, idx) => (
								<div key={idx}>
									<h3 className='text-base capitalize font-semibold'>
										{item.label}
									</h3>
									<p className='text-lg'>{item.value}</p>
								</div>
							))}
						</div>
						<div className='mt-[85px] flex justify-end'>
							<div className='w-[80%] flex justify-between'>
								<Link
									to={'/'}
									className='text-white text-center rounded-lg text-lg w-[40%] py-3 bg-[#0075FF]'
								>
									End Exam
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EndExam;
