import React, {Component}  from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Home from './src/screens/Home';

export default class App extends Component {

  render() {
    return (
      <Router >
        <Stack key="root">
          <Scene key="home" component={Home} hideNavBar={true} initial />
        </Stack>
      </Router>
    );
  }
}
