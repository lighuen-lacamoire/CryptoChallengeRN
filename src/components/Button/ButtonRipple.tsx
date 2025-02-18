
import { RippleAnim, TouchableRipple } from '../../interfaces/buttons';
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
} from 'react-native';

type Props = TouchableRipple & {
  rippleContainerBorderRadius: number;
  containerStyle: StyleProp<ViewStyle>;
};

const defaultProps: TouchableRipple = {
  ...TouchableWithoutFeedback.prototype,
  rippleColor: 'rgb(0, 0, 0)',
  rippleOpacity: 0.3,
  rippleDuration: 400,
  rippleSize: 0,
  rippleContainerBorderRadius: 0,
  rippleCentered: false,
  rippleSequential: false,
  rippleFades: true,
  disabled: false,
  onRippleAnimation: (animation, callback) => animation.start(callback),
};

const ButtonRipple = (props: Partial<Props>) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [ripples, setRipples] = useState<RippleAnim[]>([]);
  const unique = useRef(0);
  const mounted = useRef(false);

  const {
    rippleColor = defaultProps.rippleColor,
    rippleOpacity = defaultProps.rippleOpacity,
    rippleFades = defaultProps.rippleFades,
    rippleDuration = defaultProps.rippleDuration,
    rippleCentered = defaultProps.rippleCentered,
    rippleSize = defaultProps.rippleSize,
    rippleSequential = defaultProps.rippleSequential,
    rippleContainerBorderRadius = defaultProps.rippleContainerBorderRadius,
    children,
    containerStyle,
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
    if (!rippleSequential || !ripples.length) {
      if (typeof onPress === 'function') {
        requestAnimationFrame(() => onPress(event));
      }

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
    <TouchableWithoutFeedback
      {...props}
      onPressIn={onPressInE}
      onPressOut={onPressOutE}
      onPress={onPressE}
      onLongPress={onLongPressE}
      onLayout={onLayoutE}>
      <Animated.View {...props} pointerEvents="box-only">
        {children}
        <View style={[styles.container, { borderRadius: 100 }]}>
          {ripples.map(renderRipple)}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonRipple;
/*
export default class ButtonRipple extends PureComponent {
  static defaultProps = {
    ...TouchableWithoutFeedback.defaultProps,

    rippleColor: 'rgb(0, 0, 0)',
    rippleOpacity: 0.3,
    rippleDuration: 400,
    rippleSize: 0,
    rippleContainerBorderRadius: 0,
    rippleCentered: false,
    rippleSequential: false,
    rippleFades: true,
    disabled: false,

    onRippleAnimation: (animation, callback) => animation.start(callback),
  };

  static propTypes = {
    ...Animated.View.propTypes,
    ...TouchableWithoutFeedback.propTypes,

    rippleColor: PropTypes.string,
    rippleOpacity: PropTypes.number,
    rippleDuration: PropTypes.number,
    rippleSize: PropTypes.number,
    rippleContainerBorderRadius: PropTypes.number,
    rippleCentered: PropTypes.bool,
    rippleSequential: PropTypes.bool,
    rippleFades: PropTypes.bool,
    disabled: PropTypes.bool,

    onRippleAnimation: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onLayout = this.onLayout.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);

    this.renderRipple = this.renderRipple.bind(this);

    this.unique = 0;
    this.mounted = false;

    this.state = {
      width: 0,
      height: 0,
      ripples: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onLayout(event) {
    const { width, height } = event.nativeEvent.layout;
    const { onLayout } = this.props;

    if ('function' === typeof onLayout) {
      onLayout(event);
    }

    this.setState({ width, height });
  }

  onPress(event) {
    const { ripples } = this.state;
    const { onPress, rippleSequential } = this.props;

    if (!rippleSequential || !ripples.length) {
      if ('function' === typeof onPress) {
        requestAnimationFrame(() => onPress(event));
      }

      this.startRipple(event);
    }
  }

  onLongPress(event) {
    const { onLongPress } = this.props;

    if ('function' === typeof onLongPress) {
      requestAnimationFrame(() => onLongPress(event));
    }

    this.startRipple(event);
  }

  onPressIn(event) {
    const { onPressIn } = this.props;

    if ('function' === typeof onPressIn) {
      onPressIn(event);
    }
  }

  onPressOut(event) {
    const { onPressOut } = this.props;

    if ('function' === typeof onPressOut) {
      onPressOut(event);
    }
  }

  onAnimationEnd() {
    if (this.mounted) {
      this.setState(({ ripples }) => ({ ripples: ripples.slice(1) }));
    }
  }

  startRipple(event) {
    const { width, height } = this.state;
    const { rippleDuration, rippleCentered, rippleSize, onRippleAnimation } =
      this.props;

    const w2 = 0.5 * width;
    const h2 = 0.5 * height;

    const { locationX, locationY } = rippleCentered
      ? { locationX: w2, locationY: h2 }
      : event.nativeEvent;

    const offsetX = Math.abs(w2 - locationX);
    const offsetY = Math.abs(h2 - locationY);

    const R =
      rippleSize > 0
        ? 0.5 * rippleSize
        : Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));

    const ripple = {
      unique: this.unique++,
      progress: new Animated.Value(0),
      locationX,
      locationY,
      R,
    };

    const animation = Animated.timing(ripple.progress, {
      toValue: 1,
      easing: Easing.out(Easing.ease),
      duration: rippleDuration,
      useNativeDriver: true,
    });

    onRippleAnimation(animation, this.onAnimationEnd);

    this.setState(({ ripples }) => ({ ripples: ripples.concat(ripple) }));
  }

  renderRipple({ unique, progress, locationX, locationY, R }) {
    const { rippleColor, rippleOpacity, rippleFades } = this.props;

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
  }

  render() {
    const { ripples } = this.state;
    const {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      children,
      rippleContainerBorderRadius,
      testID,
      nativeID,
      accessible,
      accessibilityHint,
      accessibilityLabel,

      onPress,
      onLongPress,
      onLayout,
      onRippleAnimation,

      rippleColor,
      rippleOpacity,
      rippleDuration,
      rippleSize,
      rippleCentered,
      rippleSequential,
      rippleFades,

      ...props
    } = this.props;

    const touchableProps = {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      testID,
      accessible,
      accessibilityHint,
      accessibilityLabel,
      onLayout: this.onLayout,
      onPress: this.onPress,
      onPressIn: this.onPressIn,
      onPressOut: this.onPressOut,
      onLongPress: onLongPress ? this.onLongPress : undefined,

      ...('web' !== Platform.OS ? { nativeID } : null),
    };

    const containerStyle = {
      borderRadius: rippleContainerBorderRadius,
    };

    return (
      <TouchableWithoutFeedback {...touchableProps}>
        <Animated.View {...props} pointerEvents="box-only">
          {children}
          <View style={[styles.container, containerStyle]}>
            {ripples.map(this.renderRipple)}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
*/

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
