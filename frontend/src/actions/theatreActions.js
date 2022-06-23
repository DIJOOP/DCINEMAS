import axios from 'axios';

import {
	ALLTHEATRES_FAIL,
	ALLTHEATRES_REQUEST,
	ALLTHEATRES_SUCCESS,
	DELETETHEATRE_FAIL,
	DELETETHEATRE_REQUEST,
	DELETETHEATRE_SUCCESS,
	NEWTHEATRE_FAIL,
	NEWTHEATRE_REQUEST,
	NEWTHEATRE_SUCCESS,
	THEATREDETAIL_FAIL,
	THEATREDETAIL_REQUEST,
	THEATREDETAIL_SUCCESS,
	THEATRES_FAIL,
	THEATRES_REQUEST,
	THEATRES_SUCCESS,
	UPDATETHEATRE_FAIL,
	UPDATETHEATRE_REQUEST,
	UPDATETHEATRE_SUCCESS
} from '../constants/theatreConstants';

export const getAllTheatres = () => async (dispatch) => {
	try {
		dispatch({
			type: ALLTHEATRES_REQUEST
		});

		const { data } = await axios.get('/api/v1/admin/alltheatre');

		dispatch({
			type: ALLTHEATRES_SUCCESS,
			payload: data.theatres
		});
	} catch (error) {
		dispatch({
			type: ALLTHEATRES_FAIL,
			payload: error.response.data.message
		});
	}
};

export const createNewTheatre = (theatreData) => async (dispatch) => {
	try {
		dispatch({
			type: NEWTHEATRE_REQUEST
		});

		console.log(theatreData);
		const config = { headers: { 'Content-Type': 'application/json' } };
		const { data } = await axios.post(`/api/v1/admin/newtheatre`, theatreData, config);
		dispatch({
			type: NEWTHEATRE_SUCCESS,
			payload: data.theatre
		});
	} catch (error) {
		dispatch({
			type: NEWTHEATRE_FAIL,
			payload: error.response.data.message
		});
	}
};

export const getTheatreDetail = (id) => async (dispatch) => {
	try {
		dispatch({
			type: THEATREDETAIL_REQUEST
		});

		const { data } = await axios.get(`/api/v1/admin/theatre/${id}`);

		dispatch({
			type: THEATREDETAIL_SUCCESS,
			payload: data.theatre
		});
	} catch (error) {
		dispatch({
			type: THEATREDETAIL_FAIL,
			payload: error.response.data.message
		});
	}
};

export const updateTheatrebyAdmin = (id, theatreData) => async (dispatch) => {
	try {
		dispatch({
			type: UPDATETHEATRE_REQUEST
		});

		console.log(theatreData);

		const config = { headers: { 'Content-Type': 'application/json' } };

		const { data } = await axios.put(`/api/v1/admin/theatre/${id}`, theatreData, config);

		dispatch({
			type: UPDATETHEATRE_SUCCESS,
			payload: data.success
		});
	} catch (error) {
		dispatch({
			type: UPDATETHEATRE_FAIL,
			payload: error.response.data.message
		});
	}
};

export const deleteTheatrebyAdmin = (id) => async (dispatch) => {
	try {
		dispatch({
			type: DELETETHEATRE_REQUEST
		});

		const { data } = await axios.delete(`/api/v1/admin/theatre/${id}`);

		dispatch({
			type: DELETETHEATRE_SUCCESS,
			payload: data.success
		});
	} catch (error) {
		dispatch({
			type: DELETETHEATRE_FAIL,
			payload: error.response.data.message
		});
	}
};

export const getTheatres = (district, id) => async (dispatch) => {
	try {
		dispatch({
			type: THEATRES_REQUEST
		});
		let link = `/api/v1/theatres?district=${district}`;
		if (id) {
			link = `/api/v1/theatres?district=${district}&id=${id}`;
		}

		const { data } = await axios.get(link);

		dispatch({
			type: THEATRES_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: THEATRES_FAIL,
			payload: error.response.data.message
		});
	}
};

// CLEAR ERROR
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'clearErrors' });
};
