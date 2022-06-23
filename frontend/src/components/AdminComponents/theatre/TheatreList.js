import React, { Fragment, useEffect, useState } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../layout/alert/Alert';
import Loader from '../../layout/Loader/Loader';
import { clearErrors, deleteTheatrebyAdmin, getAllTheatres } from '../../../actions/theatreActions';

import { DELETETHEATRE_RESET } from '../../../constants/theatreConstants';
import Sidebar from '../Sidebar';
const TheatreList = () => {
	const { theatres, error, loading } = useSelector((state) => state.allTheatres);
	const { isDeleted,loading:deleteLoading } = useSelector((state) => state.theatreUpdate);

	const [ showAlert, setShowAlert ] = useState(false);
	const [ tempid, setTempid ] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let message = 'Are you sure Delete this User??';

	const columns = [
		{ field: 'no', headerName: 'No', width: 20 },
		// { field: 'id', headerName: 'User ID', width: 250 },
		{
			field: 'Name',
			headerName: 'Name',
			width: 150
		},
		{
			field: 'screen',
			headerName: 'Screen',
			minWidth: 100
		},
		// {
		// 	field: 'shows',
		// 	headerName: 'Shows',
		// 	minWidth: 250
		// },
		{
			field: 'film',
			headerName: 'Current Film',
			minWidth: 230
		},
		{
			field: 'language',
			headerName: 'Language',
			minWidth: 120
		},
		{
			field: 'address',
			headerName: 'Address',
			width: 270,
			flex: 1
		},
		{
			field: 'PIN',
			headerName: 'PIN Code',
			width: 80
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
						<Link to={`/admin/updatetheatre/${params.getValue(params.id, 'id')}`}>
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
	theatres &&
		theatres.forEach((item, index) => {
			rows.push({
				id: item._id,
				no: index + 1,
				Name: item.name,
				screen: item.screen,
				// shows: item.shows.map((data) => {data.showtime.map(time=>{
				// 	return time.time
				// })}),
				film: item.nowshowing.filmName,
				address: [ item.location, item.district, item.state ],
				PIN: item.pincode,
				language: item.nowshowing.language
			});
		});

	const deleteUserHandler = (id) => {
		setTempid(id);
		setShowAlert(true);
	};
	const handleConfirm = () => {
		setShowAlert(false);
		dispatch(deleteTheatrebyAdmin(tempid));
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

			if(isDeleted){
				toast.success("Theatre Deleted Successfylly")
				dispatch({type: DELETETHEATRE_RESET })
				navigate("/admin/theatres")

			}

			dispatch(getAllTheatres());
		},
		[ dispatch, error ,isDeleted]
	);

	return (
		<div>
			<div>
				<Sidebar/>
				<div className="admin_head">All Theatres</div>

				{loading||deleteLoading ? (
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

export default TheatreList;
