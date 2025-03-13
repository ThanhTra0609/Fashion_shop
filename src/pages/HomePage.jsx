// src/pages/HomePage.jsx
import { useEffect, useState } from 'react';
import { getProducts } from '../api/productApi';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import SearchBar from '../components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
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

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  // Lọc sản phẩm theo category và search
  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === '' || product.category === selectedCategory;
    const matchSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4 mb-5">

      <h1 className="text-center mb-4">Danh sách sản phẩm</h1>

      <div className="d-flex justify-content-between mb-4">
        <Filter
          categories={[...new Set(products.map((product) => product.category))]}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Kiểm tra nếu không có kết quả */}
      {filteredProducts.length === 0 ? (
        <p className="text-danger mt-3">Không có sản phẩm nào.</p>
      ) : null}

      <div className="row">
        {currentProducts.map((product) => (
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
                <Link to={`/product/${product.id}`} className="btn btn-primary">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default HomePage;
