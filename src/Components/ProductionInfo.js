import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: ${props => (props.id === props.current ? 'flex' : 'none')};
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const ItemContainer = styled.div``;

const NoInfo = styled.div`
  text-align: center;
`;

const Item = styled.div`
  width: ${props => (props.kind === 'videos' ? '500px' : '150px')};
  height: ${props => (props.kind === 'videos' ? '300px' : 'auto')};
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.4em;
  margin: 5px;
  margin-left: 0;
`;

const Title = styled.span`
  padding-bottom: 0.7em;
  font-weight: 400;
  line-height: 1.2;
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const VideoContents = styled.div`
  width: 100%;
  height: 100%;
`;
const Video = styled.iframe`
  width: 100%;
  height: 100%;
`;

const ProductionInfo = ({ kind = 'no', id = 0, current = 0, list = [] }) => {
  return (
    <Container id={id} current={current}>
      {list.length === 0 && <NoInfo>There is no information.</NoInfo>}
      {list.map((ele, idx) => (
        <Item kind={kind}>
          {ele.name && (
            <Title>
              {ele.name}
              {ele.air_date && ` / ${ele.air_date.substring(0, 4)}`}
            </Title>
          )}
          {ele.logo_path && (
            <ImgContainer>
              <Img
                src={`https://image.tmdb.org/t/p/original/${ele.logo_path}`}
                alt={ele.name}
              />
            </ImgContainer>
          )}
          {ele.poster_path && (
            <ImgContainer>
              <Img
                src={`https://image.tmdb.org/t/p/original/${ele.poster_path}`}
                alt={ele.name}
              />
            </ImgContainer>
          )}
          {kind === 'videos' && ele.key && (
            <VideoContents>
              <Video
                title={ele.name}
                src={`https://www.youtube.com/embed/${ele.key.toString()}`}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              ></Video>
            </VideoContents>
          )}
        </Item>
      ))}
    </Container>
  );
};

// ProductionInfo.prototypes = {
//   list: PropTypes.arrayOf([
//     PropTypes.objectOf({
//       name: PropTypes.string,
//       logo_path: PropTypes.string
//     })
//   ])
// };

export default ProductionInfo;
