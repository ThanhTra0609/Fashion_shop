function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Tìm kiếm sản phẩm..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="form-control"
    />
  );
}

export default SearchBar;
