import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pages } from '../configuration/constants';
import { navigationStyles, platform } from '../styles';
import { View } from 'react-native';
import { navigationMessages } from '../configuration/messages';
import { HomePage } from '../pages/Management';
import { SourceDetailPage, SourceListPage } from '../pages/Balance';
import { NavigationParamList } from '../interfaces/navigations';
import { ButtonIcon } from '../components/Button';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { currencyAdd, currencyRemove } from '../redux/actions/balance';
import { HeaderBackButton } from '@react-navigation/elements';

/**
 * Nivel de navegacion de cryptos y detalle
 */
const BalanceRouter = (): JSX.Element => {
  const BalanceStack = createNativeStackNavigator<NavigationParamList>();
  const { favourites } = useAppSelector((state) => state.balance);
  const dispatch = useAppDispatch();
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
        options={({ route, navigation }) => {
          const item = route.params?.selected;
          if (item) {
            return ({
              title: navigationMessages.headers.sourceDetailPage(item.name),
              headerRight: () => {
                const isOwn = favourites.find(x => x.id === item.id);
                return (
                  <ButtonIcon
                    color={platform.colors.primaryStatus}
                    icon={{
                      name: isOwn ? "star-filled" : "star",
                      color: isOwn ? "#FFC107" : platform.colors.white,
                      size: 24
                    }}
                    containerStyle={{
                      ...(isOwn ? { backgroundColor: '#5BC8AC' } : {}),
                      marginRight: platform.generic.borderToSpace,
                    }}
                    onPress={() => {
                      if (isOwn) {
                        dispatch(currencyRemove(item.id));
                      } else {
                        dispatch(currencyAdd(item));
                      }
                    }}
                  />
                )
              },
            });
          }
          return {};
        }}
      />
    </BalanceStack.Navigator>
  );
};

export default BalanceRouter;
