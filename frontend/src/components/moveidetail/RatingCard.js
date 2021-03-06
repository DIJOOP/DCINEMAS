import React, { useEffect, useState } from 'react';
import './RatingCard.css';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetail, newReview } from '../../actions/moviesAction';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { REVIEW_RESET } from '../../constants/moviesConstants';

const RatingCard = ({ showReview, film }) => {
	const [ rating, setRating ] = useState(0);
	const [ comment, setComment ] = useState('');

	const { isAuthenticated } = useSelector((state) => state.user);
	const { success,loading } = useSelector((state) => state.newReview);

	const dispatch = useDispatch();

	const handleSumbit = (e) => {
		e.preventDefault()
		const reviewData = {
			comment,
			rating,
			MovieId: film && film._id
		};

		dispatch(newReview(reviewData));
	};



	useEffect(
		() => {
			if (success) {
				showReview();
				toast.success('review updated successfully');
				dispatch({type:REVIEW_RESET})
				dispatch(getMovieDetail(film._id));
			}
		},
		[ success ]
	);

	return (
		<form onSubmit={handleSumbit}>
			<div className="ratingcard_container">
				<div className="card_title">
					<div className="name_box">
						<span className="question">Add your Review</span>
						<span className="film_title">{film && film.name}</span>
					</div>
					<div className="close_btn">
						<CloseIcon onClick={showReview} />
					</div>
				</div>
				<div className="rating_stars">
					<div className="text">Your Rating</div>
					<Box
						sx={{
							'& > legend': { mt: 2 }
						}}
					>
						<Rating
							name="simple-controlled"
							value={rating}
							required
							max={10}
							color="red"
							size="large"
							// precision={0.5}
							onChange={(e) => {
								setRating(e.target.value);
							}}
						/>
					</Box>
					<span className="value">{rating}/10</span>
				</div>
				<div className="comment_input">
					<span className="text">Write your review here...</span>
					<textarea
						onChange={(e) => {
							setComment(e.target.value);
						}}
						value={comment}
						required
					/>
					{isAuthenticated ? (
						<button style={{cursor:loading?"wait":"pointer"}} type="submit"> Submit</button>
					) : (
						<div>
							Please <NavLink to="/login">Login</NavLink> to submit your review
						</div>
					)}
				</div>
			</div>
		</form>
	);
};

export default RatingCard;
