import 'styled-components';
import {DefaultTheme} from 'styled-components'

declare  module 'styled-components' {
  export interface DefaultTheme {
    headerBackground: string;
    headerColor: string;
    footerBackground: string;
    footerColor: string;
  }
}

const theme: DefaultTheme = {
  headerBackground: '#2c498d',
  headerColor: '#fff',
  footerBackground: '#185784',
  footerColor: '#fff',
}

export default theme;
