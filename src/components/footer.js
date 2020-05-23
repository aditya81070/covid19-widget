import React from 'react';
import styled from 'styled-components';

const StyledFooterContainer = styled.div.attrs((props) => ({
  style: {
    background:
      props.backgroundColor ||
      'linear-gradient(to bottom, #0f7f8f 0%, #185784 100%)',
  },
}))`
  min-height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 8px;
`;
const StyledFooterText = styled.p.attrs((props) => ({
  style: {
    fontSize: `${props.fontSize || 20}px`,
    color: props.color || '#fff',
  },
}))`
  max-width: 80%;
  text-align: center;
`;

const Footer = ({ title, backgroundColor, fontSize, color }) => {
  return (
    <StyledFooterContainer backgroundColor={backgroundColor}>
      <StyledFooterText color={color} fontSize={fontSize}>
        {title}
      </StyledFooterText>
    </StyledFooterContainer>
  );
};

export default Footer;
