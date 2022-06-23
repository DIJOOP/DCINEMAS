const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'Please enter a name' ],
		maxlength: [ 30, 'name must be maximum 30 characters' ],
		minlength: [ 3, 'name must be minimum 3 charectors' ]
	},
	email: {
		type: String,
		required: [ true, 'plaese enter your email' ],
		unique: true,
		validate: [ validator.isEmail, 'please enter valid email' ]
	},

	password: {
		type: String,
		required: [ true, 'please enter your password' ],
		minlength: [ 8, 'password must be minimum 8 charectors' ],
		select: false
	},
	location:{type: String},
	phone: {
        type: String,
		required: [ true, 'please enter phonenumber' ],
        minlength: [ 10, 'password must be minimum 10 charectors' ],
        maxlength: [ 10, 'password must be maximum 10 charectors' ], 
	},
	avatar: {
		public_id: {
			type: String
			// required: true
		},
		url: {
			type: String
			// required: true
		}
	},
	role: {
		type: String,
		default: 'user'
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date
});

// BCRYPT PASSWORD
userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

// COMPARE PASSWORD

userSchema.methods.comparePassword = async function(password) {
	return await bcrypt.compare(password, this.password);
};

// JWT TOKEN
userSchema.methods.getJWTtoken = function() {
	return jwt.sign(
		{
			id: this._id
		},
		process.env.JWT_SECRET_KEY,
		{ expiresIn: process.env.JWT_EXPIRE }
	);
};

userSchema.methods.getResetPasswordToken = function() {
	// generate token

	const resetToken = crypto.randomBytes(20).toString('hex');

	this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

module.exports = mongoose.model('User', userSchema);
