import platform from "./platform";

import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import textstyles from "./texts";
import { CardInterpolator } from "../interfaces/navigations";

type NavigationStyleProp = {
  stackContainer: NativeStackNavigationOptions;
  tabBarMenu: any;
  modalContainer: any;
};
/**
 * Configuracion y estilos del Navigator or default
 */
const navigationStyles: NavigationStyleProp = {
  stackContainer: {
    // headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: platform.colors.primary,

      //borderBottomWidth: 0,
      //borderBottomColor: 'transparent',
      //elevation: 0, // elimita la sombra en Android
      //shadowOpacity: 0, // elimita la sombra en iOS
    },
    headerTintColor: platform.colors.white,
    headerBackTitleStyle: {
      fontSize: platform.fontSizes.HEADER,
      //color: platform.colors.primary,
    },
    // headerBackTitle: null,
    // headerTruncatedBackTitle: null,
    //headerMode: 'screen',
    headerTitleStyle: {
      //fontVariant: ['lining-nums'],
      fontWeight: "600",
      fontSize: platform.fontSizes.HEADER,
      color: platform.colors.white,
      //textTransform: 'capitalize',
    },
    // safeAreaInsets: { top: 0, bottom: 0 },
  },
  tabBarMenu: {
    swipeEnabled: true,
    tabBarInactiveTintColor: platform.colors.placeholder,
    tabBarActiveTintColor: platform.colors.primary,
    tabBarShowLabel: true,
    tabBarLabelStyle: { ...textstyles.textCaption, marginTop: 2 },
    tabBarAllowFontScaling: true,
    tabBarItemStyle: {
      paddingTop: 5,
      alignItems: "center",
    },
    tabBarStyle: {
      height: 60,
      backgroundColor: platform.colors.white,
      borderTopWidth: platform.generic.borderWidth,
      borderTopColor: "rgba(0, 0, 0, 0.2)",
    },
    tabBarIndicatorStyle: {
      backgroundColor: platform.colors.primary,
      borderBottomWidth: 4,
      borderBottomColor: platform.colors.primary,
    },
  },
  modalContainer: {
    headerShown: false,
    animationEnabled: true,
    cardOverlayEnabled: true,
    cardStyle: {
      backgroundColor: "rgba(0, 0, 0, 0.15)",
    },
    cardStyleInterpolator: ({ current: { progress } }: CardInterpolator) => {
      return {
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 0.5, 0.9, 1],
            outputRange: [0, 0.25, 0.7, 1],
          }),
        },
        overlayStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
            extrapolate: "clamp",
          }),
        },
      };
    },
  },
};

export default navigationStyles;
