import React, { Fragment, useEffect, useState } from 'react';
import './update.css';
import { LockOpen } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader';
import { updatePassword, clearErrors } from '../../actions/userAction';
import { UPDATEUSER_RESET } from '../../constants/userConstants';

const UpdatePassword = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const { loading, isUpdated, error } = useSelector((state) => state.userUpdate);

	const [ oldPassword, setOldPassword ] = useState('');
	const [ newPassword, setNewPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');

	const UpdatePasswordSubmit = (e) => {
		e.preventDefault();
		const myForm = {
			oldPassword,
			newPassword,
			confirmPassword
		};

		dispatch(updatePassword(myForm));
	};

	useEffect(
		() => {
			if (error) {
				toast.error(error);
				dispatch(clearErrors());
			}
			if (isUpdated) {
				toast.success('password updated successfully');
				navigate('/profile');
				dispatch({
					type: UPDATEUSER_RESET
				});
			}
		},
		[ dispatch, toast, error, navigate, isUpdated ]
	);
	

	useEffect(() => {
		dispatch({ type: 'CHANGESHOW_REQUEST' });

		return () => {
			dispatch({ type: 'CHANGESHOW_RESET' });
		};
	}, []);
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<div className="mainbody">
					<div className="UpdateProfileContainer">
						<div className="UpdateProfileBox">
							<h1 className="UpdateProfileHeading">Update Password</h1>
							<form
								className="UpdateProfileForm"
								onSubmit={UpdatePasswordSubmit}
								encType="multipart/form-data"
							>
								<div className="oldPassword">
									<LockOpen />
									<input
										type="password"
										placeholder="oldPassword"
										required
										value={oldPassword}
										onChange={(e) => setOldPassword(e.target.value)}
									/>
								</div>
								<div className="newPassword">
									<LockOpen />
									<input
										type="password"
										placeholder="newPassword"
										required
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
									/>
								</div>
								<div className="confirmPassword">
									<LockOpen />
									<input
										type="password"
										placeholder="confirmPassword"
										required
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
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

export default UpdatePassword;
