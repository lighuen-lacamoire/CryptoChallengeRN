import { platform } from '../../../styles';
import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const TickBoxEmpty = (props: Partial<SvgProps>) => {
  const { fontSize, color } = props;
  const svgSize = fontSize || 24;
  const svgColor = color || platform.colors.icon;
  return (
    <Svg width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none">
      <Path
        fill={svgColor}
        stroke={svgColor}
        strokeWidth={0.8}
        d="M5 3c-.522 0-1.055.191-1.432.568C3.191 3.945 3 4.478 3 5v14c0 .522.191 1.055.568 1.432.377.377.91.568 1.432.568h14c.522 0 1.055-.191 1.432-.568.377-.377.568-.91.568-1.432V5c0-.522-.191-1.055-.568-1.432C20.055 3.191 19.522 3 19 3H5zm0 2h14v14H5V5z"
      />
    </Svg>
  );
};

export default TickBoxEmpty;
