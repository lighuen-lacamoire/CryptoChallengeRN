import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pages } from "../configuration/constants";
import { navigationStyles } from "../styles";
import { LoginPage } from "../pages/Public";
import { navigationMessages } from "../configuration/messages";

/**
 * Nivel de navegacion publico, para el usuario no autenticado
 */
const PublicRouter = (): JSX.Element => {
  const PublicStack = createNativeStackNavigator();
  return (
    <PublicStack.Navigator
      initialRouteName={Pages.LOGINPAGE}
      screenOptions={{
        headerTitleAlign: "center",
        headerLeft: () => null,
        ...navigationStyles.stackContainer,
      }}>
      <PublicStack.Screen
        name={Pages.LOGINPAGE}
        component={LoginPage}
        options={{ title: navigationMessages.headers.loginPage }}
      />
    </PublicStack.Navigator>
  );
};

export default PublicRouter;
