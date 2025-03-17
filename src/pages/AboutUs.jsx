import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
  const members = [
    {
      mssv: 'CE180100',
      name: 'Lê Thanh Trà',
      tasks:
        'Phát triển Homepage, xây dựng ProductList.jsx, tích hợp API, định tuyến, thiết kế Navbar, Footer, và BackHome.jsx',
    },
    {
      mssv: 'CE180982',
      name: 'Châu Minh Triết',
      tasks:
        'Tối ưu hóa Pagination.jsx, đề xuất sản phẩm với ProductSuggestions.jsx',
    },
    {
      mssv: 'CE181683',
      name: 'Nguyễn Mai Xuân',
      tasks:
        'Xây dựng bộ lọc sản phẩm với Filter.jsx, tạo hiệu ứng tải với Loading.jsx',
    },
    {
      mssv: 'CE181983',
      name: 'Nguyễn Thái Ngọc',
      tasks:
        'Phát triển trang quản trị AdminPage.jsx, bao gồm quản lý thêm/xóa/sửa sản phẩm',
    },
    {
      mssv: 'CE181070',
      name: 'Trần Anh Thư',
      tasks:
        'Xây dựng trang chi tiết sản phẩm với ProductDetailPage.jsx, xử lý điều hướng mượt mà với ScrollToTop.jsx',
    },
    {
      mssv: 'CE181198',
      name: 'Mai Trưởng Thành',
      tasks:
        'Tích hợp thanh tìm kiếm thông minh với SearchBar.jsx, hiển thị sản phẩm mới nhất với NewestProduct.jsx',
    },
  ];

  return (
    <div className="container py-5" style={{ backgroundColor: '#ffe6f2' }}>
      <div className="text-center mb-4">
        <h1
          className="text-pink fw-bold display-4"
          style={{ color: '#d63384' }}
        >
          Giới thiệu về Fashion Shop Online
        </h1>
        <div className="text-muted fs-4" style={{ textAlign: 'justify' }}>
          <p>
            Fashion Shop là dự án được phát triển hiện đại, cung cấp trải nghiệm
            mua sắm tiện lợi với giao diện thân thiện.
          </p>
          <p>
            Trang chủ hiển thị sản phẩm mới nhất, hỗ trợ tìm kiếm, lọc theo danh
            mục và gợi ý sản phẩm liên quan.
          </p>
          <p>
            Danh sách sản phẩm có phân trang giúp duyệt nhanh hơn, cùng nút quay
            lại trang chủ khi không tìm thấy sản phẩm.
          </p>
          <p>
            Ngoài ra, website tích hợp thanh điều hướng, footer, hiệu ứng tải
            trang mượt mà và nút cuộn lên đầu trang.
          </p>
          <p>Trang admin hỗ trợ quản lý sản phẩm, đơn hàng hiệu quả.</p>
        </div>
      </div>

      <div className="text-center mb-4">
        <h2
          className="p-3 rounded display-5"
          style={{ backgroundColor: '#ff99cc', color: 'white' }}
        >
          Thông tin nhóm 4
        </h2>
      </div>

      <div className="row justify-content-center">
        {members.map((member, index) => (
          <div key={index} className="col-md-6 col-sm-12 mb-4">
            <div
              className="card shadow-lg h-100"
              style={{
                borderRadius: '15px',
                backgroundColor: 'white',
                border: '2px solid #ff99cc',
              }}
            >
              <div className="card-body text-center d-flex flex-column justify-content-center">
                <h5
                  className="card-title fw-bold fs-3"
                  style={{ color: '#d63384' }}
                >
                  {member.name}
                </h5>
                <p className="card-text text-dark fs-4">MSSV: {member.mssv}</p>
                <p
                  className="card-text text-muted fs-5"
                  style={{ minHeight: '60px' }}
                >
                  {member.tasks}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
