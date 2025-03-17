import { useEffect, useState } from 'react'; // useEffect để xử lý tác vụ bất đồng bộ, useState để quản lý trạng thái
import { useParams } from 'react-router-dom'; // useParams để lấy tham số từ URL
import { getProductById, getProductsByCategory } from '../api/productApi';
import BackHome from '../components/BackHome';
import Loading from '../components/Loading';
import ProductSuggestions from '../components/ProductSuggestions';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

//* Component hiển thị chi tiết sản phẩm
function ProductDetailPage() {
  //* Lấy ID của sản phẩm từ URL
  const { id } = useParams();

  //* Khai báo state để lưu thông tin sản phẩm, lỗi và danh sách gợi ý
  const [product, setProduct] = useState(null); // Lưu trữ thông tin sản phẩm
  const [error, setError] = useState(null); // Lưu thông báo lỗi nếu có
  const [suggestions, setSuggestions] = useState([]); // Lưu danh sách sản phẩm gợi ý

  //* useEffect để gọi API lấy dữ liệu sản phẩm khi ID thay đổi
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Gọi API lấy thông tin sản phẩm theo ID
        const response = await getProductById(id);
        setProduct(response.data); // Cập nhật state với dữ liệu sản phẩm

        // Gọi API lấy danh sách sản phẩm cùng danh mục để gợi ý
        const suggestionResponse = await getProductsByCategory(
          response.data.category
        );
        setSuggestions(
          suggestionResponse.data.filter((item) => item.id !== response.data.id) // Lọc bỏ sản phẩm hiện tại
        );
      } catch (err) {
        // Nếu xảy ra lỗi (sản phẩm không tồn tại), cập nhật state lỗi
        setError('Sản phẩm không có trong cửa hàng.');
      }
    };

    fetchProduct(); // Gọi hàm fetchProduct
  }, [id]); // useEffect sẽ chạy lại khi ID sản phẩm thay đổi

  //* Nếu có lỗi, hiển thị thông báo lỗi và nút quay về trang chủ
  if (error) {
    return (
      <div>
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
        <BackHome />
      </div>
    );
  }

  //* Nếu dữ liệu sản phẩm chưa được tải, hiển thị component Loading
  if (!product) {
    return <Loading />;
  }

  //* Giao diện hiển thị chi tiết sản phẩm
  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="row g-0">
          {/* Cột chứa hình ảnh sản phẩm */}
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
            />
          </div>
          {/* Cột chứa thông tin chi tiết sản phẩm */}
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title">{product.title}</h1>
              <p className="card-text">{product.description}</p>
              <h4 className="card-text text-danger">Giá: {product.price} $</h4>
              {/* Nút mua ngay với màu hồng (#ff69b4) */}
              <button
                className="btn mt-3"
                style={{ backgroundColor: '#ff69b4', color: 'white' }}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hiển thị danh sách sản phẩm gợi ý */}
      <ProductSuggestions suggestions={suggestions} />
      <BackHome />
    </div>
  );
}

export default ProductDetailPage;
