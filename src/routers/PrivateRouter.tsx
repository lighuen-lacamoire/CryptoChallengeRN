import React from "react";
import { Pages } from "../configuration/constants";
import { navigationStyles } from "../styles";
import { View } from "react-native";
import { logoutMessages, navigationMessages } from "../configuration/messages";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManagementRouter from "./ManagementRouter";
import BalanceRouter from "./BalanceRouter";
import { TabIcon } from "../components/Navigation";
import { LogoutPage } from "../pages/Public";

type TabIconState = {
  focused: boolean;
  color: string;
};

/**
 * Privado
 */
const PrivateRouter = (): JSX.Element => {
  const PrivateMenu = createBottomTabNavigator();
  return (
    <PrivateMenu.Navigator
      initialRouteName={Pages.MANAGEMENTROUTER}
      backBehavior="none"
      screenOptions={{
        headerShown: false,
        tabBarStyle: [{ display: "flex" }, null],
        ...navigationStyles.tabBarMenu,
      }}>
      <PrivateMenu.Screen
        name={Pages.MANAGEMENTROUTER}
        component={ManagementRouter}
        options={{
          tabBarLabel: "Cuentas",
          tabBarIcon: ({ focused, color }: TabIconState) => (
            <TabIcon icon="home" color={color} focused={focused} />
          ),
        }}
      />
      <PrivateMenu.Screen
        name={Pages.BALANCEROUTER}
        component={BalanceRouter}
        options={{
          tabBarLabel: "Cryptos",
          tabBarIcon: ({ focused, color }: TabIconState) => (
            <TabIcon icon="calculator" color={color} focused={focused} />
          ),
        }}
      />
      <PrivateMenu.Screen
        name={Pages.LOGOUTPAGE}
        component={LogoutPage}
        options={{
          tabBarLabel: logoutMessages.title,
          tabBarIcon: ({ focused, color }: TabIconState) => (
            <TabIcon icon="logout" color={color} focused={focused} />
          ),
        }}
      />
    </PrivateMenu.Navigator>
  );
};

export default PrivateRouter;
