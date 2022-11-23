import { entity } from 'simpler-state';
import io from 'socket.io-client';

const socketUrl = process.env.REACT_APP_SOCKET_URL || '';
const socketOptions = {
	autoConnect: true,
};
const DEFAULT_SOCKET = io(socketUrl, socketOptions);
// initial state
const initialState = {
	socket: DEFAULT_SOCKET,
};

// entity
export const websocket = entity(initialState);

// entity updaters
export const setSocket = (payload = DEFAULT_SOCKET) => {
	console.log(payload);
	return websocket.set((value) => ({
		...value,
		socket: payload,
	}));
};
