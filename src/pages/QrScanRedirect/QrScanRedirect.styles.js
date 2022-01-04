import styled, { css } from 'styled-components';
import { flexContainer, mobileOnly } from 'remember-ui';

export const Container = styled.div`
  ${flexContainer('center', 'center', 'column')};
  width: 100vw;
  height: 100vh;

  ${mobileOnly(css`
    height: 100%;
  `)}
`;
