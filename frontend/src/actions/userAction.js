import axios from 'axios';
import { UPDATETHEATRE_FAIL } from '../constants/theatreConstants';
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOADUSER_REQUEST,
	LOADUSER_SUCCESS,
	LOADUSER_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	ALLUSER_REQUEST,
	ALLUSER_SUCCESS,
	ALLUSER_FAIL,
	DELETEUSER_REQUEST,
	DELETEUSER_SUCCESS,
	DELETEUSER_FAIL,
	USERDETAIL_REQUEST,
	USERDETAIL_SUCCESS,
	USERDETAIL_FAIL,
	UPDATEUSER_REQUEST,
	UPDATEUSER_SUCCESS,
	UPDATEUSER_FAIL,
	USERLOCATION_REQUEST,
	USERLOCATION_SUCCESS,
	USERLOCATION_FAIL
} from '../constants/userConstants';

export const Login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: LOGIN_REQUEST
		});

		const config = { headers: { 'Content-Type': 'application/json' } };
		const { data } = await axios.post(`/api/v1/login`, { email, password }, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: data.user
		});
	} catch (error) {
		console.log(error.response.data.message);
		dispatch({
			type: LOGIN_FAIL,
			payload: error.response.data.message
		});
	}
};

export const LoadUser = () => async (dispatch) => {
	try {
		dispatch({
			type: LOADUSER_REQUEST
		});

		const { data } = await axios.get(`/api/v1/myprofile`);

		dispatch({
			type: LOADUSER_SUCCESS,
			payload: data.user
		});
	} catch (error) {
		console.log(error.response.data.message);
		dispatch({
			type: LOADUSER_FAIL,
			payload: error.response.data.message
		});
	}
};

export const changeUserLocation = (location) => async (dispatch) => {
	try {
		dispatch({
			type: USERLOCATION_REQUEST
		});

		const { data } = await axios.put(`/api/v1/user/location`, location);

		console.log(data);
		dispatch({
			type: USERLOCATION_SUCCESS,
			payload: data.location
		});
	} catch (error) {
		console.log(error.response.data.message);
		dispatch({
			type: USERLOCATION_FAIL,
			payload: error.response.data.message
		});
	}
};

export const Logout = () => async (dispatch) => {
	try {
		await axios.get(`/api/v1/logout`);
		dispatch({
			type: LOGOUT_SUCCESS
		});
	} catch (error) {
		dispatch({
			type: LOGOUT_FAIL,
			payload: error.response.data.message
		});
	}
};

export const Register = (usersData) => async (dispatch) => {
	try {
		dispatch({
			type: REGISTER_REQUEST
		});

		console.log(usersData);
		const config = { headers: { 'Content-Type': 'application/json' } };
		const { data } = await axios.post(`/api/v1/register`, usersData, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: data.user
		});
	} catch (error) {
		console.log(error.response.data.message);
		dispatch({
			type: REGISTER_FAIL,
			payload: error.response.data.message
		});
	}
};


export const updateProfile = (userData) => async (dispatch) => {
	try {
	  dispatch({
		type: UPDATEUSER_REQUEST,
	  });
	  console.log(userData);
	  const config = { headers: { "Content-Type": "application/json" } };
	  const { data } = await axios.put(`/api/v1/updateprofile`, userData, config);
	  dispatch({
		type: UPDATEUSER_SUCCESS,
		payload: data.success,
	  });
	} catch (error) {
	  dispatch({
		type: UPDATETHEATRE_FAIL,
		payload: error.response.data.message,
	  });
	}
  };


  export const updatePassword = (passwords) => async (dispatch) => {
	try {
	  dispatch({
		type: UPDATEUSER_REQUEST,
	  });
  
	  const config = { headers: { "Content-Type": "application/json" } };
	  const { data } = await axios.put(
		`/api/v1/changepassword`,
		passwords,
		config
	  );
	  dispatch({
		type:  UPDATEUSER_SUCCESS,
		payload: data.success,
	  });
	} catch (error) {
	  dispatch({
		type:UPDATEUSER_FAIL,
		payload: error.response.data.message,
	  });
	}
  };
  





// <<==Admin==>//

export const getAllUsers = () => async (dispatch) => {
	try {
		dispatch({
			type: ALLUSER_REQUEST
		});

		const { data } = await axios.get('/api/v1/admin/allusers');

		dispatch({
			type: ALLUSER_SUCCESS,
			payload: data.users
		});
	} catch (error) {
		dispatch({
			type: ALLUSER_FAIL,
			payload: error.response.data.message
		});
	}
};

export const getUserDetail = (id) => async (dispatch) => {
	try {
		dispatch({
			type: USERDETAIL_REQUEST
		});

		const { data } = await axios.get(`/api/v1/admin/user/${id}`);

		dispatch({
			type: USERDETAIL_SUCCESS,
			payload: data.user
		});
	} catch (error) {
		dispatch({
			type: USERDETAIL_FAIL,
			payload: error.response.data.message
		});
	}
};

export const updateUserbyAdmin = (id, userData) => async (dispatch) => {
	try {
		dispatch({
			type: UPDATEUSER_REQUEST
		});

		console.log();
		const config = { headers: { 'Content-Type': 'application/json' } };

		const { data } = await axios.put(`/api/v1/admin/edituser/${id}`, userData, config);

		dispatch({
			type: UPDATEUSER_SUCCESS,
			payload: data.success
		});
	} catch (error) {
		dispatch({
			type: UPDATEUSER_FAIL,
			payload: error.response.data.message
		});
	}
};

export const deleteUserbyAdmin = (id) => async (dispatch) => {
	try {
		dispatch({
			type: DELETEUSER_REQUEST
		});

		const { data } = await axios.delete(`/api/v1/admin/deleteuser/${id}`);

		dispatch({
			type: DELETEUSER_SUCCESS,
			payload: data.success
		});
	} catch (error) {
		dispatch({
			type: DELETEUSER_FAIL,
			payload: error.response.data.message
		});
	}
};

// CLEAR ERROR
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'clearErrors' });
};
