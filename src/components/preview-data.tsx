import React from 'react';
import styled from 'styled-components';
import StyledTitle from './styled-title';
import { covidStatusType, covidDataType, dataType } from '../types';
const PreviewContainer = styled.div`
  padding: 16px 0px;
  background-color: #fff;
`;
const TileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Tile = styled.div`
  width: 350px;
  height: 100px;
  border: 1px solid black;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px;
  background: linear-gradient(to bottom, #a5c9fd 0%, #bde5fc 100%);

  @media screen and (max-width: 1100px) {
    width: 300px;
  }
  @media screen and (max-width: 950px) {
    width: 250px;
  }
  @media screen and (max-width: 800px) {
    width: 300px;
  }
  @media screen and (max-width: 540px) {
    width: 80%;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
  }
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
const StyledName = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #212121;
`;

export type previewDataProps = {
  state: string;
  data: dataType | null;
};
const PreviewData: React.FC<previewDataProps> = React.memo(
  function PreviewData({ data, state }) {
    if (!data) {
      return <p>Loading...</p>;
    }
    const { districtData } = data![state];
    const stateData: covidDataType = Object.keys(districtData).reduce(
      (acc, district) => {
        const { active, deceased, confirmed, recovered } = districtData[
          district
        ];
        return {
          active: (acc.active || 0) + active,
          deceased: (acc.deceased || 0) + deceased,
          confirmed: (acc.confirmed || 0) + confirmed,
          recovered: (acc.recovered || 0) + recovered,
        };
      },
      {} as covidDataType,
    );
    return (
      <PreviewContainer>
        <StyledTitle>{state}</StyledTitle>
        <TileContainer>
          {Object.keys(stateData).map((status) => (
            <Tile key={status}>
              <StyledName>{stateData[status as covidStatusType]}</StyledName>
              <StatusRow>
                <StyledName>{status.toUpperCase()}</StyledName>
              </StatusRow>
            </Tile>
          ))}
        </TileContainer>
        <StyledTitle>District Level Data</StyledTitle>
        <TileContainer>
          {Object.keys(districtData).map((district) => (
            <Tile key={district}>
              <StyledName>{district}</StyledName>
              <StyledStatusContainer>
                <StatusRow>
                  <p>Active: {districtData[district].active}</p>
                  <p>Confirmed: {districtData[district].confirmed}</p>
                </StatusRow>
                <StatusRow>
                  <p>Deaths: {districtData[district].deceased}</p>
                  <p>Recovered: {districtData[district].recovered}</p>
                </StatusRow>
              </StyledStatusContainer>
            </Tile>
          ))}
        </TileContainer>
      </PreviewContainer>
    );
  },
);

export default PreviewData;
