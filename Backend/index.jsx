const bcryptjs =require ("bcryptjs");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv=require("dotenv");
dotenv.config();
const app = express({limit:'100mb'});

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080;




mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
       console.log('MongoDB connected');
    })
    .catch(()=>{
    console.log('MongoDB error')});
  

  const userSchema=new mongoose.Schema({
    firstName:String,
   lastName:String,
  //  email:{
  //   type:String,
  //   unique:true
  //  },
  email:String,
   password:String,
   confirmpassword:String,
   image:String
})
const userModel=mongoose.model('users',userSchema);  


app.get('/',(req,res)=>{
    res.status(200).send('Server is running');
})


const productSchema = new mongoose.Schema({
  firstName:String,
  lastName:String,
  email:String,
  password:String,
  confirmpassword:String,
  image:String
});
const User = mongoose.model('User', productSchema);
app.get('/search', async (req, res) => {
  try {
    const query = req.query.q 

    const regex = new RegExp(query,'i','g')
    const product = await User.find({
      "$or" : [
        {
            productName : regex
        },
        {
            category : regex
        }
    ]
    });

    res.json({
      data  : product ,
      message : "Search Product list",
      error : false,
      success : true
  })
  } catch (error) {
    res.json({
      message : err.message || err,
      error : true,
      success : false
  })
  }
});



   app.post('/signup', async (req, res) => {
    const { email } = req.body;
  
    try {
      const result = await userModel.findOne({ email: email });
  
      console.log(result);
  
      if (result) {
        res.send({ message: "Email id is already register", alert: false });
      } else {
        const data = new userModel(req.body);
        await data.save(); // wait for the save to complete
        res.send({ message: "Successfully sign up", alert: true });
      }
  
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Server error", alert: false });
    }
  });

  app.post('/login', async (req, res) => {
    console.log(req.body);
    const { email,password } = req.body;
  
    try {
      const result = await userModel.findOne({ email: email,password:password});
  
      if (result) {
        console.log(result);
        const datasend = {
          _id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image
        };
        console.log(datasend);
        res.send({ message: "Login successfully", alert: true, data: datasend });
      } else {
        res.send({ message: "Email not found", alert: false });
      }
  
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Server error", alert: false });
    }
  });
  
//product section
  
const schemaProduct = mongoose.Schema({
  name: String,
  category:String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product",schemaProduct)
    
  //save product in data 
 
  app.post("/uploadProduct",async(req,res)=>{
    console.log(req.body)
   const data = await productModel(req.body)
   const datasave = await data.save()
   res.send({message : "Upload successfully"})
})

//data
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})
app.listen(PORT,(res,req)=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})