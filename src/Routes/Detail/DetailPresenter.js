import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Loader from 'Components/Loader';
import ProductionInfo from '../../Components/ProductionInfo';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgUrl});
  background-size: cover;
  background-position: center center;
  filter: blur(3px);
  opacity: 0.3;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${props => props.bgUrl});
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.span`
  font-size: 32px;
  margin-bottom: 10px;
`;
const ItemContainer = styled.div`
  margin: 20px 0;
`;
const Item = styled.span``;
const Divider = styled.span`
  margin: 0 10px;
`;
const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.2;
  max-width: 70%;
`;

const SiteLink = styled.a`
  padding: 0px 4px;
  border-radius: 2px;
  background-color: #fab005;
  color: black;
  font-weight: 500;
`;

const TabsContainer = styled.div``;

const Tabs = styled.div`
  margin-top: 25px;
`;
const Tab = styled.span`
  display: inline-block;
  padding: 6px 6px;
  margin-right: 10px;
  margin-bottom: 5px;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 1);
  font-weight: bold;
  color: black;
  transition: opacity 0.3s ease-in-out;
`;

const TabContentsContainer = styled.div`
  margin-top: 5px;
`;

const etcData = [
  { key: 'production_companies', title: 'Production Companies', list: [] },
  { key: 'production_countries', title: 'Production Countries', list: [] },
  { key: 'videos', title: 'Videos', list: [] },
  { key: 'seasons', title: 'Seasons', list: [] }
];

const DetailPresenter = ({ result, err, loading }) => {
  const [current, setCurrent] = useState(0);
  const handleClick = idx => {
    setCurrent(idx);
  };

  return loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{' '}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgUrl={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />

      <Content>
        <Cover
          bgUrl={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('../../assets/noPoster.jpg')
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((ele, idx) =>
                  idx !== result.genres.length - 1 ? `${ele.name} / ` : ele.name
                )}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.imdb_id && (
                <SiteLink
                  href={`https://www.imdb.com/title/${result.imdb_id}`}
                  target="_blank"
                >
                  IMDB
                </SiteLink>
              )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <Tabs>
            {etcData.map((info, idx) => {
              return (
                <Tab
                  key={info.key}
                  onClick={() => handleClick(idx)}
                  style={current === idx ? { opacity: 1 } : { opacity: 0.4 }}
                >
                  {info.title}
                </Tab>
              );
            })}
          </Tabs>

          <TabContentsContainer>
            {etcData.map((info, idx) => {
              return (
                <div>
                  {result[info.key] ? (
                    <ProductionInfo
                      kind={info.key}
                      id={idx}
                      current={current}
                      list={
                        result[info.key].results
                          ? result[info.key].results
                          : result[info.key]
                      }
                    ></ProductionInfo>
                  ) : (
                    <ProductionInfo id={idx} current={current}></ProductionInfo>
                  )}
                </div>
              );
            })}
          </TabContentsContainer>
        </Data>
      </Content>
    </Container>
  );
};

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  err: PropTypes.string
};

export default DetailPresenter;
