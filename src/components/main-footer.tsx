import React from 'react';
import styled from 'styled-components';

const StyledFooterContainer = styled.div`
  min-height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 8px;
  background-color: #185784;
  color: #fff;
`;

const MainFooter: React.FC<{}> = (props) => {
  return (
    <StyledFooterContainer>
      <div>
        <span>This project is developed and maintained by </span>
        <a href='https://github.com/aditya81070'>@aditya81070</a>
      </div>
      <div>
        <span>View on </span>
        <a href='https://github.com/aditya81070/covid19-widget'>Github</a>
      </div>
    </StyledFooterContainer>
  );
};

export default MainFooter;
