export type covidStatusType = 'active' | 'recovered' | 'deceased' | 'confirmed';

export type covidDataType = {
  [status in covidStatusType]: number;
};

export type districtType = {
  [district: string]: {
    active: number;
    recovered: number;
    confirmed: number;
    deceased: number;
    [key: string]: object | number | string;
  };
};

export type dataType = {
  [state: string]: {
    districtData: districtType;
    [key: string]: object | number | string;
  };
};

export type JwtData = {
  headerText: string;
  footerText: string;
  selectedState: string;
  headerBackground: string;
  headerColor: string;
  footerBackground: string;
  footerColor: string;
};
