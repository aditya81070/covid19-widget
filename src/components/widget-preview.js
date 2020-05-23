import React from 'react';
import Header from './header';
import Footer from './footer';
import PreviewData from './preview-data';
import styled from 'styled-components';

const StyledPreviewContainer = styled.div`
  background: aliceblue;
`;

const WidgetPreview = ({ headerText, stateName, data, footerText }) => {
  return (
    <StyledPreviewContainer>
      <Header title={headerText} />
      <PreviewData data={data} state={stateName} />
      <Footer title={footerText} />
    </StyledPreviewContainer>
  );
};

export default WidgetPreview;
