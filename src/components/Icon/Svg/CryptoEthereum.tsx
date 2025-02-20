import React from 'react';
import Svg, { SvgProps, Circle, G, Path } from 'react-native-svg';

const CryptoEthereum = (props: Partial<SvgProps>) => {
  const { fontSize } = props;
  const svgSize = fontSize || 400;
  return (
    <Svg
      width={svgSize}
      height={svgSize}
      viewBox="0 0 32 32"
    >
      <G fill="none" fillRule="evenodd">
        <Circle cx={16} cy={16} r={16} fill="#627EEA" />
        <G fill="#FFF" fillRule="nonzero">
          <Path fillOpacity={0.602} d="M16.498 4v8.87l7.497 3.35z" />
          <Path d="M16.498 4 9 16.22l7.498-3.35z" />
          <Path fillOpacity={0.602} d="M16.498 21.968v6.027L24 17.616z" />
          <Path d="M16.498 27.995v-6.028L9 17.616z" />
          <Path fillOpacity={0.2} d="m16.498 20.573 7.497-4.353-7.497-3.348z" />
          <Path fillOpacity={0.602} d="m9 16.22 7.498 4.353v-7.701z" />
        </G>
      </G>
    </Svg>
  );
}
export default CryptoEthereum
