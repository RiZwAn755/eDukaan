const express = require("express");
const cors = require("cors"); // error k liye 


const jwt = require('jsonwebtoken');
const jwtkey = "commweb";

const User = require("./DB/User");    // user ka schema  connected to mongodb
const Product = require("./DB/product");  // product ka schema  connected to mongodb

require("./DB/config"); // connecting with mongodb

const app = express();

const helmet = require("helmet"); // ek ta
app.use(helmet());

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "interest-cohort=()");
  next();
});


function verifyToken(req, resp, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;

    jwt.verify(req.token, jwtkey, (err, authData) => {
      if (err) {
        resp.status(401).json({ message: "Invalid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).json({ message: "Token not found" });
  }
}

// Routes

app.post("/reg", async (req, resp) => {
  // console.log("Received Data:", req.body);

  let user = new User(req.body);
  await user.save(); // user ko database me save kiya

  user = user.toObject(); // mongoose data to object me convert krne k liye
  delete user.password; // password ko remove kr diya ab ye api k response me nhi dikhega

  // resp.send(user);  // api ka response send kiya , incase of jwt following code likhenge
  jwt.sign({user} ,jwtkey, {expiresIn:"2h"} ,  (error , token)=>{
                
    if(error)
    {
        resp.send({result:"something went wrong"});
    }

    resp.send({user, token:token});
  

})

});



app.post("/login", async (req, resp) => {
  
    let user = await User.findOne({ email: req.body.email, password:req.body.password }).select("-password");

    if (!user) {
      return resp.status(404).send({ error: "User not found" });
    }
   else{
    jwt.sign({user} ,jwtkey, {expiresIn:"2h"} ,  (error , token)=>{
                
             if(error)
             {
                 resp.send({result:"something went wrong"});
             }

             resp.send({user, token:token});

    })
    
   }});


app.post("/add-product" ,  async (req , resp) =>{
      
  let product = new Product(req.body); // only creates an instance; it doesn't add it to the database yet.
  let result = await product.save();  // new product ko save kiya
                                 
  resp.send(result);                 // saved product ko as a response sedn krne k liye
  
});


app.get("/prodlist", verifyToken,async (req, resp) => {
  try {
    let products = await Product.find(); // Find all products in the Product collection
    resp.status(200).json(products); // Send response with status code
  } catch (error) {
    resp.status(500).json({ error: "Internal Server Error" }); // Handle errors
  }
});

app.delete("/product/:id" , async(req , resp) => {

  const result = await Product.deleteOne({_id:req.params.id});
     resp.send(result);

})

app.get("/product/:id" ,verifyToken ,  async(req , resp) => {

  const result = await Product.findOne({_id:req.params.id});
  if(result)
     resp.send(result);
    else 
    resp.send("no product found");

})


app.put("/product/:id", verifyToken, async (req, resp) => {
  
      const result = await Product.updateOne(
          { _id: req.params.id },   // Correct syntax for the filter
          { $set: req.body }
      );

      resp.send(result);
 
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  
      let result = await Product.find({
          "$or": [
              { name: { $regex: req.params.key, $options: "i" } },
              { company: { $regex: req.params.key, $options: "i" } }
          ]
      });

      if (result.length > 0) {
          resp.send(result);
      } else {
          resp.status(404).send({ message: "No products found" });
      }
  
});



app.listen(5000);