const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please add a name'],
    unique: true,
    trim:true,
    maxlength:[50,'name cannot be more than 50 chars']
  },
  slug:String,
  description: {
    type: String,
    required: [true, 'please add a name'],
    trim:true,
    maxlength:[500,'desc cannot be more than 500 chars']
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  email:{
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  phone:{
    type: String,
    maxLength: [20, 'Phone number can not be longer than 20 characters']
  },
  address:{
    type:String,
    require: [true, 'Please add an address']
  },
  location: {
    //GeoJSON Point
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress:String,
    street:String,
    city:String,
    state:String,
    zipcode:String,
    country:String,
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other'
    ]
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must not be more than 10"]
  },
  averageCost: Number,
  photo:{
    type:String,
    default: 'no-photo.jpg'
  },
  housing:{
    type: Boolean,
    default:false
  },
  housing: {
    type:Boolean,
    default:false
  },
  jobAssistance:{
    type:Boolean,
    default: false
  },
  jobGuarantee: {
    type: Boolean,
    default: false
  },
  acceptGi: {
    type:Boolean,
    default:false
  },
  createdAt:{
    type:Date,
    default: Date.now
  }, 
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});


//Create bootcamp slug from name
BootcampSchema.pre('save', function(next){
  console.log('Slugify ran',this.name);
  this.slug = slugify(this.name, {lower: true});
  next();
});

BootcampSchema.pre('remove', async function(next){
  await this.model('Course').deleteMany({bootcamp: this._id});
  next();
});

BootcampSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'bootcamp',
  justOne: false
})

//Geocode & create location field
BootcampSchema.pre('save',async function(next){
 const loc = await geocoder.geocode(this.address);
 this.location = {
   type:  'Point',
   coordinates: [loc[0].longitude,loc[0].latitude],
   formattedAddress: loc[0].formattedAddress,
   street: loc[0].streetName,
   city: loc[0].city,
   state: loc[0].stateCode,
   zipcode: loc[0].zipcode,
   country: loc[0].countryCode
 }

 this.address = undefined
  next();
})

module.exports = mongoose.model('Bootcamp',BootcampSchema);
