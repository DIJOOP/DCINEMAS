const Booking = require('../models/bookingmodel');
const Theatre = require('../models/theatremodel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');

exports.newBooking = catchAsyncErrors(async (req, res, next) => {
	const { theatre, showdateId, showtimeId, seats } = req.body;

	await Theatre.findByIdAndUpdate(
		{
			_id: theatre
		},
		{
			$set: {
				'shows.$[show].showtime.$[time].seat.$[sea].status': 'Booked'
			}
		},
		{
			arrayFilters: [
				{
					'show._id': showdateId
				},
				{
					'time._id': showtimeId
				},
				{
					'sea.seat_no': {
						$in: seats
					}
				}
			],
			multi: true,
			upsert: false
		}
	);

	req.body.user = req.user.id;

	const booking = await Booking.create(req.body);

	res.status(200).json({
		success: true,
		booking
	});
});

exports.myBookings = catchAsyncErrors(async (req, res, next) => {
	
	const bookings = await Booking.find({ user: req.user.id })
		.populate('theatre', { name: 1, location: 1 })
		.populate('movie', { name: 1, thumbnailimage: 1 })
		.populate('showtime', { time: 1 });

	res.status(200).json({
		success: true,
		bookings
	});
});

// ADMIN

exports.allBooking = catchAsyncErrors(async (req, res, next) => {
	
	const bookings = await Booking.find().populate('theatre', { name: 1, screen: 1 }).populate('movie', { name: 1 });

	res.status(200).json({
		success: true,
		bookings
	});
});

exports.deleteBooking = catchAsyncErrors(async (req, res, next) => {
	const booking = await Booking.findById(req.params.id);

	if (!booking) {
		return next(new ErrorHandler('data does not exist', 404));
	}

	const { theatre, showdateId, showtimeId, seats } = booking;

	await Theatre.findByIdAndUpdate(
		{
			_id: theatre
		},
		{
			$set: {
				'shows.$[show].showtime.$[time].seat.$[sea].status': 'Available'
			}
		},
		{
			arrayFilters: [
				{
					'show._id': showdateId
				},
				{
					'time._id': showtimeId
				},
				{
					'sea.seat_no': {
						$in: seats
					}
				}
			],
			multi: true,
			upsert: false
		}
	);

	await booking.remove();

	res.status(200).json({
		success: true,
		message: 'data deleted successfully'
	});
});
