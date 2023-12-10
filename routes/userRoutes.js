// const express = require("express");
// const router = express.Router();
// const UserController = require("../controllers/userController");
// const authMiddleware = require("../middlewares/authMiddleware");

// //user routes

// router.post("/register", UserController.register);
// router.post("/login", UserController.login);

// module.exports = router;

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
// const multerMiddleware = require("../middlewares/multerMiddleware");

//user routes

router.post("/register", UserController.register);
router.get("/register/:id", authMiddleware, UserController.getUSER);
router.post("/login", UserController.login);

module.exports = router;
