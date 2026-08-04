import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";
import type { Product } from "../types/product";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = Number(id);
        const response = await getProductById(productId);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to load product", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container py-5">
      <div className="row">

        <div className="col-md-6">
          <img
            src={product.images}
            alt={product.name}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-6">

          <h2>{product.name}</h2>

          <p className="text-muted">
            {product.description}
          </p>

          <h3 className="text-dark mb-3">
            Rs. {product.price}
          </h3>

          <p>
            <strong>Material:</strong> {product.material}
          </p>

          <p>
            <strong>Color:</strong> {product.color}
          </p>

          <p>
            <strong>Dimensions:</strong> {product.dimensions}
          </p>

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

          <p>
            <strong>Handmade:</strong>{" "}
            {product.is_handmade ? "Yes" : "No"}
          </p>

          <button
            className="btn btn-dark mt-3"
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;