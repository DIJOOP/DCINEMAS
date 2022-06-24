import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import './form.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, Login } from '../../../actions/userAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Register } from '../../../actions/userAction';

const LoginSignup = () => {
	const [ isShowLogin, setIsShowLogin ] = useState(true);
	const [ isShowRegister, setIsShowRegister ] = useState(false);

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ data, setData ] = useState({});
	const [ location, setLocation ] = useState(sessionStorage.getItem('Location'));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// let a = '';
	const { error, isAuthenticated } = useSelector((state) => state.user);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(Login(email, password));
	};
	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmitt = (e) => {
		e.preventDefault();
		let newData = { ...data };
		if (location) newData.location = location;
		dispatch(Register(newData));
		// a = location;
	};

	const handleLoginClick = () => {
		setIsShowLogin((isShowLogin) => !isShowLogin);
	};
	const handleRegisterClick = () => {
		setIsShowRegister((isShowRegister) => !isShowRegister);
	};

	useEffect(
		() => {
			if (isAuthenticated) {
				toast.success('loged in successfully');
				navigate(-1);
			}

			if (error) {
				toast.error(error);
				dispatch(clearErrors());
			}
			// if (isRegistered) {
			// 	dispatch(getTheatres(a));
			// }
		},
		[ error, isAuthenticated ]
	);

	useEffect(() => {
		dispatch({ type: 'CHANGESHOW_REQUEST' });

		return () => {
			dispatch({ type: 'CHANGESHOW_RESET' });
		};
	}, []);

	return (
		<Fragment>
			<div className="mainbody">
				<div className={`${!isShowLogin ? 'active' : ''} show`}>
					<div className="form-box ">
						<form>
							<h1 className="login-text">SIGN IN</h1>
							<label>email</label>

							<input
								type="text"
								value={email}
								placeholder="email"
								onChange={(e) => setEmail(e.target.value)}
								className="login-box"
							/>

							<label>Password</label>

							<input
								type="password"
								value={password}
								placeholder="password"
								onChange={(e) => setPassword(e.target.value)}
								className="login-box"
							/>

							<input type="submit" value="SignIn" className="login-btn" onClick={handleSubmit} />
						</form>

						<p>
							Don't have an Account&nbsp;?!!&nbsp;&nbsp;
							<span
								onClick={() => {
									handleLoginClick();
									handleRegisterClick();
								}}
							>
								Create One
							</span>
						</p>
					</div>
				</div>
				<div className={`${!isShowRegister ? 'active' : ''} show`}>
					<div className="form-box ">
						<form onSubmit={handleSubmitt}>
							<h1 className="login-text">CREATE ACCOUNT</h1>
							<label>Username</label>
							<input
								required
								type="text"
								onChange={handleChange}
								value={data.username}
								name="name"
								className="login-box"
							/>

							<label>Email</label>
							<input
								required
								type="email"
								name="email"
								onChange={handleChange}
								value={data.email}
								className="login-box"
							/>

							<label>Phone no</label>
							<input
								required
								type="number"
								name="phone"
								value={data.mobile}
								onChange={handleChange}
								className="login-box"
							/>

							<label>Password</label>
							<input
								required
								type="password"
								name="password"
								value={data.password}
								onChange={handleChange}
								className="login-box"
							/>

							<label>Confirm Password</label>
							<input
								required
								type="password"
								name="confirmPassword"
								value={data.confirmPassword}
								onChange={handleChange}
								className="login-box"
							/>

							<input type="submit" value="Create" className="login-btn" />
						</form>

						<p>
							Already have an Account&nbsp;??? &nbsp;&nbsp;
							<span
								onClick={() => {
									handleRegisterClick();
									handleLoginClick();
								}}
							>
								SignIn
							</span>
						</p>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default LoginSignup;
