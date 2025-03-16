import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../api/productApi';
import BackHome from '../components/BackHome';
import Loading from '../components/Loading';
import ProductSuggestions from '../components/ProductSuggestions';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);

        const suggestionResponse = await getProductsByCategory(
          response.data.category
        );
        setSuggestions(
          suggestionResponse.data.filter((item) => item.id !== response.data.id)
        );
      } catch (err) {
        setError('Sản phẩm không có trong cửa hàng.');
      }
    };
    fetchProduct();
  }, [id]);

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

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title">{product.title}</h1>
              <p className="card-text">{product.description}</p>
              <h4 className="card-text text-danger">Giá: {product.price} $</h4>
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

      <ProductSuggestions suggestions={suggestions} />
    </div>
  );
}

export default ProductDetailPage;
