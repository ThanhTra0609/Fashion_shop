import { useEffect, useState, useMemo } from 'react'; // Import useMemo để tối ưu hóa hiệu suất
import { getProducts } from '../api/productApi';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import NewestProducts from '../components/NewestProducts';
import ProductList from '../components/ProductList';
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
        // Nếu không có dữ liệu thì gán mảng rỗng. Tránh lỗi khi dữ liệu API không hợp lệ hoặc bị undefined.
        setProducts(response.data || []);
      } catch (err) {
        setError('Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.');
      }
    };
    fetchProducts();
  }, []);

  // Lọc sản phẩm theo category và search (Tối ưu hóa bằng useMemo để tránh tính toán lại không cần thiết)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        selectedCategory === '' || product.category === selectedCategory;
      const matchSearch = product.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  // Phân trang (Tối ưu hóa bằng useMemo để chỉ tính toán lại khi dữ liệu thay đổi)
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = useMemo(() => {
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, indexOfFirstProduct, indexOfLastProduct]); // Tối ưu hóa phân trang bằng cách sử dụng useMemo giúp tăng hiệu suất khi số lượng sản phẩm lớn

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      {products.length === 0 && !error && <Loading />}{' '}
      {/* Hiển thị Loading khi chưa có dữ liệu và không có lỗi */}
      <NewestProducts /> {/* Chỉ hiển thị sản phẩm mới nhất */}
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
      {/* filteredProducts.length === 0 (không tìm thấy sản phẩm).
          products.length > 0 (đã tải xong dữ liệu).
          Tránh hiển thị thông báo sai khi dữ liệu chưa tải xong. */}
      {filteredProducts.length === 0 && products.length > 0 ? ( //
        <p className="text-danger mt-3">Không có sản phẩm nào.</p>
      ) : null}
      <ProductList products={currentProducts} />
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
