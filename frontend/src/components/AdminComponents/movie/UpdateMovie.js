import React, { Fragment, useEffect, useState } from 'react';
import './NewMovie.css';

import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCelebs } from '../../../actions/celebsAction';
import CloseIcon from '@mui/icons-material/Close';
import { clearErrors, getMovieDetail, updateMoviebyAdmin } from '../../../actions/moviesAction';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATEMOVIE_RESET } from '../../../constants/moviesConstants';
import Loader from '../../layout/Loader/Loader';
import { toast } from 'react-toastify';
import { Genres, Languages } from '../../../constants/miscellaneous';
import Sidebar from '../Sidebar';

const UpdateMovie = () => {
	const { celebs, error, loading } = useSelector((state) => state.allCelebs);
	const { movie, error: movieError, loading: movieLoading } = useSelector((state) => state.movieDetail);
	const { isUpdated, error: updateError, loading: updateLoading } = useSelector((state) => state.movieUpdate);

	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();

	const [ name, setName ] = useState('');
	const [ hour, setHour ] = useState('');
	const [ minutes, setMinutes ] = useState('');
	const [ status, setStaus ] = useState('');
	const [ releasedate, setReleasedate ] = useState('');
	const [ languages, setLanguages ] = useState([]);
	const [ genres, setGenres ] = useState([]);
	const [ description, setDescription ] = useState('');
	const [ crew, setCrew ] = useState([]);
	const [ thumbnailimage, setThumbnailimage ] = useState('');
	const [ poster, setPoster ] = useState('');
	const [ tempname, setTempname ] = useState('Prithviraj Sukumaran');
	const [ tempRole, setTemprole ] = useState('');
	const [ trailer, setTrailer] = useState('');

	const Updatethumbnailimage = (e) => {
		if (e.target.name === 'avatar') {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					console.log(reader.result);
					setThumbnailimage(reader.result);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const UpdatePosterImage = (e) => {
		e.preventDefault();
		if (e.target.name === 'posterImage') {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					console.log(reader.result);
					setPoster(reader.result);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const handleCrewSelect = (e) => {
		e.preventDefault();
		const actordata = celebs && celebs.find((profile) => profile.name === tempname);

		setCrew((crew) => [
			...crew,
			{
				name: tempname,
				personID: actordata._id,
				image: actordata.photo,
				role: tempRole
			}
		]);
	};

	const handleCrewDelete = (index1) => {
		let Array = crew.filter((data, index) => index != index1);
		setCrew(Array);
	};
	const handleLanguageChange = (e, value) => {
		e.preventDefault();
		setLanguages(value);
	};

	const handlegenresChange = (e, value) => {
		e.preventDefault();
		setGenres(value);
		console.log(genres);
	};

	const UpdatebtnHAndler = (e) => {
		e.preventDefault();
		const MovieData = {
			name,
			status,
			releasedate,
			languages,
			description,
			crew,
			trailer,
			thumbnailimage,
			poster,
			genres,
			duration:{
				hour,
				minutes
			}
		};

		console.log(MovieData);
		dispatch(updateMoviebyAdmin(params.id, MovieData));
	};

	useEffect(
		() => {
			if (error) {
				toast.error(error);
				dispatch(clearErrors());
			}
			if (updateError) {
				toast.error(updateError);
				dispatch(clearErrors());
			}

			if (movieError) {
				toast.error(movieError);
				dispatch(clearErrors());
			}
			if (isUpdated) {
				toast.success('Movie updated successfully');
				dispatch({ type: UPDATEMOVIE_RESET });
				navigate('/admin/movies');
			}

			if (!movie || movie._id !== params.id) {
				dispatch(getMovieDetail(params.id));
			} else {
				setName(movie && movie.name);
				
				setStaus(movie.status);
				setDescription(movie.description);
				setThumbnailimage(movie.thumbnailimage.url);
				setPoster(movie.poster.url);
				setDescription(movie.description);
				setReleasedate(movie.releasedate.toString().slice(0, 10));
				setHour(movie && movie.duration.hour)
				setMinutes(movie && movie.duration.minutes)
				setTrailer(movie && movie.trailer)

				let tempArray = [];
				tempArray = movie.crew.concat(movie.cast);
				setCrew((crew) =>
					tempArray.map((element) => ({
						name: element.name,
						personID: element.personID,
						image: element.image,
						role: element.role
					}))
				);

				setLanguages(
					movie.languages.map((data) => ({
						title: data
					}))
				);
				setGenres(
					movie.genres.map((data) => ({
						title: data
					}))
				);
			}

			dispatch(getAllCelebs());
		},
		[ params.id, movie, error, movieError, isUpdated, updateError ]
	);

	return (
		<Fragment>
			<Sidebar/>
			{loading || movieLoading || updateLoading ? <Loader /> : ''}
			<div className="admin_head">Update Movie</div>
			<form className="createform_container" action="">
				<div className="left_side">
					<Stack spacing={3} sx={{ width: '100%' }}>
						<div className="input_box">
							<label htmlFor="">Movie Name</label>
							<input
								type="text"
								placeholder="Movie Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="input_box">
							<label htmlFor="">Staus</label>
							<select onChange={(e) => setStaus(e.target.value)}>
								<option selected="selected">{status}</option>
								<option value="Now Running">Now Running</option>
								<option value="Upcoming">Upcoming</option>
								<option value="Left Theatre">Left Theatre</option>
							</select>
						</div>
						<div className="input_box">
							<label for="Languages">Duration</label>
							<div className="duration">
								<input type="number" value={hour}	onChange={(e) => setHour(e.target.value)} id="quantity" name="quantity" min="0" max="10" />
								<span>hr</span>
								<input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} id="quantity" name="quantity" min="0" max="60" />
								<span>m</span>
							</div>
						</div>

						<div className="input_box">
							<label for="birthday">Relesed Date</label>
							<input
								onChange={(e) => setReleasedate(e.target.value)}
								value={releasedate}
								type="date"
								id="birthday"
								name="birthday"
							/>
						</div>

						
						<div className="input_box">
							<label htmlFor="">Add Crew</label>
						</div>

						<div className="input_box">
							<select id="crew_select_1" onChange={(e) => setTempname(e.target.value)}>
								{celebs &&
									celebs.map((profile) => <option value={profile.name}>{profile.name}</option>)}
							</select>

							<select id="crew_select_2" onChange={(e) => setTemprole(e.target.value)}>
								{celebs &&
									celebs
										.find((profile) => profile.name === tempname)
										.workedAs.map((role) => <option value={role}>{role}</option>)}
							</select>
							<button onClick={handleCrewSelect} id="crew_select_btn">
								add
							</button>
						</div>

						{crew.length > 0 && (
							<div className="show_selected">
								{crew.map((data, index) => (
									<span>
										{data.name}-{data.role}
										<CloseIcon onClick={() => handleCrewDelete(index)} fontSize="small" />
									</span>
								))}
							</div>
						)}

						<div className="input_box">
							<label htmlFor="">description</label>
						</div>

						<textarea
							onChange={(e) => setDescription(e.target.value)}
							value={description}
							name=""
							id=""
							cols="50"
							rows="10"
						/>
					</Stack>
				</div>
				<div className="right_side">
					<Stack spacing={3} sx={{ width: '100%' }}>

					<Autocomplete
							multiple
							id="tags-standard"
							options={Languages}
							getOptionLabel={(option) => option.title}
							onChange={handleLanguageChange}
							value={languages}
							isOptionEqualToValue={(option, value) => option.code === value}
							renderInput={(params) => (
								<TextField
									{...params}
									variant="standard"
									// label="Crew"
									placeholder="select Languages"
								/>
							)}
						/>

						<Autocomplete
							multiple
							id="tags-standard"
							options={Genres}
							getOptionLabel={(option) => option.title}
							onChange={handlegenresChange}
							value={genres}
							renderInput={(params) => (
								<TextField
									{...params}
									variant="standard"
									// label="Crew"
									placeholder="select Languages"
								/>
							)}
						/>
						<div className="input_box">
							<label htmlFor="">Trailer url</label>
							<input
								
								type="text"
								placeholder="Trailer url"
								onChange={(e) => setTrailer(e.target.value)}
							/>
						</div>

						<div className="input_box">
							<label htmlFor="">Thumbnail Image</label>
							<div className="">
								<input type="file" name="avatar" accept="image/*" onChange={Updatethumbnailimage} />
							</div>
						</div>
						<img id="thumbnail_image" src={thumbnailimage} alt="" />

						<div className="input_box">
							<label htmlFor="">Poster Image</label>
							<div className="">
								<input type="file" id="file-input" name="posterImage" onChange={UpdatePosterImage} />
							</div>
						</div>
						<img id="poster_image" src={poster} alt="" />

						<div className="create_button">
							<button onClick={UpdatebtnHAndler}> Update Movie</button>
						</div>
					</Stack>
				</div>
			</form>
		</Fragment>
	);
};

export default UpdateMovie;
