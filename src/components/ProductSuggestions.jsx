import PropTypes from 'prop-types';

function ProductSuggestions({ suggestions }) {
  return (
    <div className="mt-5 mb-5">
      <h3 className="text-center mb-4">🌟 Sản phẩm gợi ý 🌟</h3>
      <div
        id="suggestionsCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {suggestions.map((item, index) => (
            <div
              key={item.id}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{item.title}</h5>
                  <p className="text-danger fs-4">{item.price} $</p>
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

ProductSuggestions.propTypes = {
  suggestions: PropTypes.array.isRequired,
};

export default ProductSuggestions;