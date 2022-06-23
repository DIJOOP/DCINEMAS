import React, { useEffect, useState } from 'react';
import './ReviewPage.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import ReviewCard from '../moveidetail/ReviewCard';
import RatingCard from '../moveidetail/RatingCard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetail } from '../../actions/moviesAction';

const ReviePage = () => {
	const { movie } = useSelector((state) => state.movieDetail);
	const params = useParams();
	const dispatch = useDispatch();

	const [ showRate, setShowRate ] = useState(false);

	const showReview = () => {
		setShowRate((showRate) => !showRate);
	};

	useEffect(
		() => {
			if (!movie || movie._id !== params.id) {
				dispatch(getMovieDetail(params.id));
			}
			window.scrollTo(0, 0);
		},
		[ params.id, movie, dispatch ]
	);
	return (
		<div className="mainbody">
			<div className="rating_main_container">
				<div className="first_container">
					<div className="user_feedback">
						<h1>RATINGS</h1>
						<div className="overall_rating">
							<StarRateIcon color="warning" /> <span>{movie && movie.ratings}/10</span>
						</div>
						<div className="feed_backbtn">
							<span>Add Your Rating & Review</span>
							<button onClick={showReview}>Rate</button>
							{showRate && <RatingCard showReview={showReview} film={movie} />}
						</div>
					</div>
					<div className="preview_image">
						<img src={movie && movie.thumbnailimage.url} alt="" />
						<p> {movie && movie.name}</p>
					</div>
				</div>

				<div className="third_container">
					{movie && movie.reviews.map((data) => <ReviewCard review={data} />)}
				</div>
			</div>
		</div>
	);
};

export default ReviePage;
