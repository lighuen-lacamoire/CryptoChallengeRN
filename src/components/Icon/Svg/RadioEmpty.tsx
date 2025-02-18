import { platform } from '../../../styles';
import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const RadioEmpty = (props: Partial<SvgProps>) => {
  const { fontSize, color } = props;
  const svgSize = fontSize || 24;
  const svgColor = color || platform.colors.icon;
  return (
    <Svg width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none">
      <Path
        fill={svgColor}
        strokeWidth={1}
        stroke={svgColor}
        d="M12 2C6.489 2 2 6.489 2 12s4.489 10 10 10 10-4.489 10-10S17.511 2 12 2zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8z"
      />
    </Svg>
  );
};

export default RadioEmpty;
