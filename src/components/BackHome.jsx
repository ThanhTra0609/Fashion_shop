//todo: Button back to home page
import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackHome() {
  const navigate = useNavigate();

  return (
    <div className="text-center" style={{ marginBottom: '100px' }}>
      {/* Quay về trang chủ */}
      <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>
        {/* Thêm icon của font awesome */}
        <i class="fa-solid fa-arrow-left"></i> Trang chủ
      </button>
    </div>
  );
}
export default BackHome;
