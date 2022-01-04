import React, { useCallback, useState, useEffect } from 'react';

import {  WelcomeContainer, Title, ClickButton, SpinnerContainer, SpinnerComponent } from './Landing.styles';

const COUNT = 1;

const Landing = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(COUNT);

  const resetCount = useCallback(() => {
    setCount(COUNT);
  }, []);

  useEffect(() => {
    (async () => {
      if(isLoading){
        setTimeout(()=>{
          setIsLoading(!isLoading)
        }, 1000)
      }
    })();
  }, [isLoading]);

  return (
    <>
      { !isLoading && (
        <WelcomeContainer>
          <Title>Welcome! {count} </Title>

          <ClickButton
            onClick={() => {
              setIsLoading(!isLoading);
              setCount(count+1);
            }}
          > 
            Click me!
          </ClickButton>

          <ClickButton
            onClick={() => {
              resetCount();
            }}
          > 
            Reset Count
          </ClickButton>

        </WelcomeContainer>
      )}

      { isLoading && (
        <SpinnerContainer>
          <SpinnerComponent />
        </SpinnerContainer>
      )}
    </>
  );
};

export default Landing;
