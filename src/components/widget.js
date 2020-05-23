import React from 'react';
import WidgetPreview from './widget-preview';
import jwt from 'jsonwebtoken';

class Widget extends React.Component {
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
    jwt.verify(id, 'adityaagarwal81', (err, decoded) => {
      if (err) {
        this.setState({ isError: true, isLoading: false });
        console.log('the link is expired. Please create new widget');
      } else {
        fetch('https://api.covid19india.org/state_district_wise.json')
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              ...decoded.data,
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
    });
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
          <a href='https://covid19-widget-creator.netlify.app' rel='noopener'>
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
