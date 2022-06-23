import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import './search.css';
import { searchMovies } from '../../../actions/moviesAction';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
	const { movies } = useSelector((state) => state.MovieSearch);

	const [ filteredData, setFilteredData ] = useState([]);
	const [ key, setKey ] = useState('');

	const dispatch = useDispatch();

	const handleFilter = (e) => {
		e.preventDefault();
		setKey(e.target.value);
		dispatch(searchMovies(e.target.value));
		if (e.target.value === '') {
			setFilteredData([]);
		}
	};

	useEffect(() => {
		if (movies && movies.length !== 0) {
			setFilteredData(movies);
		} else {
		}
	}, [movies]);

	return (
		<div className="search">
			<div className="searchInputs">
				<input type="text" placeholder="Search Movies Here..." value={key} onChange={handleFilter} />
				<div className="searchIcon">
					{filteredData.length !==0 ? (
						<CloseIcon
							onClick={() => {
								setFilteredData([]);
								setKey('');
							}}
						/>
					) : (
						<SearchIcon />
					)}
				</div>
			</div>
			{filteredData.length !== 0 && (
				<div className="dataresult">
					{filteredData.map((data) => (
						<Link
							to={`/movie/${data._id}`}
							className="data_item"
							onClick={() => {
								setFilteredData([]);
								setKey('');
							}}
						>
							<span>{data.name}</span>
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

export default Search;
