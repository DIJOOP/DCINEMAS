const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Theatre = require('../models/theatremodel');
const ErrorHandler = require('../utils/ErrorHandler');

exports.createTheatre = catchAsyncErrors(async (req, res, next) => {
	const theatre = await Theatre.create(req.body);

	res.status(200).json({
		success: true,
		theatre
	});
});

exports.getAllTheatre = catchAsyncErrors(async (req, res, next) => {
	const theatres = await Theatre.find();

	res.status(200).json({
		success: true,
		theatres
	});
});

exports.getTheatreDetail = catchAsyncErrors(async (req, res, next) => {
	const theatre = await Theatre.findById(req.params.id);

	if (!theatre) {
		return next(new ErrorHandler('details not found', 404));
	}
	res.status(200).json({
		success: true,
		theatre
	});
});

exports.updateTheatre = catchAsyncErrors(async (req, res, next) => {
	console.log(req.body);
	let theatre = await Theatre.findById(req.params.id);

	if (!theatre) {
		return next(new ErrorHandler('theatre not found', 404));
	}
	theatre = await Theatre.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	});

	res.status(200).json({
		success: true,
		theatre
	});
});

exports.deleteTheatre = catchAsyncErrors(async (req, res, next) => {
	const theatre = await Theatre.findById(req.params.id);

	if (!theatre) {
		return next(new ErrorHandler('theatre not found', 404));
	}
	await theatre.remove();
	res.status(200).json({
		success: true,
		message: 'data deleted successfully'
	});
});

exports.getTheatres = catchAsyncErrors(async (req, res, next) => {
	let data = [];

   
	if (req.query.id) {
	
		data = await Theatre.find({ district: req.query.district, currentMovie: req.query.id }).populate(
			'currentMovie'
		);
	} else data = await Theatre.find({ district: req.query.district }).populate('currentMovie');



	res.status(200).json({
		success: true,
		theatres: data,
		location:req.query.district
	});
});
