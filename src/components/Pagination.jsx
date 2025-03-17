import React from 'react';

//* Component Pagination dùng để hiển thị phân trang
function Pagination({ productsPerPage, totalProducts, paginate, currentPage }) {
  //* Tạo một mảng `pageNumbers` chứa số trang cần hiển thị
  //* Dùng `Array.from()` để tạo mảng có độ dài bằng tổng số trang
  //* `Math.ceil(totalProducts / productsPerPage)` đảm bảo làm tròn lên để không bỏ sót sản phẩm
  const pageNumbers = Array.from(
    { length: Math.ceil(totalProducts / productsPerPage) },
    (_, i) => i + 1 // Tạo các số trang bắt đầu từ 1
  );

  return (
    <div className="container" style={{ marginBottom: '100px' }}>
      <nav>
        <ul className="pagination justify-content-center">
          {/* Duyệt qua từng số trang trong `pageNumbers` và tạo các nút phân trang */}
          {pageNumbers.map((number) => (
            <li
              key={number} // Mỗi phần tử trong danh sách cần có `key` duy nhất
              className={`page-item ${number === currentPage ? 'active' : ''}`} // Thêm class 'active' nếu là trang hiện tại
            >
              <button
                onClick={() => paginate(number)} // Khi bấm vào nút, gọi hàm `paginate` để cập nhật trang hiện tại
                className="page-link"
                style={
                  number === currentPage
                    ? {
                        backgroundColor: '#ff69b4', // Màu nền hồng khi trang được chọn
                        borderColor: '#ff69b4', // Màu viền cùng màu với nền
                        color: 'white', // Màu chữ trắng
                      }
                    : {}
                }
              >
                {number} {/* Hiển thị số trang */}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
