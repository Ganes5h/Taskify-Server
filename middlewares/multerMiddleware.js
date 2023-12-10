const multer = require("multer");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    const uniqueFileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

module.exports = upload.single("profileImage");
