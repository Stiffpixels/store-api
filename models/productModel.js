const mongoose = require("mongoose");
const prodSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, 'Please provide the name']
  },
  featured:{
    type:Boolean,
    default:false
  },
  rating:{
    type:Number,
    default:4.0
  },
  createdAt:{
    type:Date,
    default: Date.now()
  },
  price:{
    type:Number,
    required:[true, 'Please provide the price']
  },
  company:{
    type:String,
    enum:{
      values:['ikea', 'liddy', 'caressa', 'marcos'],
      message:'{VALUE} is not supported'
    }
    //enum:['ikea', 'liddy', 'caressa', 'marcos']
  },
  category:String,
  stock:{
    type:Boolean,
    default:true
  }

});

module.exports = mongoose.model('Product', prodSchema);