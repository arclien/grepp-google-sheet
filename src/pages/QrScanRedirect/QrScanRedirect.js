import React from 'react';

import GoogleSheetProxy from 'components/GoogleSheetProxy/GoogleSheetProxy';

import { Container } from './QrScanRedirect.styles';

const QrScanRedirect = () => {
  return (
    <Container>
      <GoogleSheetProxy />
    </Container>
  );
};

export default QrScanRedirect;
