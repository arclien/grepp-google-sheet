import styled from 'styled-components';
import { flexContainer, NewBaseButton, Spinner, gray400, white, font } from 'remember-ui';

export const WelcomeContainer = styled.div`
  ${flexContainer('center', 'center', 'column')};

  height:100vh;
`

export const Title = styled.div`
  ${font({ size: '20px', color: gray400 })};
`

export const ClickButton = styled(NewBaseButton)`
  ${font({ size: '14px', weight: 'bold', color: white })};

  margin-bottom:10px;
`;


export const SpinnerContainer = styled.div`
  ${flexContainer('center', 'center')};

  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100vh;
  max-height: 100vw;
  overflow: hidden;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const SpinnerComponent = styled(Spinner)``;
