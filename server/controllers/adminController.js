const pool = require("../config/db");

const dashboard = async (req, res, next) => {
  try {

    const totalUsers = await pool.query(
      "SELECT COUNT(*) AS total_users FROM users"
    );

    const totalProducts = await pool.query(
      "SELECT COUNT(*) AS total_products FROM products"
    );

    const totalOrders = await pool.query(
      "SELECT COUNT(*) AS total_orders FROM orders"
    );

    const totalRevenue = await pool.query(
      "SELECT COALESCE(SUM(total_price),0) AS total_revenue FROM orders WHERE status = 'Delivered'"
    );

    const lowStockProducts = await pool.query(
      "SELECT id, name, stock FROM products WHERE stock <= 5 ORDER BY stock ASC"
    );

    res.status(200).json({
      success: true,
      data: {
        totalUsers: totalUsers.rows[0].total_users,
        totalProducts: totalProducts.rows[0].total_products,
        totalOrders: totalOrders.rows[0].total_orders,
        totalRevenue: totalRevenue.rows[0].total_revenue,
        lowStockProducts: lowStockProducts.rows
      }
    });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  dashboard
};