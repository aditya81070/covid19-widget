import React from 'react';
import styled from 'styled-components';

const StyledFooterContainer = styled.div.attrs((props) => ({
  style: {
    background: props.background || '#185784',
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
    color: props.color || '#fff',
  },
}))`
  max-width: 80%;
  text-align: center;
  font-size: 20px;
`;

const Footer = ({ title, background, color }) => {
  return (
    <StyledFooterContainer background={background}>
      <StyledFooterText color={color}>{title}</StyledFooterText>
    </StyledFooterContainer>
  );
};

export default Footer;
