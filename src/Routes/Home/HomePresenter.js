import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Section from '../../Components/Section';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import Poster from '.../../Components/Poster';
import { Container } from '.../../Components/GlobalStyles';

const HomePresenter = ({ nowPlaying, popular, upcoming, err, loading }) => (
  <>
    <Helmet>
      <title>Movies | Nomflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        {nowPlaying && nowPlaying.length > 0 && (
          <Section title="Now Playing">
            {nowPlaying.map(ele => (
              <Poster
                key={ele.id}
                id={ele.id}
                imgUrl={ele.poster_path}
                title={ele.title}
                rating={ele.vote_average}
                year={ele.release_date && ele.release_date.substring(0, 4)}
                isMovie={true}
              />
            ))}
          </Section>
        )}
        {upcoming && upcoming.length > 0 && (
          <Section title="Upcoming Movies">
            {nowPlaying.map(ele => (
              <Poster
                key={ele.id}
                id={ele.id}
                title={ele.title}
                imgUrl={ele.poster_path}
                rating={ele.vote_average}
                year={ele.release_date && ele.release_date.substring(0, 4)}
                isMovie={true}
              />
            ))}
          </Section>
        )}
        {popular && popular.length > 0 && (
          <Section title="Popular movies">
            {popular.map(ele => (
              <Poster
                key={ele.id}
                id={ele.id}
                imgUrl={ele.poster_path}
                title={ele.title}
                rating={ele.vote_average}
                year={ele.release_date && ele.release_date.substring(0, 4)}
                isMovie={true}
              />
            ))}
          </Section>
        )}
        {err && <Message text={err} />}
      </Container>
    )}
  </>
);
HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  err: PropTypes.string
};

export default HomePresenter;
