import React, { Fragment, useEffect, useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import FaceIcon from '@mui/icons-material/FaceOutlined';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadUser, updateProfile, clearErrors } from '../../actions/userAction';
import nouser from '../../images/nouser.png';
import { toast } from 'react-toastify';
import { UPDATEUSER_RESET } from '../../constants/userConstants';
import Loader from '../layout/Loader/Loader';

const UpdateProfile = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const { user } = useSelector((state) => state.user);
	const { loading, isUpdated, error } = useSelector((state) => state.userUpdate);

	const [ name, setName ] = useState(user && user.name);
	const [ email, setEmail ] = useState(user && user.email);
	const [ phone, setPhone ] = useState(user && user.phone);
	const [ avatar, setAvatar ] = useState('');
	const [ avatarPreview, setAvatarPreview ] = useState(`${user && user.avatar ? user.avatar.url : nouser}`);

	const UpdateProfileDataChange = (e) => {
		if (e.target.name === 'avatar') {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					console.log(reader.result);
					setAvatarPreview(reader.result);
					setAvatar(reader.result);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const UpdateProfileSubmit = (e) => {
		e.preventDefault();
		const userData = {
			name,
			email,
			phone,
			avatar
		};

		dispatch(updateProfile(userData));
	};

	useEffect(
		() => {
			if (error) {
				toast.error(error);
				dispatch(clearErrors());
			}
			if (isUpdated) {
				toast.success('profile updated successfully');
				dispatch(LoadUser());
				navigate('/profile');
				dispatch({
					type: UPDATEUSER_RESET
				});
			}
		},
		[ dispatch, toast, error, navigate, isUpdated ]
	);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<div className="mainbody">
				<div className="UpdateProfileContainer">
					<div className="UpdateProfileBox">
						<h1 className="UpdateProfileHeading">Update Profile</h1>
						<form
							className="UpdateProfileForm"
							encType="multipart/form-data"
							onSubmit={UpdateProfileSubmit}
						>
							<div className="UpdateProfileName">
								<FaceIcon />
								<input
									type="text"
									placeholder="Name"
									required
									name="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="UpdateProfileEmail">
								<MailOutlineIcon />
								<input
									type="email"
									placeholder="Email"
									required
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="UpdateProfileEmail">
								<PhoneIphoneIcon />
								<input
									type=""
									placeholder="Phone"
									required
									name="Phone"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>

							<div id="UpdateProfileImage">
								<img src={avatarPreview} alt="Avatar Preview" />

								<input type="file" name="avatar" accept="image/*" onChange={UpdateProfileDataChange} />
							</div>
							<input type="submit" value="Update" className="UpdateProfileBtn" />
						</form>
					</div>
				</div>
				</div>
			)}
		</Fragment>
	);
};

export default UpdateProfile;
