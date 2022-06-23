import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheatreDetail } from '../../actions/theatreActions';
import { useNavigate } from 'react-router-dom';
import './payment.css';

const Payment = () => {
	const { theatre } = useSelector((state) => state.theatreDetail);
	const { selected, showdate, showtime } = JSON.parse(sessionStorage.getItem('bookingInfo'));

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleBook = (e) => {
		e.preventDefault();
		const bookingInfo = JSON.parse(sessionStorage.getItem('bookingInfo'));
		bookingInfo.movie = theatre && theatre.currentMovie;
		bookingInfo.amount =
			selected.length * (theatre && theatre.ticketPrice) + selected.length * (theatre && theatre.convenienceFee);
		bookingInfo.ticketCharge = selected.length * (theatre && theatre.ticketPrice);
		bookingInfo.extracharges = selected.length * (theatre && theatre.convenienceFee);
		sessionStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
		navigate('/payment/stripe');
	};

	useEffect(
		() => {
			const { theatreId } = JSON.parse(sessionStorage.getItem('bookingInfo'));
			if (!theatre || theatre._id !== theatreId) {
				dispatch(getTheatreDetail(theatreId));
			}
		},
		[ sessionStorage.getItem('bookingInfo') ]
	);

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
		<div className="mainbody">
			<div className="booking_container">
				<div className="booking_summary">
					<span id="title">Booking Summary</span>
					<div className="movie_detail">
						<p id="movie_name">{theatre && theatre.nowshowing.filmName}</p>
						<p>
							{theatre && theatre.name},{theatre && theatre.location}
						</p>
						<p>
							{`${new Date(showdate).toDateString().slice(0, 15)}`}| {showtime}
						</p>

						<p>{theatre && theatre.screen}</p>
						<div className="seatnumbers">
							<span>{selected.join(' ')}</span>
						</div>
					</div>
					<div className="ticket_detail">
						<div className="seats">
							<div className="amount">
								<span>
									{selected.length} ticket(s) × {theatre && theatre.ticketPrice}
								</span>

								<p>Rs {selected.length * (theatre && theatre.ticketPrice)}</p>
							</div>
						</div>
						<div className="amount">
							<span>Convenience fee</span>
							<p>Rs {selected.length * (theatre && theatre.convenienceFee)}</p>
						</div>
						<div className="line" />
						<div className="amount">
							<p>Total</p>
							<p>
								{' '}
								Rs&nbsp;
								{selected.length * (theatre && theatre.ticketPrice) +
									selected.length * (theatre && theatre.convenienceFee)}
							</p>
						</div>
					</div>
					<button onClick={handleBook}>
						Proceed to pay Rs&nbsp;
						{selected.length * (theatre && theatre.ticketPrice) +
							selected.length * (theatre && theatre.convenienceFee)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Payment;
