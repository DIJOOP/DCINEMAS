const mongoose = require('mongoose');

const seat = [];

let chars = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ];

for (var i = 0; i < 10; i++) {
	for (var j = 1; j <= 11; j++) {
		seat.push({ seat_no: j + chars[i], status: 'Available' });
	}
}
const theatreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	state: {
		type: String,
		default: 'Kerala'
	},
	district: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	pincode: {
		type: Number,
		required: true
	},
	screen: {
		type: String,
		required: true
	},

	ticketPrice: {
		type: Number,
		required: true
	},
	convenienceFee: {
		type: Number,
		required: true
	},

	currentMovie: {
		type: mongoose.Schema.ObjectId,
		ref: 'Movie',
		required: true
	},
	nowshowing: {
		filmName:{
			type: String,
			required: true
		},

		language:{
			type: String,
			required: true
		}
		
		
	},

	shows: [
		{
			date: {
				type: Date,
				required: true
			},
			showtime: [
				{
					time: {
						type: String,
						required: true,
						
					},
					seat: { type: Array, default: seat }
				}
			]
		}
	]
});

module.exports = mongoose.model('Theatre', theatreSchema);
