import React from 'react';
import styled from 'styled-components';
import Header from './header';
import Footer from './footer';
import jwt from 'jsonwebtoken';
const StyledContainer = styled.div`
  display: flex;
  background-color: #fcfcfc;
  padding: 16px;
  height: calc(100vh - 120px);
  justify-content: space-between;
  overflow: auto;
`;

const StyledFormContainer = styled.div`
  width: 40%;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
`;

const StyledPreviewContainer = styled.div`
  width: 50%;
  border: 1px solid #c1c1c1;
`;
class WidgetCreator extends React.Component {
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

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const {
      headerTitle,
      headerBackground,
      headerFontSize,
      headerFontColor,
      footerTitle,
      footerBackground,
      footerFontSize,
      footerFontColor,
      state,
    } = this.state;
    const token = jwt.sign(
      {
        data: {
          headerTitle,
          headerBackground,
          headerFontSize,
          headerFontColor,
          footerTitle,
          footerBackground,
          footerFontSize,
          footerFontColor,
          state,
        },
      },
      'adityaagarwal81',
    );
    console.log('widget url', `http://localhost:3000/widget/${token}`);
  };
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

    const stateOptions = data ? Object.keys(data) : [];
    const stateData = stateOptions.reduce((acc, state) => {
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
    }, {});
    const districtData = state
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
        <Header title='Welcome to Widget Creator' />
        <StyledContainer>
          <StyledFormContainer>
            <h4>Header Details</h4>
            <form onSubmit={this.handleFormSubmit}>
              <label>
                Header title{' '}
                <input
                  type='text'
                  value={headerTitle}
                  name='headerTitle'
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                Header background{' '}
                <input
                  type='color'
                  value={headerBackground}
                  name='headerBackground'
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                Header Fontsize{' '}
                <input
                  type='number'
                  min={14}
                  max={28}
                  value={headerFontSize}
                  name='headerFontSize'
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                Header Text color{' '}
                <input
                  type='color'
                  value={headerFontColor}
                  name='headerFontColor'
                  onChange={this.handleInputChange}
                />
              </label>
              <h4>Footer Details</h4>

              <label>
                Footer title{' '}
                <input
                  type='text'
                  value={footerTitle}
                  name='footerTitle'
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                Footer background{' '}
                <input
                  type='color'
                  value={footerBackground}
                  name='footerBackground'
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                Footer Fontsize{' '}
                <input
                  type='number'
                  min={14}
                  max={28}
                  value={footerFontSize}
                  name='footerFontSize'
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                Footer Text color{' '}
                <input
                  type='color'
                  value={footerFontColor}
                  name='footerFontColor'
                  onChange={this.handleInputChange}
                />
              </label>
              <select
                name='state'
                value={state}
                onChange={this.handleInputChange}
              >
                <option value=''>Select a state</option>
                {stateOptions.map((state) => (
                  <option value={state} key={state}>
                    {state}
                  </option>
                ))}
              </select>
              <button type='submit'>Get your widget</button>
            </form>
          </StyledFormContainer>
          <StyledPreviewContainer>
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
          </StyledPreviewContainer>
        </StyledContainer>
        <Footer title='Thanks for using our services.' />
      </>
    );
  }
}

export default WidgetCreator;
