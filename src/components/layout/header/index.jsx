import React from 'react';
import { Flex } from 'antd';
import { currentUser } from '../../../redux/slices';
import { Link, useOutletContext } from 'react-router-dom';
export const Header = ({ children }) => {
	const { useSelector } = useOutletContext();
	const user = useSelector(currentUser);
	return (
		<Flex
			style={{
				width: '100wh',
				height: '100vh',
				backgroundColor: '#fafafa',
				padding: '10px',
			}}
			vertical={true}
			gap={'middle'}
		>
			<Flex
				style={{
					width: '100%',
					height: '10%',
					backgroundColor: 'white',
				}}
				align="center"
				justify="space-between"
			>
				<Link to={'/'}>Welcome Back {user.name}</Link>
				<div>
					<Flex
						align="center"
						gap={'middle'}
					>
						<Link to={'/user'}>See Profile</Link>
						<Link
							to={'/auth/login'}
							onClick={() => localStorage.clear()}
						>
							Logout
						</Link>
					</Flex>
				</div>
			</Flex>
			{children}
		</Flex>
	);
};
