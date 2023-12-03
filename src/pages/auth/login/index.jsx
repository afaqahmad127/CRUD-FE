import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, message, Card } from 'antd';
import { useOutletContext } from 'react-router-dom';
import {
	loginRequest,
	loading,
	status,
	errorMessage,
} from '../../../redux/slices';

export const Login = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const { dispatch, Spin, useSelector, navigate } = useOutletContext();
	const busy = useSelector(loading);
	const type = useSelector(status);
	const content = useSelector(errorMessage);
	const onFinish = (values) => dispatch(loginRequest({ ...values, navigate }));
	React.useEffect(() => {
		if (content)
			messageApi.open({
				type,
				content,
			});
	}, [content, messageApi, type]);

	return (
		<div
			style={{
				height: '100vh',
				width: '100vw',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{contextHolder}
			<Spin spinning={busy}>
				<Card
					title="Welcome back let's Login here"
					style={{
						width: 300,
					}}
				>
					<Form
						name="basic"
						labelCol={{
							span: 8,
						}}
						wrapperCol={{
							span: 16,
						}}
						style={{
							maxWidth: 600,
						}}
						onFinish={onFinish}
						autoComplete="off"
					>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{
									required: true,
									message: 'Please input your email!',
								},
								{
									type: 'email',
									message: 'Please enter valid email!',
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item
							name="alreadyHaveAccount"
							wrapperCol={{
								offset: 8,
								span: 24,
							}}
						>
							Don't you have an account?
							<Link to="/auth/sign-up"> SignUp here.</Link>
						</Form.Item>

						<Form.Item
							wrapperCol={{
								offset: 8,
								span: 16,
							}}
						>
							<Button
								type="primary"
								htmlType="submit"
							>
								Login
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Spin>
		</div>
	);
};
