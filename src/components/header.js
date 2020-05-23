import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header.attrs((props) => ({
  style: {
    backgroundColor: props.backgroundColor || '#2c498d',
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
    fontSize: `${props.fontSize || 20}px`,
    color: props.color || '#fff',
  },
}))``;
const Header = ({ title, backgroundColor, fontSize, color }) => {
  return (
    <StyledHeader backgroundColor={backgroundColor}>
      <StyledHeading fontSize={fontSize} color={color}>
        {title}
      </StyledHeading>
    </StyledHeader>
  );
};

export default Header;
