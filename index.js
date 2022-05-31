require('dotenv').config();
const express = require('express');
const connectToMongo=require('./db');
const cors = require('cors');
const app = express()

app.use(cors())
const port = process.env.PORT || 5000
app.use(express.json());
connectToMongo();

app.use('/api/auth',require('./routes/auth.js'));
app.use('/api/authenticate',require('./routes/userAuth.js'));
app.use('/api/user',require('./routes/bloguser.js'));
app.use('/api/post',require('./routes/post.js'));
app.use('/api/cat',require('./routes/category.js'));

app.use('/api/image',require('./routes/image.js'));

if ( process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(port, () => {
  console.log(`Blog App Backend Listening at http://localhost:${port}`)
})