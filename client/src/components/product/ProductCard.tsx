
import type { Product } from "../../types/product"
import { useNavigate } from "react-router-dom";
import {addtoCart} from "../../api/cartApi";
type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
      const navigate = useNavigate();
    const handleAddToCart = async () => {
  try {
    await addtoCart({
  product_id: product.id,
  quantity: 1,
});
    alert("Product added to cart!");
  } catch (error) {
    console.error("Failed to add product to cart", error);
  }
};
  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm border-0">

        <img
          src={product.images}
          className="card-img-top"
          alt={product.name}
          style={{ height: "250px", objectFit: "cover" }}
        />

        <div className="card-body d-flex flex-column">

          <span className="badge bg-secondary mb-2 align-self-start">
            {product.category_name || "Ceramic"}
          </span>

          <h5 className="card-title fw-bold">
            {product.name}
          </h5>

          <p className="card-text text-muted small flex-grow-1">
            {product.description}
          </p>

          <p className="mb-1">
            <strong>Material:</strong> {product.material}
          </p>

          <p className="mb-1">
            <strong>Color:</strong> {product.color}
          </p>

          <p className="mb-2">
            <strong>Stock:</strong> {product.stock}
          </p>

          <h5 className="fw-bold text-dark mb-3">
            Rs. {product.price}
          </h5>

          <div className="d-flex gap-2 mt-auto">
            <button className="btn btn-outline-dark w-50"  onClick={() => navigate(`/products/${product.id}`)}>
              View
            </button>

            <button
              className="btn btn-dark w-50"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              {product.stock > 0? "Add to Cart" : "Out of Stock"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;