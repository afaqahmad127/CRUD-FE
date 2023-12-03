import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './private';
import { Forget, Home, Login, Post, SignUp, User } from '../pages';
import { PublicRoute } from './public';
import { Header } from '../components';

export const appRoutes = createBrowserRouter([
	{
		path: '/',
		element: <PrivateRoute />,
		children: [
			{
				path: '/',
				element: (
					<Header>
						<Home />
					</Header>
				),
			},
			{
				path: 'user',
				element: (
					<Header>
						<User />
					</Header>
				),
			},
			{
				path: 'post/:id?',
				element: (
					<Header>
						<Post />
					</Header>
				),
			},
		],
	},
	{
		path: '/auth',
		element: <PublicRoute />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'sign-up',
				element: <SignUp />,
			},
			{
				path: 'forget',
				element: <Forget />,
			},
		],
	},
]);
