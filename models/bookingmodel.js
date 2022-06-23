const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	movie: {
		type: mongoose.Schema.ObjectId,
		ref: 'Movie',
		required: true
	},
	theatre: {
		type: mongoose.Schema.ObjectId,
		ref: 'Theatre',
		required: true
	},
	showdate: {
		type: Date,
		required: true
	},
	showdateId:{
		type: mongoose.Schema.ObjectId,
		ref: 'Theatre',
		required: true
	},
	showtime:{
		type: String,
			required: true
	},
	showtimeId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Theatre',
		required: true
	},
	seats: [],
	ticketCharge: {
		type: Number,
		required: true
	},
	extracharges: {
		type: Number,
		required: true
	},
	bookingAmount: {
		type: Number,
		required: true
	},
	paymentInfo: {
		id: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true
		},
		method: {
			type: String,
			required: true
		},
	},

	bookedAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Booking', bookingSchema);
