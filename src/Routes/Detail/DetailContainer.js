import React from 'react';
import DetailPresenter from './DetailPresenter';
import { moviesApi, tvApi } from '../../api';

class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;

    this.state = {
      result: null,
      err: null,
      loading: true,
      isMovie: pathname.includes('/movie/')
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;

    const numId = parseInt(id);
    if (isNaN(numId)) {
      return push('/');
    }
    const { isMovie } = this.state;
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.detail(id));
      } else {
        ({ data: result } = await tvApi.detail(id));
      }
    } catch {
      this.setState({
        err: `Can't find.`
      });
    } finally {
      console.log('finall');
      this.setState({
        result,
        loading: false
      });
    }
  }

  render() {
    const { result, err, loading } = this.state;
    console.log(result, loading);
    return <DetailPresenter result={result} err={err} loading={loading} />;
  }
}

export default DetailContainer;
