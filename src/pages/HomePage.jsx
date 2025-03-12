// src/pages/HomePage.jsx
import { useEffect, useState } from 'react';
import { getProducts } from '../api/productApi';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (err) {
        setError('Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.');
      }
    };
    fetchProducts();
  }, []);

  // Xử lý khi có lỗi
  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  // Phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4 mb-5">
      <h1 className="text-center mb-4">Danh sách sản phẩm</h1>

      <div className="row">
        {currentProducts.length === 0 ? (
          <div className="col-12 text-center">
            <p>Không có sản phẩm nào để hiển thị.</p>
          </div>
        ) : (
          currentProducts.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{product.title}</h5>
                  <p className="card-text">Giá: {product.price} ₫</p>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-primary"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default HomePage;
