import axios from 'axios'
import { ALLCELEBS_FAIL, ALLCELEBS_REQUEST, ALLCELEBS_SUCCESS, CELEBDETAIL_FAIL, CELEBDETAIL_REQUEST, CELEBDETAIL_SUCCESS, DELETECELEB_FAIL, DELETECELEB_REQUEST, DELETECELEB_SUCCESS, NEWCELEB_FAIL, NEWCELEB_REQUEST, NEWCELEB_SUCCESS, UPDATECELEB_FAIL, UPDATECELEB_REQUEST, UPDATECELEB_SUCCESS } from '../constants/celebsContants'

 export const getAllCelebs=()=>async(dispatch)=>{

    try {

        dispatch({
            type:ALLCELEBS_REQUEST
        })
        
        const { data } = await axios.get('/api/v1/admin/allcrew');

		dispatch({
			type:ALLCELEBS_SUCCESS,
			payload: data.allcrew
		});
	} catch (error) {
		dispatch({
			type:ALLCELEBS_FAIL,
			payload: error.response.data.message
		});
	}
};


export const createNewCeleb = (celebData) => async (dispatch) => {
	try {
		dispatch({
			type: NEWCELEB_REQUEST
		});

		console.log(celebData);
		const config = { headers: { 'Content-Type': 'application/json' } };
		const { data } = await axios.post(`/api/v1/admin/newcrewmember`, celebData, config);
		dispatch({
			type: NEWCELEB_SUCCESS ,
			payload: data.crewmember
		});
	} catch (error) {
		dispatch({
			type: NEWCELEB_FAIL,
			payload: error.response.data.message
		});
	}
};


export const getCelebDetail = (id) => async (dispatch) => {
	try {
		dispatch({
			type: CELEBDETAIL_REQUEST
		});

		const { data } = await axios.get(`/api/v1/crewmember/${id}`);

		dispatch({
			type: CELEBDETAIL_SUCCESS,
			payload: data.crewmember
		});
	} catch (error) {
		dispatch({
			type: CELEBDETAIL_FAIL,
			payload: error.response.data.message
		});
	}
};



export const updateCelebbyAdmin = (id, celebData) => async (dispatch) => {

	try {
	  dispatch({
		type:UPDATECELEB_REQUEST,
	  });
	  
	  console.log(celebData);
	 
	  const config = { headers: { 'Content-Type': 'application/json' } };
	 

	  const { data } = await axios.put(
		`/api/v1/admin/editcrew/${id}`,
		celebData,
		config
	  );
  
	  dispatch({
		type:UPDATECELEB_SUCCESS,
		payload: data.success,
	  });
	} catch (error) {
	  dispatch({
		type:UPDATECELEB_FAIL,
		payload: error.response.data.message,
	  });
	}
  };

  export const deleteCelebbyAdmin = (id) => async (dispatch) => {
	try {
		dispatch({
			type: DELETECELEB_REQUEST
		});

		const { data } = await axios.delete(`/api/v1/admin/deletecrew/${id}`);

		dispatch({
			type: DELETECELEB_SUCCESS,
			payload: data.success
		});
	} catch (error) {
		dispatch({
			type: DELETECELEB_FAIL,
			payload: error.response.data.message
		});
	}
};




// CLEAR ERROR
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'clearErrors' });
};
