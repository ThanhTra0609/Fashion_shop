function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text" // Trường nhập dữ liệu dạng văn bản
      placeholder="Tìm kiếm sản phẩm..." // Văn bản hiển thị khi ô tìm kiếm trống
      value={searchTerm} //* Giá trị của ô tìm kiếm
      onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị khi người dùng nhập
      className="form-control" // Áp dụng class Bootstrap để tạo giao diện đẹp
    />
  );
}

export default SearchBar;
