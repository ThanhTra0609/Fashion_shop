import { FadeLoader } from 'react-spinners';
import '../App.css';

function Loading() {
  return (
    <div className="loading-container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <FadeLoader color="#ff69b4" height={15} width={5} radius={2} margin={2} />
      <p className="mt-4 fw-semibold fs-5" style={{ color: '#ff69b4' }}>
        Đang tải dữ liệu, vui lòng chờ...
      </p>
    </div>
  );
}

export default Loading;

