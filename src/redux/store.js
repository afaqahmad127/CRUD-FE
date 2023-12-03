import { configureStore } from '@reduxjs/toolkit';
import { appSlice, homeSlice } from './slices';

export const store = configureStore({
	reducer: {
		[appSlice.name]: appSlice.reducer,
		[homeSlice.name]: homeSlice.reducer,
	},
});
