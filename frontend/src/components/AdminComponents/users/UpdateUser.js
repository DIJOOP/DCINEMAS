import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../layout/Loader/Loader';
import { Person, Mail, PhoneAndroid } from '@mui/icons-material';
import { clearErrors, getUserDetail, updateUserbyAdmin } from '../../../actions/userAction';
import { toast } from 'react-toastify';
import { UPDATEUSER_RESET } from '../../../constants/userConstants';
import './UpdateUser.css';
import Sidebar from '../Sidebar';

const UpdateUser = () => {
	const { loading, error, user } = useSelector((state) => state.userDetails);
	const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.userUpdate);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();

	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ role, setRole ] = useState('');
	const [ phone, setPhone ] = useState('');

	const updateSubmitHandler = (e) => {
		e.preventDefault();

		const data = { name, email, role, phone };
		// const myForm = new FormData();
		// myForm.set("name", name);
		// myForm.set("email", email);
		// myForm.set("role", role);

		dispatch(updateUserbyAdmin(params.id, data));
	};

	useEffect(
		() => {
			if (!user || user._id !== params.id) {
				dispatch(getUserDetail(params.id));
			} else {
				setName(user.name);
				setEmail(user.email);
				setRole(user.role);
				setPhone(user.phone);
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
				toast.success('user updated successfully');
				navigate('/admin/users');
				dispatch({ type: UPDATEUSER_RESET });
			}
		},
		[ dispatch, isUpdated, updateError, user, error, params.id ]
	);
	return (
		<Fragment>
			<Sidebar/>
			<div className="admin_head">Edit User</div>

			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<div className="UpdateProfileContainer">
						<div className="UpdateProfileBox">
							<form
								className="UpdateProfileForm"
								onSubmit={updateSubmitHandler}
								encType="multipart/form-data"
							>
								<div className="UpdateProfileName">
									<Person />
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
									<Mail />
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
									<PhoneAndroid />
									<input
										type=""
										placeholder="Phone"
										required
										name="Phone"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
									/>
								</div>
								<div>
									<select name="role" onChange={(e) => setRole(e.target.value)}>
										<option selected="selected">{role}</option>
										<option value="user">user</option>
										<option value="admin">admin</option>
										))
									</select>
								</div>

								<input
									type="submit"
									disabled={updateLoading && updateLoading ? true : false}
									className="UpdateProfileBtn"
								/>
							</form>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default UpdateUser;
