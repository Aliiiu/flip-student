import adminServiceApi from 'src/utils/adminServiceApi';
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
	reviseLater: async (id: string, data: {}) => {
		return studentServiceApi().post(`/v1/revise_question/${id}`, data);
	},
	schoolDetails: async () => {
		return adminServiceApi().get('/v1/school-details');
	},
};

export default QuestionService;
