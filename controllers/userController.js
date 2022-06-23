const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/usermodel');
const ErrorHandler = require('../utils/ErrorHandler');
const sendToken = require('../utils/jwtToken');
const { sendEmail } = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// REGISTER USER
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const { confirmPassword, password } = req.body;
	if (!confirmPassword || confirmPassword != password) {
		return next(new ErrorHandler('entred passwords not match', 404));
	}

	const user = await User.create(req.body);

	sendToken(user, 200, res);
});

// USER LOGIN
exports.userLogin = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorHandler('enter valid email and password', 404));
	}
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorHandler('user doesnt exist', 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHandler('invalid password', 401));
	}
	sendToken(user, 200, res);
});

// GET USER DETAILS

exports.getUserDetail = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return next(new ErrorHandler('user not found', 404));
	}

	res.status(200).json({ success: true, user });
});

// UPDATE USER DETAILS

exports.updateUserDetail = catchAsyncErrors(async (req, res, next) => {
	const newUserdata = {
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone
	};

	if (req.body.avatar != '') {
		const user = await User.findById(req.user.id);

		user.avatar.public_id ? await cloudinary.v2.uploader.destroy(user.avatar.public_id) : '';

		const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
			folder: 'avatars',
			width: 150,
			crop: 'scale'
		});

		newUserdata.avatar = {
			public_id: myCloud.public_id,
			url: myCloud.secure_url
		};
	}

	const user = await User.findByIdAndUpdate(req.user.id, newUserdata, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	});
	res.status(200).json({ success: true });
});

// CHANGE USER PASSOWRD

exports.changeUserPassword = catchAsyncErrors(async (req, res, next) => {

	const { oldPassword, newPassword, confirmPassword } = req.body;
	const user = await User.findById(req.user.id).select('+password');

	const isPasswordMatch = await user.comparePassword(oldPassword);
	if (!isPasswordMatch) {
		return next(new ErrorHandler('invalid password', 400));
	}
	if (newPassword !== confirmPassword) {
		return next(new ErrorHandler('entered passwords not same', 400));
	}

	user.password = newPassword;
	await user.save();
	res.status(200).json({ success: true });
});

// FORGET PASSWORD

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne(req.body.email);

	if (!user) {
		return next(new ErrorHandler('user doesnt exist', 404));
	}
	const resetToken = user.getResetPasswordToken();
	await user.save({ validateBeforeSave: false });

	const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

	const message = `your password reset token is :- \n\n ${resetPasswordUrl} \n\n please ignore if you are not requested this email!!!!`;

	try {
		await sendEmail({ email: user.email, subject: 'password recovery', message });
		res.status(200).json({
			success: true,
			message: `email sent to ${user.email} successfully`
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save({ validateBeforeSave: false });
		return next(new ErrorHandler(error.message, 500));
	}
});

// RESET PASSWORD WITH LINK

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: {
			$gt: Date.now()
		}
	});

	if (!user) {
		return next(new ErrorHandler('resetpassword token is invalid or expired', 400));
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler('entered passwords dosnt match', 400));
	}
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();
	res.send(200).json({
		success: true
	});
});

// USER LOGOUT

exports.userLogout = catchAsyncErrors(async (req, res, next) => {
	res
		.status(200)
		.cookie('token', null, {
			expires: new Date(Date.now()),
			httpOnly: true
		})
		.json({ success: true, message: 'loggedOut successfully' });
});

// <===== ADMIN CONTROLLERS =====>

exports.getAllusers = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		success: true,
		users
	});
});

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(new ErrorHandler('user not found', 404));
	}

	res.status(200).json({
		success: true,
		user
	});
});

exports.editUser = catchAsyncErrors(async (req, res, next) => {
	console.log(req.params.id);
	const newuserdata = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
		phone: req.body.phone
	};
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(new ErrorHandler('user not found', 404));
	}

	await User.findByIdAndUpdate(req.params.id, newuserdata, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	});

	res.status(200).json({
		success: true
	});
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
	console.log(req.params.id);
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(new ErrorHandler('user not found', 404));
	}

	await user.remove();

	res.status(200).json({
		success: true,
		message: 'user deleted successfully'
	});
});

exports.changeUserLocation = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	if (!user) {
		return next(new ErrorHandler('user not found', 404));
	}

	user.location = req.body.location;
	const newUser = await user.save();

	res.status(200).json({
		success: true,
		location: newUser.location,
		message: 'location changed successfully'
	});
});
