import { useNavigate } from 'react-router-dom';

function BackHome() {
  const navigate = useNavigate();

  return (
    <div className="text-center" style={{ marginBottom: '100px' }}>
      <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>
        <i class="fa-solid fa-arrow-left"></i> Trang chủ
      </button>
    </div>
  );
}
export default BackHome;
