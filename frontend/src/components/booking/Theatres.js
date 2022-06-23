import React, { Fragment, useEffect, useRef, useState } from 'react';
import './Theatres.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VideoStableIcon from '@mui/icons-material/VideoStable';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTheatres } from '../../actions/theatreActions';
import NotFound from '../layout/notFound/NotFound';

const Theatres = () => {
	const { theatres } = useSelector((state) => state.theatres);

	const [ dates, setDates ] = useState([]);
	const [ dateindex, setDateindex ] = useState(0);

	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();

	const handleclik = (theatreid, date, timeIndex) => {
		console.log(theatreid, date, timeIndex);
		navigate(`/seatselect/${theatreid}/${date}/${timeIndex}`);
	};

	const handleDateindex = (index) => {
		
		setDateindex(index);
	};

	useEffect(
		() => {
			if (!theatres || theatres.some((element) => element.currentMovie._id !== params.id)) {
				dispatch(getTheatres(sessionStorage.getItem('Location'), params.id));
			} else {
				setDates([]);
				let a = [];
				theatres &&
					theatres.map((element) => {
						element.shows.map((data) => {
							if (!a.includes(data.date)) {
								a.push(data.date);
							}
						});
					});

				setDates(a.sort());

			}
			window.scroll(0, 0);
		},
		[ params.id, dateindex, theatres ]
	);

	return (
		<Fragment>
			{theatres && theatres.length === 0 ? (
				<NotFound />
			) : (
				<div className={'theatre_main_container' && 'mainbody'}>
					<div className="movie_name">
						<div className="movie_namebox">
							<h2>{theatres && theatres[0].currentMovie.name}</h2>
							<div className="movie_duration">
								<span className="star_ratng">
									<StarRateIcon />
									{theatres && theatres[0].currentMovie.ratings}/10
								</span>
								<h4>
									<AccessTimeIcon /> {theatres && theatres[0].currentMovie.duration.hour}h{' '}
									{theatres && theatres[0].currentMovie.duration.minutes}m
								</h4>
							</div>
						</div>
						<div className="date_container">
							{dates &&
								dates.map((data, index) => (
									<div
										
										className={dateindex===index?"date_selected":"datebox"}
										onClick={() => handleDateindex(index)}
									>
										<h4 className="date">{new Date(data).getDate()}</h4>
										<h4 className="day">{new Date(data).toDateString().slice(0, 3)}</h4>
									</div>
								))}
						</div>
					</div>

					<div className="thetrelist_container">
						{theatres &&
							theatres.map((theatreData, theatreindex) =>
								theatreData.shows.map(
									(showDate, showdateIndex) =>
										showDate.date === dates[dateindex] ? (
											<div className="theatre_list">
												<div className="theatre_details">
													<div className="name">
														<p>
															<VideoStableIcon />
															{theatreData.name}
														</p>
													</div>
													<div className="adress">
														<p>
															{theatreData.location},{theatreData.district},{theatreData.pincode}
														</p>
													</div>
												</div>

												<div className="show_timing">
													{showDate.showtime.map((timedata, timeIndex) => (
														<div
															className="time"
															onClick={(e) =>
																handleclik(theatreData._id, showDate.date, timeIndex)}
														>
															<span>{timedata.time}</span>
														</div>
													))}
												</div>
											</div>
										) : (
											''
										)
								)
							)}
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default Theatres;
