const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'please enter movie name' ],
		unique: true
	},
	status: {
		type: String,
		required: [ true, 'please add status' ]
	},
	releasedate: {
		type: Date,
		required: [ true, 'please enter release date' ]
	},
	description: {
		type: String,
		required: [ true, 'please enter description' ]
	},
	languages: [
		{
			type: String,
			required: [ true, 'enter film language' ]
		}
	],
	duration: {
		hour: {
			type: String,
			
		},
		minutes: {
			type: String,
		
		}
	},

	genres: [ { type: String } ],

	cast: [
		{
			name: {
				type: String,
				required: true
			},
			personID: {
				type: mongoose.Schema.ObjectId,
				ref: 'Crew',
				required: true
			},
			role: {
				type: String,
				default: 'Actor'
			},
			image: {
				public_id: {
					type: String
					// required: true,
				},
				url: {
					type: String
					// required: true,
				}
			}
		}
	],
	crew: [
		{
			name: {
				type: String,
				required: true
			},
			personID: {
				type: mongoose.Schema.ObjectId,
				ref: 'Crew',
				required: true
			},
			role: {
				type: String,
				required: [ true, 'please add crew role' ]
			},
			image: {
				public_id: {
					type: String
					// required: true,
				},
				url: {
					type: String
					// required: true,
				}
			}
		}
	],

	thumbnailimage: {
		public_id: {
			type: String
			// required: true,
		},
		url: {
			type: String
			// required: true,
		}
	},
	trailer: {
		type: String
		// required: true,
	},
	poster: {
		public_id: {
			type: String
			// required: true,
		},
		url: {
			type: String
			// required: true,
		}
	},
	ratings: {
		type: Number,
		default: 0
	},
	numOfReviews: {
		type:Number,
		default:0
	},
	reviews: [
		{
			user: {
				type: mongoose.Schema.ObjectId,
				ref: 'User',
				required: true
			},
			name: {
				type: String,
				required: true
			},
			rating: {
				type: Number,
				required: true
			},
			category: {
				type: String,
				required: true
			},
			comment: {
				type: String,
				required: true
			},
			date:{
				type: Date,
				required: true
			}
		}
	],
	createdby: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	createdat: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Movie', movieSchema);
