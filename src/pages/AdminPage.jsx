//Update AdminPage
//Check loi
import { useEffect, useState } from 'react';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../api/productApi';
import 'bootstrap/dist/css/bootstrap.min.css';

function test(){
  
}
function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        alert('Lỗi khi tải sản phẩm');
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const response = await updateProduct(editId, form);
        setProducts(products.map((p) => (p.id === editId ? response.data : p)));
        setEditId(null);
      } else {
        const response = await addProduct(form);
        setProducts([...products, response.data]);
      }
      setForm({
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
      });
    } catch (error) {
      alert('Lỗi khi xử lý sản phẩm');
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setForm(product);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
      } catch (error) {
        alert('Lỗi khi xóa sản phẩm');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Quản lý sản phẩm</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          {['title', 'price', 'description', 'image', 'category'].map(
            (field) => (
              <div key={field} className="col-md-4">
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="form-control"
                  required
                />
              </div>
            )
          )}
          <div className="col-md-12">
            <button type="submit" className="btn btn-success">
              {editId ? 'Cập nhật' : 'Thêm sản phẩm'}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th>Danh mục</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price} ₫</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>
                <img src={product.image} alt={product.title} width="50" />
              </td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(product)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
