import React from 'react';
import AuthorItem from './AuthorItem';

import styles from './AuthorsList.module.css';

const AuthorsList = ({ items, sortedAuthor, sortedPageViews }) => (
  <ul className={styles.list}>
    {items.map((item, idx) => (
      <li
        key={item.name}
        className={(idx + 1) % 2 !== 0 ? styles.item : styles.itemD}
      >
        <AuthorItem
          author={item}
          index={idx + 1}
          sortedAuthor={sortedAuthor}
          sortedPageViews={sortedPageViews}
        />
      </li>
    ))}
  </ul>
);

export default AuthorsList;
