import { createReducer } from '@reduxjs/toolkit';

const initialState = {};

export const allMoviesReducer = createReducer(initialState, {
	ALLMOVIES_REQUEST: (state) => {
		state.loading = true;
	},
	ALLMOVIES_SUCCESS: (state, action) => {
		state.loading = false;
		state.movies = action.payload;
	},
	ALLMOVIES_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	clearErrors: (state) => {
		state.error = null;
	}
});

export const newMovieReducer = createReducer(initialState, {
	NEWMOVIE_REQUEST: (state) => {
		state.loading = true;
	},
	NEWMOVIE_SUCCESS: (state, action) => {
		state.loading = false;
		state.success =true;
		state.movie = action.payload
	},
	NEWMOVIE_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	NEWMOVIE_RESET: (state, action) => {
		state.success = false;
	},
	clearErrors: (state) => {
		state.error = null;
	}
});


export const MovieDetailReducer=createReducer(initialState,{
	MOVIEDETAIL_REQUEST:(state)=>{
	  state.loading=true
	},MOVIEDETAIL_SUCCESS:(state,action)=>{
	  state.loading=false
	  state.movie=action.payload
	},
	MOVIEDETAIL_FAIL:(state,action)=>{
	  state.loading=false
	  state.error=action.payload
	},
	clearErrors: (state) => {
	  state.error = null;
	  
	},
  
  })


export const updateMovieReducer=createReducer(initialState,{
	UPDATEMOVIE_REQUEST:(state)=>{
	  state.loading=true
	},
	UPDATEMOVIE_SUCCESS:(state,action)=>{
	  state.loading=false
	  state.isUpdated=action.payload
	},
	UPDATEMOVIE_FAIL:(state,action)=>{
	  state.loading=false
	  state.error=action.payload
	},
	UPDATEMOVIE_RESET:(state)=>{
	  state.isUpdated=false
	},
  
	// deletemovie
  
	DELETEMOVIE_REQUEST:(state)=>{
	  state.loading=true
	},
	DELETEMOVIE_SUCCESS:(state,action)=>{
	  state.loading=false
	  state.isDeleted=action.payload
	},
	DELETEMOVIE_FAIL:(state,action)=>{
	  state.loading=false
	  state.error=action.payload
	  
	},
	DELETEMOVIE_RESET:(state)=>{
	  state.isDeleted=false

	},
	
	clearErrors: (state) => {
	  state.error = null;
	  
	},
  
  
  })


  export const newReviewReducer = createReducer(initialState, {
	REVIEW_REQUEST: (state) => {
	  state.loading = true;
	},
	REVIEW_SUCCESS: (state, action) => {
	  state.loading = false;
	  state.success = action.payload;
	},
	REVIEW_FAIL: (state, action) => {
	  state.loading = false;
	  state.error = action.payload;
	},
	REVIEW_RESET: (state, action) => {
	  state.success = false;
	},
	clearErrors: (state) => {
	  state.error = null;
	},
  });
  

  export const movieSearchReducer = createReducer(initialState, {
	SEARCHMOVIE_REQUEST: (state) => {
	  state.loading = true;
	},
	SEARCHMOVIE_SUCCESS: (state, action) => {
	  state.loading = false;
	  state.movies = action.payload;
	},
	SEARCHMOVIE_FAIL: (state, action) => {
	  state.loading = false;
	  state.error = action.payload;
	},
	SEARCHMOVIE_RESET: (state, action) => {
	  state.success = false;
	  state.movies=""
	},
	clearErrors: (state) => {
	  state.error = null;
	},
  });