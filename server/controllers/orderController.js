const pool = require("../config/db");

const getorders = async (req, res, next) => {
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT
          id,
          user_id,
          total_price,
          status,
          shipping_address,
          payment_method,
          created_at
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [user_id]
    );

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    next(err);
  }
};

const getorderbyid = async (req,res,next)=>{
const {id}= req.params;
 try{
const result= await pool.query(
    "SELECT orders.*, order_items.product_id, order_items.quantity, order_items.price FROM orders join order_items ON orders.id = order_items.order_id  WHERE orders.id = $1" ,[id] );
if (result.rows.length === 0) {
            return res.status(404).json({ message: 'order not found' });
        }
res.status(200).json({
    success: true,
    data: result.rows
});
}
catch(err){
next(err);
}
}


const placeorder = async (req, res, next) => {
  const user_id = req.user.id;
  const { shipping_address, payment_method } = req.body;
  const client = await pool.connect();
  try {
      await client.query("BEGIN");
    const cart = await client.query(
      `SELECT cart.product_id, cart.quantity, products.price
       FROM cart
       JOIN products
       ON cart.product_id = products.id
       WHERE cart.user_id = $1`,
      [user_id]
    );

    if (cart.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let total_price = 0;

    for (const item of cart.rows) {
      total_price += item.price * item.quantity;
    }

    const order = await client.query(
      `INSERT INTO orders
      (user_id, total_price, status, shipping_address, payment_method)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        user_id,
        total_price,
        "pending",
        shipping_address,
        payment_method,
      ]
    );

    for (const item of cart.rows) {
      await client.query(
        `INSERT INTO order_items
        (order_id, product_id, quantity, price)
        VALUES ($1,$2,$3,$4)`,
        [
          order.rows[0].id,
          item.product_id,
          item.quantity,
          item.price,
        ]
      );

      await client.query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2",
        [item.quantity, item.product_id]
      );
    }

    await client.query(
      "DELETE FROM cart WHERE user_id = $1",
      [user_id]
    );

      await client.query("COMMIT");

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order.rows[0],
    });

  } catch (err) {
       await client.query("ROLLBACK");
    next(err);
  } finally {
        client.release();
    }
};


const updateorderstatus = async (req,res,next)=>{
  const {id} = req.params;
 const {status}= req.body;
   try{
     const existingorder = await pool.query(
      "SELECT * FROM orders WHERE id = $1",
      [id]
    )

    if (existingorder.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "order not exists",
      });
    }


const result = await pool.query(
    "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
    [status,id]);
    
    if (result.rows.length === 0) {
            return res.status(404).json({ message: 'order not found' });
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

module.exports={
getorders,
getorderbyid,
placeorder,
updateorderstatus
  
};