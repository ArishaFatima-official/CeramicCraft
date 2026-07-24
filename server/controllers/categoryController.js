const pool = require("../config/db");

const getcategory = async (req,res,next)=>{
try{
  const result= await pool.query(
    "SELECT * FROM categories  ORDER BY id"
  )
res.status(200).json({
    success: true,
    data: result.rows
});

}
catch(err){
next(err);
}
}

const getcategorybyid = async (req,res,next)=>{
const {id}= req.params;
 try{
const result= await pool.query(
    "SELECT * FROM categories WHERE id = $1" ,[id] );
if (result.rows.length === 0) {
            return res.status(404).json({ message: 'category not found' });
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

const addcategory = async (req,res,next)=>{
    const {name}= req.body;
    try{
     const existingcategory = await pool.query(
      "SELECT * FROM categories WHERE name = $1",
      [name]
    );

    if (existingcategory.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "category already exists",
      });
    }
   const result = await pool.query(
    "INSERT INTO categories (name) VALUES ($1)  RETURNING *",[name]);
     res.status(200).json({
    success: true,
    data: result.rows[0]
});
   }
  catch(err){
next(err);
  }
}

const updatecategory = async (req,res,next)=>{
  const { id } = req.params;
  const {name}= req.body;
   try{
const result = await pool.query(
    "UPDATE categories set name =$1 WHERE id =$2 RETURNING *",[name,id]);
    if (result.rows.length === 0) {
            return res.status(404).json({ message: 'category not found' });
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

const deletecategory = async (req,res,next)=>{
      const { id } = req.params;
  try{
const result = await pool.query(
    "DELETE FROM categories WHERE id =$1 RETURNING *",[id]);
    if (result.rows.length === 0) {
            return res.status(404).json({ message: 'category not found' });
        }
       res.json({ message: 'category deleted successfully' });
  }
catch(err){
next(err);
}
}

module.exports ={
    getcategory,
    getcategorybyid,
    addcategory,
    updatecategory,
    deletecategory
}