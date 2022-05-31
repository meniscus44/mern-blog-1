require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/BlogUser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");


//Route 1 :Route to Get ALl  User List -Login required
router.post("/getAllUsers", fetchuser, async (req, res) => {
  try {
    // const userId = req.user.id;

    const user = await User.find().select("name");
    // const {name,...others}=user._docs;

    res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error " });
  }
});

//Route 2 :Route for Updating password  - Login required

router.put(
  "/password",
  fetchuser,
  [
    // password must be at least 5 chars long
    body("newPassword", "Password must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const { oldPassword, newPassword } = req.body;
    const newPass = {};
    if (req.body.newPassword) {
      //Salt & hashing Password
      const salt = await bcrypt.genSalt(10);
      req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);

      newPass.password = req.body.newPassword;
    }

    try {
      //find the user to be updated
      const userId = req.user.id;
      const userkey = await User.findById(userId);
      //  console.log(userkey);
      if (!userkey) {
        return res.status(400).json({ error: "User Not Found " });
      }

      const bcryptCompare = await bcrypt.compare(
        req.body.oldPassword,
        userkey.password
      );
      if (!bcryptCompare) {
        return res.status(400).json({ error: "Incorrect Credentials" });
      }

      if (req.body.newPassword) {
        const myUser = await User.findByIdAndUpdate(req.user.id, newPass, {
          new: true,
        });
        // console.log(myUser)
        // const {password, ...others} = myUser._doc;
        res.status(200).json({ data: "Password updated successfully" });
      }
      //myUser.save();
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error " });
    }
  }
);

module.exports = router;
