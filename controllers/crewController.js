const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Crew= require("../models/crewmodel");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require('cloudinary');


exports.createCrewMember=catchAsyncErrors(async(req,res,next)=>{

    
	const saveImage = await cloudinary.v2.uploader.upload(req.body.photo, {
		folder: 'ticketbooking/Celebrities'
	});

	req.body.photo = {
		public_id: saveImage.public_id,
		url: saveImage.secure_url
	};

    const crewmember=await Crew.create(req.body)

    res.status(200).json({
        success:true,
        crewmember
    })
})


exports.getAllCrew=catchAsyncErrors(async(req,res,next)=>{
    const allcrew=await Crew.find()

    res.status(200).json({
        success:true,
        allcrew
    })

})

exports.getCrewMember=catchAsyncErrors(async(req,res,next)=>{

    console.log(req.params.id);
    const crewmember=await Crew.findById(req.params.id)

    if(!crewmember){
        return next(new ErrorHandler("details not found",404))
    }
    res.status(200).json({
        success:true,
        crewmember
    })

})
exports.editCrewMember=catchAsyncErrors(async(req,res,next)=>{

    const person=await Crew.findById(req.params.id)
    if (!person) {
		return next(new ErrorHandler('data not found', 404));
	}

    if (req.body.photo === person.photo.url) {
		req.body.photo = person.photo;
	} else {
		await cloudinary.v2.uploader.destroy(person.photo.public_id);

		const Image = await cloudinary.v2.uploader.upload(req.body.photo, {
			folder: 'ticketbooking/Celebrities'
		});

		req.body.photo = {
			public_id: Image.public_id,
			url: Image.secure_url
		};
	}


    await Crew.findByIdAndUpdate(req.params.id,req.body,{
		new: true,
		runValidators: true,
		useFindAndModify: false,
	})

    res.status(200).json({
        success:true,
        message:"data updated"
    })
})

exports.deleteCreMember=catchAsyncErrors(async(req,res,next)=>{

    const member= await Crew.findById(req.params.id)
    if(!member){
        return next(new ErrorHandler("data not found",404))
    }

   await member.remove()

   res.status(200).json({
       success:true,
       message:"data deleted successfully"
   })


})


