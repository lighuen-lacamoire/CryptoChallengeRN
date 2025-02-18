import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Easing, Dimensions } from "react-native";
import { ScrollContainer } from "../../components/Container";
import { ButtonPill } from "../../components/Button";
import { containerStyles } from "../../styles";
import { statusCodes } from "@react-native-google-signin/google-signin";
import { loginError, loginSuccess } from "../../redux/actions/authorization";
import { setLoading } from "../../redux/actions/status";
import { Pages } from "../../configuration/constants";
import { AppError } from "../../interfaces/services";
import { Img } from "../../components/Images";
import { loginMessages } from "../../configuration/messages";
import { logginOAuth } from "../../services/googleApi";
import { useAppDispatch } from "../../redux/store";

/**
 * Pantalla de logueo
 */
const LoginPage = (): JSX.Element => {
  /** Dispatch de Redux */
  const dispatch = useAppDispatch();
  const animHeightValue = useRef(new Animated.Value(0)).current;
  const animOpacityValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    animHeightValue.setValue(0);
    Animated.timing(animHeightValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      startAnimation();
    });
  };

  const startAnimationOpacity = () => {
    animOpacityValue.setValue(0);
    Animated.timing(animOpacityValue, {
      toValue: 1,
      duration: 700,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      startAnimationOpacity();
    });
  };
  const animHeight = animHeightValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get("window").height - 200, 0],
    extrapolate: "clamp",
  });
  const animHeightLeft = animHeightValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get("window").height - 200 + 70, 70],
    extrapolate: "clamp",
  });

  const animOpacity = animOpacityValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  const animOpacityLeft = animOpacityValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  });
  const signInGoogle = async () => {
    dispatch(setLoading(Pages.LOGINPAGE, true));
    logginOAuth()
      .then(async (response) => {
        dispatch(loginSuccess(response.info, response.token.accessToken));
      })
      .catch((error: AppError) => {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          console.log("sign in cancelled");
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          console.log("in progress ");
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          console.log("play services not available");
        } else {
          // some other error happened
          console.log("some error happened");
        }
        dispatch(loginError({ title: "Login", message: error.message }));
      })
      .finally(() => {
        dispatch(setLoading(Pages.LOGINPAGE, false));
      });
  };

  useEffect(() => {
    startAnimation();
    startAnimationOpacity();
  });

  return (
    <View style={containerStyles.bodyPage}>
      <ScrollContainer>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
          <Animated.View
            style={[
              {
                opacity: animOpacityLeft,
                transform: [{ translateY: animHeightLeft }],
              },
            ]}>
            <Img name="coin" size={70} />
          </Animated.View>

          <Animated.View
            style={[
              {
                opacity: animOpacity,
                transform: [{ translateY: animHeight }],
              },
            ]}>
            <Img name="coin" size={70} />
          </Animated.View>
        </View>
      </ScrollContainer>
      <View style={[containerStyles.footerStatic]}>
        <ButtonPill content={loginMessages.login} onPress={signInGoogle} />
      </View>
    </View>
  );
};

export default LoginPage;
