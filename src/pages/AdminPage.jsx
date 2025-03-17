import { useEffect, useState } from 'react';
import {
  getProducts, //* Hàm lấy danh sách sản phẩm từ API
  addProduct, //* Hàm thêm sản phẩm vào API
  updateProduct, //* Hàm cập nhật sản phẩm trong API
  deleteProduct, //* Hàm xóa sản phẩm khỏi API
} from '../api/productApi';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS Bootstrap

function AdminPage() {
  //* State lưu trữ danh sách sản phẩm
  const [products, setProducts] = useState([]);

  //* State lưu trữ thông tin form nhập liệu
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  //* State lưu ID sản phẩm đang chỉnh sửa
  const [editId, setEditId] = useState(null);

  //* useEffect để tải danh sách sản phẩm khi component được render lần đầu tiên
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(); // Gọi API để lấy danh sách sản phẩm
        setProducts(response.data); // Cập nhật danh sách sản phẩm vào state
      } catch (error) {
        alert('Lỗi khi tải sản phẩm'); // Thông báo lỗi nếu có lỗi xảy ra
      }
    };
    fetchProducts();
  }, []); // Chỉ chạy một lần khi component mount

  //* Xử lý thay đổi trong input form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // Cập nhật giá trị nhập vào state form
  };

  //* Xử lý submit form để thêm hoặc cập nhật sản phẩm
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi reload trang mặc định của form
    try {
      if (editId) {
        // Nếu đang chỉnh sửa sản phẩm
        const response = await updateProduct(editId, form); // Gọi API cập nhật sản phẩm
        setProducts(products.map((p) => (p.id === editId ? response.data : p))); // Cập nhật danh sách sản phẩm trong state
        setEditId(null); // Đặt lại trạng thái chỉnh sửa
      } else {
        // Nếu đang thêm sản phẩm mới
        const response = await addProduct(form); // Gọi API thêm sản phẩm
        setProducts([...products, response.data]); // Thêm sản phẩm mới vào danh sách
      }
      // Reset form về trạng thái ban đầu
      setForm({
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
      });
    } catch (error) {
      alert('Lỗi khi xử lý sản phẩm'); // Thông báo lỗi nếu có
    }
  };

  //* Xử lý chỉnh sửa sản phẩm
  const handleEdit = (product) => {
    setEditId(product.id); // Lưu ID sản phẩm đang chỉnh sửa
    setForm(product); // Hiển thị thông tin sản phẩm cần chỉnh sửa lên form
  };

  //* Xử lý xóa sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      // Hiển thị hộp thoại xác nhận
      try {
        await deleteProduct(id); // Gọi API xóa sản phẩm
        setProducts(products.filter((p) => p.id !== id)); // Cập nhật danh sách sản phẩm trong state
      } catch (error) {
        alert('Lỗi khi xóa sản phẩm'); // Thông báo lỗi nếu có
      }
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h1 className="text-center mb-4">Quản lý sản phẩm</h1>

      {/* Form thêm / chỉnh sửa sản phẩm */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          {/* Render các input theo danh sách field */}
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

      {/* Bảng danh sách sản phẩm */}
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
                {/* Nút chỉnh sửa */}
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(product)}
                >
                  Sửa
                </button>
                {/* Nút xóa */}
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
