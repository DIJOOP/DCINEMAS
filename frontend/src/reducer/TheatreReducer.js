import { createReducer } from '@reduxjs/toolkit';

const initialState = {};

export const allTheatresReducer = createReducer(initialState, {
	ALLTHEATRES_REQUEST: (state) => {
		state.loading = true;
	},
	ALLTHEATRES_SUCCESS: (state, action) => {
		state.loading = false;
		state.theatres = action.payload;
	},
	ALLTHEATRES_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	clearErrors: (state) => {
		state.error = null;
	}
});

export const newTheatreReducer = createReducer(initialState, {
	NEWTHEATRE_REQUEST: (state) => {
		state.loading = true;
	},
	NEWTHEATRE_SUCCESS: (state, action) => {
		state.loading = false;
		state.success = true;
		state.Theatre = action.payload;
	},
	NEWTHEATRE_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	NEWTHEATRE_RESET: (state, action) => {
		state.success = false;
	},
	clearErrors: (state) => {
		state.error = null;
	}
});

export const TheatreDetailReducer = createReducer(initialState, {
	THEATREDETAIL_REQUEST: (state) => {
		state.loading = true;
	},
	THEATREDETAIL_SUCCESS: (state, action) => {
		state.loading = false;
		state.theatre = action.payload;
	},
	THEATREDETAIL_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	clearErrors: (state) => {
		state.error = null;
	}
});

export const updateTheatreReducer = createReducer(initialState, {
	UPDATETHEATRE_REQUEST: (state) => {
		state.loading = true;
	},
	UPDATETHEATRE_SUCCESS: (state, action) => {
		state.loading = false;
		state.isUpdated = action.payload;
	},
	UPDATETHEATRE_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	UPDATETHEATRE_RESET: (state) => {
		state.isUpdated = false;
	},

	DELETETHEATRE_REQUEST: (state) => {
		state.loading = true;
	},
	DELETETHEATRE_SUCCESS: (state, action) => {
		state.loading = false;
		state.isDeleted = action.payload;
	},
	DELETETHEATRE_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	DELETETHEATRE_RESET: (state) => {
		state.isDeleted = false;
	},

	clearErrors: (state) => {
		state.error = null;
	}
});

export const TheatrestReducer = createReducer(initialState, {
	THEATRES_REQUEST: (state) => {
		state.loading = true;
	},

	THEATRES_SUCCESS: (state, action) => {
		state.loading = false;
		state.theatres = action.payload.theatres
		  state.location = action.payload.location;
		//   state.resultPerPage = action.payload.resultPerPage;
		//   state.filteredProductCount = action.payload.filteredProductCount;
	},
	THEATRES_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	clearErrors: (state) => {
		state.error = null;
	}
});
