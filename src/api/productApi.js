// src/api/productApi.js
import axios from 'axios';
import products from './productData';

// Mô phỏng API giả lập từ productData.js
export const mockApi = axios.create({
  baseURL: 'http://localhost:3000',
});

// Giả lập GET: Lấy tất cả sản phẩm
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: products }), 500);
  });
};

// Giả lập GET: Lấy sản phẩm theo ID
export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === parseInt(id));
      product
        ? resolve({ data: product })
        : reject(new Error('Không tìm thấy sản phẩm'));
    }, 500);
  });
};

// Giả lập GET: Lấy sản phẩm theo category
export const getProductsByCategory = (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = products.filter((p) => p.category === category);
      resolve({ data: filteredProducts });
    }, 500);
  });
};

// Giả lập POST: Thêm sản phẩm mới
export const addProduct = (newProduct) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      newProduct.id = products.length + 1;
      products.push(newProduct);
      resolve({ data: newProduct });
    }, 500);
  });
};

// Giả lập PUT: Cập nhật sản phẩm
export const updateProduct = (id, updatedProduct) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = products.findIndex((p) => p.id === parseInt(id));
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        resolve({ data: products[index] });
      } else {
        reject(new Error('Không tìm thấy sản phẩm để cập nhật'));
      }
    }, 500);
  });
};

// Giả lập DELETE: Xóa sản phẩm
export const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = products.findIndex((p) => p.id === parseInt(id));
      if (index !== -1) {
        const deleted = products.splice(index, 1);
        resolve({ data: deleted[0] });
      } else {
        reject(new Error('Không tìm thấy sản phẩm để xóa'));
      }
    }, 500);
  });
};

// Thêm hàm lấy 4 sản phẩm có id lớn nhất (sản phẩm mới nhất)
export const getNewestProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sortedProducts = [...products] // Tạo bản sao của mảng products, để ds sp không bị ảnh hưởng
        .sort((a, b) => b.id - a.id) // Sắp xếp giảm dần theo id
        .slice(0, 4); // Lấy 4 sản phẩm đầu tiên (id lớn nhất)
      resolve({ data: sortedProducts });
    }, 500);
  });
};
