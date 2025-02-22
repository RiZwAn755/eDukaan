const express = require("express");
const cors = require("cors");
const User = require("./DB/User"); // Ensure this model is correctly imported
require("./DB/config");
const app = express();
const helmet = require("helmet");
app.use(helmet());




app.use(cors()); 
app.use(express.json()); // ✅ Middleware to parse JSON (MUST be before routes)

app.use((req, res, next) => {
      res.setHeader("Permissions-Policy", "interest-cohort=()");
      next();
  });


app.post("/reg", async (req, resp) => {
      console.log("Received Data:", req.body); // ✅ Check request payload
    
        
      const user = new User(req.body);
      await user.save();
    
     
    });

    app.listen(5000);