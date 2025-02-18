import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextStyle,
  StyleProp,
} from "react-native";
import Modal from "react-native-modal";
import {
  textstyles,
  platform,
  navigationStyles,
  containerStyles,
} from "../../styles";
import { ModalMessage } from "../../interfaces/buttons";
import { Icon } from "../../components/Icon";
import ModalFooter from "./ModalFooter";

/**
 * Componente de Modal
 */
const ModalPopUp = (props: ModalMessage): JSX.Element => {
  const {
    header,
    title,
    content,
    selfClose,
    isVisible,
    onBackdropPress,
    actions,
  } = props;

  const itsString = content && typeof content === "string";
  const hasFooter = actions && Object.keys(actions).length > 0;

  return (
    <Modal
      propagateSwipe
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={containerStyles.modalContainer}
      animationIn="zoomInDown"
      animationOut="zoomOutUp">
      <View style={[containerStyles.modalHeader]}>
        {header && typeof header !== "string" ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 8,
            }}>
            <View style={{ flex: 1 }}>
              {header}
              {title ? (
                <Text
                  style={[
                    textstyles.textBodyLegend,
                    { color: platform.colors.text },
                  ]}>
                  {title}
                </Text>
              ) : null}
            </View>
            {selfClose ? (
              <TouchableOpacity
                style={{ marginTop: 4 }}
                activeOpacity={0.4}
                onPress={onBackdropPress}>
                <Icon name="times" size={24} color={platform.colors.white} />
              </TouchableOpacity>
            ) : null}
          </View>
        ) : (
          <>
            {selfClose ? (
              <TouchableOpacity
                activeOpacity={0.4}
                style={{ alignSelf: "flex-end" }}
                onPress={onBackdropPress}>
                <Icon name="times" size={24} color={platform.colors.white} />
              </TouchableOpacity>
            ) : null}
            <Text
              style={[
                navigationStyles.stackContainer
                  .headerTitleStyle as StyleProp<TextStyle>,
              ]}>
              {title}
            </Text>
          </>
        )}
      </View>
      <View
        style={[
          containerStyles.modalBody,
          !hasFooter ? containerStyles.modalFooter : {},
        ]}>
        {itsString ? (
          <Text style={[textstyles.textInputForm, containerStyles.modalText]}>
            {content}
          </Text>
        ) : (
          content
        )}
      </View>
      {hasFooter ? <ModalFooter actions={actions} /> : null}
    </Modal>
  );
};

export default ModalPopUp;
