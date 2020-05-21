import React from 'react';
import Header from './header';
import Footer from './footer';
import jwt from 'jsonwebtoken';

class Widget extends React.Component {
  state = {
    headerTitle: 'Covid19 Tracker',
    headerBackground: '#c5c2c4',
    headerFontSize: 20,
    headerFontColor: '#212121',
    footerTitle: 'Covid19 Tracker 2020',
    footerBackground: '#d5f6e3',
    footerFontSize: 16,
    footerFontColor: '#212121',
    data: null,
    state: '',
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    jwt.verify(id, 'adityaagarwal81', (err, decoded) => {
      if (err) {
        console.log('the link is expired. Please create new widget');
      } else {
        this.setState({
          ...decoded.data,
        });
        fetch('https://api.covid19india.org/state_district_wise.json')
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              data,
            });
          })
          .catch((err) => {
            console.log('can not get data', err);
          });
      }
    });
  }

  render() {
    const {
      headerTitle,
      headerBackground,
      headerFontSize,
      headerFontColor,
      footerTitle,
      footerBackground,
      footerFontSize,
      footerFontColor,
      data,
      state,
    } = this.state;
    const stateData = data
      ? Object.keys(data).reduce((acc, state) => {
          const { districtData } = data[state];
          acc[state] = Object.keys(districtData).reduce((acc, district) => {
            const { active, confirmed, deceased, recovered } = districtData[
              district
            ];
            acc.active = (acc.active || 0) + active;
            acc.confirmed = confirmed + (acc.confirmed || 0);
            acc.deceased = deceased + (acc.deceased || 0);
            acc.recovered = recovered + (acc.recovered || 0);
            return acc;
          }, {});
          return acc;
        }, {})
      : [];
    const districtData =
      state && data
        ? Object.keys(data[state].districtData).map((dist) => {
            const distData = data[state].districtData[dist];
            const { active, deceased, recovered, confirmed } = distData;
            return {
              name: dist,
              active,
              deceased,
              recovered,
              confirmed,
            };
          })
        : [];
    return (
      <>
        <Header
          backgroundColor={headerBackground}
          fontSize={headerFontSize}
          color={headerFontColor}
          title={headerTitle}
        />
        <h1>State Data</h1>
        {JSON.stringify(stateData[state])}

        <h1>Districts Data</h1>
        {districtData.map((dist) => JSON.stringify(dist))}
        <Footer
          backgroundColor={footerBackground}
          fontSize={footerFontSize}
          color={footerFontColor}
          title={footerTitle}
        />
      </>
    );
  }
}

export default Widget;
