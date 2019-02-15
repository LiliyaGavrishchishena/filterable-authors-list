import React from 'react';

import styles from './Pagination.module.css';

const Pagination = ({
  currentPage,
  authorsPerPage,
  nextPage,
  prevPage,
  maxItems
}) => {
  const prevItem =
    currentPage === 1 ? 1 : currentPage * authorsPerPage - (authorsPerPage - 1);
  const nexItem =
    currentPage * authorsPerPage <= maxItems
      ? currentPage * authorsPerPage
      : maxItems;
  return (
    <div className={styles.pagination}>
      {currentPage !== 1 && (
        <div className={styles.arrowLeft} onClick={prevPage} />
      )}
      <span>
        {prevItem}-{nexItem}
      </span>
      {nexItem !== maxItems && (
        <div className={styles.arrowRight} onClick={nextPage} />
      )}
    </div>
  );
};

export default Pagination;
