const express = require('express');

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  deleteBootcamp,
  updateBootcamp,
  getBootcampsInRadius
} = require('../controllers/bootcamps');

const router = express.Router();
const courseRouter = require('./courses')

//Route into ohter resource routers
router.use('/:bootcampId/courses',courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/')
.get(getBootcamps)
.post(createBootcamp);

router.route('/:id')
.get(getBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp)

module.exports = router;
