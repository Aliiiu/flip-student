import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from 'src/utils/AuthUtils';

interface Props {
	children: any;
}

export const PrivateRoute: React.FC<Props> = ({ children }) => {
	if (!isLoggedIn()) {
		return <Navigate to='/' replace />;
	}

	return children || null;
};

export default PrivateRoute;
