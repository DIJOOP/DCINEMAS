import React, { Fragment, useEffect, useState } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../layout/alert/Alert';

import './MovieList.css';
import { getAllMovies, clearErrors, deletemoviebyAdmin } from '../../../actions/moviesAction';
import Loader from '../../layout/Loader/Loader';
import { DELETEMOVIE_RESET } from '../../../constants/moviesConstants';
import Sidebar from '../Sidebar';


const MoviesList = () => {
	const { movies, error, loading } = useSelector((state) => state.allMovies);
	const { isDeleted, error: deleteError } = useSelector((state) => state.movieUpdate);
	const [ showAlert, setShowAlert ] = useState(false);
	const [ tempid, setTempid ] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let message = 'Are you sure Delete this User??';

	const columns = [
		{ field: 'no', headerName: 'No', width: 30 },
		{
			field: 'image',
			headerName: 'Image',
			width: 80,
			height: 150,
			renderCell: (params) => <img className="grid_image" src={params.value} alt="" />
		},
		{
			field: 'Name',
			headerName: 'Name',
			width: 270
		},
		{
			field: 'Language',
			headerName: 'Language',
			width: 270
		},
		{
			field: 'Status',
			headerName: 'Status',
			width: 130
		},
		{
			field: 'Release',
			headerName: 'Release Date',
			width: 130
		},
		{ field: 'id', headerName: 'Movie ID', width: 250 },
		{
			field: 'action',
			headerName: 'Actions',
			type: 'number',
			minWidth: 130,
			sortable: false,
			flex: 0.3,
			renderCell: (params) => {
				return (
					<Fragment>
						<Link to={`/admin/updatemovie/${params.getValue(params.id, 'id')}`}>
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
	movies &&
		movies.forEach((item, index) => {
			rows.push({
				id: item._id,
				image: item.thumbnailimage.url,
				Language: item.languages,
				Status: item.status,
				Name: item.name,
				Release: item.releasedate.toString().slice(0, 10),
				no: index + 1
			});
		});

	const deleteUserHandler = (id) => {
		setTempid(id);
		setShowAlert(true);
	};
	const handleConfirm = () => {
		setShowAlert(false);
		dispatch(deletemoviebyAdmin(tempid));
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
				toast.success('Movie deleted successfully');
				dispatch({ type: DELETEMOVIE_RESET });
				navigate('/admin/movies');
			}
			dispatch(getAllMovies());
		},
		[ dispatch, error,deleteError,isDeleted ]
	);

	return (
		<div>
			<div>
			<Sidebar/>
				<div className="admin_head">All Movies</div>

				{loading ? (
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

export default MoviesList;
