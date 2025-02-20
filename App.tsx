
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
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, persistor, useAppSelector, useAppDispatch } from './src/redux/store';
import RootRouter from './src/routers/RootRouter';
import { SplashScreen } from './src/pages/Public/SplashScreen';
import { LoadingIndicator } from './src/components/Loader';
import { ModalPopUp } from './src/components/Modal';
import { clearMessage } from './src/redux/actions/notification';

const Monitor = (): JSX.Element => {
  const { message } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  return (
    <>
      <ModalPopUp
        title={message?.title}
        content={message?.content}
        isVisible={message?.isVisible}
        selfClose={message?.selfClose}
        onBackdropPress={() => dispatch(clearMessage())}
        actions={message?.actions}
      />
      <RootRouter />
      <LoadingIndicator />
    </>
  );
};

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

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
              <Monitor />
            </SplashScreen>
          </SafeAreaView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
