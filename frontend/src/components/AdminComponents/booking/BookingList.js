import React, { Fragment, useEffect, useState } from 'react';
import {  Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../layout/alert/Alert';
import { allBookings, clearErrors, deleteBookingbyAdmin } from '../../../actions/bookingAction';
import Loader from '../../layout/Loader/Loader';
import { DELETEBOOKING_RESET } from '../../../constants/bookingConstants';
import Sidebar from "../Sidebar"
// import Loader from '../layout/Loader/Loader';

const BookingList = () => {
	const { bookings, error, loading } = useSelector((state) => state.allBookings);
	const { isDeleted, loading: deleteLoading, error: deleteError } = useSelector((state) => state.deleteBooking);

	const [ showAlert, setShowAlert ] = useState(false);
	const [ tempid, setTempid ] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let message = 'Are you sure Delete this User??';

	const columns = [
		{ field: 'no', headerName: 'No', width: 30 },
		{ field: 'id', headerName: 'Booking ID', width: 250 },
		{
			field: 'Theatre',
			headerName: 'Theatre',
			width: 240
		},
		{
			field: 'Screen',
			headerName: 'Screen',
			width: 150
		},
		{
			field: 'Movie',
			headerName: 'Movie',
			width: 240
		},
		{
			field: 'Seats',
			headerName: 'Seats',
			width: 200
		},
		{
			field: 'date',
			headerName: 'Date',
			width: 100
		},
		{
			field: 'Time',
			headerName: 'Time',
			width: 100
		},
		{
			field: 'Seatslength',
			headerName: 'No Of Seats ',
			minWidth: 100
		},
		{ field: 'userid', headerName: 'User ID', width: 250 },
		{
			field: 'action',
			headerName: 'Actions',
			type: 'number',
			minWidth: 150,
			sortable: false,
			flex: 0.3,
			renderCell: (params) => {
				return (
					<Fragment>
						<Button onClick={() => deleteUserHandler(params.getValue(params.id, 'id'))}>
							<Delete />
						</Button>
					</Fragment>
				);
			}
		}
	];

	const rows = [];

	bookings &&
		bookings.forEach((item, index) => {
			rows.push({
				id: item._id,
				no: index + 1,
				date:new Date(item.showdate).toString().slice(4,15),
				Time:item.showtime,
				Theatre: item.theatre.name,
				Movie: item.movie.name,
				Seats: item.seats.join(','),
				Seatslength: item.seats.length,
				userid: item.user,
				Screen: item.theatre.screen
			});
		});

	const deleteUserHandler = (id) => {
		setTempid(id);
		setShowAlert(true);
	};
	const handleConfirm = () => {
		setShowAlert(false);
		dispatch(deleteBookingbyAdmin(tempid));
	};
	const handleCancel = () => {
		setShowAlert(false);
	};

	useEffect(
		() => {
			if (error) {
				toast.error(error);
				dispatch(clearErrors());
			}

			if (deleteError) {
				toast.error(deleteError);
				dispatch(clearErrors());
			}

			if (isDeleted) {
				toast.success('data deleted Successfully');
				dispatch({ type: DELETEBOOKING_RESET });
				navigate('/admin/bookings');
			}

			dispatch(allBookings());
		},
		[  dispatch, error,deleteError,isDeleted ]
	);

	return (
		<div>
			<div>
		<Sidebar/>
				<div className="admin_head">All Bookings</div>

				{loading || deleteLoading ? (
					<Loader />
				) : (
					<div style={{ height: 480, width: '100%', padding: '0px 15px 0px 15px' }}>
						<DataGrid rows={rows} columns={columns} pageSize={7} disableSelectionOnClick />
					</div>
				)}
				<Alert Alerts={{ showAlert, message, handleConfirm, handleCancel }} />
			</div>
		</div>
	);
};

export default BookingList;
