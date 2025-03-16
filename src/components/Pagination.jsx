function Pagination({ productsPerPage, totalProducts, paginate, currentPage }) {
  const pageNumbers = Array.from(
    { length: Math.ceil(totalProducts / productsPerPage) },
    (_, i) => i + 1
  );

  return (
    <div className="container" style={{ marginBottom: '100px' }}>
      <nav>
        <ul className="pagination justify-content-center">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${number === currentPage ? 'active' : ''}`}
            >
              <button
                onClick={() => paginate(number)}
                className="page-link"
                style={
                  number === currentPage
                    ? {
                        backgroundColor: '#ff69b4',
                        borderColor: '#ff69b4',
                        color: 'white',
                      }
                    : {}
                }
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
