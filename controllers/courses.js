const ErrorResponse = require('../utils/errorResponse')
const Course = require('../models/Course');
const asyncHandler = require('../middleware/async');

//@desc - get all bootcamps
//@route GET /api/v1/bootcamps/:bootcampID/courses
//@access Public


exports.getCourses = asyncHandler(async (req,res,next) => {
	let query;

	if (req.params.bootcampId){
		query = Course.find({bootcamp: req.params.bootcampId});
	}
	else{
		query = Course.find();
	}

	const courses = await query;

	res.status(200).json({
		success: true,
		count: courses.length,
		data: courses
	})
})

exports.getCourse = asyncHandler(async (req,res,next) => {
	const course = await Course.findById({req.params.id}).populate({
		path: 'bootcamp',
		select: 'name description'
	})

	if(!course){
		return next(new ErrorResponse(`No course with id: ${req.params.id}`))
	}

	res.status(200).json({
		success: true,
		count: courses.length,
		data: courses
	})
})