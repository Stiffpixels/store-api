const notFound = (req,res)=> res.status(404).send("Resource not Found");

module.exports = notFound;