import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setCurrentPage} from '../../redux/slices/filterSlice';

import styles from './Pagination.module.scss'

function Pagination({ itemsCount, pageSize }) {

  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.filter.currentPage);

  let pages = [];
  if (itemsCount > 0) {
    const pageCount = Math.ceil(itemsCount / pageSize);

    if (pageCount === 1) return null;

    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }
  }

  

  return (
    <nav>
      <ul className="pagination">
        {pages.map((item, i) => {
          return (
            <li key={i} onClick={() => dispatch(setCurrentPage(i + 1))} className={((currentPage - 1) === i ? `${styles.root} ${styles.active}` : `${styles.root}`)}>
              <button>
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Pagination;
