import { useEffect, useState } from "react";
import { getCategory } from "../../api/categoryApi";
import type { Category } from "../../types/category";

type Props = {
  category: string;
  onCategoryChange: (value: string) => void;
};

const ProductFilter = ({ category, onCategoryChange }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <select
      className="form-select"
      value={category}
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      <option value="">All Categories</option>

      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
};

export default ProductFilter;