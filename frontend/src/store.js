import { configureStore } from '@reduxjs/toolkit';
import { AllBookingsReducer, deleteBookingReducer, myBookingReducer, newBookingReducer } from './reducer/BookingReducer';
import { allCelebsReducer, CelebDetailReducer, newCelebReducer, updateCelebReducer } from './reducer/CelebReducer';
import { changeshow } from './reducer/miscreducer';
import { allMoviesReducer, MovieDetailReducer, movieSearchReducer, newMovieReducer, newReviewReducer, updateMovieReducer } from './reducer/MovieReducer';
import { allTheatresReducer, newTheatreReducer, TheatreDetailReducer, TheatrestReducer, updateTheatreReducer } from './reducer/TheatreReducer';
import { allUserReducer, updateUserReducer, userDetailReducer, userLocationReducer, userReducer } from './reducer/UserReducer';




const store = configureStore({
	reducer: {
		user:userReducer,
		allUser:allUserReducer,
		userDetails: userDetailReducer,
		userUpdate: updateUserReducer,
		userLocation:userLocationReducer,

		allMovies:allMoviesReducer,
		movieUpdate:updateMovieReducer,
		newMovie:newMovieReducer,
		movieDetail:MovieDetailReducer,
		newReview:newReviewReducer,

		allTheatres:allTheatresReducer,
		newTheatre:newTheatreReducer,
		theatreDetail:TheatreDetailReducer,
		theatreUpdate:updateTheatreReducer,
		theatres:TheatrestReducer,

		allCelebs:allCelebsReducer,
		newCeleb:newCelebReducer,
		celebDetail:CelebDetailReducer,
		celebUpdate:updateCelebReducer,
		
		newBooking:newBookingReducer,
		myBookings:myBookingReducer,
		allBookings:AllBookingsReducer,
		deleteBooking:deleteBookingReducer,
		MovieSearch:movieSearchReducer,

		show:changeshow
	}
});


export default store