import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { ImageProps } from '../../interfaces/buttons';
import { platform, textstyles } from '../../styles';
import { Icon } from '../Icon';

type Props = {
  content: JSX.Element | string;
  subtitle: string;
  icon: Partial<ImageProps>;
  vertical: boolean;
  disabled: boolean;
  onPress: <T>(a: T) => T | Promise<T> | void | Promise<void>;
  color: string;
  style: StyleProp<ViewStyle> | null;
  testID?: string;
};

/**
 * Componente de Boton Rectangular
 * @param content Texto o contenido de tipo <Text />
 * @param subtitle Texto debajo del principal
 * @param icon Label del icono o Componente <Icon />
 * @param inverse Indica si es tipo inverso
 * @param disabled Indica si esta deshabilitado
 * @param onPress Funcion al presionar el boton
 * @param color Color principal para aplicar
 * @param style Estilo para el boton
 */
const ButtonCard = (props: Partial<Props>): JSX.Element => {
  const {
    content,
    subtitle,
    icon,
    // inverse,
    disabled,
    onPress,
    // color,
    style,
    testID,
  } = props;

  return (
    <View style={[{ width: 140, height: 140, marginRight: 16 }]}>
      <TouchableOpacity
        testID={testID}
        accessibilityLabel={testID}
        activeOpacity={0.6}
        disabled={disabled}
        style={[styles.buttonBlankIcon, style || {}]}
        onPress={onPress}>
        <View>
          <Icon
            isSvg={icon?.isSvg}
            defaultName={icon?.defaultName}
            name={icon?.name}
            size={icon?.size || 50}
            color={platform.colors.primary}
          />
          <Text
            style={[
              textstyles.textBodyLegend,
              {
                color: platform.colors.text,
                marginTop: 0,
              },
            ]}>
            {content}
          </Text>
          {subtitle && subtitle.length > 0 ? (
            <Text
              style={[textstyles.textCaption, styles.textSubtitle]}>
              {subtitle}
            </Text>
          ) : null}
        </View>

      </TouchableOpacity>
    </View>
  );
};

export default ButtonCard;

/**
 * Estilos del Boton
 */
const styles = StyleSheet.create({
  iconDefault: {
    fontSize: 24,
  },
  textDefault: {
    textAlign: 'center',
    // textTransform: 'capitalize',
  },
  textDisabled: {
    color: platform.colors.disabled,
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: platform.colors.primary,
    marginTop: 2,
    marginBottom: 2,
  },
  textSubtitle: {
    color: platform.colors.black,
    marginTop: 4,
  },
  buttonBlankIcon: {
    backgroundColor: platform.colors.listBackground,
    borderColor: platform.colors.borderButton,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
    padding: 16,
    elevation: 3,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
