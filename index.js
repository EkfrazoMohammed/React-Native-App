import 'react-native-gesture-handler'; // Ensure this is at the top of the file

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

// Wrap the App with gestureHandlerRootHOC
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
