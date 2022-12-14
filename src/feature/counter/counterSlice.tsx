import { createSlice } from '@reduxjs/toolkit';

interface QuestionSummary {
	candidate_answer: string;
	selectedOption: string;
	question: string;
	question_image: string;
	options: [];
	question_no: string;
	type: string;
	_id: string;
	revise_later: boolean;
	reviseOption: boolean;
}
export interface CounterState {
	questions: QuestionSummary[];
}

let initialState: CounterState = {
	questions: [],
};

export const counterSlice = createSlice({
	name: 'questions',
	initialState,
	reducers: {
		questionAnswered: (state: CounterState, { payload }) => {
			// state.questions = [...state.questions, payload];
			// const questionId = state.questions.findIndex(
			// 	(q: QuestionSummary) => q._id === payload.questions._id
			// );
			// console.log(payload);
			const questionIndex = payload.data.question_index;
			const currentState: QuestionSummary[] = [...state.questions];
			currentState[questionIndex] = {
				...payload.questions,
				selectedOption: payload.data.option,
			};
			// console.log(currentState);
			state.questions = currentState;
			// console.log(currentState);
		},
		revision: (state: CounterState, { payload }) => {
			// const currentState = JSON.parse(JSON.stringify(current(state)));
			// const questionIndex = currentState.questions.findIndex(
			// 	(q: any) => q.id === payload.id
			// );
			// currentState.questions[questionIndex] = payload;

			// console.log(typeof questionIndex);
			// const questionIndex = state.questions.findIndex(
			// 	(q: QuestionSummary) => q._id === payload._id
			// );
			// console.log(payload);
			const questionIndex = payload.index;
			const currentState: QuestionSummary[] = [...state.questions];
			currentState[questionIndex] = {
				...payload.questions,
				reviseOption: payload.revise_option,
			};
			// console.log(currentState[questionIndex]);
			state.questions = currentState;
			// state.questions = [...state.questions, ...currentState.questions];
		},
		loadDefaultQuestionState: (state: CounterState, { payload }) => {
			state.questions = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { questionAnswered, revision, loadDefaultQuestionState } =
	counterSlice.actions;

export default counterSlice.reducer;
