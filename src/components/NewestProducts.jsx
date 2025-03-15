import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNewestProducts } from '../api/productApi';
import '../App.css';

function NewestProducts() {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchNewestProducts = async () => {
      try {
        const response = await getNewestProducts();
        setLatestProducts(response.data);
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm mới nhất:', error);
      }
    };
    fetchNewestProducts();
  }, []);

  return (
    <div className="newest-products mt-5">
      <h2 className="newest-products-title text-center mb-4 fw-bold text-uppercase">
        🌟 Bộ Sưu Tập Mới 🌟
      </h2>
      <div className="row">
        {latestProducts.map((product) => (
          <div key={product.id} className="col-md-3 col-sm-6 mb-4">
            <div className="card product-card h-100 border-0 rounded-4 overflow-hidden shadow-sm">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top img-fluid product-image"
                  loading="lazy"
                />
              </div>
              <div className="card-body text-center">
                <h5 className="card-title product-title text-truncate fw-bold">
                  {product.title}
                </h5>
                <p className="card-text product-price fw-semibold">
                  {product.price?.toLocaleString()} ₫
                </p>
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
