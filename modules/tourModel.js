const mongoose = require('mongoose');
const tour = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      minlength: [3, "ism 3 tadan kam bo'lmasligi kerak"],
      maxlength: [40, "ism 40 tadan ko'p bo'lmasligi kerak"],
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
      min: [1, 'durationga 1 dan kichik qiymat kiritdingiz:'],
      max: [100, 'durationga 100 dan katta qiymat kiritdingiz:'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
      validate: {
        validator: function (val) {
          if (Number.isInteger(val) && val > 0) {
            return true;
          }
          return false;
        },
        message: "Siz no'tog'ri son kiritdingiz",
      },
    },
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: "Siz difficultiga  xato ma'lumot kiritdingiz",
      },
      required: [true, 'A tour must have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    secretInfo: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have price'],
    },
    priceDiscount: {
      type: Number,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a imgae cover'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tour.virtual('haftaDavomEtishi').get(function () {
  return this.duration / 7;
});

// Document Middleware

tour.pre('save', function (next) {
  this.name += '23';
  this.startTime = Date.now();
  next(); 
});

tour.post('save', function (doc, next) {
  console.log(doc);
  next();
});
// Query Middleware
tour.pre('find', function (next) {
  this.find({ secretInfo: { $ne: false } });
  next();
});

tour.post('find', function (doc, next) {
  console.log(doc);
  next();
});

const TourModel = mongoose.model('usersU', tour);

module.exports = TourModel;
