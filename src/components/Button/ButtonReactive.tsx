
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback,
  I18nManager,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
  GestureResponderEvent,
  Text,
} from 'react-native';
import { RippleAnim, TouchableRipple } from '../../interfaces/buttons';
import { buttonStyles, containerStyles, platform, textstyles } from '../../styles';
import { Icon } from '../../components/Icon';
import { ImageProps } from '../../interfaces/buttons';

type Props = TouchableRipple & {
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

const defaultProps: TouchableRipple = {
  ...TouchableWithoutFeedback.prototype,
  rippleColor: platform.colors.white,
  rippleOpacity: 0.75,
  rippleDuration: 1000,
  rippleSize: 0,
  rippleContainerBorderRadius: 0,
  rippleCentered: false,
  rippleSequential: false,
  rippleFades: true,
  disabled: false,
  onRippleAnimation: (animation, callback) => animation.start(callback),
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
const ButtonReactive = (props: Partial<Props>) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [ripples, setRipples] = useState<RippleAnim[]>([]);
  const unique = useRef(0);
  const mounted = useRef(false);

  const {
    content,
    subtitle,
    icon,
    inverse,
    disabled = defaultProps.disabled,
    color,
    containerStyle,
    testID,
    rippleColor = inverse
      ? platform.colors.placeholder
      : defaultProps.rippleColor,
    rippleOpacity = inverse ? 0.9 : defaultProps.rippleOpacity,
    rippleFades = defaultProps.rippleFades,
    rippleDuration = defaultProps.rippleDuration,
    rippleCentered = defaultProps.rippleCentered,
    rippleSize = defaultProps.rippleSize,
    rippleSequential = defaultProps.rippleSequential,
    children,
    onRippleAnimation = defaultProps.onRippleAnimation,
    onLayout,
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
  } = props;

  const onLayoutE = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;

    if (typeof onLayout === 'function') {
      onLayout(event);
    }

    setWidth(width);
    setHeight(height);
  };

  const onPressE = (event: GestureResponderEvent) => {
    if (typeof onPress === 'function') {
      requestAnimationFrame(() => onPress(event));
    }
    if (rippleSequential || !ripples.length) {
      startRipple(event);
    }
  };

  const onLongPressE = (event: GestureResponderEvent) => {
    if (typeof onLongPress === 'function') {
      requestAnimationFrame(() => onLongPress(event));
    }

    startRipple(event);
  };

  const onPressInE = (event: GestureResponderEvent) => {
    startRipple(event);
    if (typeof onPressIn === 'function') {
      onPressIn(event);
    }
  };

  const onPressOutE = (event: GestureResponderEvent) => {
    if (typeof onPressOut === 'function') {
      onPressOut(event);
    }
  };

  const onAnimationEnd = () => {
    if (mounted.current === true) {
      const newRipples = ripples.slice(1);
      // setRipples(newRipples);
    }
  };

  const startRipple = (event: {
    nativeEvent: { locationX: number; locationY: number };
  }) => {
    const w2 = 0.5 * width;
    const h2 = 0.5 * height;

    const { locationX, locationY }: { locationX: number; locationY: number } =
      rippleCentered ? { locationX: w2, locationY: h2 } : event.nativeEvent;

    const offsetX = Math.abs(w2 - locationX);
    const offsetY = Math.abs(h2 - locationY);

    const R =
      rippleSize > 0
        ? 0.5 * rippleSize
        : Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));

    const ripple: RippleAnim = {
      unique: unique.current++,
      progress: new Animated.Value(0),
      locationX,
      locationY,
      R,
    };

    const animation = Animated.timing(ripple.progress, {
      toValue: 1,
      easing: Easing.out(Easing.ease),
      duration: rippleDuration,
      useNativeDriver: false,
    });

    onRippleAnimation(animation, onAnimationEnd);

    const newRipples = ripples.concat(ripple);
    //setUnique(newUnique);
    setRipples(newRipples);
  };

  const renderRipple = ({
    unique,
    progress,
    locationX,
    locationY,
    R,
  }: RippleAnim) => {
    const rippleStyle = {
      top: locationY - radius,
      [I18nManager.isRTL ? 'right' : 'left']: locationX - radius,
      backgroundColor: rippleColor,

      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5 / radius, R / radius],
          }),
        },
      ],

      opacity: rippleFades
        ? progress.interpolate({
            inputRange: [0, 1],
            outputRange: [rippleOpacity, 0],
          })
        : rippleOpacity,
    };

    return <Animated.View style={[styles.ripple, rippleStyle]} key={unique} />;
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
    mounted.current = true;

    return () => {
      // Anything in here is fired on component unmount.
      mounted.current = false;
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        onPressIn={onPressInE}
        onPressOut={onPressOutE}
        onPress={onPressE}
        onLongPress={onLongPressE}
        onLayout={onLayoutE}
        disabled={disabled}>
        <Animated.View
          //{...props}
          pointerEvents="box-only"
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
          ]}>
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
          <View
            style={[
              styles.container,
              { borderRadius: buttonStyles.buttonDefault.borderRadius },
            ]}>
            {ripples.map(renderRipple)}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ButtonReactive;

const radius = 10;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  ripple: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    overflow: 'hidden',
    position: 'absolute',
  },
});
