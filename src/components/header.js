import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 16px;
  background-color: ${(props) => props.backgroundColor || '#c5c2c4'};
`;

const StyledHeading = styled.h1`
  font-size: ${(props) => props.fontSize || 20}px;
  color: ${(props) => props.color || '#212121'};
`;
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
