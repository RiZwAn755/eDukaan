const express = require("express");
const cors = require("cors");
const User = require("./DB/User");
const Product = require("./DB/product");
require("./DB/config");
const app = express();
const helmet = require("helmet");
app.use(helmet());

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "interest-cohort=()");
  next();
});



// Routes

app.post("/reg", async (req, resp) => {
  console.log("Received Data:", req.body);

  let user = new User(req.body);
  await user.save();
  user = user.toObject();
  delete user.password;
  resp.send(user);

});



app.post("/login", async (req, resp) => {
  try {
    let user = await User.findOne({ email: req.body.email }).select("-password");

    if (!user) {
      return resp.status(404).send({ error: "User not found" });
    }
   
    resp.send(user);
  } catch (error) {
    console.error("Login Error:", error);
    resp.status(500).send({ error: "Internal Server Error" });
  }

});


app.post("/add-product" , async (req , resp) =>{
      
  let product = new Product(req.body);
  let result = await product.save();

  resp.send(result);
  
});


app.listen(5000);