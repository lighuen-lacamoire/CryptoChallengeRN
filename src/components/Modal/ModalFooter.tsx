import React from "react";
import { View, StyleSheet } from "react-native";
import { platform, buttonStyles } from "../../styles";
import { ModalActions } from "../../interfaces/buttons";
import { ButtonPill } from "../../components/Button";
import { genericMessages } from "../../configuration/messages";

type Props = {
  actions?: ModalActions;
};

/**
 * Modal: footer
 */
const ModalFooter = (props: Props): JSX.Element => {
  const { actions } = props;

  return (
    <View
      style={[
        styles.modalFooter,
        {
          height: actions?.secondary
            ? (buttonStyles.buttonDefault.height + 10) * 2
            : buttonStyles.buttonDefault.height + 16,
        },
      ]}>
      {actions?.primary?.component ? (
        actions?.primary?.component
      ) : (
        <ButtonPill
          content={actions?.primary?.content || genericMessages.accept}
          onPress={actions?.primary?.onPress}
        />
      )}
      {actions?.secondary ? (
        actions?.secondary?.component ? (
          actions?.secondary?.component
        ) : (
          <ButtonPill
            content={actions?.secondary.content || genericMessages.cancel}
            inverse
            onPress={actions?.secondary.onPress}
          />
        )
      ) : null}
    </View>
  );
};

export default ModalFooter;

/**
 * Estilos del Modal
 */
const styles = StyleSheet.create({
  modalFooter: {
    backgroundColor: platform.colors.formPrimaryBG,
    borderBottomLeftRadius: platform.generic.borderRadius,
    borderBottomRightRadius: platform.generic.borderRadius,
    paddingHorizontal: platform.generic.paddingSpaces,
  },
});
