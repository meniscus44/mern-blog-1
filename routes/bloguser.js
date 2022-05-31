require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/BlogUser");
const Post = require("../models/Post");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

//Route 1 :Route for Updating user details - Login required

router.put(
  "/:id",
  fetchuser,
  [
    // Name must be at least 5 chars long
    body("name", "Name must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user_upd = {};
      if (req.body.name) {
        user_upd.name = req.body.name;
      }
      if (req.body.profilePic) {
        user_upd.profilePic = req.body.profilePic;
      }
      //find the user to be updated
      const userkey = await User.findById(req.params.id);
      //  console.log(userkey);
      if (!userkey) {
        return res.status(400).json({ error: "User Not Found " });
      }
      //Find Authorised user to update user
      if (req.params.id !== req.user.id) {
        return res.status(401).json({ error: "Access Denied!" });
      }
      if (userkey && req.params.id === req.user.id) {
         const userInPost = await Post.find({user:req.params.id});
        if(userInPost){
         await Post.updateMany({user:userInPost[0].user},{username:user_upd.name});
      }
        const myUser = await User.findByIdAndUpdate(req.params.id, user_upd, {
          new: true,
        });
        // console.log(myUser)
        const { password, ...others } = myUser._doc;
        res.status(200).json(others);
        //myUser.save();
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error " });
    }
  }
);

//Route 2 :Route for Deleting user details - Login required

router.delete("/:id", fetchuser, async (req, res) => {
  try {
    //find the user to be deleted
    const userkey = await User.findById(req.params.id);

    if (!userkey) {
      return res.status(400).json({ message: "User Not Found " });
    }
    //Find Authorised user to delete user
    if (req.params.id !== req.user.id) {
      return res.status(401).json({ message: "Access Denied!" });
    }
    if (userkey && req.params.id === req.user.id) {
      await Post.deleteMany({ user: userkey._id });

      const myuser = await User.findByIdAndDelete(req.params.id);

      res.status(200).json({ data: "User has been Deleted Successfully" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error " });
  }
});


//Route 4 :Route for Get User Detail (user Details) Login required
router.post("/:id", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    if (req.params.id !== userId) {
      return res.status(401).json({ message: "Access Denied!" });
    } else {
      const user = await User.findById(req.params.id).select("-password");
      const { password, ...others } = user._doc;
      res.status(200).json({ user: others });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error " });
  }
});



module.exports = router;
