const pool = require("../config/db"); 

const getcart = async (req, res, next) => {
     const user_id = req.user.id; 
     try { 
        const result = await pool.query(
         `SELECT cart.id, cart.quantity, products.id AS product_id, products.name, products.price, products.images FROM cart JOIN products ON cart.product_id = products.id WHERE cart.user_id = $1 ORDER BY cart.id`, [user_id] );
          res.status(200).json({ 
            success: true, data: result.rows,
         }); }
          catch (err) {
             next(err);
             } };

const addtocart = async (req, res, next) => { 
    const user_id = req.user.id;
     const { product_id, quantity } = req.body; 
     try { 
        const existingProduct = await pool.query(
         "SELECT * FROM products WHERE id = $1", [product_id] ); 
         
         if (existingProduct.rows.length === 0) { 
            return res.status(404).json({
                 success: false, message: "product not found",
                }); }
     const existingCart = await pool.query(
         "SELECT * FROM cart WHERE user_id = $1 AND product_id = $2", [user_id, product_id] );
         
         if (existingCart.rows.length > 0) {
            const result = await pool.query( 
                "UPDATE cart SET quantity = quantity + $1 WHERE id = $2 RETURNING *", [quantity, existingCart.rows[0].id] );
                 
                return res.status(200).json({
                     success: true,
                      message: "cart updated successfully", 
                     data: result.rows[0],
                     }); } 
            const result = await pool.query( 
                "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *", [user_id, product_id, quantity] ); 
                
                res.status(201).json({ 
                    success: true, 
                    data: result.rows[0], 
                }); } 
                catch (err) { 
                    next(err);
                 } }; 

const updatecart = async (req, res, next) => { 
    const { id } = req.params; 
    const { quantity } = req.body; 
    const user_id = req.user.id; 
    try { 
        const result = await pool.query(
             "UPDATE cart SET quantity = $1 WHERE id = $2 AND user_id = $3 RETURNING *", [quantity, id, user_id] );
         if (result.rows.length === 0) { 
            return res.status(404).json({
                 success: false, message: "cart item not found", }); }
            
            res.status(200).json({
         success: true, data: result.rows[0], }); } 
         catch (err) { 
            next(err); } };

const deletecartItem = async (req, res, next) => {
     const { id } = req.params;
      const user_id = req.user.id;
       try { 
        const result = await pool.query( 
            "DELETE FROM cart WHERE id = $1 AND user_id = $2 RETURNING *", [id, user_id] );
         if (result.rows.length === 0) { 
          return res.status(404).json({ 
            success: false, message: "cart item not found", }); } 
        
           res.json({ success: true, message: "cart item deleted successfully", }); } 
        
        catch (err) { next(err); } 
    }; 
    
module.exports = { 
    getcart,
     addtocart, 
     updatecart,
      deletecartItem,
     };