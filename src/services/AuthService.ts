import studentServiceApi from 'src/utils/studentServiceApi';

export const AuthService = {
  studentLogin: async (data: {}) => {
    return studentServiceApi().post('/v1/auth/student/login', data);
  },
};

export default AuthService;
