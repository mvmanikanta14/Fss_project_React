import React from 'react';

const Pagination = ({ totalElements, recordsPerPage, pageNumber, onPageChange }) => {
  const totalPages = Math.ceil(totalElements / recordsPerPage);

  const handlePageChange = (newPageNumber) => {
    if (newPageNumber >= 1 && newPageNumber <= totalPages) {
      onPageChange(newPageNumber);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    // Calculate the range of page numbers to display
    const startPage = Math.max(1, pageNumber - 2);
    const endPage = Math.min(totalPages, pageNumber + 2);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === pageNumber ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(pageNumber - 1)}
        disabled={pageNumber === 1}
      >
        Previous
      </button>
      {renderPaginationButtons()}
      <button
        onClick={() => handlePageChange(pageNumber + 1)}
        disabled={pageNumber === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
