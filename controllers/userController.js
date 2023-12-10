// const User = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   // res.send("register");
//   try {
//     const { username, email, password } = req.body;
//     // Check if the user with the provided email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }
//     // Create a new user
//     const newUser = new User({ username, email, password });
//     await newUser.save();
//     res.status(201).json({ message: "Registration successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// exports.login = async (req, res) => {
//   // res.send("login");
//   try {
//     const { email, password } = req.body;
//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     // Check if the provided password matches the hashed password in the database
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     // Generate a JWT token
//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: "1h", // Token expiration time
//       }
//     );
//     res.status(200).json({ token, userId: user._id });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user with profile image filename and path
    const newUser = new User({
      username,
      email,
      password,
      profileImage: req.file.filename, // Access the uploaded file information
      profileImagePath: req.file.path, // Full file path
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  // res.send("login");
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h", // Token expiration time
      }
    );
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUSER = async (req, res) => {
  const USERId = req.params.id;

  try {
    const task = await User.findOne({ _id: USERId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
