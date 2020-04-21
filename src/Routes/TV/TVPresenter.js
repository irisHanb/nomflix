import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Section from '../../Components/Section';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';

import { Container } from '../../Components/GlobalStyles';

const TVPresenter = ({ topRated, popular, airingToday, loading, err }) => (
  <>
    <Helmet>
      <title>TV Series | Nomflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        {topRated && topRated.length > 0 && (
          <Section title="Top Rated">
            {topRated.map(ele => (
              <Poster
                key={ele.id}
                id={ele.id}
                imgUrl={ele.poster_path}
                title={ele.original_name}
                rating={ele.vote_average}
                year={ele.first_air_date && ele.first_air_date.substring(0, 4)}
              />
            ))}
          </Section>
        )}
        {popular && popular.length > 0 && (
          <Section title="Popular">
            {popular.map(ele => (
              <Poster
                key={ele.id}
                id={ele.id}
                imgUrl={ele.poster_path}
                title={ele.original_name}
                rating={ele.vote_average}
                year={ele.first_air_date && ele.first_air_date.substring(0, 4)}
              />
            ))}
          </Section>
        )}
        {airingToday && airingToday.length > 0 && (
          <Section title="Airing Today">
            {airingToday.map(ele => (
              <Poster
                key={ele.id}
                id={ele.id}
                imgUrl={ele.poster_path}
                title={ele.original_name}
                rating={ele.vote_average}
                year={ele.first_air_date && ele.first_air_date.substring(0, 4)}
              />
            ))}
          </Section>
        )}
        {err && <Message text={err} />}
      </Container>
    )}
  </>
);

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  err: PropTypes.string
};

export default TVPresenter;
