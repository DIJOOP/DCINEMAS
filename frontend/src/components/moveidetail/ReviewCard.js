import React from 'react';
import './ReviewCard.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import PersonIcon from '@mui/icons-material/Person';

const ReviewCard = ({ review, isSmall }) => {
	console.log(isSmall);
	return (
		<div className={`${isSmall ? 'review_container1' : 'review_container'}`}>
			<div className="review_tag">
				<div className="rating_value">
					<StarRateIcon fontSize="small" color="warning" />
					<span>{review && review.rating}</span>
				</div>
				<p className="rating_title">{review && review.category}</p>
			</div>
			<div className="description">
				<p>
					{`${isSmall ? review && review.comment.toString().slice(0, 50) : review && review.comment}`}
					{`${isSmall && review && review.comment.toString().length >= 50 ? '...' : ''}`}
				</p>
			
			</div>
			<div className="user">
				<span className="username">
					<PersonIcon fontSize="small" /> {review && review.name}
				</span>
				<span className="post_date">{`Posted On : ${review && review.date.toString().slice(0, 10)}`}</span>
			</div>
		</div>
	);
};

export default ReviewCard;
