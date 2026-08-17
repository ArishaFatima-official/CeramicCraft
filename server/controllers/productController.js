const pool = require("../config/db");

const getproduct = async (req,res,next)=>{

const {search,category,minPrice,maxPrice,page=1,limit=9,sort} =req.query;
const currentPage = Number(page);
const itemsPerPage = Number(limit);
const min = Number(minPrice);
const max = Number(maxPrice);
const offset = (currentPage - 1) * itemsPerPage;
  try {
    let query = `
      SELECT products.*, categories.name AS category_name
      FROM products
      JOIN categories
      ON products.category_id = categories.id
      WHERE 1=1
    `;
    const values = [];
    // Search
    if (search) {
      values.push(`%${search}%`);
      query += ` AND products.name ILIKE $${values.length}`;
    }
    // Category Filter
    if (category) {
      values.push(category);
      query += ` AND products.category_id = $${values.length}`;
    }
    // Minimum Price
    if (minPrice) {
      values.push(minPrice);
      query += ` AND products.price >= $${values.length}`;
    }
    // Maximum Price
    if (maxPrice) {
      values.push(maxPrice);
      query += ` AND products.price <= $${values.length}`;
    }
    // Sorting
    if (sort === "price_asc") {
      query += ` ORDER BY products.price ASC`;
    } else if (sort === "price_desc") {
      query += ` ORDER BY products.price DESC`;
    } else if (sort === "newest") {
      query += ` ORDER BY products.id DESC`;
    } else {
      query += ` ORDER BY products.id ASC`;
    }
    // Pagination
    values.push(itemsPerPage);
    query += ` LIMIT $${values.length}`;
    values.push(offset);
    query += ` OFFSET $${values.length}`;

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      page: currentPage,
      limit: itemsPerPage,
      total: result.rowCount,
      data: result.rows,
    });

  } catch (err) {
    next(err);
  }
};

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
    const { category_id, name,  description, price, stock, material, color, dimensions, is_handmade}= req.body;
    console.log("Body:", req.body);
   console.log("File:", req.file);
   const image = req.file ? req.file.path : null
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
[category_id,name,description,price,stock,image,material,color,dimensions,is_handmade]);
     res.status(201).json({
    success: true,
    data: result.rows[0]
});
   }
  catch(err){
next(err);
  }
}

const updateproduct = async (req, res, next) => {
  const { id } = req.params;

  const {
    category_id,
    name,
    description,
    price,
    stock,
    images,
    material,
    color,
    dimensions,
    is_handmade,
  } = req.body;

  try {
    // Check category
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

    // Check product name
    const existingproduct = await pool.query(
      "SELECT * FROM products WHERE name = $1 AND id != $2",
      [name, id]
    );

    if (existingproduct.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "product already exists",
      });
    }

    // Get existing product
    const product = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (product.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    // Keep old image if no new image is uploaded
    const image = req.file
      ? req.file.path
      : product.rows[0].images;

    // Update product
    const result = await pool.query(
      `UPDATE products
       SET
         category_id = $1,
         name = $2,
         description = $3,
         price = $4,
         stock = $5,
         images = $6,
         material = $7,
         color = $8,
         dimensions = $9,
         is_handmade = $10
       WHERE id = $11
       RETURNING *`,
      [
        category_id,
        name,
        description,
        price,
        stock,
        image,
        material,
        color,
        dimensions,
        is_handmade,
        id,
      ]
    );

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

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


