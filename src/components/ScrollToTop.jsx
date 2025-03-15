import { useEffect, useState } from 'react';
import '../App.css'; // Đảm bảo có style

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Theo dõi sự kiện cuộn
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200); // Hiện nút khi cuộn > 200px
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`btn btn-pink scroll-to-top ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}

export default ScrollToTop;
