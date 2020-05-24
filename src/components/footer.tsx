import React from 'react';
import styled from 'styled-components';

export type footerContainerProps = {
  background?: string;
};
const StyledFooterContainer = styled.div.attrs(
  (props: footerContainerProps) => ({
    style: {
      background: props.background || '#185784',
    },
  }),
)<footerContainerProps>`
  min-height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 8px;
`;

export type footerTextProps = {
  color: string;
};

const StyledFooterText = styled.p.attrs<footerTextProps>(({ color }) => ({
  style: {
    color: color || '#fff',
  },
}))`
  max-width: 80%;
  text-align: center;
  font-size: 20px;
`;

export type footerProps = {
  title: string;
  background?: string;
  color?: string;
};

const Footer: React.FC<footerProps> = ({ title, background, color }) => {
  return (
    <StyledFooterContainer background={background}>
      <StyledFooterText color={color}>{title}</StyledFooterText>
    </StyledFooterContainer>
  );
};

export default Footer;
