import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
export const PublicRoute = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = localStorage.getItem('crud_token');
	return token ? (
		<Navigate to="/" />
	) : (
		<Outlet
			context={{
				dispatch: dispatch,
				navigate: navigate,
				Spin: Spin,
				useSelector: useSelector,
			}}
		/>
	);
};
