import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';

interface DArray {
	label: string;
	value: string;
}
const data: DArray[] = [
	{
		label: 'name',
		value: 'Olajide Olajide',
	},
	{
		label: 'Student ID',
		value: '1234566',
	},
	{
		label: 'Class',
		value: 'SS3',
	},
	{
		label: 'Department',
		value: 'Science',
	},
	{
		label: 'Subject',
		value: 'Mathematics',
	},
	{
		label: 'Exam ID',
		value: 'Mth112',
	},
	{
		label: 'Exam Duration',
		value: '30 mins',
	},
	{
		label: 'Total Number of Questions',
		value: '50',
	},
	{
		label: 'Attempted Questions',
		value: '45',
	},
	{
		label: 'Assessment Status',
		value: 'Complete',
	},
];
const EndExam = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<div className='container'>
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
									<h3 className='text-[20px]'>{item.label}</h3>
									<p className='text-[32px]'>{item.value}</p>
								</div>
							))}
						</div>
						<div className='mt-[85px] flex justify-end'>
							<div className='w-[80%] flex justify-between'>
								<Link
									to={'/'}
									className='text-white text-center rounded-[8px] text-[20px] w-[50%] py-[14px] bg-[#0075FF]'
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
