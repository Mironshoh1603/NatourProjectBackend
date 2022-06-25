const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name shart'],
    minlength: [2, "2 ta belgidan ko'p bo'lishi kerak"],
    maxlength: 64,
  },
  email: {
    type: String,
    unique: [true, 'Bu email foydalanilgan'],
    required: true,
    lowercase: true,
    validate: {
      validator: function (val) {
        validator.isEmail(val);
      },
      message: "bu email bo'lishi kerak",
    },
  },
  photo: { type: String },
  password: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: function (val) {
        validator.isStrongPassword(val);
      },
      message: 'Siz  kuchli Password kiritishingiz kerak!',
    },
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "bu parol 1-parol bilan to'g'ri kelmayapti",
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hashPassword = await bcrypt.hash(this.password, 12);
  this.password = hashPassword;
  this.passwordConfirm = undefined;
});

const User = mongoose.model('user', userSchema);

module.exports = User;
