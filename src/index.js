import 'babel-polyfill';
import { h, render } from 'preact';
import './style';
import App from './components/app';

render((
  <App />
), document.body);