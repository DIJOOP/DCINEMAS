import axios from 'axios'
import { ALLBOOKING_FAIL, ALLBOOKING_REQUEST, ALLBOOKING_SUCCESS, DELETEBOOKING_FAIL, DELETEBOOKING_REQUEST, DELETEBOOKING_SUCCESS, MYBOOKING_FAIL, MYBOOKING_REQUEST, MYBOOKING_SUCCESS, NEWBOOKING_FAIL, NEWBOOKING_REQUEST, NEWBOOKING_SUCCESS } from '../constants/bookingConstants';



export const createBooking = (bookingData) => async (dispatch) => {
    try {
      dispatch({
        type: NEWBOOKING_REQUEST,
      });
  
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(`/api/v1//booking/new`, bookingData, config);
      dispatch({
        type: NEWBOOKING_SUCCESS,
        payload: data,
      });
    } catch (error) {
        console.log(error.response.data.message);
      dispatch({
        type: NEWBOOKING_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  export const myBookings = () => async (dispatch) => {
    try {
      dispatch({
        type: MYBOOKING_REQUEST,
      });
  
      const { data } = await axios.get("/api/v1/booking/me");
  
      dispatch({
        type:MYBOOKING_SUCCESS,
        payload: data.bookings,
      });
    } catch (error) {
      dispatch({
        type:MYBOOKING_FAIL,
        payload: error.response.data.message,
      });
    }
  };



  export const allBookings = () => async (dispatch) => {
    try {
      dispatch({
        type: ALLBOOKING_REQUEST,
      });
  
      const { data } = await axios.get("/api/v1/admin/bookings");
  
      dispatch({
        type:ALLBOOKING_SUCCESS,
        payload: data.bookings,
      });
    } catch (error) {
      dispatch({
        type:ALLBOOKING_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: 'clearErrors' });
  };


  export const deleteBookingbyAdmin = (id) => async (dispatch) => {
    try {
      dispatch({
        type: DELETEBOOKING_REQUEST
      });
  
      const { data } = await axios.delete(`/api/v1/admin/booking/delete/${id}`);
  
      dispatch({
        type: DELETEBOOKING_SUCCESS,
        payload: data.success
      });
    } catch (error) {
      dispatch({
        type: DELETEBOOKING_FAIL,
        payload: error.response.data.message
      });
    }
  };
  