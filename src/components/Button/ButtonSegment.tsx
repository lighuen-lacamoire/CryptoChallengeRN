import React, { useEffect } from 'react';
import {
  Animated,
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { platform, textstyles } from '../../styles';

type Props = {
  tabs: string[];
  onChange: any;
  currentIndex: number;
  segmentedControlBackgroundColor: string;
  activeSegmentBackgroundColor: string;
  textColor: string;
  width: number;
  containerStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  isRTL: boolean;
};

const ButtonSegment = (props: Partial<Props>): JSX.Element => {
  const {
    tabs = [],
    onChange = () => undefined,
    currentIndex = 0,
    width = Dimensions.get('screen').width - 32,
    containerStyle,
    isRTL = false,
  } = props;
  const translateValue = (width - 4) / (tabs?.length || 1);
  const [tabTranslate, setTabTranslate] = React.useState(new Animated.Value(0));
  // useCallBack with an empty array as input, which will call inner lambda only once and memoize the reference for future calls
  const memoizedTabPressCallback = React.useCallback(
    (index: any) => {
      onChange(index);
    },
    [onChange],
  );

  useEffect(() => {
    // If phone is set to RTL, make sure the animation does the correct transition.
    const transitionMultiplier = isRTL ? -1 : 1;

    // Animating the active index based current index
    Animated.spring(tabTranslate, {
      toValue: currentIndex * (transitionMultiplier * translateValue),
      stiffness: 150,
      damping: 20,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  return (
    <Animated.View
      style={[
        styles.segmentedControlWrapper,
        containerStyle,
        {
          width,
        },
      ]}>
      <Animated.View
        style={[
          styles.defaultTileStyle,
          StyleSheet.absoluteFill,
          {
            position: 'absolute',
            width: (width - 4) / (tabs?.length || 1),
            top: 0,
            backgroundColor: platform.colors.white,
          },
          {
            transform: [
              {
                translateX: tabTranslate,
              },
            ],
          },
        ]}
      />
      {tabs?.map((tab, index) => {
        const isCurrentIndex = currentIndex === index;
        return (
          <TouchableOpacity
            key={`${index * 10}`}
            style={[styles.textWrapper]}
            onPress={() => memoizedTabPressCallback(index)}
            activeOpacity={0.7}>
            <Text
              numberOfLines={1}
              style={[
                styles.textStyles,
                textstyles.textButtonLegend,
                {
                  color: isCurrentIndex
                    ? platform.colors.text
                    : platform.colors.border,
                },
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  segmentedControlWrapper: {
    backgroundColor: platform.colors.disabled,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
  },
  textWrapper: {
    flex: 1,
    elevation: 9,
    paddingHorizontal: 5,
  },
  textStyles: {
    textAlign: 'center',
  },
  defaultTileStyle: {
    marginVertical: 2,
    marginHorizontal: 2,
    borderRadius: 20,
    shadowColor: 'rgba(173, 175, 185, 0.3)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default ButtonSegment;
