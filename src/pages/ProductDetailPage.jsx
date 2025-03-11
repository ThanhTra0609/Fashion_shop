import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/productApi';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data); // Lấy product từ response.data
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm.');
      }
    };
    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
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
              <button className="btn btn-primary mt-3">Mua ngay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
