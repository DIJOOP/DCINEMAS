import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../../images/DLOGO.png';
import UserOptions from './UserOptions';
import MenuIcon from '@mui/icons-material/Menu';
import Metadata from '../Metadata';
import { useDispatch, useSelector } from 'react-redux';
import { Districts } from '../../../constants/miscellaneous';
import { getTheatres } from '../../../actions/theatreActions';
import { changeUserLocation} from '../../../actions/userAction';
import Search from '../search/Search';


const Header = ({ handleLoginClick }) => {
	const [ mobile, setMobile ] = useState(false);
	const [ district, setDistrict ] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuthenticated, user } = useSelector((state) => state.user);
	const {  location: theatreLocation } = useSelector((state) => state.theatres);
	const { isShow, isAdmin } = useSelector((state) => state.show);

	const handleClick = () => {
		navigate('/login');
	};

	const handleDistrictChange = (e) => {
		e.preventDefault();
		sessionStorage.setItem('Location', e.target.value);
		dispatch(getTheatres(e.target.value));
		if (user) dispatch(changeUserLocation({ location: e.target.value }));
	};

	useEffect(
		() => {
			setDistrict(sessionStorage.getItem('Location'));
		},
		[ theatreLocation, user ]
	);

	return (
		<Fragment>
			<Metadata title="D-cinemas" />
			<nav className="nav">
				<div className="nav_container">
					<Link to="/" className="brand_logo">
						<img src={logo} alt="logo" />
					</Link>
				</div>
				<div className={mobile ? 'nav_options' : 'nodisplay'}>
					{!isAdmin && <Search className="search" />}
					<ul>
						{!isShow && (
							<li>
								<select onChange={handleDistrictChange}>
									{Districts.map((data) => (
										<option
											selected={data.name === district ? true : false}
											disabled={data.disabled}
											value={data.name}
										>
											{data.name}
										</option>
									))}
								</select>
							</li>
						)}
						{!isAuthenticated && (
							<li>
								<button onClick={handleClick} className="login_btn">
									SignIn
								</button>
							</li>
						)}
					</ul>
				</div>

				<div className="menuicon">
					{!isAdmin && <MenuIcon fontSize="large" color="info" onClick={() => setMobile(!mobile)} />}
				</div>
				{isAuthenticated && (
					<div className="res_user">
						<UserOptions />
					</div>
				)}
			</nav>
		</Fragment>
	);
};

export default Header;
