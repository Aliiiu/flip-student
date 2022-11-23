// import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../feature/counter/counterSlice';
// import { persistReducer } from 'reduxjs-toolkit-persist';
// import storage from 'reduxjs-toolkit-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
};

// const reducer = combineReducers({
// 	counter: counterReducer,
// });

const persistedReducer = persistReducer(persistConfig, counterReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
		});
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
