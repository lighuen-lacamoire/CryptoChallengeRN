import { platform } from '../../../styles';
import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const RadioFull = (props: Partial<SvgProps>) => {
  const { fontSize, color } = props;
  const svgSize = fontSize || 24;
  const svgColor = color || platform.colors.icon;
  return (
    <Svg width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none">
      <Path
        fill={svgColor}
        strokeWidth={1}
        stroke={svgColor}
        d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10a9.937 9.937 0 0 0-.541-3.217l-1.62 1.62c.106.515.161 1.05.161 1.597 0 4.411-3.589 8-8 8s-8-3.589-8-8 3.589-8 8-8a7.95 7.95 0 0 1 4.42 1.338l1.432-1.432A9.94 9.94 0 0 0 12 2zm9.293 1.293L11 13.586l-3.293-3.293-1.414 1.414L11 16.414 22.707 4.707l-1.414-1.414z"
      />
    </Svg>
  );
};

export default RadioFull;
