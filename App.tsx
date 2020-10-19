import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {Location} from './src/locations-screen';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Location />
        </SafeAreaView>
      </Provider>
    </>
  );
};

export {App};
