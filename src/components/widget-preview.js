import React from 'react';
import Header from './header';
import Footer from './footer';
import PreviewData from './preview-data';
import styled from 'styled-components';

const StyledPreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const WidgetPreview = ({
  headerText,
  stateName,
  data,
  footerText,
  footerBackground,
  footerColor,
  headerBackground,
  headerColor,
}) => {
  return (
    <StyledPreviewContainer>
      <Header
        title={headerText}
        background={headerBackground}
        color={headerColor}
      />
      <PreviewData data={data} state={stateName} />
      <Footer
        title={footerText}
        background={footerBackground}
        color={footerColor}
      />
    </StyledPreviewContainer>
  );
};

export default WidgetPreview;
