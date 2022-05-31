const multer = require("multer");
const express = require("express");
const router = express.Router();

//Route for Image Upload
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
            cb(null,"images")
    },
    filename:(re,file,cb)=>{
        cb(null,req.body.name);
    }
})
const upload = multer({storage:storage});
router.post("/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
});
module.exports = router;