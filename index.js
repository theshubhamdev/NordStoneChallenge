/**
 * @format
 */

import {AppRegistry} from 'react-native';

import './src/initializers/registerNotification';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
