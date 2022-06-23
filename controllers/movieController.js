const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Movie = require('../models/moviemodel');
const ErrorHandler = require('../utils/ErrorHandler');
const cloudinary = require('cloudinary');

// <=== ADMIN CONTROLLS ===>

// CREATE NEW MOVIE
exports.createNewMovie = catchAsyncErrors(async (req, res, next) => {
	// console.log("reached");
	// console.log(req.body);

	const thumbimage = await cloudinary.v2.uploader.upload(req.body.thumbnailimage, {
		folder: 'ticketbooking/movies'
	});

	req.body.thumbnailimage = {
		public_id: thumbimage.public_id,
		url: thumbimage.secure_url
	};

	const posterImage = await cloudinary.v2.uploader.upload(req.body.poster, {
		folder: 'ticketbooking/movies'
	});

	req.body.poster = {
		public_id: posterImage.public_id,
		url: posterImage.secure_url
	};

	const cast = await req.body.crew.filter((data) => data.role === 'Actor');
	req.body.cast = cast;
	const crew = await req.body.crew.filter((data) => data.role !== 'Actor');
	req.body.crew = crew;

	const language = [];

	await req.body.languages.map((data) => {
		language.push(data.title);
	});

	req.body.languages = language;

	const Genres = [];

	await req.body.genres.map((data) => {
		Genres.push(data.title);
	});

	req.body.genres = Genres;

	req.body.createdby = req.user.id;
	const movie = await Movie.create(req.body);
	res.status(200).json({
		success: true,
		movie
	});
});

// GET ALL MOVIES

exports.getAllMovie = catchAsyncErrors(async (req, res, next) => {
	const movies = await Movie.find();
	res.status(200).json({
		success: true,
		movies
	});
});

// GET MOVIE DETAIL

exports.getmoviedDetail = catchAsyncErrors(async (req, res, next) => {
	const movie = await Movie.findById(req.params.id);

	if (!movie) {
		return next(new ErrorHandler('movie doesnt exist', 404));
	}

	res.status(200).json({
		success: true,
		movie
	});
});

// UPODATE MOVIE

exports.updateMovie = catchAsyncErrors(async (req, res, next) => {
	let movie = await Movie.findById(req.params.id);

	if (!movie) {
		return next(new ErrorHandler('movie not found', 404));
	}

	if (req.body.poster === movie.poster.url) {
		req.body.poster = movie.poster;
	} else {
		await cloudinary.v2.uploader.destroy(movie.poster.public_id);

		const posterImage = await cloudinary.v2.uploader.upload(req.body.poster, {
			folder: 'ticketbooking/movies'
		});

		req.body.poster = {
			public_id: posterImage.public_id,
			url: posterImage.secure_url
		};
	}

	if (req.body.thumbnailimage === movie.thumbnailimage.url) {
		req.body.thumbnailimage = movie.thumbnailimage;
	} else {
		await cloudinary.v2.uploader.destroy(movie.thumbnailimage.public_id);

		const thumbimage = await cloudinary.v2.uploader.upload(req.body.thumbnailimage, {
			folder: 'ticketbooking/movies'
		});

		req.body.thumbnailimage = {
			public_id: thumbimage.public_id,
			url: thumbimage.secure_url
		};
	}

	const cast = await req.body.crew.filter((data) => data.role === 'Actor');
	req.body.cast = cast;
	const crew = await req.body.crew.filter((data) => data.role !== 'Actor');
	req.body.crew = crew;

	const language = [];

	await req.body.languages.map((data) => {
		language.push(data.title);
	});

	req.body.languages = language;

	const Genres = [];

	await req.body.genres.map((data) => {
		Genres.push(data.title);
	});

	req.body.genres = Genres;

	movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	});

	res.status(200).json({
		success: true,
		message: 'data updated successfully',
		movie
	});
});

// deleteMovie

exports.deleteMovie = catchAsyncErrors(async (req, res, next) => {
	const movie = await Movie.findById(req.params.id);

	if (!movie) {
		return next(new ErrorHandler('user not found', 404));
	}

	await movie.remove();

	res.status(200).json({
		success: true,
		message: 'movie deleted successfully'
	});
});

// create new review or update review

exports.createMovieReview = catchAsyncErrors(async (req, res, next) => {
	const { rating, comment, MovieId } = req.body;

	let category = '';

	if (rating <= 2 && rating >= 1) category = 'Poor';
	if (rating <= 4 && rating >= 3) category = 'Not good';
	if (rating <= 6 && rating >= 5) category = 'Average';
	if (rating <= 8 && rating >= 7) category = 'Above Average';
	if (rating == 9) category = 'Excellent';
	if (rating == 10) category = 'MasterPiece';

	const review = {
		user: req.user.id,
		name: req.user.name,
		rating: Number(rating),
		date: Date.now(),
		comment,
		category
	};

	const movie = await Movie.findById(MovieId);

	const isReviewed = movie.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

	
	if (isReviewed) {
		movie.reviews.map((rev) => {
			if (rev.user.toString() === req.user._id.toString()) {
				(rev.rating = rating), (rev.category = category), (rev.comment = comment), (rev.date = Date.now());
			}
		});
	} else {
		movie.reviews.push(review);
	}

	movie.numOfReviews = movie.reviews.length;
	let avg = 0;
	movie.reviews.forEach((rev) => {
		avg = avg + rev.rating;
	});
	movie.ratings = (avg / movie.reviews.length).toFixed(1);

	await movie.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true
	});
});

exports.searchMovies = catchAsyncErrors(async (req, res, next) => {
	

	const keyword = req.params.keyword
		? {
				name: {
					$regex: req.params.keyword,
					$options: 'i'
				}
			}
		: {};

	const movies = await Movie.find({ ...keyword });

	res.status(200).json({
		success: true,
		movies
	});
});
