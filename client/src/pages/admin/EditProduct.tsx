import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct,} from "../../api/productApi";
import type { Product } from "../../types/product";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(Number(id));
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setProduct((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : null
    );
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!product) return;

    try {
      setSaving(true);

      await updateProduct(product.id, {
        ...product,
        category_id: Number(product.category_id),
        price: Number(product.price),
        stock: Number(product.stock),
      });

      alert("Product updated successfully");

      navigate("/admin/products");
    } catch (error) {
      console.error(
        "Failed to update product:",
        error
      );

      alert("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Product not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card border-0 shadow-sm">

            <div className="card-body p-4">

              <h2 className="fw-bold mb-4">
                Edit Product
              </h2>

              <form onSubmit={handleSubmit}>

                {/* Product Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Product Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={product.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Description
                  </label>

                  <textarea
                    name="description"
                    className="form-control"
                    rows={4}
                    value={product.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">

                  {/* Category */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Category ID
                    </label>

                    <input
                      type="number"
                      name="category_id"
                      className="form-control"
                      value={product.category_id}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Price */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Price
                    </label>

                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      value={product.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Stock */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Stock
                    </label>

                    <input
                      type="number"
                      name="stock"
                      className="form-control"
                      value={product.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Material */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Material
                    </label>

                    <input
                      type="text"
                      name="material"
                      className="form-control"
                      value={product.material || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Color */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Color
                    </label>

                    <input
                      type="text"
                      name="color"
                      className="form-control"
                      value={product.color || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Dimensions */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Dimensions
                    </label>

                    <input
                      type="text"
                      name="dimensions"
                      className="form-control"
                      value={product.dimensions || ""}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                {/* Current Image */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Product Image
                  </label>

                  <div>
                    <img
                      src={product.images}
                      alt={product.name}
                      className="rounded"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <small className="text-muted">
                    Image cannot be changed from this form.
                  </small>

                </div>

                {/* Buttons */}
                <div className="d-flex gap-2">

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      navigate("/admin/products")
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={saving}
                  >
                    {saving
                      ? "Updating..."
                      : "Update Product"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EditProduct;