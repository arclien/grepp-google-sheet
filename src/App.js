import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { GlobalTheme } from 'remember-ui';

import { ConfirmModalProvider } from 'context/ConfirmModalContext';
import GlobalConfirmModal from 'components/GlobalConfirmModal/GlobalConfirmModal';
import GlobalHelmet from 'components/GlobalHelmet/GlobalHelmet';
import Routes from 'routers/routes';
import CommonRoute from 'routers/CommonRoute';
import Home from 'pages/Home/Home';
import QrScanRedirect from 'pages/QrScanRedirect/QrScanRedirect';

import { AppBody } from './App.styles';

const BASE_URL = '/grepp-google-sheet';

function App() {
  const { root, qrScanRedirect, addTerm } = Routes;

  return (
    <ConfirmModalProvider>
      <GlobalHelmet />
      <BrowserRouter basename={BASE_URL}>
        <AppBody>
          <GlobalTheme />
          <Switch>
            <CommonRoute path={qrScanRedirect.path}>
              <QrScanRedirect />
            </CommonRoute>
            <CommonRoute path={addTerm.path}>
              <QrScanRedirect />
            </CommonRoute>
            <CommonRoute path={root.path}>
              <Home />
            </CommonRoute>
            <Redirect to={root.path} />
          </Switch>
        </AppBody>
        <GlobalConfirmModal />
      </BrowserRouter>
    </ConfirmModalProvider>
  );
}

export default App;
