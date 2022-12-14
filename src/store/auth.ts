import { entity, persistence } from 'simpler-state';

interface IAuthUser {
	[x: string]: any;
}

const initialState = { authUser: {} as IAuthUser };

export const auth = entity(initialState, [persistence('AuthUser')]);

export const setAuthUser = (payload = {}) =>
	auth.set((value) => ({ ...value, authUser: payload }));

export const resetAuthUser = () => setAuthUser();
