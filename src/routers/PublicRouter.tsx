import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pages } from '../configuration/constants';
import { navigationStyles } from '../styles';
import { LoginScreen } from '../pages/Public';
import { navigationMessages } from '../configuration/messages';

/**
 * Publico
 */
const PublicRouter = (): JSX.Element => {
  const PublicStack = createNativeStackNavigator();
  return (
    <PublicStack.Navigator
      initialRouteName={Pages.LOGINPAGE}
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => null,
        ...navigationStyles.stackContainer,
      }}>
      <PublicStack.Screen
        name={Pages.LOGINPAGE}
        component={LoginScreen}
        options={{ title: navigationMessages.headers.loginScreen }}
      />
    </PublicStack.Navigator>
  );
};

export default PublicRouter;
