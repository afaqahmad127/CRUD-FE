import React from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
export const PrivateRoute = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = localStorage.getItem('crud_token');
	return token ? (
		<Outlet
			context={{
				dispatch: dispatch,
				navigate: navigate,
				Spin: Spin,
				useSelector: useSelector,
			}}
		/>
	) : (
		<Navigate to="/auth/login" />
	);
};
