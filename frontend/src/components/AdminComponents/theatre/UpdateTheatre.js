import React, { Fragment, useEffect, useState } from 'react';
import { Autocomplete, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { getAllMovies } from '../../../actions/moviesAction';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../layout/Loader/Loader';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './newTheatre.css';
import { clearErrors, getTheatreDetail, updateTheatrebyAdmin } from '../../../actions/theatreActions';
import { UPDATETHEATRE_RESET } from '../../../constants/theatreConstants';
import { Districts } from '../../../constants/miscellaneous';
import Sidebar from '../Sidebar';

const UpdateTheatre = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();

	const { movies, error, loading } = useSelector((state) => state.allMovies);
	const { isUpdated, error: updateError, loading: updateLoading } = useSelector((state) => state.theatreUpdate);
	const { theatre } = useSelector((state) => state.theatreDetail);
	const [ name, setName ] = useState('');
	const [ district, setDistrict ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ pincode, setPincode ] = useState('');
	const [ screen, setScreen ] = useState('');
	const [ movie, setMovie ] = useState('');
	const [ ticketPrice, setTicketPrice ] = useState('');
	const [ convenienceFee, setConvenienceFee ] = useState('');
	const [ language, setLanguage ] = useState('');
	const [ date, setDate ] = useState('');
	const [ time, setTime ] = useState('');
	const [ shows, setShows ] = useState([]);
	const [ tempLang, setTempLang ] = useState([]);

	const AddShowHandler = () => {
		if (!date || !time) toast.error('please select date and timeslot');
		else {
			let tempTime = time && time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
			let tempIndex = shows.findIndex((element) => element.date === date);

			if (tempIndex === -1) {
				setShows((shows) => [
					...shows,
					{
						date: date,
						showtime: [ { time: tempTime } ]
					}
				]);
			} else {
				if (!shows[tempIndex].showtime.some((element) => element.time === tempTime)) {
					let sample = [ ...shows ];
					sample[tempIndex].showtime.push({ time: tempTime });

					setShows(sample);
				} else {
					toast.error(`${tempTime} Already selected`);
				}
			}
		}
	};

	const removeTimeHanler = (index1, index2) => {
		let sample = [ ...shows ];
		const modified = [
			{
				date: sample[index1].date,
				showtime: sample[index1].showtime.filter((element, index) => index !== index2)
			}
		];

		sample = sample.filter((element, index) => index !== index1).concat(modified);

		setShows(sample);
	};

	const removeDateHanler = (index1) => {
		let sample = [ ...shows ];
		sample.splice(index1, 1);
		setShows(sample);
	};

	const createButtonHandler = (e) => {
		e.preventDefault();
		const theatreData = {
			name,
			district,
			location,
			pincode,
			screen,
			ticketPrice,
			shows,
			currentMovie: movie._id,
			nowshowing: {
				filmName: movie.name,
				language
			}
		};

		console.log(theatreData);

		dispatch(updateTheatrebyAdmin(params.id, theatreData));
	};

	useEffect(
		() => {
			dispatch(getAllMovies());
			if (!theatre || theatre._id !== params.id) {
				dispatch(getTheatreDetail(params.id));
			} else {
				setName(theatre && theatre.name);
				setDistrict(theatre && theatre.district);
				setLocation(theatre && theatre.location);
				setPincode(theatre && theatre.pincode);
				setScreen(theatre && theatre.screen);
				setLanguage(theatre && theatre.nowshowing.language);
				setTicketPrice(theatre && theatre.ticketPrice);
				setConvenienceFee(theatre && theatre.convenienceFee);
				setShows(theatre && theatre.shows);
				const m = movies && movies.filter((v) => v._id === theatre.currentMovie);
				setMovie(m[0]);
			}

			if (error) {
				toast.error(error);
				dispatch(clearErrors());
			}
			if (updateError) {
				toast.error(updateError);
				dispatch(clearErrors());
			}

			if (isUpdated) {
				toast.success('theatre updated Successfully ');
				dispatch({ type: UPDATETHEATRE_RESET });
				navigate('/admin/theatres');
			}
		},
		[ error, updateError, theatre, isUpdated, dispatch ]
	);

	return (
		<Fragment>
			<Sidebar />
			{loading || updateLoading ? <Loader /> : ''}
			<div className="admin_head">Update Theatre</div>
			<form className="createform_container" onSubmit={createButtonHandler}>
				<div className="left_side">
					<Stack spacing={4.2} sx={{ width: '100%' }}>
						<div className="input_box">
							<label htmlFor="">Theatre Name:</label>
							<input
								required
								type="text"
								value={name}
								placeholder="Theatre Name"
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="input_box">
							<label htmlFor="">Screen:</label>
							<input
								required
								type="text"
								value={screen}
								placeholder="Screen"
								onChange={(e) => setScreen(e.target.value)}
							/>
						</div>

						<div className="input_box">
							<label>State:</label>
							<select disabled={true}>
								<option selected value="Kerala">
									Kerala
								</option>
							</select>
						</div>

						<div className="input_box">
							<label>District:</label>
							<select
								onChange={(e) => {
									setDistrict(e.target.value);
									console.log(district);
								}}
							>
								{Districts &&
									Districts.map((data) => (
										<option selected={data.name === district ? true : false} value={data.name}>
											{data.name}
										</option>
									))}
							</select>
						</div>


						<div className="input_box">
							<label htmlFor="">Location:</label>
							<input
								required
								type="text"
								value={location}
								placeholder="Location"
								onChange={(e) => setLocation(e.target.value)}
							/>
						</div>

						<div className="input_box">
							<label htmlFor="">PIN Code:</label>
							<input
								required
								type="number"
								value={pincode}
								placeholder="PIN Code"
								onChange={(e) => setPincode(e.target.value)}
							/>
						</div>

						<div className="input_box">
							<label>Ticket Price:</label>
							<input
								required
								type="number"
								value={ticketPrice}
								placeholder="Ticket Price"
								onChange={(e) => setTicketPrice(e.target.value)}
							/>
						</div>
					</Stack>
				</div>
				<div className="right_side">
					<Stack spacing={4.2} sx={{ width: '100%' }}>
						<div className="input_box">
							<label>Convenience Fee</label>
							<input
								required
								type="number"
								value={convenienceFee}
								placeholder="Convenience Fee"
								onChange={(e) => setConvenienceFee(e.target.value)}
							/>
						</div>
						<div className="input_box">
							<label htmlFor="">Current Movie:</label>

							<Autocomplete
								disablePortal
								freeSolo
								onChange={(event, newValue) => {
									setMovie(newValue);
									const lang = !newValue ? '' : newValue.languages;
									setTempLang(lang);
								}}
								options={movies}
								getOptionLabel={(option) => (option ? option.name : '')}
								value={movie}
								// defaultValue={movie.name}
								isOptionEqualToValue={(option, value) => option.name === value}
								sx={{ width: '50%' }}
								renderInput={(params) => <TextField {...params} />}
							/>
						</div>

						<div className="input_box">
							<label htmlFor="">Language:</label>
							<Autocomplete
								disablePortal
								value={language ? language : ''}
								onChange={(event, newValue) => {
									setLanguage(newValue);
								}}
								options={tempLang}
								sx={{ width: '50%' }}
								renderInput={(params) => <TextField {...params} />}
							/>
						</div>

						<div className="input_box">
							<label>Show Date:</label>
							<input onChange={(e) => setDate(e.target.value)} type="date" required />
						</div>

						<div className="input_box">
							<label>Show Time:</label>
							<div className="timepicker">
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<TimePicker
										value={time}
										onChange={(newValue) => {
											setTime(newValue);
										}}
										renderInput={(params) => <TextField {...params} />}
									/>
								</LocalizationProvider>
								<Button variant="contained" onClick={AddShowHandler}>
									Add
								</Button>
							</div>
						</div>
						{shows.length > 0 && (
							<div>
								<div className="input_box">
									<label>Show Schedule</label>
								</div>
								<div className="show_selected">
									{shows.map((data, index1) => (
										<div className="selected_sub" key={index1}>
											<div className="selected_date">
												<span>{data.date.slice(0, 10)} </span>
												<CloseIcon onClick={() => removeDateHanler(index1)} fontSize="small" />
											</div>

											<div className="selected_timebox">
												{data.showtime.map((d, index2) => (
													<div className="selected_time">
														<span key={index2}>{d.time}</span>
														<CloseIcon
															onClick={() => removeTimeHanler(index1, index2)}
															fontSize="small"
														/>
													</div>
												))}
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						<div className="create_button">
							<button type="submit"> Update Theatre</button>
						</div>
					</Stack>
				</div>
			</form>
		</Fragment>
	);
};

export default UpdateTheatre;
