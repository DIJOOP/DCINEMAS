import React, { Fragment, useEffect } from 'react';
import { CheckCircle } from '@mui/icons-material';
import { Typography } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import './bookingsuccess.css';
import { useDispatch } from 'react-redux';


const BookingSuccess = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(
		() => {
			dispatch({ type: 'CHANGESHOW_REQUEST' });

			return () => {
				dispatch({ type: 'CHANGESHOW_RESET' });
			};
		},
		[ dispatch ]
	);
	return (
		<Fragment>
			<div className="mainbody">
				<div className="bookingSuccess">
					<CheckCircle />
					<Typography>The Booking has been placed successfully</Typography>
					<span
						onClick={() => {
							navigate('/profile/bookings', { replace: true });
						}}
					>
						
						View Bookings
					</span>
				
				</div>
			</div>
		</Fragment>
	);
};

export default BookingSuccess;
