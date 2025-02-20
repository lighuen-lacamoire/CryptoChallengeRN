import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Pages } from "../configuration/constants";
import { useAppSelector } from "../redux/store";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { BackHandler } from "react-native";

/**
 * Nivel de navegacion inicial
 */
const RootRouter = (): JSX.Element => {
  const routeNameRef = React.useRef<string>();
  const navigationRef = useNavigationContainerRef();
  const RootStack = createNativeStackNavigator();
  const { user, accessToken } = useAppSelector((state) => state.authorization);
  // Variable utilizada para verificacion si el usuario esta autenticado
  const isAuthenticated = user && user.idToken && accessToken;
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return false;
    });
  }, []);
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
        routeNameRef.current = currentRouteName;
      }}>
      <RootStack.Navigator>
        {isAuthenticated ? (
          <RootStack.Screen
            name={Pages.PRIVATEROUTER}
            component={PrivateRouter}
            options={{ headerShown: false }}
          />
        ) : (
          <RootStack.Screen
            name={Pages.PUBLICROUTER}
            component={PublicRouter}
            options={{ headerShown: false }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootRouter;
