import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pages } from '../configuration/constants';
import { navigationStyles } from '../styles';
import { View } from 'react-native';
import { DetailPage, ManagementPage } from '../pages/Market';
import { navigationMessages } from '../configuration/messages';

/**
 * Privado
 */
const PrivateRouter = (): JSX.Element => {
  const PrivateStack = createNativeStackNavigator();
  return (
    <PrivateStack.Navigator
          initialRouteName={Pages.MANAGEMENTPAGE}
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => null,
        ...navigationStyles.stackContainer,
      }}>
        <PrivateStack.Screen
          name={Pages.MANAGEMENTPAGE}
          component={ManagementPage}
        options={{ title: navigationMessages.headers.managementScreen }}
        />
        <PrivateStack.Screen
          name={Pages.DETAILPAGE}
          component={DetailPage}
        options={{ title: navigationMessages.headers.managementScreen }}
        />
    </PrivateStack.Navigator>
  );
};

export default PrivateRouter;
