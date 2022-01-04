import styled, { css } from 'styled-components';
import { red100, flexContainer, font } from 'remember-ui';

export const Container = styled.div`
  ${flexContainer('flex-start', 'flex-start', 'column')};

  position: relative;
  width: 100%;
`;

export const Row = styled.div`
  ${flexContainer('start', 'center')};
  flex-wrap: wrap;
  width: 100%;
`;

export const RowTop = styled.div`
  ${flexContainer('flex-start', 'flex-start')};

  width: 100%;
`;

export const Title = styled.div`
  ${font({ size: '13px', weight: 'bold', color: '#010101' })};

  line-height: 1.33;
  letter-spacing: -0.8px;
  padding-bottom: 10px;
`;

export const Required = styled.span`
  ${font({ size: '20px', weight: 'bold', color: red100 })};

  margin-left: 4px;
  position: relative;
  top: -1px;
  width: 6px;
  height: 6px;
`;

export const RadioBox = styled.div`
  height: 44px;
  margin: 5px;
  padding: 10px 14px 10px;
  border-radius: 4px;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.3), inset 4px 4px 0 0 #ffffff,
    inset -4px -4px 0 0 #b0b0b0;
  border: solid 2px #000000;
  background-color: #f7f7f7;
  color: #383838;
  cursor: pointer;

  ${({ isChecked }) =>
    isChecked &&
    css`
      box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.3), inset 4px 4px 0 0 #878787,
        inset -4px -4px 0 0 #232323;
      border: solid 2px #000000;
      background-color: #383838;
      color: #ffffff;
    `}
`;

export const Text = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: -0.93px;
  text-align: center;
`;
