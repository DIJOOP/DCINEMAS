const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique:true,
	},
	birthday: {
		type: Date,
		
	},
	place: {
		type: String,
	},

	district: {
		type: String,
	},
    state:{
        type:String,
    },
    country:{
        type:String,
    },
    workedAs:[{type:String}],
    description:[{
        title:{
            type:String,
        },
        detail:{
            type:String
        }
    }],
	photo: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		}
	},
	about: {
		type: String,
		required: true,
	}
});

module.exports = mongoose.model('Crew', crewSchema);
