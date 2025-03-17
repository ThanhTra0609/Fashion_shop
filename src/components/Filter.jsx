//todo: Filter component for selecting category

import React from 'react';

//* Component Filter dùng để tạo dropdown chọn danh mục
function Filter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    //* Thẻ <select> giúp người dùng chọn danh mục
    <select
      value={selectedCategory} // Gán giá trị của dropdown theo danh mục đã chọn
      onChange={(e) => setSelectedCategory(e.target.value)} // Khi người dùng thay đổi danh mục, cập nhật state
      className="form-select" // Áp dụng class CSS để tạo giao diện đẹp hơn
    >
      {/* Tùy chọn mặc định hiển thị "Tất cả danh mục" */}
      <option value="">Tất cả danh mục</option>

      {/* Duyệt qua mảng categories để tạo danh sách các tùy chọn */}
      {categories.map((category) => (
        <option key={category} value={category}>
          {category} {/* Hiển thị tên danh mục */}
        </option>
      ))}
    </select>
  );
}

export default Filter;
