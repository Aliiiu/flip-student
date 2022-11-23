import { entity, persistence } from 'simpler-state';

interface IAuthUser {
	[x: string]: any;
}

// interface UserType {
// 	assessment: { [x: string]: any };
// 	assessment_code: string;
// 	assessment_status: string;
// 	token: string;
// 	student: { [x: string]: any };
// }
const initialState = { authUser: {} as IAuthUser };

export const auth = entity(initialState, [persistence('AuthUser')]);

export const setAuthUser = (payload = {}) =>
	auth.set((value) => ({ ...value, authUser: payload }));

export const resetAuthUser = () => setAuthUser();

// export const isLoggedIn = () => {
//     const token = localStorage.getItem('kq_dfe');
//     if (token) {
//       const decoded = jwtDecode(token);
//       const currentTime = Date.now() / 1000000000;
//       if (decoded.exp < currentTime) {
//         return false;
//       } else {
//         setAuthToHeader(token);
//         return decoded;
//       }
//     } else {
//       return false;
//     }
//   };

//   export const setCurrentUser = () => (dispatch) => {
//     const decoded = isLoggedIn();
//     if (decoded) {
//       adminService
//         .get('auth/me')
//         .then((res) => {
//           dispatch(setUser(res.data));
//           dispatch(setIsAuthenticated(true));
//           dispatch(appNotLoading());
//         })
//         .catch(() => {
//           dispatch(logoutUser());
//         });
//     } else {
//       dispatch(logoutUser());
//     }
//   };
