import { createReducer } from '@reduxjs/toolkit';

const initialState = {};

export const allCelebsReducer = createReducer(initialState, {
	ALLCELEBS_REQUEST: (state) => {
		state.loading = true;
	},
	ALLCELEBS_SUCCESS: (state, action) => {
		state.loading = false;
		state.celebs = action.payload;
	},
	ALLCELEBS_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	clearErrors: (state) => {
		state.error = null;
	}
});


export const newCelebReducer = createReducer(initialState, {
	NEWCELEB_REQUEST: (state) => {
		state.loading = true;
	},
	NEWCELEB_SUCCESS: (state, action) => {
		state.loading = false;
		state.success = true;
		state.newceleb = action.payload;
	},
	NEWCELEB_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	NEWCELEB_RESET: (state, action) => {
		state.success = false;
	},
	clearErrors: (state) => {
		state.error = null;
	}
});


export const CelebDetailReducer = createReducer(initialState, {
	CELEBDETAIL_REQUEST: (state) => {
		state.loading = true;
	},
	CELEBDETAIL_SUCCESS: (state, action) => {
		state.loading = false;
		state.celebDetail = action.payload;
	},
	CELEBDETAIL_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	clearErrors: (state) => {
		state.error = null;
	}
});



export const updateCelebReducer = createReducer(initialState, {
	UPDATECELEB_REQUEST: (state) => {
		state.loading = true;
	},
	UPDATECELEB_SUCCESS: (state, action) => {
		state.loading = false;
		state.isUpdated = action.payload;
	},
	UPDATECELEB_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	UPDATECELEB_RESET: (state) => {
		state.isUpdated = false;
	},

	DELETECELEB_REQUEST: (state) => {
		state.loading = true;
	},
	DELETECELEB_SUCCESS: (state, action) => {
		state.loading = false;
		state.isDeleted = action.payload;
	},
	DELETECELEB_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	DELETECELEB_RESET: (state) => {
		state.isDeleted = false;
	},

	clearErrors: (state) => {
		state.error = null;
	}
});
