import { createReducer } from '@reduxjs/toolkit';
const initialState = {};

export const newBookingReducer = createReducer(initialState, {
	NEWBOOKING_REQUEST: (state) => {
		state.loading = true;
	},

	NEWBOOKING_SUCCESS: (state, action) => {
		state.loading = false;
		state.booking = action.payload;
		state.success = true;
	},
	NEWBOOKING_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	NEWBOOKING_RESET: (state, action) => {
		state.success = false;
	},

	clearErrors: (state) => {
		state.error = null;
	}
});

export const myBookingReducer = createReducer(initialState, {
	MYBOOKING_REQUEST: (state) => {
		state.loading = true;
	},

	MYBOOKING_SUCCESS: (state, action) => {
		state.loading = false;
		state.bookings = action.payload;
	},
	MYBOOKING_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},

	clearErrors: (state) => {
		state.error = null;
	}
});

export const AllBookingsReducer = createReducer(initialState, {
	ALLBOOKING_REQUEST: (state) => {
		state.loading = true;
	},

	ALLBOOKING_SUCCESS: (state, action) => {
		state.loading = false;
		state.bookings = action.payload;
	},
	ALLBOOKING_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},

	clearErrors: (state) => {
		state.error = null;
	}
});

export const deleteBookingReducer = createReducer(initialState, {
	DELETEBOOKING_REQUEST: (state) => {
		state.loading = true;
	},
	DELETEBOOKING_SUCCESS: (state, action) => {
		state.loading = false;
		state.isDeleted = action.payload;
	},
	DELETEBOOKING_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	DELETEBOOKING_RESET: (state) => {
		state.isDeleted = false;
	},

	clearErrors: (state) => {
		state.error = null;
	}
});
