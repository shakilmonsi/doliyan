import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;
  let startPage, endPage;

  if (totalPages <= maxVisiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const half = Math.floor(maxVisiblePages / 2);
    if (currentPage <= half) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + half >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - half;
      endPage = currentPage + half;
    }
  }

  return (
    <div className="flex items-center space-x-2 py-5 md:py-10">
      <button
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded-md px-3 py-1 py-2 text-xs ${
          currentPage === 1
            ? "cursor-not-allowed bg-gray-200 text-gray-500"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        &laquo; Prev
      </button>

      {startPage > 1 && (
        <>
          <button
            key={1}
            onClick={() => onPageChange(1)}
            className="rounded-md bg-white px-3 py-1 hover:bg-gray-100"
          >
            1
          </button>
          {startPage > 2 && (
            <span key="left-ellipsis" className="px-2">
              ...
            </span>
          )}
        </>
      )}

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i,
      ).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-md px-2 py-1 text-xs md:px-3 md:text-base ${
            currentPage === page
              ? "bg-blue-400 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span key="right-ellipsis" className="px-2">
              ...
            </span>
          )}
          <button
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            className="rounded-md bg-white px-1 py-1 text-xs hover:bg-gray-100 md:px-3 md:text-base"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`rounded-md px-3 py-2 text-xs ${
          currentPage === totalPages
            ? "cursor-not-allowed bg-gray-200 text-gray-500"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
