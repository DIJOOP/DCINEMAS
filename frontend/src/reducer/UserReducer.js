import { createReducer } from '@reduxjs/toolkit';

const initialState = {};

export const userReducer = createReducer(initialState, {
	REGISTER_REQUEST: (state) => {
		state.loading = true;
		state.isAuthenticated = false;
	},
	REGISTER_SUCCESS: (state, action) => {
		state.loading = false;
		state.user = action.payload;
		state.isAuthenticated = true;
		// state.isRegistered = true;
	},
	REGISTER_FAIL: (state, action) => {
		state.loading = false;
		state.user = null;
		state.isAuthenticated = false;
		state.error = action.payload;
	},

	LOADUSER_REQUEST: (state) => {
		state.loading = true;
		state.isAuthenticated = false;
	},

	LOADUSER_SUCCESS: (state, action) => {
		state.loading = false;
		state.user = action.payload;
		state.isAuthenticated = true;
	},

	LOADUSER_FAIL: (state, action) => {
		state.loading = false;
		state.user = null;
		state.isAuthenticated = false;
		state.loaderror = action.payload;
	},

	LOGIN_REQUEST: (state) => {
		state.loading = true;
		state.isAuthenticated = false;
	},
	LOGIN_SUCCESS: (state, action) => {
		state.loading = false;
		state.user = action.payload;
		state.isAuthenticated = true;
	},
	LOGIN_FAIL: (state, action) => {
		state.loading = false;
		state.user = null;
		state.isAuthenticated = false;
		state.error = action.payload;
	},

	LOGOUT_SUCCESS: (state) => {
		state.isAuthenticated = false;
		state.user = null;
	},
	LOGOUT_FAIL: (state, action) => {
		state.error = action.payload;
	},
	clearErrors: (state) => {
		state.error = null;
		state.loaderror=null
	}
});


export const allUserReducer = createReducer(initialState, {
	ALLUSER_REQUEST: (state) => {
		state.loading = true;
	
	},
	ALLUSER_SUCCESS: (state, action) => {
		state.loading = false;
		state.users = action.payload;
		
	},
	ALLUSER_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	clearErrors: (state) => {
		state.error = null;
	}
});

export const userDetailReducer=createReducer(initialState,{
	USERDETAIL_REQUEST:(state)=>{
	  state.loading=true
	},USERDETAIL_SUCCESS:(state,action)=>{
	  state.loading=false
	  state.user=action.payload
	},
	USERDETAIL_FAIL:(state,action)=>{
	  state.loading=false
	  state.error=action.payload
	},
	clearErrors: (state) => {
	  state.error = null;
	  
	},
  
  })


export const updateUserReducer=createReducer(initialState,{
	UPDATEUSER_REQUEST:(state)=>{
	  state.loading=true
	},
	UPDATEUSER_SUCCESS:(state,action)=>{
	  state.loading=false
	  state.isUpdated=action.payload
	},
	UPDATEUSER_FAIL:(state,action)=>{
	  state.loading=false
	  state.error=action.payload
	},
	UPDATEUSER_RESET:(state)=>{
	  state.isUpdated=false
	},
  
	// deleteuser
  
	DELETEUSER_REQUEST:(state)=>{
	  state.loading=true
	},
	DELETEUSER_SUCCESS:(state,action)=>{
	  state.loading=false
	  state.isDeleted=action.payload
	},
	DELETEUSER_FAIL:(state,action)=>{
	  state.loading=false
	  state.error=action.payload
	  
	},
	DELETEUSER_RESET:(state)=>{
	  state.isDeleted=false

	},
	
	clearErrors: (state) => {
	  state.error = null;
	  
	},
  
  
  })


  export const userLocationReducer=createReducer(initialState,{
	USERLOCATION_REQUEST:(state)=>{
	  state.loading=true
	},USERLOCATION_SUCCESS:(state,action)=>{
	  state.loading=false
	  state.location=action.payload
	},
	USERLOCATION_FAIL:(state,action)=>{
	  state.loading=false
	  state.error=action.payload
	},
	clearErrors: (state) => {
	  state.error = null;
	  
	},
  
  })
