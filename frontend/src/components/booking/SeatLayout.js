import React, { useEffect, useState, useRef } from 'react';
import './seatLayout.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTheatreDetail } from '../../actions/theatreActions';
import { toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader';

const SeatLayout = () => {
	const { theatre, loading } = useSelector((state) => state.theatreDetail);

	const [ selected, setSelected ] = useState([]);
	const [ seatLayout, setSeatLayout ] = useState([]);
	const [ time, setTime ] = useState('');
	const [ dateId, setDateId ] = useState(0);
	const [ timeId, setTimeId ] = useState(0);
	const [ tempindex, setTempindex ] = useState(0);

	const navigate = useNavigate();
	const refArray = useRef([]);
	const params = useParams();
	const dispatch = useDispatch();

	let regex = /\d+/g;
	let chars = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ];
	// let a = '';

	const handleSelected = (data, index) => {
		if (!time) {
			toast.error('Please select showtime');
		} else {
			refArray.current[index].classList.toggle('seat_selected');

			if (data.status === 'Available') {
				if (selected.includes(data.seat_no)) {
					setSelected(selected.filter((item) => item !== data.seat_no));
				} else {
					setSelected([ ...selected, data.seat_no ]);
				}
			}
		}
	};

	const handlePayment = () => {
		if (!time) {
			toast.error('Please select showtime');
		} else {
			const data = {
				selected,
				theatreId: params.id,
				showdate: params.date,
				showtimeID: timeId,
				showdateId: dateId,
				showtime: time
			};
			sessionStorage.setItem('bookingInfo', JSON.stringify(data));
			navigate(`/payment/${data.theatreId}`);
		}
	};


	const timeSlotHandler = (showIndex, timeIndex, showelement, timedata) => {
		setSeatLayout(theatre && theatre.shows[showIndex].showtime[timeIndex].seat);

		for (let i = 0; i < refArray.current.length; i++) {
			refArray.current[i].classList.remove('seat_selected');
		}

		setTimeId(timedata._id);
		setTime(timedata.time);
		setDateId(showelement._id);
		setSeatLayout((seatLayout) => timedata.seat);
	};

	useEffect(() => {
		dispatch(getTheatreDetail(params.id));
		dispatch({ type: 'CHANGESHOW_REQUEST' });
		window.scrollTo(0, 0);

		return () => {
			dispatch({ type: 'CHANGESHOW_RESET' });
		};
	}, []);

	useEffect(
		() => {
			if (!theatre || (theatre && theatre._id !== params.id)) {
				dispatch(getTheatreDetail(params.id));
			} else {
				theatre &&
					theatre.shows.map((data) => {
						if (data.date === params.date) {
							setSeatLayout((seatLayout) => data.showtime[params.timeIndex].seat);
							setTime((time) => data.showtime[params.timeIndex].time);
						}
					});
			}
		},
		[ params, theatre ]
	);

	return (
		<div className="mainbody">
			{loading ? (
				<Loader />
			) : (
				<div className="main_layout">
					<div className="show_time">
						<div className="day">{new Date(params.date).toDateString().slice(0, 15)}</div>
						<div className="day_Shows">
							{theatre &&
								theatre.shows.map(
									(element, index) =>
										element.date === params.date
											? element.showtime.map((timedata, index2) => (
													<div
														// ref={(ref) => {
														// 	refarray.current[index2] = ref;
														// }}
														onClick={(e) => timeSlotHandler(index, index2, element, timedata)}
														className={
															time && time !== timedata.time ? 'slot' : 'slot_selected'
														}
													>
														{timedata.time}
													</div>
												))
											: ''
								)}
						</div>
					</div>
					<div className="layout_container">
						<div className="row">{chars.map((data) => <span className="row_order">{data}</span>)}</div>
						<div className="grid_container">
							{seatLayout &&
								seatLayout.map((data, index) => (
									<div
										ref={(ref) => {
											refArray.current[index] = ref;
										}}
										onClick={(e) => handleSelected(data, index)}
										className={`${data.status === 'Booked' ? 'seat_booked' : 'seat'}`}
									>
										<span>{data.seat_no.match(regex)}</span>
									</div>
								))}
						</div>
					</div>
					<div className="screen">Screen</div>
					<div className="color_notes">
						<div className="note_box">
							<div className="booked" />
							<span>Booked</span>
						</div>
						<div className="note_box">
							<div className="available" />
							<span>Available</span>
						</div>
						<div className="note_box">
							<div className="selected" />
							<span>Selected</span>
						</div>
					</div>

					{selected.length != 0 && (
						<div className="payment_box" onClick={handlePayment}>
							Pay Rs {selected.length * 100}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SeatLayout;
