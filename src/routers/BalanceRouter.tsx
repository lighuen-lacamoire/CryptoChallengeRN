import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pages } from '../configuration/constants';
import { navigationStyles } from '../styles';
import { View } from 'react-native';
import { navigationMessages } from '../configuration/messages';
import { HomePage } from '../pages/Management';
import { SourceDetailPage, SourceListPage } from '../pages/Balance';

/**
 * Privado
 */
const BalanceRouter = (): JSX.Element => {
  const BalanceStack = createNativeStackNavigator();
  return (
    <BalanceStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => null,
        ...navigationStyles.stackContainer,
      }}>
        <BalanceStack.Screen
          name={Pages.SOURCELISTPAGE}
          component={SourceListPage}
        options={{ title: "lista" }}
        />
        <BalanceStack.Screen
          name={Pages.SOURCEDETAILPAGE}
          component={SourceDetailPage}
        options={{ title: "detalle" }}
        />
    </BalanceStack.Navigator>
  );
};

export default BalanceRouter;
