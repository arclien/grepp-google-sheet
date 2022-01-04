import React from 'react';

import GoogleSheetProxy from 'components/GoogleSheetProxy/GoogleSheetProxy';

import { Container } from './AddTerm.styles';

const Home = () => {
  return (
    <Container>
      <GoogleSheetProxy />
    </Container>
  );
};

export default Home;
