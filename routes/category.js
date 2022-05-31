const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/BlogUser");
const Category = require("../models/Category");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//Route 1 :Route for Fetch All Categories - Login required
router.get("/getAllCategories", async (req, res) => {
  try {
    let cat = await Category.find();

    res.status(200).json(cat);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error " });
  }
});

//Route 2 :Route for Creating Category by  User - Login required
router.post(
  "/addCategory",
  [
    // name must be at least 5 chars long
    body("name", "Title must be atleast 3 characters long").isLength({
      min: 3,
    })
  ],
  fetchuser,
  async (req, res) => {
    //checking Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let existingTitle = await Category.findOne({ name: req.body.name });
      if (existingTitle) {
        return res
          .status(400)
          .json({ error: "Category with this name already exists" });
      }
      
      let cat = await Category.create({
        name: req.body.name
      });

      res.json(cat);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error " });
    }
  }
);

module.exports = router;
