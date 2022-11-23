import { ReactNode } from 'react';

type Props = {
	classes?: string;
	onClick?: () => void;
	dataIndex?: number;
	children: ReactNode;
	disabled?: boolean;
};
const Button = ({ classes, children, onClick, dataIndex, disabled }: Props) => {
	return (
		<button
			disabled={disabled}
			data-index={dataIndex}
			onClick={onClick}
			className={`rounded-lg w-[150px] disabled:cursor-not-allowed ${classes}`}
		>
			{children}
		</button>
	);
};

export default Button;
