import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div style={{ marginTop: '1rem', textAlign: 'center' }}>
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={currentPage === 1 ? "btn-disabled" : ""}
      style={{ marginRight: '1rem' }}
    >
      Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={currentPage === totalPages ? "btn-disabled" : ""}
      style={{ marginLeft: '1rem' }}
    >
      Next
    </button>
  </div>
);

export default Pagination;