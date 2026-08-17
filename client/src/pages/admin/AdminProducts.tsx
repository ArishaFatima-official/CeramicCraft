import { useEffect, useState } from "react";
import {getProducts, deleteProducts } from "../../api/productApi";
import type { Product } from "../../types/product";
import {useNavigate} from "react-router-dom";
const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await getProducts({});
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProducts(id);
      await fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        Loading products...
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">
          Products
        </h2>

        <button
  className="btn btn-dark"
  onClick={() => navigate("/admin/products/add")}
>
  + Add Product
</button>
      </div>

      {/* Product Table */}
      {products.length === 0 ? (
        <div className="alert alert-info">
          No products found.
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Material</th>
                    <th>Handmade</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>

                      {/* Image */}
                      <td>
                        <img
                          src={product.images}
                          alt={product.name}
                          className="rounded"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                        />
                      </td>

                      {/* Product */}
                      <td>
                        <div className="fw-semibold">
                          {product.name}
                        </div>

                        <small className="text-muted">
                          ID: {product.id}
                        </small>
                      </td>

                      {/* Category */}
                      <td>
                        #{product.category_id}
                      </td>

                      {/* Price */}
                      <td>
                        Rs.{" "}
                        {Number(product.price).toLocaleString()}
                      </td>

                      {/* Stock */}
                      <td>
                        <span
                          className={`badge ${
                            product.stock <= 5
                              ? "bg-danger"
                              : "bg-success"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>

                      {/* Material */}
                      <td>
                        {product.material}
                      </td>

                      {/* Handmade */}
                      <td>
                        {product.is_handmade ? "Yes" : "No"}
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="d-flex gap-2">

                          <button
                            className="btn btn-sm btn-outline-dark"
                            onClick={() =>
                              navigate(
                                `/admin/products/edit/${product.id}`
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              handleDelete(product.id)
                            }
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProducts;