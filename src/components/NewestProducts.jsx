// Import các hooks `useEffect` và `useState` từ React để quản lý trạng thái và xử lý side effects.
import { useEffect, useState } from 'react';
// Import `Link` từ `react-router-dom` để tạo liên kết điều hướng.
import { Link } from 'react-router-dom';
// Import hàm `getNewestProducts` từ API để lấy danh sách sản phẩm mới nhất.
import { getNewestProducts } from '../api/productApi';
// Import file CSS để áp dụng style cho component.
import '../App.css';

function NewestProducts() {
  //* State `latestProducts` lưu danh sách sản phẩm mới nhất, mặc định là một mảng rỗng.
  const [latestProducts, setLatestProducts] = useState([]);

  //* `useEffect` chạy một lần sau khi component được render lần đầu tiên (mảng dependency `[]` rỗng).
  useEffect(() => {
    //* Hàm async để gọi API lấy danh sách sản phẩm mới nhất.
    const fetchNewestProducts = async () => {
      try {
        //* Gọi API và lấy dữ liệu sản phẩm mới nhất.
        const response = await getNewestProducts();
        // Cập nhật state `latestProducts` với dữ liệu từ API.
        setLatestProducts(response.data);
      } catch (error) {
        // Nếu có lỗi xảy ra trong quá trình fetch dữ liệu, in lỗi ra console.
        console.error('Lỗi khi tải sản phẩm mới nhất:', error);
      }
    };
    //* Gọi hàm `fetchNewestProducts` để lấy dữ liệu.
    fetchNewestProducts();
  }, []);

  return (
    <div className="newest-products mt-5">
      {/* Tiêu đề bộ sưu tập mới */}
      <h2 className="newest-products-title text-center mb-4 fw-bold text-uppercase">
        🌟 Bộ Sưu Tập Mới 🌟
      </h2>
      <div className="row">
        {/* Lặp qua danh sách sản phẩm và hiển thị từng sản phẩm */}
        {latestProducts.map((product) => (
          <div key={product.id} className="col-md-3 col-sm-6 mb-4">
            {/* Card hiển thị thông tin sản phẩm */}
            <div className="card product-card h-100 border-0 rounded-4 overflow-hidden shadow-sm">
              <div className="image-container">
                {/* Hình ảnh sản phẩm */}
                <img
                  src={product.image} // URL ảnh sản phẩm.
                  alt={product.title} // Thuộc tính alt cho ảnh, giúp SEO và accessibility.
                  className="card-img-top img-fluid product-image"
                  loading="lazy" // Tối ưu hiệu suất bằng cách lazy loading ảnh.
                />
              </div>
              <div className="card-body text-center">
                {/* Tiêu đề sản phẩm, dùng `text-truncate` để tránh tràn chữ */}
                <h5 className="card-title product-title text-truncate fw-bold">
                  {product.title}
                </h5>
                {/* Giá sản phẩm, sử dụng `toLocaleString()` để định dạng số tiền */}
                <p className="card-text product-price fw-semibold">
                  {product.price?.toLocaleString()} ₫
                </p>
                {/* Nút điều hướng đến trang chi tiết sản phẩm */}
                <Link
                  to={`/product/${product.id}`}
                  className="btn explore-btn rounded-pill shadow-lg"
                >
                  Khám Phá Ngay
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewestProducts;
