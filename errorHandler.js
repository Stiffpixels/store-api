const errorHandlerFunc = (err, req,res, next)=>{
  console.log(err);
  return res.status(500).send("Something went wrong");
};

module.exports = errorHandlerFunc;