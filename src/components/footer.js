import React from 'react';
import styled from 'styled-components';

const StyledFooterContainer = styled.div.attrs((props) => ({
  style: {
    backgroundColor: props.backgroundColor || '#d5f6e3',
  },
}))`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: auto;
  justify-content: center;
  box-sizing: border-box;
  padding: 16px;
`;
const StyledFooterText = styled.div.attrs((props) => ({
  style: {
    fontSize: `${props.fontSize || 16}px`,
    color: props.color || '#212121',
  },
}))`
  overflow: hidden;
  font-size: 16px;
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
