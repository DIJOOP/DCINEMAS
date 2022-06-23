import axios from 'axios';
import {
	ALLMOVIES_REQUEST,
	ALLMOVIES_SUCCESS,
	ALLMOVIES_FAIL,
	NEWMOVIE_REQUEST,
	NEWMOVIE_SUCCESS,
	NEWMOVIE_FAIL,
	DELETEMOVIE_REQUEST,
	DELETEMOVIE_SUCCESS,
	DELETEMOVIE_FAIL,
	MOVIEDETAIL_REQUEST,
	MOVIEDETAIL_SUCCESS,
	MOVIEDETAIL_FAIL,
	UPDATEMOVIE_REQUEST,
	UPDATEMOVIE_SUCCESS,
	UPDATEMOVIE_FAIL,
	REVIEW_REQUEST,
	REVIEW_SUCCESS,
	REVIEW_FAIL,
	SEARCHMOVIE_REQUEST,
	SEARCHMOVIE_SUCCESS,
	SEARCHMOVIE_FAIL
} from '../constants/moviesConstants';

export const getAllMovies = () => async (dispatch) => {
	try {
		dispatch({
			type: ALLMOVIES_REQUEST
		});

		const { data } = await axios.get('/api/v1/admin/allmovies');

		dispatch({
			type: ALLMOVIES_SUCCESS,
			payload: data.movies
		});
	} catch (error) {
		dispatch({
			type: ALLMOVIES_FAIL,
			payload: error.response.data.message
		});
	}
};

export const createNewMovie = (movieData) => async (dispatch) => {
	try {
		dispatch({
			type: NEWMOVIE_REQUEST
		});

		console.log(movieData);
		const config = { headers: { 'Content-Type': 'application/json' } };
		const { data } = await axios.post(`/api/v1/admin/newmovie`, movieData, config);
		dispatch({
			type: NEWMOVIE_SUCCESS,
			payload: data.movie
		});
	} catch (error) {
		dispatch({
			type: NEWMOVIE_FAIL,
			payload: error.response.data.message
		});
	}
};


export const getMovieDetail = (id) => async (dispatch) => {
	try {
		dispatch({
			type: MOVIEDETAIL_REQUEST
		});

		const { data } = await axios.get(`/api/v1/movie/${id}`);

		dispatch({
			type: MOVIEDETAIL_SUCCESS,
			payload: data.movie
		});
	} catch (error) {
		dispatch({
			type: MOVIEDETAIL_FAIL,
			payload: error.response.data.message
		});
	}
};



export const deletemoviebyAdmin = (id) => async (dispatch) => {
	try {
		dispatch({
			type: DELETEMOVIE_REQUEST
		});

		const { data } = await axios.delete(`/api/v1/admin/movie/${id}`);

		dispatch({
			type: DELETEMOVIE_SUCCESS,
			payload: data.success
		});
	} catch (error) {
		dispatch({
			type: DELETEMOVIE_FAIL,
			payload: error.response.data.message
		});
	}
};


export const updateMoviebyAdmin = (id, movieData) => async (dispatch) => {

	try {
	  dispatch({
		type: UPDATEMOVIE_REQUEST,
	  });
	  
	 
	  const config = { headers: { 'Content-Type': 'application/json' } };
	 

	  const { data } = await axios.put(
		`/api/v1/admin/movie/${id}`,
		movieData,
		config
	  );
  
	  dispatch({
		type: UPDATEMOVIE_SUCCESS,
		payload: data.success,
	  });
	} catch (error) {
	  dispatch({
		type: UPDATEMOVIE_FAIL,
		payload: error.response.data.message,
	  });
	}
  };

// CLEAR ERROR
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'clearErrors' });
};



export const newReview = (reviewData) => async (dispatch) => {
	try {
	  dispatch({
		type: REVIEW_REQUEST,
	  });
  
	  const config = { headers: { "Content-Type": "application/json" } };
  
	  const { data } = await axios.post(`/api/v1/movie/addreview`, reviewData, config);
  
	  dispatch({
		type: REVIEW_SUCCESS,
		payload: data.success,
	  });
	} catch (error) {
	  dispatch({
		type: REVIEW_FAIL,
		payload: error.response.data.message,
	  });
	}
  };
  

  export const searchMovies = (keyword) => async (dispatch) => {
	try {
		dispatch({
			type: SEARCHMOVIE_REQUEST
		});

		const { data } = await axios.post(`/api/v1/movies/search/${keyword}`);

		dispatch({
			type: SEARCHMOVIE_SUCCESS,
			payload: data.movies
		});
	} catch (error) {
		dispatch({
			type: SEARCHMOVIE_FAIL,
			payload: error.response.data.message
		});
	}
};