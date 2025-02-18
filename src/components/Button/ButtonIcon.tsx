import React from 'react';
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TouchableHighlight,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { platform } from '../../styles';
import { Icon } from '../../components/Icon';
import { ImageProps } from '../../interfaces/buttons';

type Props = {
  containerStyle: StyleProp<ViewStyle>;
  icon: Partial<ImageProps>;
  disabled: boolean;
  onPress: <T>(a: T) => T | Promise<T> | void | Promise<void>;
  color: string;
  underlayColor: string;
  testID?: string;
};

/**
 * Componente de Boton Icono
 * @param {StyleProp<ViewStyle>} containerStyle Estilo para el boton
 * @param {ImageProps} icon Label del icono o Componente <Icon />
 * @param {boolean} disabled Indica si esta deshabilitado
 * @param {Function} onPress Funcion al presionar el boton
 * @param {string} color Color principal para aplicar
 * @param {string} underlayColor
 * @param {string} testID
 */
const ButtonIcon = (props: Partial<Props>): JSX.Element => {
  const {
    icon,
    disabled,
    onPress,
    color,
    containerStyle,
    underlayColor,
    testID,
  } = props;
  const animatedValue = new Animated.Value(0);

  const animatedValueInterpolateScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });
  const defaultIconSize = icon?.size || platform.fontSizes.ICON;
  const defaultContainerSize = defaultIconSize + 20;

  const buttonStyle: StyleProp<ViewStyle> = [
    {
      width: defaultContainerSize,
      height: defaultContainerSize,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: defaultContainerSize / 2,
    },
    color ? { backgroundColor: color } : {},
    containerStyle || {},
  ];
  const onPressAnim = () => {
    Animated.sequence([
      Animated.spring(animatedValue, {
        toValue: 1.33,
        friction: 0.47,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const renderItemBody = () => {
    return (
      <Icon
        name={icon?.name}
        color={disabled ? platform.colors.disabled : icon?.color}
        size={defaultIconSize}
      />
    );
  };

  return (
    <TouchableWithoutFeedback
      disabled={disabled}
      onPressIn={onPressAnim}
      onPress={onPress}>
      <Animated.View
        style={[
          buttonStyle,
          {
            transform: [
              { scaleX: animatedValueInterpolateScale },
              { scaleY: animatedValueInterpolateScale },
            ],
          },
        ]}>
        {renderItemBody()}
      </Animated.View>
    </TouchableWithoutFeedback>
  );

  return underlayColor && underlayColor.length > 0 ? (
    <TouchableHighlight
      testID={testID}
      accessibilityLabel={testID}
      disabled={disabled}
      style={buttonStyle}
      activeOpacity={0.8}
      underlayColor={underlayColor || platform.colors.underlayColor}
      onPressIn={() => onPressAnim()}
      onPress={onPress}>
      {renderItemBody()}
    </TouchableHighlight>
  ) : (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel={testID}
      disabled={disabled}
      style={buttonStyle}
      activeOpacity={0.5}
      onPressIn={() => onPressAnim()}
      onPress={onPress}>
      {renderItemBody()}
    </TouchableOpacity>
  );
};

export default ButtonIcon;
