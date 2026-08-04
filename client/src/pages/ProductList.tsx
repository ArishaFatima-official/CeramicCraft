import { getProducts } from "../api/productApi";
import { useState, useEffect } from "react";
import ProductCard from "../components/product/ProductCard";
import ProductFilter from "../components/product/ProductFilter";
import ProductSearch from "../components/product/ProductSearch";
const ProductPage = () => {
  const [productData, setProductData] = useState<any[]>([]);
const [category, setCategory] = useState<string>("");
const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProducts({
        });
        setProductData(response.data);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    fetchProduct();
  }, []);

  const filteredProducts = productData.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesCategory =
    category === "" || product.category_id === Number(category);

  return matchesSearch && matchesCategory;
});

 return (
  <div className="container py-5">

    <div className="row mb-4">
      <div className="col-md-6">
        <ProductSearch
          search={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      <div className="col-md-6">
        <ProductFilter
          category={category}
          onCategoryChange={setCategory}
        />
      </div>
    </div>

    <div className="row">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>

  </div>
);
};

export default ProductPage;