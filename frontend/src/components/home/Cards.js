import React from 'react';
import './cards.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useNavigate } from 'react-router-dom';

const cards = ({ data, Upcoming }) => {
	const navigate = useNavigate();

	const handleMovieClick = () => {
		navigate(`/movie/${data._id}`);
	};

	return (
		<div className="card_container" onClick={handleMovieClick}>
			<div className="card_image" style={{ backgroundImage: `url(${data && data.thumbnailimage.url})` }}>
				{!Upcoming && (
					<div className="rating">
						<StarRateIcon style={{ color: 'red' }} />
						<h4> &nbsp;{data && data.ratings}/10</h4>
					</div>
				)}
			</div>

			<div className="detail">
				<h3>{data && data.name}</h3>
				<h5>{data.genres.join('/')}</h5>
			</div>
		</div>
	);
};

export default cards;
