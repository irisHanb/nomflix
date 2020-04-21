import React, { Component } from 'react';
import SearchPresenter from './SearchPresenter';
import { moviesApi, tvApi } from '../../api';

class SearchContainer extends Component {
  state = {
    movieResults: null,
    tvResults: null,
    term: '',
    loading: false,
    err: null
  };

  handleSubmit = e => {
    e.preventDefault();
    const { term } = this.state;
    if (term !== '') {
      this.searchTerm();
    }
  };

  searchTerm = async () => {
    const { term } = this.state;
    this.setState({ loading: true });
    try {
      const {
        data: { results: movieResults }
      } = await moviesApi.search(term);

      const {
        data: { results: tvResults }
      } = await tvApi.search(term);

      this.setState({ movieResults, tvResults });
    } catch {
      this.setState({
        err: `Error`
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  };

  updateTerm = e => {
    this.setState({ term: e.target.value });
  };

  render() {
    const { movieResults, tvResults, term, loading, err } = this.state;

    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        term={term}
        loading={loading}
        err={err}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}

export default SearchContainer;
