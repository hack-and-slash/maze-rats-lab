import { createGlobalStyle } from 'styled-components';
import WickedGrit from './fonts/WickedGrit.ttf';
export default createGlobalStyle`
  @font-face {
    font-family: 'WickedGrit';
    src: url(${WickedGrit}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;