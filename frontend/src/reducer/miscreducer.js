import { createReducer } from '@reduxjs/toolkit';

const initialState = {};

export const changeshow = createReducer(initialState, {
	CHANGESHOW_REQUEST: (state) => {
		state.isShow = true;
	},

	CHANGESHOW_RESET: (state, action) => {
		state.isShow = false;
	
	},
	CHANGEADMIN_REQUEST: (state) => {
		state.isAdmin = true;
	},
	
	CHANGEADMIN_RESET: (state, action) => {
		state.isAdmin = false;
	
	}
});