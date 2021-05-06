import React from "react";

function Pagination({ totalPages, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  function handleClick(e, num) {
    let pages = document.getElementsByClassName("page-link");

    for (let i = 0; i < pages.length; i++) {
      pages[i].classList.remove("active");
    }

    e.target.classList.add("active");

    paginate(num);
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
            <a
              onClick={(e) => handleClick(e, num)}
              href="#!"
              className="page-link"
            >
              {num}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
