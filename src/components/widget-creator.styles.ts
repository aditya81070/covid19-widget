import styled from 'styled-components';
import StyledTitle from './styled-title';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f2f6ec;
  align-items: center;
  box-sizing: border-box;
`;
export const StyledFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  box-sizing: border-box;
  max-width: 800px;
  padding: 24px;
  box-shadow: 4px 4px 4px #9e7f5b;
  margin-top: 16px;
  border: 1px solid gray;
`;
export const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  & > label {
    font-weight: bold;
    color: #212121;
  }
  & > input,
  & > select {
    margin-top: 8px;
    padding: 8px;
  }
`;
export const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;
export const InputRowItem = styled(StyledInputContainer)`
  width: 48%;
  @media screen and (max-width: 568px) {
    width: 100%;
  }
`;
export const ButtonContainer = styled.div`
  margin: 8px 0;
`;
export const FormTitle = styled(StyledTitle)`
  margin-top: 0;
`;
export const StyledPreviewContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  border: 1px solid gray;
  margin: 16px 0 16px;
  box-shadow: 4px 4px 4px #9e7f5b;
  box-sizing: border-box;
`;
