import React from 'react'; // Import React để sử dụng JSX
import { Link } from 'react-router-dom'; // Import Link để điều hướng đến trang chi tiết sản phẩm

//* Component `ProductList` hiển thị danh sách sản phẩm dưới dạng lưới
//* Nhận props `products` là một mảng chứa danh sách sản phẩm
function ProductList({ products }) {
  return (
    <div className="row">
      {' '}
      {/* Chia layout thành hàng (row) */}
      {products.map(
        (
          product // Lặp qua danh sách sản phẩm và hiển thị từng sản phẩm
        ) => (
          <div key={product.id} className="col-md-3 col-sm-6 mb-4">
            {' '}
            {/* Mỗi sản phẩm chiếm 3 cột trên màn hình lớn và 6 cột trên màn hình nhỏ */}
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              {' '}
              {/* Tạo card cho sản phẩm */}
              {/* Hiển thị ảnh sản phẩm */}
              <img
                src={product.image} // Đường dẫn ảnh sản phẩm
                alt={product.title} // Văn bản thay thế nếu ảnh không tải được
                className="card-img-top img-fluid" // Định dạng ảnh hiển thị đẹp hơn trên giao diện responsive
                loading="lazy" //* Cải thiện hiệu suất bằng cách chỉ tải ảnh khi cần
              />
              <div className="card-body text-center">
                {' '}
                {/* Phần nội dung sản phẩm */}
                <h5 className="card-title text-truncate fw-bold">
                  {product.title} {/* Hiển thị tên sản phẩm */}
                </h5>
                <p className="card-text text-danger fw-semibold">
                  Giá: {product.price?.toLocaleString()} ₫{' '}
                  {/* Hiển thị giá sản phẩm có định dạng số */}
                </p>
                {/* Nút điều hướng đến trang chi tiết sản phẩm */}
                <Link
                  to={`/product/${product.id}`} //* Điều hướng đến trang chi tiết sản phẩm với ID tương ứng
                  className="btn rounded-pill shadow-sm"
                  style={{
                    backgroundColor: '#ff69b4', // Màu nền nút hồng
                    borderColor: '#ff69b4', // Viền cùng màu nền
                    color: '#fff', // Chữ màu trắng
                  }}
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

// Xuất component để sử dụng trong các file khác
export default ProductList;
