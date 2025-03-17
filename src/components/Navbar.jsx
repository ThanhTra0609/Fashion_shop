// Import thư viện Link từ 'react-router-dom' để tạo các liên kết điều hướng mà không tải lại trang.
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    // Thẻ <nav> đại diện cho thanh điều hướng chính của trang web.
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Logo hoặc tên thương hiệu, sử dụng <Link> để điều hướng về trang chủ */}
        <Link className="navbar-brand text-white" to="/">
          Fashion Shop
        </Link>

        {/* Nút toggler để hiển thị hoặc ẩn menu trên màn hình nhỏ */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Phần menu chứa các mục điều hướng */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* Mục điều hướng đến Trang chủ */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Trang chủ
              </Link>
            </li>
            {/* Mục điều hướng đến trang Quản lý (Admin) */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin">
                Quản lý
              </Link>
            </li>
            {/* Mục điều hướng đến trang About Us */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about-us">
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
