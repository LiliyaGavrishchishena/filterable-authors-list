import React, { Component } from 'react';

import SearchBar from './SearchBar';
import AuthorsList from './AuthorsList';
import Pagination from './Pagination';

import styles from './FilterableAuthorsList.module.css';

import data from '../../db/data';

const INITIAL_STATE = {
  authors: [],
  filter: '',
  sortedByAuthorUp: true,
  sortedByPageViewsUp: true,
  currentPage: 1,
  authorsPerPage: 10
};

export default class FilterableAuthorsList extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    const authorsList = []
      .concat(data)
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .sort((a, b) => b.pageviews - a.pageviews)
      .map((item, idx) => ({ ...item, raiting: idx + 1 }));

    this.setState({ authors: authorsList });
  }

  handleChangeSortedByAuthor = () => {
    const { sortedByAuthorUp, authors } = this.state;
    const authorsList = sortedByAuthorUp
      ? [].concat(authors).sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      : [].concat(authors).sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        });
    this.setState({
      authors: authorsList,
      sortedByAuthorUp: !sortedByAuthorUp
    });
  };

  handleChangeSortedPageViews = () => {
    const { sortedByPageViewsUp, authors } = this.state;
    const authorsList = sortedByPageViewsUp
      ? [].concat(authors).sort((a, b) => {
          if (a.pageviews < b.pageviews) {
            return -1;
          }
          if (a.pageviews > b.pageviews) {
            return 1;
          }
          return 0;
        })
      : [].concat(authors).sort((a, b) => {
          if (a.pageviews > b.pageviews) {
            return -1;
          }
          if (a.pageviews < b.pageviews) {
            return 1;
          }
          return 0;
        });
    this.setState({
      authors: authorsList,
      sortedByPageViewsUp: !sortedByPageViewsUp
    });
  };

  handleChangeFilter = ({ target: { value } }) => {
    this.setState({
      filter: value
    });
  };

  handleChangeNextPage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  handleChangePrevPage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
  };

  render() {
    const { authors, filter, currentPage, authorsPerPage } = this.state;
    const prevItem =
      currentPage === 1 ? 0 : currentPage * authorsPerPage - authorsPerPage;
    const nexItem =
      currentPage * authorsPerPage <= authors.length
        ? currentPage * authorsPerPage
        : authors.length;
    const filteredAuthors = authors
      .filter(item => item.name.toLowerCase().includes(filter))
      .slice(prevItem, nexItem);

    return (
      <div className={styles.container}>
        <SearchBar
          filter={filter}
          handleChangeFilter={this.handleChangeFilter}
        />
        {filteredAuthors.length > 0 ? (
          <AuthorsList
            items={filteredAuthors}
            sortedAuthor={this.handleChangeSortedByAuthor}
            sortedPageViews={this.handleChangeSortedPageViews}
          />
        ) : (
          <h3>Попробуйте изменить условия поиска</h3>
        )}

        <Pagination
          maxItems={authors.length}
          currentPage={currentPage}
          authorsPerPage={authorsPerPage}
          nextPage={this.handleChangeNextPage}
          prevPage={this.handleChangePrevPage}
        />
      </div>
    );
  }
}
