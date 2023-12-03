import { createSlice } from '@reduxjs/toolkit';
import { deleteUser, login, signUp, updateProfile } from '../../api';

const initialState = {
	loading: false,
	status: 'idle',
	errorMessage: '',
	currentUser: {},
	isUserAuthenticated: false,
	userToken: '',
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		startLoading: (state) => {
			state.loading = true;
		},
		stopLoading: (state) => {
			state.loading = false;
		},
		requestFailed: (state, action) => {
			state.status = 'error';
			state.errorMessage = action.payload;
		},
		requestSucceeded: (state) => {
			state.status = 'success';
		},
		refreshApiStates: (state) => {
			state.loading = false;
			state.status = 'idle';
			state.errorMessage = '';
		},
		setCurrentUser: (state, action) => {
			state.currentUser = action.payload;
			localStorage.setItem('user', JSON.stringify(action.payload));
		},
		setUserToken: (state, action) => {
			state.userToken = action.payload;
			state.isUserAuthenticated = true;
			localStorage.setItem('crud_token', state.userToken);
		},
	},
});

export const {
	startLoading,
	stopLoading,
	setUserToken,
	setCurrentUser,
	refreshApiStates,
	requestSucceeded,
	requestFailed,
} = appSlice.actions;

export const loading = (state) => state.app.loading;
export const token = (state) => state.app.userToken;
export const currentUser = (state) => state.app.currentUser;
export const errorMessage = (state) => state.app.errorMessage;
export const status = (state) => state.app.status;

export const loginRequest =
	({ email, password, navigate, messageApi }) =>
	async (dispatch, getState) => {
		dispatch(startLoading());
		try {
			const res = await login({ email, password });
			dispatch(setUserToken(res.data.token));
			dispatch(setCurrentUser(res.data.user));
			dispatch(requestSucceeded());
			navigate('/');
		} catch (err) {
			dispatch(requestFailed(err.response.data.meta.message));
		}
		dispatch(stopLoading());
		setTimeout(() => {
			dispatch(refreshApiStates());
		}, 1000);
	};
export const signUpRequest = (body) => async (dispatch, getState) => {
	const { navigate } = body;
	dispatch(startLoading());
	try {
		await signUp(body);
		dispatch(requestSucceeded());
		navigate('/auth/login');
	} catch (err) {
		const message = err.response.data.meta.message;
		dispatch(requestFailed(message));
	}
	dispatch(stopLoading());
	setTimeout(() => {
		dispatch(refreshApiStates());
	}, 1000);
};
export const updateProfileRequest = (body) => async (dispatch, getState) => {
	dispatch(startLoading());
	try {
		const state = getState();
		const data = await updateProfile(state.app.currentUser._id, body);
		dispatch(setCurrentUser(data.data));
		dispatch(requestSucceeded());
	} catch (err) {
		const message = err.response.data.meta.message;
		dispatch(requestFailed(message));
	}
	dispatch(stopLoading());
	setTimeout(() => {
		dispatch(refreshApiStates());
	}, 1000);
};
export const deleteUserRequest = (body) => async (dispatch, getState) => {
	dispatch(startLoading());
	try {
		const state = getState();
		await deleteUser(state.app.currentUser._id);
		dispatch(requestSucceeded());
	} catch (err) {
		const message = err.response.data.meta.message;
		dispatch(requestFailed(message));
	}
	dispatch(stopLoading());
	setTimeout(() => {
		dispatch(refreshApiStates());
	}, 1000);
};
