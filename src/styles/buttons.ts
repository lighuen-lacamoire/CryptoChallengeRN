import { StyleSheet } from "react-native";
import platform from "./platform";

/**
 * Estilos del Boton
 */
const buttonStyles = StyleSheet.create({
  buttonDefault: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: platform.generic.height / 2,
    height: platform.generic.height,
  },
  iconDefault: {
    fontSize: 24,
  },
  textDefault: {
    textAlign: "center",
    // textTransform: 'capitalize',
  },
  textDisabled: {
    // color: platform.colors.gray4,
  },
  textPrimary: {
    color: platform.colors.white,
  },
  textSecondary: {
    color: platform.colors.primary,
    marginTop: 2,
    marginBottom: 2,
  },
  textSubtitle: {
    // color: platform.colors.gray4,
    marginTop: 8,
    marginBottom: 4,
  },
  buttonBlankIcon: {
    height: 70,
    backgroundColor: platform.colors.white,
    borderColor: platform.colors.borderContainer,
    borderWidth: platform.generic.borderWidth,
    borderStyle: "solid",
    borderRadius: 24,
    padding: platform.generic.containerSpaces,
    margin: 4,
    flexDirection: "row",
  },
});

export default buttonStyles;
