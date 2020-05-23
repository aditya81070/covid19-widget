import React from 'react';
import styled from 'styled-components';

const PreviewContainer = styled.div`
  padding: 16px 0px;
`;
const TileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Tile = styled.div`
  width: 300px;
  height: 100px;
  border: 1px solid black;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px;
`;

const StyledStatusContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const StatusRow = styled.div`
  & > * {
    margin-top: 8px;
  }
`;
const StyledTitle = styled.h4`
  text-align: center;
  margin: 16px 0px;
  font-size: 20px;
`;

const PreviewData = React.memo(function PreviewData({ data, state }) {
  console.log('it is called');
  const { districtData } = data[state];
  const stateData = Object.keys(districtData).reduce((acc, district) => {
    const { active, deceased, confirmed, recovered } = districtData[district];
    return {
      active: (acc.active || 0) + active,
      deceased: (acc.deceased || 0) + deceased,
      confirmed: (acc.confirmed || 0) + confirmed,
      recovered: (acc.recovered || 0) + recovered,
    };
  }, {});
  return (
    <PreviewContainer>
      <StyledTitle>{state}</StyledTitle>
      <TileContainer>
        {Object.keys(stateData).map((status) => (
          <Tile key={status}>
            <p>{status.toUpperCase()}</p>
            <StatusRow>
              <p>{stateData[status]}</p>
            </StatusRow>
          </Tile>
        ))}
      </TileContainer>
      <StyledTitle>District wise data</StyledTitle>
      <TileContainer>
        {Object.keys(districtData).map((district) => (
          <Tile key={district}>
            <p>{district}</p>
            <StyledStatusContainer>
              <StatusRow>
                <p>Active: {districtData[district].active}</p>
                <p>Confirmed: {districtData[district].confirmed}</p>
              </StatusRow>
              <StatusRow>
                <p>Deceased: {districtData[district].deceased}</p>
                <p>Recovered: {districtData[district].recovered}</p>
              </StatusRow>
            </StyledStatusContainer>
          </Tile>
        ))}
      </TileContainer>
    </PreviewContainer>
  );
});

export default PreviewData;
