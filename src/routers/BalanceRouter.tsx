import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pages } from '../configuration/constants';
import { navigationStyles } from '../styles';
import { View } from 'react-native';
import { navigationMessages } from '../configuration/messages';
import { HomePage } from '../pages/Management';
import { SourceDetailPage, SourceListPage } from '../pages/Balance';
import { NavigationParamList } from '../interfaces/navigations';

/**
 * Nivel de navegacion de cryptos y detalle
 */
const BalanceRouter = (): JSX.Element => {
  const BalanceStack = createNativeStackNavigator<NavigationParamList>();
  return (
    <BalanceStack.Navigator
      initialRouteName={Pages.SOURCELISTPAGE}
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => null,
        ...navigationStyles.stackContainer,
      }}>
      <BalanceStack.Screen
        name={Pages.SOURCELISTPAGE}
        component={SourceListPage}
        options={{ title: navigationMessages.headers.sourceListPage }}
      />
      <BalanceStack.Screen
        name={Pages.SOURCEDETAILPAGE}
        component={SourceDetailPage}
        options={({ route }) => ({
          title: navigationMessages.headers.sourceDetailPage(route.params?.selected?.name),
        })}
      />
    </BalanceStack.Navigator>
  );
};

export default BalanceRouter;
