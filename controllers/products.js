const products = require('../models/productModel.js');

const getAllProductsStatic =async (req,res)=>{
  const prods = await products.find({
    name:{ $regex:'^a', $options:'i' }
  });
  res.status(200).json({ prods, nbhits:prods.length });
}
const getAllProducts =async (req,res)=>{
  const { featured, company, name, sort, fields, numFilters } = req.query;
  const qParams= {};
  if(featured){
    qParams.featured = featured==="true"?true:false;
  }
  if(company){
    qParams.company = company;
  }
  if(name){
    qParams.name = { $regex:name, $options:'i'
    };
  }
  if(numFilters){
    const operatorMap={
      ">":"$gt",
      ">=":"$gte",
      "==":"$eq",
      "<":"$lt",
      "<=":"$lte",
    };
    const re = /\b(>|>=|==|<|<=)\b/g;
    const convNumFilters= numFilters.replace(re,(match)=> `-${operatorMap[match]}-`);
    console.log(convNumFilters);
    convNumFilters.split(',').forEach((item)=>{
      const [field, opr, val] = item.split('-');
      if(field){
        qParams[field] = { [opr] :Number(val)};
      }
    });
  }
  console.log(qParams);
  let result = products.find(qParams);
  if(sort){
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }else{
    result = result.sort('createdAt');
  }
  if(fields){
    const fieldList = fields.split(',');
    result = result.select(fieldList);
  }
  
  
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip= (page-1)*limit;
  result = result.skip(skip).limit(limit);
  const prods = await result;
  res.status(200).json({ prods, nbhits:prods.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};