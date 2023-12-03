import { MyAxios } from '../axios';
import { apiConst } from '../../constants';
export const login = ({ email, password }) => {
	return new Promise((resolve, reject) => {
		const data = JSON.stringify({
			email: email,
			password: password,
		});

		const config = {
			method: 'post',
			url: `${apiConst.authLogin}`,
			headers: {
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
export const signUp = ({ email, password, name }) => {
	return new Promise((resolve, reject) => {
		const data = JSON.stringify({
			name: name,
			email: email,
			password: password,
		});

		var config = {
			method: 'post',
			url: `${apiConst.authSignUp}`,
			headers: {
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
export const updateProfile = (id, body) => {
	return new Promise((resolve, reject) => {
		const { name } = body;
		const data = JSON.stringify({
			name,
		});
		const config = {
			method: 'put',
			url: `${apiConst.updateUser}/` + id,
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
export const deleteUser = (id) => {
	return new Promise((resolve, reject) => {
		const config = {
			method: 'delete',
			url: `${apiConst.deleteUser}/` + id,
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
