import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import './Profile.css';
import nouser from '../../images/nouser.png';

const Profile = () => {
	const {  user } = useSelector((state) => state.user);

	return (
		<Fragment>
			<div className="mainbody">
				<div className="profileContainer">
					<div>
						<h1>My Profile</h1>
						<img src={user && user.avatar ? user.avatar.url : nouser} alt="" />
						<Link to="/profile/update">Edit Profile</Link>
					</div>
					<div>
						<div>
							<h4>Full Name</h4>
							<p>{user && user.name}</p>
						</div>
						<div>
							<h4>Email</h4>
							<p>{user && user.email}</p>
						</div>
						<div>
							<h4>Phone</h4>
							<p>{user && user.phone}</p>
						</div>
						<div>
							<h4>Joined On</h4>
							<p>{`${new Date(user && user.createdAt).toString().slice(3, 15)}`}</p>
						</div>

						<div>
							<Link to="/profile/bookings">My Bookings</Link>
							<Link to="/profile/updatepassword">Change Password</Link>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Profile;
