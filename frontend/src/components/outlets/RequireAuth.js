import React from 'react';
import {  useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ allowedRoles }) => {
	const location = useLocation();


	const { user } = useSelector((state) => state.user);

	{
		if (user && user.role) {
			if (allowedRoles && allowedRoles.includes(user.role)) {
				return <Outlet />;
			}
		} else {
			return <Navigate to="/login" state={{ from: location }} replace />;
		}
	}
};

export default RequireAuth;
