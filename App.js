import React, {Component}  from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { StatusBar} from "react-native";
import Home from './src/screens/Home';
import { colors } from './src/assets/colors';

export default class App extends Component {

  render() {
    return (
      <>
        <StatusBar backgroundColor={colors.background} />
        <Router>
          <Stack key="root">
            <Scene key="home" component={Home} hideNavBar={true} initial />
          </Stack>
        </Router>
      </>
    );
  }
}
