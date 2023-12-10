// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // Hash the password before saving it to the database
// userSchema.pre("save", async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "//Client/taskify/src/proimages");
  },
  filename: function (req, file, cb) {
    const uniqueFileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String }, // New field for storing the image filename
  profileImagePath: { type: String }, // New field for storing the image file path
});

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Multer middleware to handle profile image upload
userSchema.statics.uploadProfileImage = upload.single("profileImage");

const User = mongoose.model("User", userSchema);

module.exports = User;
