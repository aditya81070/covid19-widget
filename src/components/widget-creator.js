import React, { useReducer, useEffect, useRef } from 'react';
import styled from 'styled-components';
import jwt from 'jsonwebtoken';
import Header from './header';
import WidgetPreview from './widget-preview';
import StyledTitle from './styled-title';
import theme from '../theme';
const formReducer = (state, action) => {
  const { type, data } = action;
  return {
    ...state,
    [type]: data,
  };
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f2f6ec;
  align-items: center;
  box-sizing: border-box;
`;
const StyledFormContainer = styled.form`
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

const StyledInputContainer = styled.div`
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

const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const InputRowItem = styled(StyledInputContainer)`
  width: 48%;
  @media screen and (max-width: 568px) {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  margin: 8px 0;
`;

const Button = styled.button`
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 2px;
  cursor: pointer;
  background: #2c498d;
  color: #fff;
`;

const FormTitle = styled(StyledTitle)`
  margin-top: 0;
`;

const StyledPreviewContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  border: 1px solid gray;
  margin: 16px 0 16px;
  box-shadow: 4px 4px 4px #9e7f5b;
`;
const StyledCodeContainer = styled.div`
  border: 1px solid gray;
  padding: 0px 8px 8px;
`;

const StyledCode = styled.div`
  border: 1px solid gray;
  padding: 8px;
  width: 100%;
  word-break: break-word;
  box-sizing: border-box;
`;

const CodeButtonContainer = styled.div`
  display: flex;
  margin-top: 16px;

  & > button {
    margin-left: 8px;
  }
`;
const WidgetCreator = (props) => {
  const [state, dispatch] = useReducer(formReducer, {
    headerText: 'Header text',
    footerText: 'Footer Text',
    headerColor: theme.headerColor,
    headerBackground: theme.headerBackground,
    footerBackground: theme.footerBackground,
    footerColor: theme.footerColor,
    selectedState: '',
    width: 1200,
    height: 800,
    token: '',
    data: null,
    isLoading: true,
    isError: false,
  });
  const {
    headerText,
    footerText,
    selectedState,
    data,
    isLoading,
    isError,
    headerColor,
    headerBackground,
    footerBackground,
    footerColor,
    width,
    height,
    token,
  } = state;
  const states = data ? Object.keys(data) : [];

  const codeRef = useRef();
  useEffect(() => {
    fetch('https://api.covid19india.org/state_district_wise.json')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'data', data: data });
        dispatch({ type: 'selectedState', data: Object.keys(data)[0] });
        dispatch({ type: 'isLoading', data: false });
        console.log('it is called');
      })
      .catch((err) => {
        dispatch({ type: 'isLoading', data: false });
        dispatch({ type: 'isError', data: true });
        console.log(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, data: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const {
      headerText,
      footerText,
      selectedState,
      headerBackground,
      headerColor,
      footerBackground,
      footerColor,
    } = state;
    const data = {
      headerText,
      footerText,
      selectedState,
      headerBackground,
      headerColor,
      footerBackground,
      footerColor,
    };
    const jwtToken = jwt.sign(
      {
        data: data,
      },
      'adityaagarwal81',
    );
    dispatch({ type: 'token', data: jwtToken });
  };

  const handleCopyCode = (e) => {
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.top = 0;
    textarea.style.left = 0;

    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    // Avoid flash of white box if rendered for any reason.
    textarea.style.background = 'transparent';
    textarea.value = codeRef.current.textContent;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    let success = false;
    try {
      success = document.execCommand('copy');
    } catch (err) {
      success = false;
    }
    document.body.removeChild(textarea);
    if (success) {
      window.alert('code copied to clipboard');
    } else {
      window.alert('can not copy. Please try manually');
    }
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!isLoading && isError) {
    return <p>There is some error getting the data</p>;
  }
  return (
    <div>
      <Header title='Welcome to Widget Creator' />
      <StyledContainer>
        <StyledFormContainer onSubmit={handleFormSubmit}>
          <FormTitle>Enter Widget Details</FormTitle>
          <StyledInputContainer>
            <label htmlFor='selectedState'>Select State</label>
            <select
              id='selectedState'
              name='selectedState'
              value={selectedState}
              onChange={handleInputChange}
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </StyledInputContainer>
          <StyledInputContainer>
            <label htmlFor='headerText'>Header Text</label>
            <input
              id='headerText'
              name='headerText'
              value={headerText}
              onChange={handleInputChange}
              required
            />
          </StyledInputContainer>
          <InputRow>
            <InputRowItem>
              <label htmlFor='headerBackground'>Header Background</label>
              <input
                id='headerBackground'
                name='headerBackground'
                value={headerBackground}
                onChange={handleInputChange}
                required
              />
            </InputRowItem>
            <InputRowItem>
              <label htmlFor='headerColor'>Header Text Color</label>
              <input
                id='headerColor'
                name='headerColor'
                value={headerColor}
                onChange={handleInputChange}
                required
              />
            </InputRowItem>
          </InputRow>
          <StyledInputContainer>
            <label htmlFor='footerText'>Footer Text</label>
            <input
              id='footerText'
              name='footerText'
              value={footerText}
              onChange={handleInputChange}
              required
            />
          </StyledInputContainer>
          <InputRow>
            <InputRowItem>
              <label htmlFor='footerBackground'>Footer Background</label>
              <input
                id='footerBackground'
                name='footerBackground'
                value={footerBackground}
                onChange={handleInputChange}
                required
              />
            </InputRowItem>
            <InputRowItem>
              <label htmlFor='footerColor'>Footer Text Color</label>
              <input
                id='footerColor'
                name='footerColor'
                value={footerColor}
                onChange={handleInputChange}
                required
              />
            </InputRowItem>
          </InputRow>
          <InputRow>
            <InputRowItem>
              <label htmlFor='width'>Width (in px)</label>
              <input
                id='width'
                name='width'
                value={width}
                onChange={handleInputChange}
                required
              />
            </InputRowItem>
            <InputRowItem>
              <label htmlFor='height'>Height (in px)</label>
              <input
                id='height'
                name='height'
                value={height}
                onChange={handleInputChange}
                required
              />
            </InputRowItem>
          </InputRow>
          <ButtonContainer>
            <Button type='submit'>Get your widget</Button>
          </ButtonContainer>
          {token && (
            <StyledCodeContainer>
              <StyledTitle>Add following code to your website</StyledTitle>
              <StyledCode>
                <code ref={codeRef}>
                  {`<iframe title="${selectedState}'s Covid19 data" src="http://localhost:3000/widget/${token}" width="${width}" height="${height}" loading="lazy">Browser do not support iframe </iframe>`}
                </code>
              </StyledCode>
              <CodeButtonContainer>
                <Button type='button' onClick={handleCopyCode}>
                  Copy
                </Button>
                <Button
                  type='button'
                  onClick={() => dispatch({ type: 'token', data: '' })}
                >
                  Close
                </Button>
              </CodeButtonContainer>
            </StyledCodeContainer>
          )}
        </StyledFormContainer>
        <StyledTitle>Widget Preview</StyledTitle>
        <StyledPreviewContainer>
          <WidgetPreview
            headerText={headerText}
            headerBackground={headerBackground}
            headerColor={headerColor}
            footerText={footerText}
            footerBackground={footerBackground}
            footerColor={footerColor}
            data={data}
            stateName={selectedState}
          />
        </StyledPreviewContainer>
      </StyledContainer>
    </div>
  );
};

export default WidgetCreator;
