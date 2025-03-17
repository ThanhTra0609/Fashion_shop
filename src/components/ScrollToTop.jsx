import React from 'react';
import { useEffect, useState } from 'react';
import '../App.css'; // Đảm bảo có style

function ScrollToTop() {
  //* State để kiểm tra nút có hiển thị hay không
  const [isVisible, setIsVisible] = useState(false);

  //* Theo dõi sự kiện cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200); //* Hiện nút khi cuộn xuống quá 200px
    };

    window.addEventListener('scroll', handleScroll); // Lắng nghe sự kiện cuộn
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup khi unmount
  }, []);

  //* Hàm cuộn lên đầu trang khi click vào nút
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn mượt mà lên đầu trang
  };

  return (
    <button
      className={`btn btn-pink scroll-to-top ${isVisible ? 'show' : ''}`} // Thêm class 'show' khi isVisible = true
      onClick={scrollToTop} //* Gọi hàm cuộn lên đầu trang khi click
    >
      <i className="fas fa-arrow-up"></i> {/* Icon mũi tên lên */}
    </button>
  );
}

export default ScrollToTop;
