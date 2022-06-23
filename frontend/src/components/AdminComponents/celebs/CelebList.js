import React, { Fragment, useEffect, useState } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../layout/alert/Alert';

import { clearErrors, deleteCelebbyAdmin, getAllCelebs } from '../../../actions/celebsAction';
import Loader from '../../layout/Loader/Loader';
import { DELETECELEB_RESET } from '../../../constants/celebsContants';
import Sidebar from '../Sidebar';
const CelebList = () => {
	const { celebs, error, loading } = useSelector((state) => state.allCelebs);
	const { isDeleted, loading: deleteLoading, error: deleteError } = useSelector((state) => state.celebUpdate);
	const [ showAlert, setShowAlert ] = useState(false);
	const [ tempid, setTempid ] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let message = 'Are you sure Delete this User??';

	const columns = [
		{ field: 'no', headerName: 'No', width: 30 },

		{
			field: 'image',
			headerName: 'Photo',
			width: 80,
			height: 150,
			renderCell: (params) => <img className="grid_image" src={params.value} />
		},

		{
			field: 'Name',
			headerName: 'Name',
			width: 240
		},
		{
			field: 'state',
			headerName: 'State',
			width: 120
		},
		{
			field: 'roles',
			headerName: 'Worked As',
			minWidth: 390
		},
		{ field: 'id', headerName: 'Person ID', width: 250 },

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
						<Link to={`/admin/updateceleb/${params.getValue(params.id, 'id')}`}>
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
	celebs &&
		celebs.forEach((item, index) => {
			rows.push({
				id: item._id,
				image: item.photo.url,
				roles: item.workedAs,
				state: item.state,
				Name: item.name,
				no: index + 1
			});
		});

	const deleteUserHandler = (id) => {
		setTempid(id);
		setShowAlert(true);
	};
	const handleConfirm = () => {
		setShowAlert(false);
		dispatch(deleteCelebbyAdmin(tempid));
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

			if(isDeleted){
				toast.success("data deleted Successfully")
				dispatch({type:DELETECELEB_RESET})
				navigate("/admin/celebs")
			}



			dispatch(getAllCelebs());
		},
		[ dispatch, error,deleteError,isDeleted ]
	);

	return (
		<div>
			<div>
			<Sidebar/>
				<div className="admin_head">All Celebrities</div>

				{loading || deleteLoading ? (
					<Loader />
				) : (
					<div style={{ height: 480, width: '100%', padding: '0px 15px 0px 15px' }}>
						<DataGrid rowHeight={70} rows={rows} columns={columns} pageSize={7} disableSelectionOnClick />
					</div>
				)}
				<Alert Alerts={{ showAlert, message, handleConfirm, handleCancel }} />
			</div>
		</div>
	);
};

export default CelebList;
