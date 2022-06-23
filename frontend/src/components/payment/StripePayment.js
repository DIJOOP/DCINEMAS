import React, { useEffect, useRef } from 'react';
import { CreditCard, Event, VpnKey } from '@mui/icons-material';
import { toast } from 'react-toastify';
import './Stripe.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Typography } from '@mui/material';
import { clearErrors, createBooking } from '../../actions/bookingAction';
import { NEWBOOKING_RESET } from '../../constants/bookingConstants';


const StripePayment = () => {
	const payBtn = useRef(null);
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useDispatch();
	const navigate = useNavigate();


	const { user } = useSelector((state) => state.user);
	const { error, success } = useSelector((state) => state.newBooking);

	const bookingInfo = JSON.parse(sessionStorage.getItem('bookingInfo'));

	const bookingData = {
		movie: bookingInfo&&bookingInfo.movie,
		theatre: bookingInfo&&bookingInfo.theatreId,
		showdate: bookingInfo&&bookingInfo.showdate,
		showtime: bookingInfo&&bookingInfo.showtime,
		showtimeId: bookingInfo&&bookingInfo.showtimeID,
		showdateId: bookingInfo&&bookingInfo.showdateId,
		seats: bookingInfo&&bookingInfo.selected,
		extracharges: bookingInfo&&bookingInfo.extracharges,
		bookingAmount: bookingInfo&&bookingInfo.amount,
		ticketCharge: bookingInfo&&bookingInfo.ticketCharge
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		payBtn.current.disabled = true;
		payBtn.current.classList.toggle('paybtn_pressed');

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};

			const { data } = await axios.post('/api/v1/payment/process', { amount: bookingInfo.amount }, config);

			const client_secret = data.client_secret;

			if (!stripe || !elements) return;

			const result = await stripe.confirmCardPayment(client_secret, {
				payment_method: {
					card: elements.getElement(CardNumberElement),
					billing_details: {
						name: user.name,
						email: user.email,
						phone: user.phone
					}
				}
			});

			if (result.error) {
				payBtn.current.disabled = false;
				toast.error(result.error.message);
				payBtn.current.classList.toggle('paybtn_pressed');
			} else {
				if (result.paymentIntent.status === 'succeeded') {
					

					bookingData.paymentInfo = {
						id: result.paymentIntent.id,
						status: result.paymentIntent.status,
						method: 'CARD Payment'
					};

					dispatch(createBooking(bookingData));

				
				} else {
					toast.error('there is some issue in processing payment');
				}
			}
		} catch (error) {
			payBtn.current.disabled = false;
			toast.error(error.response.data.message);
			payBtn.current.classList.toggle('paybtn_pressed');
		}
	};

	useEffect(
		() => {
			if (error) {
				toast.error(error);
				dispatch(clearErrors());
				payBtn.current.classList.toggle('paybtn_pressed');
			}
			if (success) {
				toast.success('booking completed successfully');
				navigate('/payment/success',{ replace: true });	
				dispatch({ type: NEWBOOKING_RESET });
				
			}
		},
		[ dispatch, error, success ]
	);

	// useEffect(()=>{
	// 	return () => {
	// 		sessionStorage.removeItem("bookingInfo")
	// 	}
	// },[])




	return (
		// <div className="mainbody">
		<div className="paymentContainer">
			<form action="" className="paymentForm" onSubmit={(e) => submitHandler(e)}>
				<Typography>Card info</Typography>
				<div>
					<CreditCard />
					<CardNumberElement className="paymentInput" />
				</div>
				<div>
					<Event />
					<CardExpiryElement className="paymentInput" />
				</div>
				<div>
					<VpnKey />
					<CardCvcElement className="paymentInput" />
				</div>
				<input type="submit" value={`PAY- Rs ${bookingInfo&&bookingInfo.amount}`} ref={payBtn} className="paymentFormBtn" />
			</form>
			
		</div>
		// </div>
	);
};

export default StripePayment;
