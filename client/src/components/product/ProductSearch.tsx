type Props = {
  search: string;
  onSearchChange: (value: string) => void;
};

const ProductSearch = ({ search, onSearchChange }: Props) => {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search products..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default ProductSearch;