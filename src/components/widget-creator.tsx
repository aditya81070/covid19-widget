import React, { useReducer, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Header from './header';
import MainFooter from './main-footer';
import Button from './button';
import WidgetPreview from './widget-preview';
import StyledTitle from './styled-title';
import theme from '../theme';
import EmbeddedCode from './embedded-code';
import { dataType, JwtData } from '../types';
import {
  StyledContainer,
  StyledFormContainer,
  FormTitle,
  StyledInputContainer,
  InputRow,
  InputRowItem,
  ButtonContainer,
  StyledPreviewContainer,
} from './widget-creator.styles';

export type widgetCreatorState = {
  headerText: string;
  footerText: string;
  headerColor: string;
  headerBackground: string;
  footerBackground: string;
  footerColor: string;
  selectedState: string;
  width: number;
  height: number;
  token: string;
  data: dataType | null;
  isLoading: boolean;
  isError: boolean;
};

export type widgetCreatorAction = {
  type: string;
  data: string | boolean | number | object;
};

const formReducer = (
  state: widgetCreatorState,
  action: widgetCreatorAction,
) => {
  const { type, data } = action;
  return {
    ...state,
    [type]: data,
  };
};
export type widgetCreatorProps = {};
export const WidgetCreator: React.FC<widgetCreatorProps> = (props) => {
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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_COVID_API_URL}`)
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

  useEffect(() => {
    dispatch({ type: 'token', data: '' });
  }, [
    headerText,
    footerText,
    selectedState,
    headerBackground,
    headerColor,
    footerBackground,
    footerColor,
    width,
    height,
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    dispatch({ type: name, data: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    const data: JwtData = {
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
      process.env.REACT_APP_PRIVATE_KEY as jwt.Secret,
    );
    dispatch({ type: 'token', data: jwtToken });
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
            <EmbeddedCode
              token={token}
              width={width}
              height={height}
              dispatch={dispatch}
              stateName={selectedState}
            />
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
            data={data as dataType}
            stateName={selectedState}
          />
        </StyledPreviewContainer>
      </StyledContainer>
      <MainFooter />
    </div>
  );
};

export default WidgetCreator;
