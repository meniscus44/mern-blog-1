const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'blogUser'
      },
      username:{
        type: String
      },
      title: {
        type: String,
        required: true,
        unique: true
      },
      description: {
        type: String,
        required: true
      },
      photo:{
        type: String
      },
      categories: {
        type: Array,
        required: false
      },
},{timestamps : true});
module.exports= mongoose.model('post',PostSchema);