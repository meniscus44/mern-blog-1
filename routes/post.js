const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/BlogUser");
const Category = require("../models/Category");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//Route 1 :Route for Fetch All Posts of  User - Login required
router.get("/fetchmyposts", fetchuser, async (req, res) => {
  try {
    const post = await Post.find({ user: req.user.id });

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error " });
  }
});

//Route 2 :Route for Fetch All Posts
router.get("/fetchallposts", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  const userId = req.query.userid;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({ categories: { $in: [catName] } });
    }
    else if (userId) {
      posts = await Post.find({user:userId});
    }
     else {
      posts = await Post.find();
    }
    

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error " });
  }
});

//Route 3 :Route for Creating Post by  User - Login required
router.post(
  "/addPost",
  [
    // title must be at least 5 chars long
    body("title", "Title must be atleast 3 characters long").isLength({
      min: 3,
    }),
    // description must be an email
    body(
      "description",
      "Description must be atleast 3 characters long"
    ).isLength({ min: 3 }),
  ],
  fetchuser,
  async (req, res) => {
    //checking Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let existingTitle = await Post.findOne({ title: req.body.title });
      if (existingTitle) {
        return res
          .status(400)
          .json({ error: "Post with this title already exists" });
      }

      try {
        const catArray = req.body.categories;
        if (catArray.length) {
          for (var i = 0; i < catArray.length; i++) {
            let existingCategory = await Category.findOne({
              name: catArray[i],
            });
            if (!existingCategory) {
              let cat = await Category.create({
                name: catArray[i],
              });
            }
          }
        }
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error " });
      }

      let postedBy = await User.findOne({ _id: req.user.id });
      const { name } = postedBy._doc;
      let post = await Post.create({
        title: req.body.title,
        description: req.body.description,
        categories: req.body.categories,
        user: req.user.id,
        username: name,
      });

      res.status(200).json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error " });
    }
  }
);

//Route 4 :Route for updating Post by  User - Login required
router.put(
  "/updatepost/:id",
  fetchuser,
  [
    // title must be at least 5 chars long
    body("title", "Title must be atleast 3 characters long").isLength({
      min: 3,
    }),
    // description must be an email
    body(
      "description",
      "Description must be atleast 3 characters long"
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    //checking Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let existingTitle = await Post.findOne({ title: req.body.title });

      if (existingTitle && existingTitle._id.toString() !== req.params.id) {
        return res
          .status(400)
          .json({ error: "Post with this title already exists" });
      }

      //find the post to be updated
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(400).json({ error: "Not Found " });
      }
      //Find Authorised user to update post
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ error: "Access Denied!" });
      }

      try {
        const catArray = req.body.categories;
        if (catArray.length) {
          for (var i = 0; i < catArray.length; i++) {
            let existingCategory = await Category.findOne({
              name: catArray[i],
            });
            if (!existingCategory) {
              let cat = await Category.create({
                name: catArray[i],
              });
            }
          }
        }
       
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error " });
      }

      const mypost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );



       //checking for unmapped categories and deleting it
       const categoryList = await Category.find().select("name");

       if (categoryList.length) {
         categoryList.map(async (cat) => {
           const postWithCategory = await Post.find({
             categories: { $in: [cat.name] },
           });

           if (postWithCategory.length === 0) {
            
             await Category.deleteOne({ name: cat.name });
           }
         });
       }



      res.status(200).json(mypost);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error " });
    }
  }
);

const deleteUnmappedCategories = async () => {};

//Route 5  :Route for Deleting Post by  User - Login required
router.delete("/deletepost/:id", fetchuser, async (req, res) => {
  try {
    //find the post to be deleted
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: "Not Found " });
    }
    //Find Authorised user to delete post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Access Denied!" });
    }

    const mypost = await Post.findByIdAndDelete(req.params.id);

    //checking for unmapped categories and deleting it
    const categoryList = await Category.find().select("name");

    if (categoryList.length) {
      categoryList.map(async (cat) => {
        const postWithCategory = await Post.find({
          categories: { $in: [cat.name] },
        });

        if (postWithCategory.length === 0) {
         
          await Category.deleteOne({ name: cat.name });
        }
      });
    }



    res
      .status(200)
      .json({ message: "Success - Post has been Deleted", post: mypost });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error " });
  }
});

//Route 6 :Route for Fetching  Post by Id 
router.get("/getpost/:id",  async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error " });
  }
});



module.exports = router;
