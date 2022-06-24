import React, { Fragment, useEffect, useState } from 'react';
import Cards from './Cards';
// import Carousel from 'nuka-carousel';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Home.css';

import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies } from '../../actions/moviesAction';
import { getTheatres } from '../../actions/theatreActions';
import SelectLocation from '../layout/Location/SelectLocation';
import Slider from '../layout/carosal/Slider';
import Loader from '../layout/Loader/Loader';

const Home = () => {
	const { theatres, loading } = useSelector((state) => state.theatres);
	const { movies } = useSelector((state) => state.allMovies);
	const { user } = useSelector((state) => state.user);
	const { location } = useSelector((state) => state.userLocation);

	const dispatch = useDispatch();

	const [ upcoming, setUpcoming ] = useState([]);

	const responsive = {
		desktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 594 },
			items: 2
		},
		tablet: {
			breakpoint: { max: 594, min: 0 },
			items: 1
		}
	};

	let films = [];

	theatres &&
		theatres.map((data) => {
			if (!films.some((e) => e._id === data.currentMovie._id)) films.push(data.currentMovie);
		});

	useEffect(
		() => {
			if (!movies) {
				dispatch(getAllMovies());
			} else {
				setUpcoming((upcoming) => movies.filter((data) => data.status === 'Upcoming'));
			}
		},
		[ movies ]
	);

	useEffect(
		() => {
			if (user && !sessionStorage.getItem('Location')) {
				sessionStorage.setItem('Location', user.location);
			}

			if (user && sessionStorage.getItem('Location')) {
				sessionStorage.setItem('Location', user.location);
			}

			if (user && sessionStorage.getItem('Location') && location) {
				sessionStorage.setItem('Location', location);
			}

			dispatch(getTheatres(sessionStorage.getItem('Location')));
		},
		[  ]
	);


	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<div className="mainbody">
					{!user && !sessionStorage.getItem('Location') ? <SelectLocation /> : ''}
					<Carousel
						responsive={responsive}
						swipeable={false}
						draggable={true}
						showDots={false}
						// centerMode={true}
						infinite={true}
						autoPlay={true}
						autoPlaySpeed={500}
						transitionDuration={1000}
						containerClass="carousel-container"
						// itemClass="carousel-item-padding-40-px"
					>
						{films &&
							films.map((data) => (
								<div>
									<img src={data.poster.url} className="image" />
								</div>
							))}
					</Carousel>

					<div className="title">
						<h2> Now Running >>> </h2>
					</div>

					<div className="now_running">{films && films.map((theatres) => <Cards data={theatres} />)}</div>

					<div className="title">
						<h2>Upcoming Movies >>> </h2>
					</div>

					<div className="upcoming">{upcoming && <Slider data={upcoming} />}</div>
				</div>
			)}
		</Fragment>
	);
};

export default Home;
