require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/BlogUser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Route1 : Route for creating a user (Signup)
router.post(
  "/register",
  [
    // Name must be at least 5 chars long
    body("name", "Name must be atleast 5 characters long").isLength({
      min: 5,
    }),

    // email must be an email
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //checking Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    //const user=User(req.body);
    //user.save();
    //res.json(req.body);

    //secret for json web token
    const JWT_SECRET = process.env.JWT_SEC;

    try {
      //Check if user with same email already exist
      let existingUserEmail = await User.findOne({ email: req.body.email });
      if (existingUserEmail) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }
      //Salt & hashing Password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //jwt
      const data = {
        user: {
          id: user.id,
        },
      };
      var authToken = jwt.sign(data, JWT_SECRET);

      //res.json({authToken});
      res.status(200).json({ data:"User has been registered successfully" });

      //.then(user => res.json(user)).catch(err=>
      //  res.status(400).json({ error: 'Please Enter a unique value for email',message:err.message}));
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ error: "Internal Server Error- " + error.message });
    }
  }
);

//Route 2 :Route for User login (Login)
router.post(
  "/login",
  [
    // email must be an email
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password cannot be blank").exists({ min: 5 }),
  ],
  async (req, res) => {
    //checking Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const JWT_SECRET = process.env.JWT_SEC;
    const { email, password } = req.body;
    try {
      let userCheck = await User.findOne({ email });

      if (!userCheck) {
        return res.status(400).json({ error: "Incorrect Credentials" });
      }
      const bcryptCompare = await bcrypt.compare(password, userCheck.password);
      if (!bcryptCompare) {
        return res.status(400).json({ error: "Incorrect Credentials" });
      }
      const payload = {
        user: {
          id: userCheck.id,
        },
      };

      var authToken = jwt.sign(payload, JWT_SECRET);

      res.status(200).json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error " });
    }
  }
);

module.exports = router;
