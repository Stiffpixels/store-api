require("dotenv").config();
const mongoose = require('mongoose');
const products = require('./models/productModel.js');
const connDb = require("./db/connect.js");
const prodList = require("./productsList.json");


const ins = async ()=>{
  try{
    await connDb(process.env.MONGO_URI);
    await products.insertMany(prodList);
    const consRes = await products.find();
    console.log(consRes);
    console.log("Success");
    process.exit(0);
  }
  catch(err){
    console.log(err);
    process.exit(1);
  }
};
ins();