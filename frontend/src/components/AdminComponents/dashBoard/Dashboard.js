import React, { Fragment, useEffect } from 'react';
import './Dashboard.css';

import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from 'react-redux';
import { allBookings } from '../../../actions/bookingAction';
import { getAllTheatres } from '../../../actions/theatreActions';
import { getAllMovies } from '../../../actions/moviesAction';
import { getAllUsers } from '../../../actions/userAction';
import Loader from '../../layout/Loader/Loader';
import Sidebar from '../Sidebar';

const Dashboard = () => {
	const { bookings, loading: bookinLoading } = useSelector((state) => state.allBookings);
	const { movies, loading: moviesLoading } = useSelector((state) => state.allMovies);
	const { theatres, loading: theatresLoading } = useSelector((state) => state.allTheatres);
	const { users, loading: usersLoading } = useSelector((state) => state.allUser);

	const dispatch = useDispatch();

	let total = 0;

	bookings &&
		bookings.forEach((item) => {
			total += item.bookingAmount;
		});

	let booking = 0;

	bookings &&
		bookings.forEach((item) => {
			booking += item.seats.length;
		});

	const runningMovies = movies && movies.filter((item) => item.status === 'Now Running').length;

	useEffect(
		() => {
			dispatch(allBookings());
			dispatch(getAllTheatres());
			dispatch(getAllMovies());
			dispatch(getAllUsers());
		},
		[ dispatch ]
	);

	const lineState = {
		labels: [ 'Initial Amount(₹)', 'Amount Earned(₹)' ],
		datasets: [
			{
				label: 'Total Sales(₹)',
				backgroundColor: [ 'tomato' ],
				hoverBackgroundColor: [ 'rgb(197,72,49' ],
				data: [ 0, total ]
			}
		]
	};

	const dougnutState = {
		labels: [ 'Total Movies', 'Movies Running' ],
		datasets: [
			{
				backgroundColor: [ '#00A6B4', '#6800B4' ],
				hoverBackgroundColor: [ '#4B5000', '#35014F' ],
				data: [ movies && movies.length, runningMovies ]
			}
		]
	};

	return (
		<Fragment>
			<Sidebar/>
			<div className="admin_head">DASH BOARD</div>

			{bookinLoading || moviesLoading || theatresLoading || usersLoading ? (
				<Loader />
			) : (
				<div className="dashboard">
					<div className="dashboardSummary">
						<div className="tamount">
							<p>
								Total Sales <br />₹ {total}
							</p>
						</div>
						<div className="dasboardSummaryBox2">
							<Link to="/admin/bookings">
								<span>Bookings</span>
								<span>{booking}</span>
							</Link>
							<Link to="/admin/theatres">
								<span>Theatres</span>
								<span>{theatres && theatres.length}</span>
							</Link>
							<Link to="/admin/movies">
								<span>Movies</span>
								<span>{movies && movies.length}</span>
							</Link>
							<Link to="/admin/users">
								<span>Users</span>
								<span>{users && users.length}</span>
							</Link>
						</div>
					</div>
					<div className="dashboardContainer">
						<div className="linechart">
							<Line data={lineState} />
						</div>
						<div className="doughnutChart">
							<Doughnut data={dougnutState} />
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default Dashboard;
