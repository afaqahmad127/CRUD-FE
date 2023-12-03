import { createSlice } from '@reduxjs/toolkit';
import {
	refreshApiStates,
	requestFailed,
	requestSucceeded,
	startLoading,
	stopLoading,
} from './app';
import {
	createPost,
	deletePostById,
	getAllUserPost,
	getPostById,
	updatePostById,
} from '../../api';

const initialState = {
	posts: [],
	currentPost: {},
	validId: true,
};

export const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {
		addPosts: (state, action) => {
			if (Array.isArray(action.payload)) {
				state.posts = action.payload;
			} else {
				state.posts.push(action.payload);
			}
		},
		setCurrentPost: (state, action) => {
			state.currentPost = action.payload;
		},
		setValidId: (state, action) => {
			state.validId = action.payload;
		},
		updatePost: (state, action) => {
			const data = action.payload;
			state.posts = state.posts.map((i) => {
				if (i?._id === data?._id) {
					i = data;
				}
				return i;
			});
		},
	},
});

export const posts = (state) => state.home.posts;
export const currentPost = (state) => state.home.currentPost;
export const validId = (state) => state.home.validId;
export const { addPosts, updatePost, setCurrentPost, setValidId } =
	homeSlice.actions;

export const createPostRequest = (body) => async (dispatch, getState) => {
	dispatch(startLoading());
	try {
		const res = await createPost({
			...body,
			userId: getState().app.currentUser._id,
		});
		dispatch(requestSucceeded());
		dispatch(addPosts(res.data));
	} catch (err) {
		const message = err.response.data.meta.message;
		dispatch(requestFailed(message));
	}
	dispatch(stopLoading());
	setTimeout(() => {
		dispatch(refreshApiStates());
	}, 1000);
};
export const getAllUserPostRequest = (body) => async (dispatch, getState) => {
	dispatch(startLoading());
	try {
		const res = await getAllUserPost();
		dispatch(requestSucceeded());
		dispatch(addPosts(res.data.posts));
	} catch (err) {
		const message = err.response.data.meta.message;
		dispatch(requestFailed(message));
	}
	dispatch(stopLoading());
	setTimeout(() => {
		dispatch(refreshApiStates());
	}, 1000);
};
export const getPostByIdRequest = (id) => async (dispatch, getState) => {
	dispatch(startLoading());
	try {
		const res = await getPostById(id);
		dispatch(setCurrentPost(res.data));
		dispatch(requestSucceeded());
	} catch (err) {
		const { message, status } = err.response.data.meta;
		if (status === 400) {
			dispatch(setValidId(false));
		}
		dispatch(requestFailed(message));
	}
	dispatch(stopLoading());
	setTimeout(() => {
		dispatch(refreshApiStates());
	}, 1000);
};
export const deletePostRequest = (id) => async (dispatch, getState) => {
	dispatch(startLoading());
	try {
		await deletePostById(id);
		dispatch(requestSucceeded());
	} catch (err) {
		const { message, status } = err.response.data.meta;
		if (status === 400) {
			dispatch(setValidId(false));
		}
		dispatch(requestFailed(message));
	}
	dispatch(stopLoading());
	setTimeout(() => {
		dispatch(refreshApiStates());
	}, 1000);
};
export const updatePostRequest = (id, body) => async (dispatch, getState) => {
	dispatch(startLoading());
	try {
		await updatePostById(id, body);
		dispatch(requestSucceeded());
	} catch (err) {
		const { message, status } = err.response.data.meta;
		if (status === 400) {
			dispatch(setValidId(false));
		}
		dispatch(requestFailed(message));
	}
	dispatch(stopLoading());
	setTimeout(() => {
		dispatch(refreshApiStates());
	}, 1000);
};
