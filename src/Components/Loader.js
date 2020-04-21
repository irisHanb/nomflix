import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  font-size: 30px;
  color: white;
`;

export default () => (
  <Container>
    <span>Loading...</span>
  </Container>
);
