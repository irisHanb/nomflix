import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Section from '../../Components/Section';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';
import { Container } from '../../Components/GlobalStyles';

const Form = styled.form`
  margin-bottom: 20px;
  width: 100%;
`;
const Input = styled.input`
  width: 100%;
  all: unset;
  font-size: 28px;
`;

const SearchPresenter = ({
  movieResults,
  tvResults,
  term,
  handleSubmit,
  updateTerm,
  loading,
  err
}) => (
  <>
    <Helmet>
      <title>Search | Noflix</title>
    </Helmet>
    {
      <Container>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Search Movies or TV Shows..."
            value={term}
            onChange={updateTerm}
          />
        </Form>
        {loading ? (
          <Loader />
        ) : (
          <>
            {movieResults && movieResults.length > 0 && (
              <Section title="Movie Result">
                {movieResults.map(ele => (
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
            {tvResults && tvResults.length > 0 && (
              <Section title="TV Result">
                {tvResults.map(ele => (
                  <Poster
                    key={ele.id}
                    id={ele.id}
                    imgUrl={ele.poster_path}
                    title={ele.original_name}
                    rating={ele.vote_average}
                    year={
                      ele.first_air_date && ele.first_air_date.substring(0, 4)
                    }
                  />
                ))}
              </Section>
            )}
            {err && <Message color="#e74c3c" text={err} />}
            {tvResults &&
              tvResults.length === 0 &&
              movieResults &&
              movieResults.length === 0 && (
                <Message color="#95a5a6" text="Nothing found" />
              )}
          </>
        )}
      </Container>
    }
  </>
);

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  term: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  err: PropTypes.string
};

export default SearchPresenter;
