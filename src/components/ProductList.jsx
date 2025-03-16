import { Link } from 'react-router-dom';

function ProductList({ products }) {
  return (
    <div className="row">
      {products.map((product) => (
        <div key={product.id} className="col-md-3 col-sm-6 mb-4">
          <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="card-img-top img-fluid"
              loading="lazy"
            />
            <div className="card-body text-center">
              <h5 className="card-title text-truncate fw-bold">
                {product.title}
              </h5>
              <p className="card-text text-danger fw-semibold">
                Giá: {product.price?.toLocaleString()} ₫
              </p>
              <Link
                to={`/product/${product.id}`}
                className="btn rounded-pill shadow-sm"
                style={{
                  backgroundColor: '#ff69b4',
                  borderColor: '#ff69b4',
                  color: '#fff',
                }}
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
