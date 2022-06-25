import React, { Fragment, useEffect, useState } from 'react';
import './MovieDetail.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import CastCrd from './CastCrd';
// import Carousel from 'nuka-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReviewCard from './ReviewCard';
import RatingCard from './RatingCard';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies, getMovieDetail } from '../../actions/moviesAction';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { toast } from 'react-toastify';
import Slider from '../layout/carosal/Slider';
import Loader from '../layout/Loader/Loader';
import { getTheatres } from '../../actions/theatreActions';

const MovieDetail = () => {
	const { movie, loading: movieLoading } = useSelector((state) => state.movieDetail);
	const { success } = useSelector((state) => state.newReview);
	const { theatres } = useSelector((state) => state.theatres);
	const { movies } = useSelector((state) => state.allMovies);
	const [ review, setReview ] = useState(false);
	const [ upcoming, setUpcoming ] = useState(false);
	const [ upComingMovies, setUpComingMovies ] = useState(false);

	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const showReview = () => {
		setReview((review) => !review);
	};

	const handleReview = () => {
		navigate(`/movie/reviews/${movie._id}`);
	};

	useEffect(
		() => {
			if (!movie || movie._id !== params.id) {
				dispatch(getMovieDetail(params.id));
			} else {
				if (movie.status === 'Upcoming') {
					setUpcoming(true);
					dispatch(getAllMovies());
				}
			}
			window.scrollTo(0, 0);

			if (!theatres) {
				dispatch(getTheatres(sessionStorage.getItem('Location')));
			}
		},
		[ params.id, movie, theatres ]
	);

	useEffect(
		() => {
			if (movies) {
				setUpComingMovies((upComingMovies) => movies.filter((data) => data.status === 'Upcoming'));
			}
		},
		[ movies ]
	);

	return (
		<Fragment>
			{movieLoading ? (
				<Loader />
			) : (
				<div className="mainbody">
					<div
						className="movie_container"
						style={{
							backgroundImage: `linear-gradient(to right, rgba(0, 0, 10, 0.8), rgba(0, 0, 10, 0.4)), url(${movie &&
								movie.poster.url})`
						}}
					>
						<div className="thumbnail_image">
							<img src={movie && movie.thumbnailimage.url} alt="image" />

							<span
								onClick={() => {
									movie && movie.trailer
										? navigate('/movie/Trailer', {
												state: { url: `${movie && movie.trailer}` }
											})
										: toast.error('Trailer not Available');
								}}
							>
								<PlayArrowIcon /> Trailer
							</span>
						</div>
						{upcoming && upcoming ? (
							<div className="details_container">
								<h1>{movie && movie.name}</h1>

								<div className="feedback">
									<h2>{`Releasing on ${new Date(movie && movie.releasedate)
										.toString()
										.slice(4, 15)}`}</h2>
								</div>
								<div className="duration_data">
									<h4 />
								</div>
								<div className="language">
									<h4>{`${movie && movie.languages.join('   -')}`}</h4>
								</div>

								<div className="duration_data">
									<h4>{`${movie && movie.genres.join(' - ')}`}</h4>
								</div>
							</div>
						) : (
							<div className="details_container">
								<h1>{movie && movie.name}</h1>

								<div onClick={handleReview} className="rating_div">
									<StarRateIcon fontSize="large" color="warning" />
									<h2>{movie && movie.ratings}/10 </h2>
									<h4>&nbsp;&nbsp; {movie && movie.numOfReviews} &nbsp;Rating(s) &gt;</h4>
								</div>

								<div className="feedback">
									<h3>Add your rating and review</h3>
									<button className="feedback_btn" onClick={showReview}>
										Rate Now
									</button>
								</div>
								<div className="language">
									<h4>{`${movie && movie.languages.join('/')}`}</h4>
								</div>
								<div className="duration_data">
									<div>
										<h4>
											{movie && movie.duration.hour}h&nbsp;{movie && movie.duration.minutes}m
										</h4>
										<h4>{`${movie && movie.genres.join('/')}`}</h4>
									</div>

									<h4>{`Released On ${new Date(movie && movie.releasedate)
										.toString()
										.slice(4, 10)}`}</h4>
								</div>
								{theatres && theatres.some((e) => e.currentMovie._id === params.id) ? (
									<button
										onClick={() => {
											navigate(`/theatrelist/${params.id}`);
										}}
										className="book_btn"
									>
										Book Tickets
									</button>
								) : (
									''
								)}
							</div>
						)}
					</div>
					<div className="about_movie">
						<span className="heading">About The Movie</span>
						<p className="descrptions">{movie && movie.description}</p>
					</div>
					{review && <RatingCard showReview={showReview} film={movie} />}
					<div className="cast_container">
						<span className="heading">Cast</span>
						<div className="avatarcard_container">
							{movie && movie.cast.map((actor) => <CastCrd person={actor} />)}
						</div>
					</div>
					<div className="crew_container">
						<span className="heading">Crew</span>
						<div className="avatarcard_container">
							{movie && movie.crew.map((actor) => <CastCrd person={actor} />)}
						</div>
					</div>
					{upcoming && upcoming ? (
						<div>
							<span style={{ marginLeft: '20px' }} className="heading">
								More Movies
							</span>
							<div className="upcoming">
								<Slider data={upComingMovies} />
							</div>
						</div>
					) : (
						<div className="reviewcard_container">
							<span style={{ cursor: 'pointer' }} onClick={handleReview} className="heading">
								Reviews
							</span>
							<div>
								{movie &&
									movie.reviews.map((data) => (
										<div className="reviews_box">
											{' '}
											<ReviewCard review={data} isSmall="true" />
										</div>
									))}
							</div>
						</div>
					)}
				</div>
			)}
		</Fragment>
	);
};

export default MovieDetail;
