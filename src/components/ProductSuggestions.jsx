import React from 'react';
import PropTypes from 'prop-types';

//* Component hiển thị danh sách sản phẩm gợi ý dưới dạng carousel (băng chuyền)
function ProductSuggestions({ suggestions }) {
  return (
    <div className="mt-5 mb-5">
      {/* Tiêu đề của phần sản phẩm gợi ý */}
      <h3 className="text-center mb-4">🌟 Sản phẩm gợi ý 🌟</h3>

      {/* Carousel Bootstrap để hiển thị danh sách sản phẩm */}
      <div
        id="suggestionsCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {/* Duyệt qua danh sách sản phẩm và hiển thị từng sản phẩm trong carousel */}
          {suggestions.map((item, index) => (
            <div
              key={item.id}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              {/* Card chứa thông tin sản phẩm */}
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                {/* Hình ảnh sản phẩm */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-img-top"
                />
                {/* Nội dung sản phẩm */}
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{item.title}</h5>
                  <p className="text-danger fs-4">{item.price} $</p>
                  {/* Nút xem chi tiết sản phẩm */}
                  <a
                    href={`/product/${item.id}`}
                    className="btn rounded-pill px-4"
                    style={{ backgroundColor: '#ff69b4', color: 'white' }}
                  >
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút điều hướng carousel sang sản phẩm trước */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#suggestionsCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon bg-dark rounded-circle p-2"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Trước</span>
        </button>

        {/* Nút điều hướng carousel sang sản phẩm tiếp theo */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#suggestionsCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon bg-dark rounded-circle p-2"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Tiếp theo</span>
        </button>
      </div>
    </div>
  );
}

//* Xác định kiểu dữ liệu cho props của component
ProductSuggestions.propTypes = {
  suggestions: PropTypes.array.isRequired, //* Mảng chứa danh sách sản phẩm gợi ý
};

export default ProductSuggestions;
