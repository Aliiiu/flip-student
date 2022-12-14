import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from 'src/component/pages/AuthPage';
import EndExam from 'src/component/pages/EndExam';
import Exam from 'src/component/pages/Exam';
import VerifyInfo from 'src/component/pages/VerifyInfo';
import PrivateRoute from './PrivateRoute';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<AuthPage />} />
			<Route
				path='/verify-info'
				element={
					<PrivateRoute>
						<VerifyInfo />
					</PrivateRoute>
				}
			/>
			<Route
				path='/exam'
				element={
					<PrivateRoute>
						<Exam />
					</PrivateRoute>
				}
			/>
			<Route
				path='/endExam'
				element={
					<>
						<EndExam />
					</>
				}
			/>
		</Routes>
	);
};

export default Router;
