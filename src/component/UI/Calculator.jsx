import { useReducer } from 'react';
import DigitBtn from './DigitBtn';
import OperationBtn from './OperationBtn';

export const ACTIONS = {
	ADD_DIGIT: 'add-digit',
	CHOOSE_OPERATION: 'choose-operation',
	CLEAR: 'clear',
	DELETE_DIGIT: 'delete-digit',
	EVALUATE: 'evaluate',
};

function reducer(state, { type, payload }) {
	switch (type) {
		case ACTIONS.ADD_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					currentOperand: payload.digit,
					overwrite: false,
				};
			}
			if (payload.digit === '0' && state.currentOperand === '0') {
				return state;
			}
			if (payload.digit === '.' && state.currentOperand.includes('.')) {
				return state;
			}

			return {
				...state,
				currentOperand: `${state.currentOperand || ''}${payload.digit}`,
			};
		case ACTIONS.CHOOSE_OPERATION:
			if (state.currentOperand == null && state.previousOperand == null) {
				return state;
			}

			if (state.currentOperand == null) {
				return {
					...state,
					operation: payload.operation,
				};
			}

			if (state.previousOperand == null) {
				return {
					...state,
					operation: payload.operation,
					previousOperand: state.currentOperand,
					currentOperand: null,
				};
			}

			return {
				...state,
				previousOperand: evaluate(state),
				operation: payload.operation,
				currentOperand: null,
			};
		case ACTIONS.CLEAR:
			return {};
		case ACTIONS.DELETE_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					overwrite: false,
					currentOperand: null,
				};
			}
			if (state.currentOperand == null) return state;
			if (state.currentOperand.length === 1) {
				return { ...state, currentOperand: null };
			}

			return {
				...state,
				currentOperand: state.currentOperand.slice(0, -1),
			};
		case ACTIONS.EVALUATE:
			if (
				state.operation == null ||
				state.currentOperand == null ||
				state.previousOperand == null
			) {
				return state;
			}

			return {
				...state,
				overwrite: true,
				previousOperand: null,
				operation: null,
				currentOperand: evaluate(state),
			};
		default:
			return state;
	}
}

function evaluate({ currentOperand, previousOperand, operation }) {
	const prev = parseFloat(previousOperand);
	const current = parseFloat(currentOperand);
	if (isNaN(prev) || isNaN(current)) return '';
	let computation = '';
	switch (operation) {
		case '+':
			computation = prev + current;
			break;
		case '-':
			computation = prev - current;
			break;
		case '*':
			computation = prev * current;
			break;
		case '/':
			computation = prev / current;
			break;
		default:
			return '';
	}

	return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
	maximumFractionDigits: 0,
});
function formatOperand(operand) {
	if (operand == null) return;
	const [integer, decimal] = operand.split('.');
	if (decimal == null) return INTEGER_FORMATTER.format(integer);
	return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function CalculatorApp() {
	const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
		reducer,
		{}
	);

	return (
		<div className=' w-full rounded-lg overflow-hidden'>
			<div className='output w-full'>
				<div className='prev-operand text-[30px] text-[#0075FF]'>
					{formatOperand(previousOperand)} {operation}
				</div>
				<div className='curr-operand text-[60px] text-[#0075FF]'>
					{formatOperand(currentOperand)}
				</div>
			</div>
			<div className='calculator-grid'>
				<button
					onClick={() => dispatch({ type: 'clear' })}
					className='text-white text-[35px] bg-[#0075FF] span-row'
				>
					C
				</button>
				{/* <OperationBtn operation='%' dispatch={dispatch} /> */}
				<OperationBtn operation='/' dispatch={dispatch} />
				<OperationBtn operation='*' dispatch={dispatch} />
				<DigitBtn digit='7' dispatch={dispatch} />
				<DigitBtn digit='8' dispatch={dispatch} />
				<DigitBtn digit='9' dispatch={dispatch} />
				<OperationBtn operation='-' dispatch={dispatch} />
				<DigitBtn digit='4' dispatch={dispatch} />
				<DigitBtn digit='5' dispatch={dispatch} />
				<DigitBtn digit='6' dispatch={dispatch} />
				<OperationBtn operation='+' dispatch={dispatch} />
				<DigitBtn digit='1' dispatch={dispatch} />
				<DigitBtn digit='2' dispatch={dispatch} />
				<DigitBtn digit='3' dispatch={dispatch} />
				{/* <OperationBtn operation='=' classes='span-two' dispatch={dispatch} /> */}
				<button
					className='text-white text-[35px] flex justify-center items-center bg-[#0075FF] span-two'
					onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
				>
					=
				</button>
				<DigitBtn digit='0' dispatch={dispatch} />
				<DigitBtn digit='.' dispatch={dispatch} />
				<button
					onClick={() => dispatch({ type: 'delete-digit' })}
					className='text-white text-[35px] flex justify-center items-center bg-[#0075FF]'
				>
					<img src='/images/cancel.png' alt='' width={'30px'} />
				</button>
			</div>
		</div>
	);
}

export default CalculatorApp;
