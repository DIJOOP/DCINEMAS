import React, { Fragment, useEffect, useState } from 'react';
import './NewMovie.css';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAllCelebs } from '../../../actions/celebsAction';
import CloseIcon from '@mui/icons-material/Close';
import { createNewMovie } from '../../../actions/moviesAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { NEWMOVIE_RESET } from '../../../constants/moviesConstants';
import Loader from '../../layout/Loader/Loader';
import { Genres, Languages } from '../../../constants/miscellaneous';
import Sidebar from '../Sidebar';

const NewMovie = () => {
	const { celebs } = useSelector((state) => state.allCelebs);
	const { success,  error, loading } = useSelector((state) => state.newMovie);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const cast = [];
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
		let Array = crew.filter((data, index) => index !== index1);
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

	const CreatebtnHAndler = (e) => {
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
			duration: {
				hour,
				minutes
			}
		};

		dispatch(createNewMovie(MovieData));
	};

	useEffect(
		() => {
			if (error) {
				toast.error(error);
				dispatch(clearErrors());
			}

			if (success) {
				toast.success('movie added successfully');
				navigate('/admin/movies');
				dispatch({ type: NEWMOVIE_RESET });
			}

			if (!celebs) {
				dispatch(getAllCelebs());
			}
		},
		[ dispatch, error, success, celebs ]
	);

	return (
		<Fragment>
			<Sidebar />
			<div className="admin_head">Add New Movie</div>
			{loading && loading ? <Loader /> : (
				<form className="createform_container" action="" onSubmit={CreatebtnHAndler}>
				<div className="left_side">
					<Stack spacing={3} sx={{ width: '100%' }}>
						<div className="input_box">
							<label htmlFor="">Movie Name</label>
							<input
								required
								type="text"
								placeholder="Movie Name"
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="input_box">
							<label htmlFor="">Staus</label>
							<select onChange={(e) => setStaus(e.target.value)}>
								<option value="">Choose Current Status</option>
								<option value="Now Running">Now Running</option>
								<option value="Upcoming">Upcoming</option>
								<option value="Left Theatre">Left Theatre</option>
							</select>
						</div>
						<div className="input_box">
							<label for="Languages">Duration</label>

							<div className="duration">
								<input
									type="number"
									onChange={(e) => setHour(e.target.value)}
									id="quantity"
									name="quantity"
									min="0"
									max="10"
								/>
								<span>hr</span>
								<input
									type="number"
									onChange={(e) => setMinutes(e.target.value)}
									id="quantity"
									name="quantity"
									min="0"
									max="60"
								/>
								<span>m</span>
							</div>

							{/* <input
								type="time"
								min="00:00"
								max="23:00"
								onChange={(e) => setDuration(e.target.value)}
								required
							/> */}
						</div>

						<div className="input_box">
							<label for="birthday">Relesed Date</label>
							<input
								onChange={(e) => setReleasedate(e.target.value)}
								type="date"
								id="birthday"
								name="birthday"
								required="truue"
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
									celebs.find((profile) => profile.name === tempname).workedAs.map((role) => (
										<option key={role} value={role}>
											{role}
										</option>
									))}
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

						<textarea onChange={(e) => setDescription(e.target.value)} name="" id="" cols="50" rows="10" />
					</Stack>
				</div>
				<div className="right_side">
					<Stack spacing={3} sx={{ width: '100%' }}>
						<Autocomplete
							multiple
							options={Genres}
							getOptionLabel={(option) => option.title}
							onChange={handlegenresChange}
							renderInput={(params) => (
								<TextField
									{...params}
									variant="standard"
									// label="Crew"
									placeholder="select genres"
								/>
							)}
						/>
						<Autocomplete
							multiple
							id="tags-standard"
							options={Languages}
							getOptionLabel={(option) => option.title}
							onChange={handleLanguageChange}
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
							<button type="submit"> Create Movie</button>
						</div>
					</Stack>
				</div>
			</form>

			)}
			
			
		</Fragment>
	);
};

export default NewMovie;
