import React, { Fragment, useEffect, useState } from 'react';
import './UsersList.css';
import { Edit, Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUserbyAdmin, getAllUsers, clearErrors } from '../../../actions/userAction';
import Loader from '../../layout/Loader/Loader';
import { DELETEUSER_RESET } from '../../../constants/userConstants';
import Alert from '../../layout/alert/Alert';
import Sidebar from '../Sidebar';

const UsersList = () => {
	const { users, loading, error } = useSelector((state) => state.allUser);
	const { error: deleteError, isDeleted } = useSelector((state) => state.userUpdate);
	const [ showAlert, setShowAlert ] = useState(false);
	const [ tempid, setTempid ] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	let message = 'Are you sure Delete this User??';

	const columns = [
		{ field: 'no', headerName: 'No', width: 30 },
		{ field: 'id', headerName: 'User ID', width: 250 },
		{
			field: 'Name',
			headerName: 'Name',
			width: 240
		},
		{
			field: 'Email',
			headerName: 'Email',
			width: 340
		},
		{
			field: 'Phone',
			headerName: 'Phone',
			width: 150
		},
		{
			field: 'role',
			headerName: 'Role',
			minWidth: 140
		},
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
						<Link to={`/admin/user/${params.getValue(params.id, 'id')}`}>
							<Edit />
						</Link>
						<Button onClick={() => deleteUserHandler(params.getValue(params.id, 'id'))}>
							<Delete />
						</Button>
					</Fragment>
				);
			}
		}
	];

	const rows = [];
	users &&
		users.forEach((item, index) => {
			rows.push({
				id: item._id,
				role: item.role,
				Email: item.email,
				Name: item.name,
				Phone: item.phone,
				no: index + 1
			});
		});

	const deleteUserHandler = (id) => {
		setTempid(id);
		setShowAlert(true);
	};
	const handleConfirm = () => {
		setShowAlert(false);
		dispatch(deleteUserbyAdmin(tempid));
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
				toast.success('user deleted successfully');
				dispatch({ type: DELETEUSER_RESET });
				navigate('/admin/users');
			}
			dispatch(getAllUsers());
		},
		[ dispatch, error, alert, deleteError, isDeleted ]
	);

	return (
		<div>

			<Sidebar/>
			<div className="admin_head">Users</div>

			{loading ? (
				<Loader />
			) : (
				<div style={{ height: 480, width: '100%', padding: '0px 15px 0px 15px' }}>
					<DataGrid rows={rows} columns={columns} pageSize={7} disableSelectionOnClick />
				</div>
			)}
			<Alert Alerts={{ showAlert, message, handleConfirm, handleCancel }} />
		</div>
	);
};

export default UsersList;
