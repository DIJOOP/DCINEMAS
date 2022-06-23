import React, { Fragment, useEffect, useState } from 'react';

import { Autocomplete, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { getAllMovies } from '../../../actions/moviesAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../layout/Loader/Loader';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './newTheatre.css';
import { clearErrors, createNewTheatre } from '../../../actions/theatreActions';
import { NEWTHEATRE_RESET } from '../../../constants/theatreConstants';
import { Districts } from '../../../constants/miscellaneous';
import Sidebar from '../Sidebar';

const NewTheatre = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { movies, error, loading } = useSelector((state) => state.allMovies);
	const { success, error: theatreError, loading: theatreLoading } = useSelector((state) => state.newTheatre);

	const [ name, setName ] = useState('');
	const [ district, setDistrict ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ pincode, setPincode ] = useState('');
	const [ screen, setScreen ] = useState('');
	const [ movie, setMovie ] = useState('');
	const [ ticketPrice, setTicketPrice ] = useState('');
	const [ convenienceFee, setConvenienceFee ] = useState('');
	const [ movieLanguage, setMovieLanguage ] = useState('');
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
		// let s=[...shows]
		// s.map(data=>{
		// 	data.showtime.sort(function(a,b){

		// 		return b.time>a.time;

		// 		})
		// })
		// console.log(s);
	};

	const removeTimeHanler = (index1, index2) => {
		let sample = [ ...shows ];
		sample[index1].showtime.splice(index2, 1);
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
			convenienceFee,
			shows,

			nowshowing: {
				filmName: movie.name,
				language: movieLanguage
			},
			currentMovie: movie._id
		};

		dispatch(createNewTheatre(theatreData));
	};

	useEffect(
		() => {
			if (error) {
				toast.error(error);
				dispatch(clearErrors());
			}
			if (theatreError) {
				toast.error(theatreError);
				dispatch(clearErrors());
			}

			if (success) {
				toast.success('NEW Theatre Created Successfully ');
				dispatch({ type: NEWTHEATRE_RESET });
				navigate('/admin/theatres');
			}

			dispatch(getAllMovies());
		},
		[ error, theatreError, success, dispatch ]
	);

	return (
		<Fragment>
		
<Sidebar/>
			<div className="admin_head">Add New Theatre</div>
			{theatreLoading || loading ? (
				<Loader />
			) : (
				<form className="createform_container" onSubmit={createButtonHandler}>
					<div className="left_side">
						<Stack spacing={4.2} sx={{ width: '100%' }}>
							<div className="input_box">
								<label htmlFor="">Theatre Name:</label>
								<input
									required
									type="text"
									placeholder="Theatre Name"
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="input_box">
								<label htmlFor="">Screen:</label>
								<input
									required
									type="text"
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
								<label htmlFor="">District:</label>
								<Autocomplete
									disablePortal
									label="Movie"
									
									options={Districts}
									getOptionLabel={(option) => option.name}
									onChange={(event, newValue) => {
										setDistrict(newValue.name);
										
									}}
									sx={{ width: '50%' }}
									renderInput={(params) => <TextField {...params} />}
								/>
							</div>

							<div className="input_box">
								<label htmlFor="">Location:</label>
								<input
									required
									type="text"
									placeholder="Location"
									onChange={(e) => setLocation(e.target.value)}
								/>
							</div>

							<div className="input_box">
								<label htmlFor="">PIN Code:</label>
								<input
									required
									type="text"
									placeholder="PIN Code"
									onChange={(e) => setPincode(e.target.value)}
								/>
							</div>

							<div className="input_box">
								<label>Ticket Price:</label>
								<input
									required
									type="number"
									placeholder="Ticket Price"
									onChange={(e) => setTicketPrice(e.target.value)}
								/>
							</div>
						</Stack>
					</div>
					<div className="right_side">
						<Stack spacing={4.2} sx={{ width: '100%' }}>
							<div className="input_box">
								<label>Convenience Fee:</label>
								<input
									required
									type="number"
									placeholder="Convenience Fee"
									onChange={(e) => setConvenienceFee(e.target.value)}
								/>
							</div>
							<div className="input_box">
								<label htmlFor="">Current Movie:</label>
								<Autocomplete
									// disablePortal
									onChange={(event, newValue) => {
										setMovie(newValue);
										const lang = newValue.languages;
										setTempLang(lang);
									}}
									options={movies}
									getOptionLabel={(option) => option.name}
									sx={{ width: '50%' }}
									renderInput={(params) => <TextField {...params} />}
								/>
							</div>

							<div className="input_box">
								<label htmlFor="">Language:</label>
								<Autocomplete
									disablePortal
									onChange={(event, newValue) => {
										setMovieLanguage(newValue);
									}}
									options={tempLang}
									// getOptionLabel={(option) => option.language}
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
													<span>{data.date} </span>
													<CloseIcon
														onClick={() => removeDateHanler(index1)}
														fontSize="small"
													/>
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
								<button type="submit"> Create </button>
							</div>
						</Stack>
					</div>
				</form>
			)}
		</Fragment>
	);
};

export default NewTheatre;
