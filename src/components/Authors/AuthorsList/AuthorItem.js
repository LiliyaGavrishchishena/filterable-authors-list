import React from 'react';
import medalGold from '../asssets/medals/1st.svg';
import medalSilver from '../asssets/medals/2nd.svg';
import medalBronze from '../asssets/medals/3rd.svg';

import styles from './AuthorItem.module.css';

const COLORS = [
  '#3ccbe1',
  '#c666d0',
  '#ef906c',
  '#3fa9eb',
  '#b84860',
  '#94c277',
  '#c1467c',
  '#345af4',
  '#3bd5df',
  '#badd87'
];

const randomColors = () => Math.floor(Math.random() * COLORS.length);

const style = num => ({ backgroundColor: COLORS[num] });

const getMedalForViews = idx => {
  if (idx === 1) {
    return <img src={medalGold} alt="medalGold" width="20px" />;
  } else if (idx === 2) {
    return <img src={medalSilver} alt="medalSilver" width="20px" />;
  } else if (idx === 3) {
    return <img src={medalBronze} alt="medalBronze" width="20px" />;
  } else {
    return null;
  }
};

const AuthorItem = ({ author, index, sortedAuthor, sortedPageViews }) => {
  return (
    <div className={styles.line}>
      <div className={styles.number}>{index}</div>
      <div className={styles.color}>
        <div className={styles.round} style={style(randomColors())}>
          <span className={styles.letter}>{author.name[0]}</span>
        </div>
      </div>
      <div className={styles.name} onClick={sortedAuthor}>
        <div className={styles.author}>{author.name}</div>
        <div className={styles.count_pub}>{author.count_pub} публ.</div>
      </div>
      <div className={styles.medal}>{getMedalForViews(author.raiting)}</div>
      <div className={styles.pageviews} onClick={sortedPageViews}>
        {author.pageviews}
      </div>
    </div>
  );
};

export default AuthorItem;
