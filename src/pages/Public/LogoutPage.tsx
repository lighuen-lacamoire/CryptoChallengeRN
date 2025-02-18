import React from "react";
import { ModalPopUp } from "../../components/Modal";
import { genericMessages, logoutMessages } from "../../configuration/messages";
import { useAppDispatch } from "../../redux/store";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useCardAnimation } from "@react-navigation/stack";
import { setLoading } from "../../redux/actions/status";
import { signoutOAuth } from "../../services/googleApi";
import { Pages } from "../../configuration/constants";
import { logoutExecute } from "../../redux/actions/authorization";
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { containerStyles, navigationStyles, textstyles } from "../../styles";
import ModalFooter from "../../components/Modal/ModalFooter";

/**
 * Modal de Cierre de Sesion
 */
const LogoutPage = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  /**
   * Quita el token del storage y los datos del usuario de redux
   */
  const signOut = async () => {
    dispatch(setLoading(Pages.LOGOUTPAGE, true));
    signoutOAuth()
      .then(() => {
        dispatch(logoutExecute());
      })
      .finally(() => {
        dispatch(setLoading(Pages.LOGOUTPAGE, false));
      });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        ]}
        onPress={() => navigation.navigate(Pages.MANAGEMENTROUTER)}
      />
      <Animated.View
        style={{
          padding: 0,
          width: "90%",
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: colors.card,
        }}>
        <View style={[containerStyles.modalHeader]}>
          <Text
            style={[
              navigationStyles.stackContainer
                .headerTitleStyle as StyleProp<TextStyle>,
            ]}>
            {logoutMessages.close.title}
          </Text>
        </View>
        <View style={[containerStyles.modalBody]}>
          <Text style={[textstyles.textInputForm, containerStyles.modalText]}>
            {logoutMessages.close.text}
          </Text>
        </View>
        <ModalFooter
          actions={{
            primary: {
              content: genericMessages.yes,
              onPress: signOut,
            },
            secondary: {
              content: genericMessages.no,
              onPress: () => {
                navigation.navigate(Pages.MANAGEMENTROUTER);
              },
            },
          }}
        />
      </Animated.View>
    </View>
  );
};
export default LogoutPage;
