import React, { Fragment, useEffect, useState } from 'react';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createNewCeleb } from '../../../actions/celebsAction';
import { Edit, Delete, Close } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../layout/Loader/Loader';
import './EditCeleb.css';
import { NEWCELEB_RESET } from '../../../constants/celebsContants';
import Sidebar from "../Sidebar"

const newCeleb = () => {
	const { success, error, loading } = useSelector((state) => state.newCeleb);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const cast = [];
	const [ name, setName ] = useState('');
	const [ birthday, setBirthday ] = useState('');
	const [ place, setPlace ] = useState('');
	const [ country, setCountry ] = useState('');
	const [ district, setDistrict ] = useState('');
	const [ state, setState ] = useState('');
	const [ photo, setPhoto ] = useState('');
	const [ about, setAbout ] = useState('');
	const [ tempRole, setTempRole ] = useState('');
	const [ workedAs, setWorkedAs ] = useState([]);
	const [ isSave, setIsSave ] = useState(false);
	const [ description, setDescription ] = useState([]);
	const [ tempIndex, setTempIndex ] = useState('');
	const [ destitle, setDestitle ] = useState('');
	const [ desdata, setDesdata ] = useState('');

	const UpdatePhoto = (e) => {
		if (e.target.name === 'avatar') {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					console.log(reader.result);
					setPhoto(reader.result);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const HandleAddDescription = (e) => {
		e.preventDefault();

		if (!desdata || !destitle) {
			toast.error('enter description and title');
		} else {
			setDescription((description) => [
				...description,
				{
					title: destitle,
					detail: desdata
				}
			]);

			setDesdata('');
			setDestitle('');

			console.log(description);
		}
	};

	const handleDesDelete = (index) => {
		setDescription((description) => description.filter((data, ind) => ind !== index));
	};

	const handleDesEdit = (index) => {
		console.log('clikd');
		setDestitle((destitle) => description[index].title);
		setDesdata((destitle) => description[index].detail);
		setIsSave(true);
		setTempIndex(index);
		window.scrollTo(0, 0);
	};

	const HandleSaveDescription = () => {
		setDescription(
			description.filter((data, index) => index !== tempIndex).concat([
				{
					title: destitle,
					detail: desdata
				}
			])
		);
		setIsSave(false);
		setDesdata('');
		setDestitle('');
	};

	const handleAddRole = (e) => {
		e.preventDefault();

		if (!tempRole) toast.error('please enter Role');
		else setWorkedAs((workedAs) => [ ...workedAs, tempRole ]);
		setTempRole('');
	};

	const handleRoleDelete = (index) => {
		setWorkedAs(workedAs.filter((data, ind) => ind !== index));
	};

	const CreatebtnHAndler = (e) => {
		e.preventDefault();
		const celebData = {
			name,
			birthday,
			country,
			state,
			district,
			place,
			about,
			workedAs,
			photo,
			description
		};

		dispatch(createNewCeleb(celebData));
	};

	useEffect(
		() => {
			if (error) {
				toast.error(error);
				dispatch(clearErrors());
			}

			if (success) {
				toast.success('New Celebrity Added Successfully');
				navigate('/admin/celebs');
				dispatch({ type: NEWCELEB_RESET });
			}
		},
		[ dispatch, error, success ]
	);

	return (
		<Fragment>
		<Sidebar/>
			<div className="admin_head">Add New Celebrity</div>
			{loading ? (
				<Loader />
			) : (
				<form className="createform_container" action="" onSubmit={CreatebtnHAndler}>
					<div className="left_side">
						<Stack spacing={3} sx={{ width: '100%' }}>
							<div className="input_box">
								<label htmlFor="">Person Name </label>
								<input
									required
									type="text"
									placeholder="Person Name"
									onChange={(e) => setName(e.target.value)}
								/>
							</div>

							<div className="input_box">
								<label for="birthday">DOB </label>
								<input
									onChange={(e) => setBirthday(e.target.value)}
									type="date"
									id="birthday"
									name="birthday"
									
								/>
							</div>
							<div className="input_box">
								<label htmlFor="">Country</label>
								<input
									required
									type="text"
									placeholder="Country"
									onChange={(e) => setCountry(e.target.value)}
								/>
							</div>

							<div className="input_box">
								<label htmlFor="">State</label>
								<input
									required
									type="text"
									placeholder="State"
									onChange={(e) => setState(e.target.value)}
								/>
							</div>

							<div className="input_box">
								<label htmlFor="">District</label>
								<input
									
									type="text"
									placeholder="District"
									onChange={(e) => setDistrict(e.target.value)}
								/>
							</div>

							<div className="input_box">
								<label htmlFor="">Location</label>
								<input
									
									type="text"
									placeholder="Location"
									onChange={(e) => setPlace(e.target.value)}
								/>
							</div>

							<div className="input_box">
								<label htmlFor="">About</label>
							</div>

							<textarea
								placeholder="Type here..."
								onChange={(e) => setAbout(e.target.value)}
								name=""
								id=""
								cols="50"
								rows="10"
							/>
						</Stack>
					</div>
					<div className="right_side">
						<Stack spacing={3} sx={{ width: '100%' }}>
							<div className="input_box">
								<label htmlFor="">Photo </label>
								<div className="">
									<input type="file" name="avatar" accept="image/*" onChange={UpdatePhoto} />
								</div>
							</div>
							<img id="thumbnail_image" src={photo} alt="" />

							<div className="input_box">
								<label>Specialized Areas</label>
								<div className="role_box">
									<input
										type="text"
										placeholder="Role"
										value={tempRole}
										onChange={(e) => setTempRole(e.target.value)}
									/>
									<Button onClick={handleAddRole} variant="contained">
										Add
									</Button>
								</div>
							</div>
							<div className="role_selected">
								{workedAs.map((data, index) => (
									<div className="selected_time">
										<span>{data}</span>
										<Close onClick={() => handleRoleDelete(index)} fontSize="small" />
									</div>
								))}
							</div>

							<div className="input_box">
								<label htmlFor="">Add more Personal Details</label>
							</div>

							<div className="Des_description">
								<input
									id="Des_Input"
									type="text"
									value={destitle}
									placeholder="Description Title"
									onChange={(e) => setDestitle(e.target.value)}
								/>
								<textarea
									
									value={desdata}
									placeholder="Enter Description..."
									onChange={(e) => setDesdata(e.target.value)}
									name=""
									cols="50"
									rows="5"
								/>

								<div className="create_button">
									{!isSave ? (
										<button onClick={HandleAddDescription} id="Des_button">
											Add
										</button>
									) : (
										<button onClick={HandleSaveDescription} id="Des_button">
											Update
										</button>
									)}
								</div>
							</div>

							{description.length > 0 && (
								<div>
									<div className="input_box">
										<label>Extra Details</label>
									</div>
									<div className="Des_showselected">
										{description.map((data, index) => (
											<div className="Des_ShowBox">
												<div>
													<span>{data.title}</span>
													<div>
														<Edit onClick={() => handleDesEdit(index)} />
														<Delete onClick={() => handleDesDelete(index)} />
													</div>
												</div>

												<p id="Des_showData">{data.detail}</p>
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

export default newCeleb;
