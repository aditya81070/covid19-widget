import React from 'react';
import styled from 'styled-components';

const StyledFooterContainer = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: auto;
  justify-content: center;
  box-sizing: border-box;
  padding: 16px;
  background-color: ${(props) => props.backgroundColor || '#d5f6e3'};
`;
const StyledFooterText = styled.div`
  overflow: hidden;
  font-size: ${(props) => props.fontSize || 16}px;
  color: ${(props) => props.color || '#212121'};
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
