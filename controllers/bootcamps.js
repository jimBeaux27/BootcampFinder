const ErrorResponse = require('../utils/errorResponse')
const Bootcamp = require('../models/Bootcamp');
const geocoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/async');


//@desc - get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler(async (req,res,next) =>
  {
      let query;
      const reqQuery = {...req.query};
      const removeFields = ['select'];
      removeFields.forEach(param => delete reqQuery[param]);

      //Create query
      let queryStr = JSON.stringify(reqQuery);

      //Create operators ($gt, $gte)
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
      query = Bootcamp.find(JSON.parse(queryStr));


      if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
        console.log(fields);
      }

      const bootcamps = await query;


      res.status(200).json({success:true,data:bootcamps,count:bootcamps.length});
  }
);


//@desc - get single bootcamp by ID
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = asyncHandler(async (req,res,next) => {
      const bootcamp = await Bootcamp.findById(req.params.id);
      if(!bootcamp){
        return next(
          new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404)
        );
      }
      res.status(200).json({success: true, data:bootcamp});
  }
);


//@desc - Create new bootcamp
//@route POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = asyncHandler(async (req,res,next) => {
      console.log(req.body);
      const bootcamp = await Bootcamp.create(req.body);
      res.status(200).json({
        success: true,
        msg: `Creating bootcamp`,
        data:bootcamp
      });
  }
);




//@desc - update bootcamp by ID
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = asyncHandler(
  async (req,res,next) => {
      const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true
      });

      if(!bootcamp){
        return next(
          new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404)
        );
      }
      else{
        res.status(200).json({success: true, data:bootcamp});
      }
    }
)


//@desc - Get bootcamps within a radius
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access Private
exports.getBootcampsInRadius = asyncHandler(
  async (req,res,next) => {
      const {zipcode, distance} = req.params;
      const loc = await geocoder.geocode(zipcode);
      const lat = loc[0].latitude
      const lng = loc[0].longitude;

      //Calc radius using radians
      //Divide dist by radius of Earth
      //Earth Radius = 3,963 mis

      const radius = distance/3963;//divide dist by radius of earth

      const bootcamps = await Bootcamp.find({
          location: {$geoWithin: {$centerSphere: [[lng, lat],radius]}}
      });
      res.status(200).json(
        {
          success: true,
        count: bootcamps.length,
        data:bootcamps
        }
      );
  }
)


//@desc - delete bootcamp by ID
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = asyncHandler(
  async (req,res,next) => {
      const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id,req.body);

      if(!bootcamp){
        return next(
          new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404)
        );
      }
      else{
        res.status(200).json({success: true, data:{}});
      }
  }
)
