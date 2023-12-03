import React from 'react';
import { Flex, Card, Button, Form, Input, message } from 'antd';
import { useOutletContext } from 'react-router-dom';
import {
	currentUser,
	status,
	errorMessage,
	updateProfileRequest,
	deleteUserRequest,
} from '../../../redux/slices';
export const User = () => {
	const [form] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage();
	const { dispatch, useSelector } = useOutletContext();
	const onFinish = (values) => dispatch(updateProfileRequest(values));
	const onDelete = () => dispatch(deleteUserRequest());
	const user = useSelector(currentUser);
	const type = useSelector(status);
	const content = useSelector(errorMessage);
	React.useEffect(() => {
		if (content)
			messageApi.open({
				type,
				content,
			});
		if (type === 'success') {
			messageApi.open({
				type,
				content: type,
			});
		}
	}, [content, messageApi, type]);

	React.useEffect(() => {
		if (user) {
			Object.keys(user).forEach((key) => {
				form.setFieldValue(key, user[key]);
			});
		}
	}, [form, user]);
	return (
		<Flex
			gap={'large'}
			justify="center"
			align="start"
		>
			{contextHolder}
			<Card
				title="User Profile"
				style={{
					width: 300,
				}}
			>
				<Flex align="center">
					<Form
						form={form}
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
							label="Name"
							name="name"
							rules={[
								{
									required: true,
									message: 'Please input your name!',
								},
							]}
						>
							<Input />
						</Form.Item>
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
							<Input disabled />
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
							<Input.Password disabled />
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
								Update Profile
							</Button>
						</Form.Item>
					</Form>
				</Flex>
			</Card>
			<Card
				title="Delete User"
				style={{
					width: 300,
				}}
			>
				<Flex align="center">
					<Button onClick={onDelete}>Delete</Button>
				</Flex>
			</Card>
		</Flex>
	);
};
