import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 12px;
`;

const Img = styled.div`
  background-image: url(${props => props.bgUrl});
  height: 180px;
  opacity: 0.7;
  transform: scale(1);
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
`;
const Rating = styled.span`
  position: absolute;
  bottom: 5px;
  right: 5px;
  opacity: 0;
  transition: opacity 0.3s linear;
`;
const ImgContainer = styled.div`
  position: relative;
  margin-bottom: 5px;
  &:hover {
    ${Img} {
      opacity: 1;
      transform: scale(1.05);
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;
const Year = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
`;

const Poster = ({ id, imgUrl, rating, title, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/tv/${id}`}>
    <Container>
      <ImgContainer>
        <Img
          bgUrl={
            imgUrl
              ? `https://image.tmdb.org/t/p/w300${imgUrl}`
              : require('../assets/noPoster.jpg')
          }
        />
        <Rating>
          <span role="img" aria-label="rating">
            ⭐
          </span>
          {rating}/10
        </Rating>
      </ImgContainer>
      <Title>
        {title.length > 18 ? `${title.substring(0, 18)}...` : title}
      </Title>
      <Year>{year}</Year>
    </Container>
  </Link>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imgUrl: PropTypes.string,
  rating: PropTypes.number,
  title: PropTypes.string.isRequired,
  year: PropTypes.string,
  isMovie: PropTypes.bool
};

export default Poster;
