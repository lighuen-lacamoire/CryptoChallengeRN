
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { Provider } from 'react-redux';
//import { PersistGate } from 'redux-persist/integration/react';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, persistor } from './src/redux/store';
import RootRouter from './src/routers/RootRouter';
import { SplashScreen } from './src/pages/Public/SplashScreen';
import { LoadingIndicator } from './src/components/Loader';

type Props = {
  navigationKey: any;
  medication: any;
};

const App = (props: Props): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
              backgroundColor={isDarkMode ? '#39ac8f' : '#39ac8f'}
              {...(Platform.OS === 'ios'
                ? { barStyle: isDarkMode ? 'dark-content' : 'light-content' }
                : {})}
            />
            <SplashScreen>
      <RootRouter />
      <LoadingIndicator />
            </SplashScreen>
          </SafeAreaView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
