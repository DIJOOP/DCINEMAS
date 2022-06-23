const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const User = require('../models/usermodel');

// CHECK AUTHENTICATION
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
	console.log(req.cookies);
	const { token } = req.cookies;

	if (!token) {
		return next(new ErrorHandler('please login to access', 401));
	}

	const decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);

	req.user = await User.findById(decodeData.id);

	next();
});

// ADMIN AUTHENTICATION

exports.isAdmin = (req, res, next) => {
	console.log(req.user);
	if (req.user.role !== 'admin') {
		return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this`, 403));
	}
	next();
};
