import React from 'react';
import WidgetPreview from './widget-preview';
import jwt from 'jsonwebtoken';
import { RouteComponentProps } from 'react-router-dom';
import { dataType, JwtData } from '../types';

export type MatchProps = {
  id: string;
};

export type WidgetProps = {} & RouteComponentProps<MatchProps>;
export type WidgetState = {
  headerText: string;
  footerText: string;
  selectedState: string;
  headerColor: string;
  headerBackground: string;
  footerBackground: string;
  footerColor: string;
  data: null | dataType;
  isError: boolean;
  isLoading: boolean;
};

export type decodedData = {
  data: JwtData;
};
class Widget extends React.Component<WidgetProps, WidgetState> {
  state = {
    headerText: '',
    footerText: '',
    selectedState: '',
    headerColor: '',
    headerBackground: '',
    footerBackground: '',
    footerColor: '',
    data: null,
    isError: false,
    isLoading: true,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    jwt.verify(
      id,
      process.env.REACT_APP_PRIVATE_KEY as jwt.Secret,
      (err, decoded) => {
        if (err) {
          this.setState({ isError: true, isLoading: false });
          console.log('the link is expired. Please create new widget');
        } else {
          if (decoded) {
            fetch(`${process.env.REACT_APP_COVID_API_URL}`)
              .then((res) => res.json())
              .then((data: dataType) => {
                this.setState({
                  ...(decoded as decodedData).data,
                  data,
                  isLoading: false,
                });
              })
              .catch((err) => {
                this.setState({
                  isLoading: false,
                  isError: true,
                });
                console.log('can not get data', err);
              });
          }
        }
      },
    );
  }
  render() {
    const {
      headerText,
      selectedState,
      footerText,
      headerBackground,
      headerColor,
      footerBackground,
      footerColor,
      data,
      isError,
      isLoading,
    } = this.state;
    if (isLoading) {
      return <p>Loading preview...</p>;
    }
    if (!isLoading && isError) {
      return (
        <p>
          Something went wrong. Please check your network connection or try to
          create new widget from{' '}
          <a href={`${process.env.REACT_APP_API_URL}`} rel='noopener'>
            Covid19 Widget Creator
          </a>
        </p>
      );
    }
    return (
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
    );
  }
}

export default Widget;
