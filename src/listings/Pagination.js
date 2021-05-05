import React from "react";

function Pagination({ totalPages, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      style={{
        gridColumn: "1/4",
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px",
      }}
    >
      <ul className="pagination">
        {pageNumbers.map((num) => (
          <li key={num} className="page-item">
            <a onClick={() => paginate(num)} href="#!" className="page-link">
              {num}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
