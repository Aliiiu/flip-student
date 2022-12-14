import { ReactNode } from 'react';

type Props = {
	classes?: string;
	onClick?: () => void;
	onKeyPress?: any;
	dataIndex?: number;
	children: ReactNode;
	disabled?: boolean;
};
const Button = ({
	classes,
	children,
	onClick,
	onKeyPress,
	disabled,
}: Props) => {
	return (
		<button
			disabled={disabled}
			onKeyDown={onKeyPress}
			onClick={onClick}
			className={`rounded-lg w-[150px] disabled:cursor-not-allowed disabled:bg-opacity-70 ${classes}`}
		>
			{children}
		</button>
	);
};

export default Button;
