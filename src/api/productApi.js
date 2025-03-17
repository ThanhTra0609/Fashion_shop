// Import thư viện axios để giả lập API
import axios from 'axios';
// Import danh sách sản phẩm từ file productData.js
import products from './productData';

//* Tạo một instance của axios với baseURL là 'http://localhost:3000'
//* Mặc dù API này là giả lập, nhưng mockApi có thể được sử dụng như một API thực tế
export const mockApi = axios.create({
  baseURL: 'http://localhost:3000',
});

//* Giả lập API GET: Lấy tất cả sản phẩm
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: products }), 500); // Trả về danh sách sản phẩm sau 500ms
  });
};

//* Giả lập API GET: Lấy sản phẩm theo ID
export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === parseInt(id)); // Tìm sản phẩm theo ID
      product
        ? resolve({ data: product }) // Nếu tìm thấy, trả về sản phẩm
        : reject(new Error('Không tìm thấy sản phẩm')); // Nếu không tìm thấy, trả về lỗi
    }, 500);
  });
};

//* Giả lập API GET: Lấy danh sách sản phẩm theo danh mục
export const getProductsByCategory = (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = products.filter((p) => p.category === category); // Lọc sản phẩm theo danh mục
      resolve({ data: filteredProducts }); // Trả về danh sách sản phẩm thuộc danh mục đó
    }, 500);
  });
};

//* Giả lập API POST: Thêm sản phẩm mới vào danh sách
export const addProduct = (newProduct) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      newProduct.id = products.length + 1; // Gán ID mới cho sản phẩm
      products.push(newProduct); // Thêm sản phẩm vào danh sách
      resolve({ data: newProduct }); // Trả về sản phẩm vừa thêm
    }, 500);
  });
};

//* Giả lập API PUT: Cập nhật thông tin sản phẩm theo ID
export const updateProduct = (id, updatedProduct) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = products.findIndex((p) => p.id === parseInt(id)); // Tìm vị trí sản phẩm cần cập nhật
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct }; // Cập nhật thông tin sản phẩm
        resolve({ data: products[index] }); // Trả về sản phẩm sau khi cập nhật
      } else {
        reject(new Error('Không tìm thấy sản phẩm để cập nhật')); // Nếu không tìm thấy, trả về lỗi
      }
    }, 500);
  });
};

//* Giả lập API DELETE: Xóa sản phẩm theo ID
export const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = products.findIndex((p) => p.id === parseInt(id)); // Tìm vị trí sản phẩm cần xóa
      if (index !== -1) {
        const deleted = products.splice(index, 1); // Xóa sản phẩm khỏi danh sách
        resolve({ data: deleted[0] }); // Trả về sản phẩm đã bị xóa
      } else {
        reject(new Error('Không tìm thấy sản phẩm để xóa')); // Nếu không tìm thấy, trả về lỗi
      }
    }, 500);
  });
};

//* Giả lập API GET: Lấy 4 sản phẩm mới nhất (có ID lớn nhất)
export const getNewestProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sortedProducts = [...products] // Tạo bản sao của mảng products
        .sort((a, b) => b.id - a.id) // Sắp xếp sản phẩm theo ID giảm dần (mới nhất trước)
        .slice(0, 4); // Lấy 4 sản phẩm đầu tiên trong danh sách đã sắp xếp
      resolve({ data: sortedProducts }); // Trả về danh sách 4 sản phẩm mới nhất
    }, 500);
  });
};
