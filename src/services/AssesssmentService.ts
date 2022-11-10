import studentServiceApi from 'src/utils/studentServiceApi';

export const QuestionService = {
	getQuestion: async (data: {}) => {
		return studentServiceApi().post('/v1/auth/student/question', data);
	},
	saveQuestion: async (data: {}) => {
		return studentServiceApi().post('/v1/auth/student/option', data);
	},
	endExam: async () => {
		return studentServiceApi().post('/v1/auth/student/end');
	},
};

export default QuestionService;
