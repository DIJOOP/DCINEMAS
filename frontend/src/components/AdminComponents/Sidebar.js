import React, { Fragment, useEffect } from 'react';
import './sidebar.css';
import { TreeView, TreeItem } from '@mui/lab';
import { NavLink } from 'react-router-dom';
import { ExpandMore, PostAdd, Add, ListAlt, Dashboard, People,} from '@mui/icons-material';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch({ type: 'CHANGESHOW_REQUEST' });
			dispatch({ type: 'CHANGEADMIN_REQUEST' });
			
			return () => {
				dispatch({ type: 'CHANGESHOW_RESET' });
				dispatch({ type: 'CHANGEADMIN_RESET' });
			}
		},
		[ dispatch ]
	);

	return (
		<Fragment>
			<div className="Sidebar">
				<h3>ADMIN PANEL</h3>

				<NavLink to="/admin/dashboard">
					<p>
						<Dashboard />
						Dashboard
					</p>
				</NavLink>
				<NavLink to="/admin/users">
					<p>
						<People />Users
					</p>
				</NavLink>
				<NavLink to="/admin/bookings">
					<p>
						<ListAlt />
						Bookings
					</p>
				</NavLink>

				{/* <NavLink to="/admin/reviews">
				<p>
					<RateReview /> Reviews
				</p>
			</NavLink> */}
				<NavLink to="">
					<TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ExpandMore />}>
						<TreeItem nodeId="1" label="Movies">
							<NavLink to="/admin/movies">
								<TreeItem nodeId="2" label="All Movies" icon={<PostAdd />} />
							</NavLink>
							<NavLink to="/admin/addmovie">
								<TreeItem nodeId="3" label="Add New " icon={<Add />} />
							</NavLink>
						</TreeItem>
					</TreeView>
				</NavLink>
				<NavLink to="">
					<TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ExpandMore />}>
						<TreeItem sx={{ fontWeight: '700' }} nodeId="1" label="Theatres">
							<NavLink to="/admin/theatres">
								<TreeItem nodeId="2" label="All Theatres" icon={<PostAdd />} />
							</NavLink>
							<NavLink to="/admin/addtheatre">
								<TreeItem nodeId="3" label="Add New " icon={<Add />} />
							</NavLink>
						</TreeItem>
					</TreeView>
				</NavLink>
				<NavLink to="">
					<TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ExpandMore />}>
						<TreeItem nodeId="1" label="Celebrities">
							<NavLink to="/admin/celebs">
								<TreeItem nodeId="2" label="All Celebrties" icon={<PostAdd />} />
							</NavLink>
							<NavLink to="/admin/addcelebs">
								<TreeItem nodeId="3" label="Add New" icon={<Add />} />
							</NavLink>
						</TreeItem>
					</TreeView>
				</NavLink>
			</div>
		</Fragment>
	);
};

export default Sidebar;
