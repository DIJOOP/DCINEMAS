import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import './Header.css';
import { Logout } from '../../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import nouser from '../../../images/nouser.png';

export default function BasicMenu() {
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const open = Boolean(anchorEl);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
		// navigate("/profile")
	};

	const handleProfile = () => {
		setAnchorEl(null);
		navigate('/profile');
	};

	const handleLogout = () => {
		dispatch(Logout());
	};

	const handleBooking = () => {
		setAnchorEl(null);
		navigate('/profile/bookings');
	};

	const handleDashboard = () => {
		setAnchorEl(null);
		navigate('/admin/dashboard');
	};
	

	return (
		<div>
			<Button
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<Avatar className="avatar" src={`${user && user.avatar ? user.avatar.url : nouser}`} />
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button'
				}}
			>
				<MenuItem className="userName">{user.name}</MenuItem>
				{user.role ==='admin' && <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>}
				<MenuItem onClick={handleProfile}>Profile</MenuItem>
				<MenuItem onClick={handleBooking}>My Bookings</MenuItem>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</div>
	);
}
