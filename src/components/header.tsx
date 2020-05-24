import React from 'react';
import styled from 'styled-components';

export type headerContainerProps = {
  background?: string;
};
const StyledHeader = styled.header.attrs((props: headerContainerProps) => ({
  style: {
    background: props.background || '#2c498d',
  },
}))<headerContainerProps>`
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

export type headerProps = {
  title: string;
  background?: string;
  color?: string;
};
const Header: React.FC<headerProps> = ({ title, background, color }) => {
  return (
    <StyledHeader background={background}>
      <StyledHeading color={color}>{title}</StyledHeading>
    </StyledHeader>
  );
};

export default Header;
