const Bootcamp = require('../models/Bootcamp');

//@desc - get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = async (req,res,next) => {
  try{
    const bootcamps = await Bootcamp.find();
    res.status(200).json({success:true,data:bootcamps});
  }
  catch (err){
      res.status(400).json({success:false});
  }
}


//@desc - get single bootcamp by ID
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = async (req,res,next) => {
  try{
    const bootcamp = await Bootcamp.findById(req.params.id);
    res.status(200).json({success: true, data:bootcamp});
  }
  catch(err){
    res.status(400).json({success: false})
  }
}


//@desc - Create new bootcamp
//@route POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = async (req,res,next) => {
  try{
    console.log(req.body);
    const bootcamp = await Bootcamp.create(req.body);
    res.status(200).json({
      success: true,
      msg: `Creating bootcamp`,
      data:bootcamp
    });
  }
  catch(err) {
    res.status(400).json({success: false});
  }

}


//@desc - update bootcamp by ID
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = async (req,res,next) => {
  try{
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
      new: true,
      runValidators:true
    });

    if(!bootcamp){
      res.status(400).json({success:false});
    }
    else{
      res.status(200).json({success: true, data:bootcamp});
    }
  }
  catch{
    res.status(400).json({sucess:false});
  }
}


//@desc - delete bootcamp by ID
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = async (req,res,next) => {
  try{
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id,req.body);

    if(!bootcamp){
      res.status(400).json({success:false});
    }
    else{
      res.status(200).json({success: true, data:{}});
    }
  }
  catch(err){
    console.log(err);
    res.status(400).json({success:false});
  }
}
