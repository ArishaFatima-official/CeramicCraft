import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/adminApi";
import type { AdminDashboard } from "../../types/admin";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getAdminDashboard();
        setDashboard(response.data);
      } catch (error) {
        console.error("Failed to load admin dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboard) {
    return (
      <div className="container py-5">
        <div className="text-center">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">

      <h2 className="fw-bold mb-4">
        Admin Dashboard
      </h2>

      {/* Dashboard Cards */}
      <div className="row g-4 mb-4">

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">
                Total Users
              </p>

              <h3 className="fw-bold mb-0">
                {dashboard.totalUsers}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">
                Total Products
              </p>

              <h3 className="fw-bold mb-0">
                {dashboard.totalProducts}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">
                Total Orders
              </p>

              <h3 className="fw-bold mb-0">
                {dashboard.totalOrders}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">
                Total Revenue
              </p>

              <h3 className="fw-bold mb-0">
                Rs. {Number(dashboard.totalRevenue).toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

      </div>

      {/* Low Stock Products */}
      <div className="card border-0 shadow-sm">

        <div className="card-body">

          <h5 className="fw-bold mb-3">
            Low Stock Products
          </h5>

          {dashboard.lowStockProducts.length === 0 ? (
            <div className="alert alert-success mb-0">
              No low stock products.
            </div>
          ) : (
            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Stock</th>
                  </tr>
                </thead>

                <tbody>
                  {dashboard.lowStockProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>

                      <td className="fw-semibold">
                        {product.name}
                      </td>

                      <td>
                        <span className="badge bg-danger">
                          {product.stock}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;