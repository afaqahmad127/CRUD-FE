import { MyAxios } from '../axios';
import { apiConst } from '../../constants';

export const createPost = (body) => {
	return new Promise((resolve, reject) => {
		const data = JSON.stringify(body);

		const config = {
			method: 'post',
			url: `${apiConst.createPost}`,
			headers: {
				Authorization: `Bearer ${localStorage.getItem('crud_token')}`,
				'Content-Type': 'application/json',
			},
			data: data,
		};
		MyAxios(config)
			.then(function (response) {
				resolve(response.data);
			})
			.catch(function (error) {
				reject(error);
			});
	});
};
export const getAllUserPost = () => {
	return new Promise((resolve, reject) => {
		const config = {
			method: 'get',
			url: `${apiConst.getAllUserPost}`,
			headers: {
				Authorization: `Bearer ${localStorage.getItem('crud_token')}`,
				'Content-Type': 'application/json',
			},
		};
		MyAxios(config)
			.then(function (response) {
				resolve(response.data);
			})
			.catch(function (error) {
				reject(error);
			});
	});
};
export const getPostById = (id) => {
	return new Promise((resolve, reject) => {
		const config = {
			method: 'get',
			url: `${apiConst.getPostById}/` + id,
			headers: {
				Authorization: `Bearer ${localStorage.getItem('crud_token')}`,
			},
		};
		MyAxios(config)
			.then(function (response) {
				resolve(response.data);
			})
			.catch(function (error) {
				reject(error);
			});
	});
};
export const updatePostById = (id, { body }) => {
	return new Promise((resolve, reject) => {
		const data = JSON.stringify({
			body,
		});
		const config = {
			method: 'put',
			url: `${apiConst.updatePostById}/` + id,
			headers: {
				Authorization: `Bearer ${localStorage.getItem('crud_token')}`,
				'Content-Type': 'application/json',
			},
			data,
		};
		MyAxios(config)
			.then(function (response) {
				resolve(response.data);
			})
			.catch(function (error) {
				reject(error);
			});
	});
};
export const deletePostById = (id) => {
	return new Promise((resolve, reject) => {
		var config = {
			method: 'delete',
			url: `${apiConst.deletePostById}/` + id,
			headers: {
				Authorization: `Bearer ${localStorage.getItem('crud_token')}`,
			},
		};
		MyAxios(config)
			.then(function (response) {
				resolve(response.data);
			})
			.catch(function (error) {
				reject(error);
			});
	});
};
