import React from 'react';
import styled from 'styled-components';
import Header from './header';
import Footer from './footer';
import PreviewData from './preview-data';
import { dataType } from '../types';

const StyledPreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export type WidgetPreviewProps = {
  headerText: string;
  stateName: string;
  data: dataType | null;
  footerText: string;
  footerBackground: string;
  footerColor: string;
  headerBackground: string;
  headerColor: string;
};
const WidgetPreview: React.FC<WidgetPreviewProps> = ({
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
