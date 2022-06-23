import React from 'react';
import { ToastContainer } from 'react-toastify';

const Toaster = () => {
	return (
		<ToastContainer
			position="top-center"
			autoClose={800}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
	);
};
export default Toaster;
