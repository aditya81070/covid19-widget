import React from 'react';
import styled from 'styled-components';
import Header from './header';
import Footer from './footer';

const StyledContainer = styled.div`
  display: flex;
  background-color: #fcfcfc;
  padding: 16px;
  height: calc(100vh - 120px);
  justify-content: space-between;
  overflow: auto;
`;

const StyledFormContainer = styled.div`
  width: 40%;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
`;

const StyledPreviewContainer = styled.div`
  width: 50%;
  border: 1px solid #c1c1c1;
`;
const WidgetCreator = () => {
  return (
    <>
      <Header title='Welcome to Widget Creator' />
      <StyledContainer>
        <StyledFormContainer>
          Hey dude, you will form the fill here
        </StyledFormContainer>
        <StyledPreviewContainer>
          You will see the preview here
        </StyledPreviewContainer>
      </StyledContainer>
      <Footer title='Thanks for using our services.' />
    </>
  );
};

export default WidgetCreator;
