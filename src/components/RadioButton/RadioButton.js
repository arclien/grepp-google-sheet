import React from 'react';

import {
  Container,
  Row,
  RowTop,
  Title,
  Text,
  Required,
  RadioBox,
} from './RadioButton.styles';

const RadioButton = ({
  title,
  required,
  value,
  formKey,
  onClickRadio,
  radioOptions = null,
}) => {
  return (
    <Container>
      <RowTop>
        <Title>{title}</Title>
        {required && <Required>*</Required>}
      </RowTop>
      <Row>
        {radioOptions &&
          Object.entries(radioOptions).map((option) => {
            return (
              <RadioBox
                key={option[0]}
                isChecked={value === option[0]}
                onClick={() => onClickRadio(formKey, option[0])}
              >
                <Text>{option[1]}</Text>
              </RadioBox>
            );
          })}
      </Row>
    </Container>
  );
};

export default RadioButton;
