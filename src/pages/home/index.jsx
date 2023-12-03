import React from 'react';
import { Flex, Card } from 'antd';
import { Link, useOutletContext } from 'react-router-dom';
import { Space, Table, message } from 'antd';
import {
	getAllUserPostRequest,
	posts,
	status,
	errorMessage,
	loading,
} from '../../redux/slices';

export const Home = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const { dispatch, useSelector } = useOutletContext();
	const data = useSelector(posts);
	const busy = useSelector(loading);
	const type = useSelector(status);
	const content = useSelector(errorMessage);
	React.useEffect(() => {
		dispatch(getAllUserPostRequest());
	}, [dispatch]);
	React.useEffect(() => {
		if (content)
			messageApi.open({
				type,
				content,
			});
	}, [content, messageApi, type]);
	const columns = [
		{
			title: 'Body',
			dataIndex: 'body',
			key: 'body',
			render: (text) => <>{text}</>,
		},
		{
			title: 'Created',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (text) => <>{text?.split('T')[0]}</>,
		},

		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Link to={`/post/${record._id}`}>View {record.name}</Link>
				</Space>
			),
		},
	];
	return (
		<Flex
			style={{ width: '100%', height: '100%' }}
			justify="center"
			align="start"
		>
			{contextHolder}
			<Card
				title="User posts"
				extra={<Link to="/post">Create Post</Link>}
				bordered={true}
				style={{
					backgroundColor: 'white',
					width: '80%',
				}}
			>
				<Table
					columns={columns}
					dataSource={data}
					loading={busy}
				/>
			</Card>
		</Flex>
	);
};

export * from './user';
export * from './post';
