const pool = require("../config/db");

const getproduct = async (req,res,next)=>{
try{
    const result = await pool.query(
      "SELECT products.*, categories.name AS category_name FROM products join categories ON products.category_id = categories.id ORDER BY products.id "
    );

res.status(200).json({
    success: true,
    data: result.rows
});

     }
catch(err){
next(err);
}
}

const getproductbyid = async (req,res,next)=>{
const {id}= req.params;
 try{
const result= await pool.query(
    "SELECT products.*, categories.name AS category_name FROM products join categories ON products.category_id = categories.id WHERE products.id = $1" ,[id] );
if (result.rows.length === 0) {
            return res.status(404).json({ message: 'product not found' });
        }
res.status(200).json({
    success: true,
    data: result.rows[0]
});
}
catch(err){
next(err);
}
}

const addproduct = async (req,res,next)=>{
    const { category_id, name,  description, price, stock, images, material, color, dimensions, is_handmade}= req.body;
    try{
     const existingcategory = await pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [category_id]
    );

    if (existingcategory.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "category not exists",
      });
    }
    const existingproduct = await pool.query(
      "SELECT * FROM products WHERE name =$1",[name] );
    if (existingproduct.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "product already exists",
      });
    }
   const result = await pool.query(
   " INSERT INTO products ( category_id, name, description, price, stock, images, material, color, dimensions, is_handmade) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
[category_id,name,description,price,stock,images,material,color,dimensions,is_handmade]);
     res.status(201).json({
    success: true,
    data: result.rows[0]
});
   }
  catch(err){
next(err);
  }
}

const updateproduct = async (req,res,next)=>{
  const { id } = req.params;
 const { category_id, name,  description, price, stock, images, material, color, dimensions, is_handmade}= req.body;
   try{
     const existingcategory = await pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [category_id]
    );

    if (existingcategory.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "category not exists",
      });
    }
    const existingproduct = await pool.query(
    "SELECT * FROM products WHERE name = $1 AND id != $2;",[name,id]
    );
    if (existingproduct.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "product already exists",
      });
    }

const result = await pool.query(
    "UPDATE products SET category_id = $1, name = $2, description = $3, price = $4, stock = $5, images = $6, material = $7, color = $8, dimensions = $9, is_handmade = $10 WHERE id = $11 RETURNING *",
    [ category_id, name, description, price, stock, images, material, color, dimensions, is_handmade, id]);
    
    if (result.rows.length === 0) {
            return res.status(404).json({ message: 'product not found' });
        }
      res.status(200).json({
    success: true,
    data: result.rows[0]
});
   }
  catch(err){
next(err);
  }
}

const deleteproduct = async (req,res,next)=>{
      const { id } = req.params;
  try{
const result = await pool.query(
    "DELETE FROM products WHERE id =$1 RETURNING *",[id]);
    if (result.rows.length === 0) {
            return res.status(404).json({ message: 'product not found' });
        }
       res.json({ message: 'product deleted successfully' });
  }
catch(err){
next(err);
}
}

module.exports ={
    getproduct,
    getproductbyid,
    addproduct,
    updateproduct,
    deleteproduct
}


