require('dotenv').config();
// express async errors
const express = require('express');
const app = express();
require('express-async-errors');
const productsRouter = require('./routes/productRoutes.js');

const connDb = require('./db/connect.js');

const errorHandler = require('./errorHandler.js');
const notFound = require('./NotFound.js');

//middleware
app.use(express.json());

//routes
app.get("/", (req,res)=>{
  res.status(200).send("<h1>Store Api</h1><a href='/api/v1/products'>products</a>");
});

//products
app.use("/api/v1/products", productsRouter);


app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 9999;

const start = async ()=>{
  try{
    await connDb(process.env.MONGO_URI);
    app.listen(port, ()=>console.log(`Server is listening on port ${port}`));
  } catch(e){
    console.log(e);
  }
};
start();