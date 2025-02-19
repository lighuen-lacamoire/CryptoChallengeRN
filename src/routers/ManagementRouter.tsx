import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pages } from '../configuration/constants';
import { navigationStyles } from '../styles';
import { View } from 'react-native';
import { navigationMessages } from '../configuration/messages';
import { HomePage } from '../pages/Management';
import { useAppSelector } from '../redux/store';

/**
 * Nivel de navegacion de Home
 */
const ManagementRouter = (): JSX.Element => {
  const ManagementStack = createNativeStackNavigator();
  const { user } = useAppSelector((state) => state.authorization);
  return (
    <ManagementStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => null,
        ...navigationStyles.stackContainer,
      }}>
      <ManagementStack.Screen
        name={Pages.HOMEPAGE}
        component={HomePage}
        options={{ title: navigationMessages.headers.homePage(user?.user.name) }}
      />
    </ManagementStack.Navigator>
  );
};

export default ManagementRouter;
