import React from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";
import platform from "../../styles/platform";

type Props = {
  children: JSX.Element[] | JSX.Element | React.ReactNode[] | undefined;
  containerStyle: StyleProp<ViewStyle>;
  refreshControl: JSX.Element;
};

/**
 * Componente de container generico para los formularios
 * @param {JSX.Element[] | JSX.Element | React.ReactNode[] | undefined} children contenido
 * @param {StyleProp<ViewStyle>} containerStyle Estilo para el container
 * @param {JSX.Element} refreshControl Opciones al actualizar
 */
const ScrollContainer = (props: Partial<Props>): JSX.Element => {
  const { children, containerStyle, refreshControl } = props;
  return (
    <KeyboardAvoidingView
      {...(Platform.OS === "ios"
        ? { behavior: "padding" }
        : { behavior: "height" })}
      // you might need sometimes👇
      style={{ flex: 1 }}
      // chances are you might be using react-navigation
      // if so 👇
      keyboardVerticalOffset={Platform.OS === "ios" ? -70 : 70}
      // You can import Header Component from react-navigation and it has height attached to it
      // 64 is some extra padding, I feel good, feel free to tweak it
      contentContainerStyle={{ flexGrow: 1 }}>
      <ScrollView
        // contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[{ flexGrow: 1 }]}
        contentInsetAdjustmentBehavior="automatic"
        scrollsToTop={false}
        refreshControl={refreshControl}
        style={[
          { backgroundColor: platform.colors.formPrimaryBG },
          containerStyle,
        ]}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ScrollContainer;
