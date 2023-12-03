import React from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Card, Button, Form, Input, message } from 'antd';
import { useOutletContext } from 'react-router-dom';
import {
	status,
	errorMessage,
	createPostRequest,
	getPostByIdRequest,
	currentPost,
	setValidId,
	validId as vId,
	deletePostRequest,
	updatePostRequest,
	setCurrentPost,
} from '../../../redux/slices';
export const Post = () => {
	let { id } = useParams();
	const [form] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage();
	const { dispatch, useSelector } = useOutletContext();
	const type = useSelector(status);
	const content = useSelector(errorMessage);
	const post = useSelector(currentPost);
	const validId = useSelector(vId);
	const onFinish = (values) => {
		if (id && validId) {
			dispatch(updatePostRequest(id, values));
		} else {
			dispatch(createPostRequest(values));
		}
	};
	const onDelete = () => dispatch(deletePostRequest(id));
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
		return () => {
			dispatch(setCurrentPost({}));
		};
	}, [content, dispatch, messageApi, type]);
	React.useEffect(() => {
		if (id) {
			dispatch(setValidId(true));
			dispatch(getPostByIdRequest(id));
		}
	}, [dispatch, id]);
	React.useEffect(() => {
		if (post) {
			Object.keys(post || {})?.forEach((key) => {
				form.setFieldValue(key, post[key]);
			});
		}
	}, [form, post]);

	return (
		<Flex
			gap={'large'}
			justify="center"
			align="start"
		>
			{contextHolder}
			<Card
				title="Create Post"
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
							label="Body"
							name="body"
							rules={[
								{
									required: true,
									message: 'Please input your name!',
								},
							]}
						>
							<Input.TextArea />
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
								{id && validId ? 'Update' : 'Create'}
							</Button>
						</Form.Item>
					</Form>
				</Flex>
			</Card>
			{id && validId && (
				<Card
					title="Delete Post"
					style={{
						width: 300,
					}}
				>
					<Flex align="center">
						<Button onClick={onDelete}>Delete</Button>
					</Flex>
				</Card>
			)}
		</Flex>
	);
};
