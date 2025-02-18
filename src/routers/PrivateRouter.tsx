import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pages } from '../configuration/constants';
import { navigationStyles } from '../styles';
import { View } from 'react-native';

/**
 * Privado
 */
const PrivateRouter = (): JSX.Element => {
  const PrivateStack = createNativeStackNavigator();
  return (
    <PrivateStack.Navigator

      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => null,
        ...navigationStyles.stackContainer,
      }}>
        <PrivateStack.Screen
          name={Pages.LOGINPAGE}
          component={() => <View />}
          options={{ headerShown: false }}
        />
    </PrivateStack.Navigator>
  );
};

export default PrivateRouter;
