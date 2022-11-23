import React from 'react';
import io from 'socket.io-client';

export const socket = io(process.env.REACT_APP_SOCKET_URL || '', {
	transports: ['websocket'],
});
export const SocketContext = React.createContext({});
