import { StyleSheet } from "react-native";
import buttonStyles from "./buttons";
import platform from "./platform";

/**
 * Estilos
 */
const containerStyles = StyleSheet.create({
  bodyPage: {
    flex: 1,
    backgroundColor: platform.colors.formPrimaryBG,
  },
  itemStretch: {
    flexGrow: 1,
    flexBasis: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadowB: {
    elevation: 2,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  shadowDefault: {
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 3, // Android
  },
  itemForm: {
    flexDirection: "row",
    marginBottom: 20,
  },
  footerStatic: {
    paddingTop: 4,
    height:
      buttonStyles.buttonDefault.height + platform.generic.containerSpaces,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: platform.generic.containerSpaces,
    paddingBottom: 10,
  },
  footerDouble: {
    paddingTop: platform.generic.paddingSpaces,
    height:
      (buttonStyles.buttonDefault.height + platform.generic.containerSpaces) *
      2,
    paddingHorizontal: platform.generic.containerSpaces,
  },
  listItemFlat: {
    flex: 1,
    backgroundColor: platform.colors.listBackground,
    paddingHorizontal: platform.generic.paddingSpaces,
    paddingTop: 8,
  },
  itemSpacingElements: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemContainer: {
    height: 48,
    paddingHorizontal: platform.generic.paddingSpaces,
    borderBottomWidth: platform.generic.borderWidth,
    borderBottomColor: platform.colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemContainer2: {
    height: 48,
    paddingHorizontal: platform.generic.paddingSpaces,
    borderRadius: platform.generic.borderRadius,
    borderWidth: platform.generic.borderWidth,
    borderColor: platform.colors.text,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalContainer: {
    justifyContent: "center",
    marginHorizontal: platform.generic.paddingSpaces * 2,
  },
  modalHeader: {
    backgroundColor: platform.colors.primary,
    padding: platform.generic.paddingSpaces,
    justifyContent: "center",
    borderTopLeftRadius: platform.generic.borderRadius,
    borderTopRightRadius: platform.generic.borderRadius,
    alignItems: "center",
  },
  modalBody: {
    padding: platform.generic.paddingSpaces,
    backgroundColor: platform.colors.formPrimaryBG,
  },
  modalContent: {
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    color: platform.colors.white,
    marginBottom: 8,
  },
  modalText: {
    color: platform.colors.text,
    marginBottom: platform.generic.containerSpaces,
  },
  modalFooter: {
    backgroundColor: platform.colors.formPrimaryBG,
    borderBottomLeftRadius: platform.generic.borderRadius,
    borderBottomRightRadius: platform.generic.borderRadius,
  },
});

export default containerStyles;
