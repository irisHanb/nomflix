import React, { Component } from 'react';
import TVPresenter from './TVPresenter';
import { tvApi } from '../../api';

class TVContainer extends Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    loading: true,
    err: null
  };

  async componentDidMount() {
    try {
      const {
        data: { results: topRated }
      } = await tvApi.topRated();
      const {
        data: { results: popular }
      } = await tvApi.popular();
      const {
        data: { results: airingToday }
      } = await tvApi.airingToday();
      this.setState({
        topRated,
        popular,
        airingToday
      });
    } catch {
      this.setState({
        err: `Cant't find movies information.`
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    const { topRated, popular, airingToday, loading, err } = this.state;
    return (
      <TVPresenter
        topRated={topRated}
        popular={popular}
        airingToday={airingToday}
        loading={loading}
        err={err}
      />
    );
  }
}

export default TVContainer;
