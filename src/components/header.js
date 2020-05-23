import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header.attrs((props) => ({
  style: {
    background: props.background || '#2c498d',
  },
}))`
  display: flex;
  align-items: center;
  min-height: 56px;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
  padding: 8px;
`;

const StyledHeading = styled.h1.attrs((props) => ({
  style: {
    color: props.color || '#fff',
  },
}))`
  font-size: 20px;
`;
const Header = ({ title, background, color }) => {
  return (
    <StyledHeader background={background}>
      <StyledHeading color={color}>{title}</StyledHeading>
    </StyledHeader>
  );
};

export default Header;
