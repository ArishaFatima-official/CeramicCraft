import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../api/productApi";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    material: "",
    color: "",
    dimensions: "",
    is_handmade: false,
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append(
        "category_id",
        formData.category_id
      );

      data.append("name", formData.name);
      data.append(
        "description",
        formData.description
      );

      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("material", formData.material);
      data.append("color", formData.color);
      data.append(
        "dimensions",
        formData.dimensions
      );

      data.append(
        "is_handmade",
        String(formData.is_handmade)
      );

      if (image) {
        data.append("image", image);
      }

      await addProduct(data);

      alert("Product added successfully");

      navigate("/admin/products");

    } catch (error) {
      console.error(
        "Failed to add product:",
        error
      );

      alert("Failed to add product");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card border-0 shadow-sm">

            <div className="card-body p-4">

              <h2 className="fw-bold mb-4">
                Add Product
              </h2>

              <form onSubmit={handleSubmit}>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Product Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
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
                    value={formData.description}
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
                      value={formData.category_id}
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
                      min="0"
                      value={formData.price}
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
                      min="0"
                      value={formData.stock}
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
                      value={formData.material}
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
                      value={formData.color}
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
                      placeholder="10cm x 8cm"
                      value={formData.dimensions}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                {/* Image */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Product Image
                  </label>

                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => {
                      setImage(
                        e.target.files?.[0] || null
                      );
                    }}
                    required
                  />
                </div>

                {/* Handmade */}
                <div className="form-check mb-4">

                  <input
                    type="checkbox"
                    name="is_handmade"
                    className="form-check-input"
                    id="isHandmade"
                    checked={formData.is_handmade}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        is_handmade:
                          e.target.checked,
                      }))
                    }
                  />

                  <label
                    className="form-check-label"
                    htmlFor="isHandmade"
                  >
                    Handmade Product
                  </label>

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
                    disabled={loading}
                  >
                    {loading
                      ? "Adding..."
                      : "Add Product"}
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

export default AddProduct;