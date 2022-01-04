import styled, { css } from 'styled-components';
import {
  flexContainer,
  Spinner,
  font,
  gray400,
  BaseInput,
  NewBaseButton,
  mobileOnly,
} from 'remember-ui';

export const WelcomeContainer = styled.div`
  ${flexContainer('center', 'center', 'column')};

  width: 50%;

  ${mobileOnly(css`
    width: 100%;
    padding: 20px;
  `)}
`;

export const Title = styled.div`
  ${font({ size: '20px', color: gray400 })};
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

export const Row = styled.div`
  ${flexContainer('space-between', 'center')};

  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

export const Input = styled(BaseInput)`
  width: 100%;

  > div > span {
    ${font({ size: '13px', weight: 'bold', color: '#010101' })};
    line-height: 1.54;
    letter-spacing: -0.4px;
  }

  > div > img {
    width: 8px;
    height: 8px;
    top: -2px;
  }
`;

export const ClickButton = styled(NewBaseButton)`
  ${font({ size: '16px', weight: 'bold', color: '#000' })};

  line-height: 44px;
  letter-spacing: -1.37px;

  padding: 0 16px;
  margin: 0 auto;

  bottom: 16px;
  height: 44px;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.3), inset 4px 4px 0 0 #ffefb4,
    inset -4px -4px 0 0 #d4ab0f;
  border: solid 2px #000000;
  background-color: #e9be1a;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;
