//@desc - get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = (req,res,next) => {
  res.status(200).json({
    success: true,
    msg: "Show all bootcamps"
  });
}


//@desc - get single bootcamp by ID
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = (req,res,next) => {
  res.status(200).json({
    success: true,
    msg: `Getting bootcamp with id:${req.params.id}`
  });
}


//@desc - Create new bootcamp
//@route POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = (req,res,next) => {
  res.status(200).json({
    success: true,
    msg: `Creating bootcamp`
  });
}


//@desc - update bootcamp by ID
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = (req,res,next) => {
  res.status(200).json({
    success: true,
    msg: `Updating bootcamp with id:${req.params.id}`
  });
}


//@desc - delete bootcamp by ID
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = (req,res,next) => {
  res.status(200).json({
    success: true,
    msg: `Deleting bootcamp with id:${req.params.id}`
  });
}
