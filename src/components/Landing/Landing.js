import React, { useState, useEffect } from 'react';

import {  WelcomeContainer, Title,  SpinnerContainer, SpinnerComponent } from './Landing.styles';


const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);
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
          <Title>Welcome!  </Title>
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
