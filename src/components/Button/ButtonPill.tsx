import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { buttonStyles, containerStyles, platform, textstyles } from '../../styles';
import { Icon } from '../../components/Icon';
import { ImageProps } from '../../interfaces/buttons';

type Props = {
  containerStyle: StyleProp<ViewStyle>;
  content: JSX.Element | string;
  subtitle: string;
  icon: Partial<ImageProps>;
  inverse: boolean;
  disabled: boolean;
  onPress: <T>(a: T) => T | Promise<T> | void | Promise<void>;
  color: string;
  testID?: string;
};

/**
 * Componente de Boton Pildora
 * @param {StyleProp<ViewStyle>} containerStyle Estilo para el boton
 * @param {JSX.Element | string} content Texto o contenido de tipo <Text />
 * @param {string} subtitle Texto debajo del principal
 * @param {ImageProps} icon Label del icono o Componente <Icon />
 * @param {boolean} inverse Indica si es tipo inverso
 * @param {boolean} disabled Indica si esta deshabilitado
 * @param {Function} onPress Funcion al presionar el boton
 * @param {string} color Color principal para aplicar
 * @param {string} testID
 */
const ButtonPill = (props: Partial<Props>): JSX.Element => {
  const {
    content,
    subtitle,
    icon,
    inverse,
    disabled,
    onPress,
    color,
    containerStyle,
    testID,
  } = props;

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        testID={testID}
        accessibilityLabel={testID}
        activeOpacity={inverse ? 0.4 : 0.6}
        disabled={disabled}
        style={[
          buttonStyles.buttonDefault,
          containerStyles.shadowDefault,
          inverse
            ? {
                backgroundColor: disabled
                  ? platform.colors.secondaryDisableBackground
                  : platform.colors.white,
                borderWidth: 1,
                borderColor: platform.colors.borderContainer,
              }
            : {
                backgroundColor: disabled
                  ? platform.colors.primaryDisableBackground
                  : color || platform.colors.primary,
              },
          containerStyle || {},
        ]}
        onPress={onPress}>
        {icon && icon.name ? (
          <Icon
            name={icon.name}
            color={
              inverse && color && !disabled
                ? color
                : inverse
                ? disabled
                  ? platform.colors.text
                  : platform.colors.primary
                : platform.colors.white
            }
          />
        ) : null}
        <Text
          style={[
            textstyles.textButtonLegend,
            subtitle && subtitle.length > 0 ? { marginBottom: 0 } : {},
            inverse
              ? {
                  color: disabled
                    ? platform.colors.secondaryDisableText
                    : platform.colors.primary,
                }
              : {
                  color: disabled
                    ? platform.colors.primaryDisableText
                    : platform.colors.white,
                },
            inverse && color && !disabled ? { color } : {},
          ]}>
          {content}
        </Text>
        {subtitle && subtitle.length > 0 ? (
          <Text
            style={
              [
                //genericStyles.typhographyP2Regular,
                //styles.textSubtitle,
              ]
            }>
            {subtitle}
          </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default ButtonPill;
