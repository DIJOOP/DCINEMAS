import React, { Fragment, useEffect, useState } from 'react';
import './Bookings.css';
import ChairIcon from '@mui/icons-material/Chair';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, deleteBookingbyAdmin, myBookings } from '../../actions/bookingAction';
import Loader from '../layout/Loader/Loader';
import { toast } from 'react-toastify';
import { DELETEBOOKING_RESET } from '../../constants/bookingConstants';
import { useNavigate } from 'react-router-dom';
import Alert from '../layout/alert/Alert';
import { getTheatres } from '../../actions/theatreActions';

const MyBookings = () => {
	const { bookings, loading } = useSelector((state) => state.myBookings);
	const { isDeleted, loading: deleteLoading, error: deleteError } = useSelector((state) => state.deleteBooking);
	const [ showAlert, setShowAlert ] = useState(false);
	const [ tempid, setTempid ] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let message = 'Are you sure Cancel this Booking?';

	const cancelBookingHandler = (id) => {
		setTempid(id);
		setShowAlert(true);
	};
	const handleConfirm = () => {
		setShowAlert(false);
		dispatch(deleteBookingbyAdmin(tempid));
	};
	const handleCancel = () => {
		setShowAlert(false);
	};

	useEffect(
		() => {
			 dispatch(myBookings());

			if (deleteError) {
				toast.error(deleteError);
				dispatch(clearErrors());
			}

			if (isDeleted) {
				toast.success('booking cancelled successfully');
				dispatch({ type: DELETEBOOKING_RESET });
				navigate('/profile/bookings');
				dispatch(myBookings());
				dispatch(getTheatres(sessionStorage.getItem('Location')));
			}
		},
		[  dispatch, deleteError, isDeleted ]
	);

	return (
		<Fragment>
			{loading||deleteLoading ? (
				<Loader />
			) : (
				<div className="mainbody">
					<div className="my_bookings">
						<Alert Alerts={{ showAlert, message, handleConfirm, handleCancel }} />
						<p style={{ textAlign: 'center' }} className="heading">
							MY BOOKINGS
						</p>

						{bookings &&
							bookings.map((data) => (
								<div className="main_div">
									<div className="booking_box">
										<div className="film_poster">
											<img src={data.movie.thumbnailimage.url} alt="" />
										</div>
										<div className="ticket_data">
											<span className="movie_title">{data.movie.name}</span>
											<div className="theatre_data">
												<span>{data.theatre.name}</span>
												<span>
													{data.showtime} {new Date(data.showdate).toDateString()}
												</span>
											</div>
											<div className="ticket_numbers">
												<p>{data.seats.length} Seats </p>
												<p>
													<ChairIcon /> {data.seats.join(',')}
												</p>
											</div>

											<div className="price_data">
												<div>
													<span>Ticket Price</span>
													<span>₹ {data.ticketCharge}</span>
												</div>
												<div>
													<span>Convenience Fee*</span>
													<span>₹ {data.extracharges}</span>
												</div>

												<div className="paid_amount">
													<span>Amount paid</span>
													<p>₹ {data.bookingAmount}</p>
												</div>
											</div>
										</div>

										<div className="bookig_id">
											<div>
												<span>Booking ID:</span>
												<p>{data.paymentInfo.id}</p>
											</div>
											<div>
												<span>Payment Method:</span>
												<p>{data.paymentInfo.method}</p>
											</div>
											<div>
												<span>Booked On:</span>
												<p>{new Date(data.bookedAt).toDateString()} </p>
												<p>{new Date(data.bookedAt).toLocaleTimeString()} </p>
											</div>
										</div>
									</div>
									<div className="cancel_button">
										<button onClick={() => cancelBookingHandler(data._id)}>Cancel Booking</button>
									</div>
								</div>
							))}
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default MyBookings;
