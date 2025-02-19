import React from 'react';
import Svg, { SvgProps, Circle, Path, G } from 'react-native-svg';

const CryptoElixir = (props: Partial<SvgProps>) => {
  const { fontSize } = props;
  const svgSize = fontSize || 400;
  return (
    <Svg
      width={svgSize}
      height={svgSize}
      viewBox="0 0 32 32"
    >
      <G fill="none">
        <Circle cx={16} cy={16} r={16} fill="#00aded" />
        <G fill="#fff">
          <Path d="m10.097 23.603.002-.004 3.188-7.616-3.19-7.615 5.885 7.615-5.881 7.615zm11.776 0-.004-.005-5.881-7.615 5.885-7.615-3.19 7.615 3.188 7.616z" />
          <Path
            fillOpacity={0.8}
            d="M15.985 15.984v5.306l-5.89 2.31 5.89-7.62v-5.306l5.89-2.31z"
          />
          <Path
            fillOpacity={0.5}
            d="M15.985 21.29v4.651l-5.89-2.344 5.89-2.315v-5.298l-5.89-7.62 5.89 2.31V6.023l5.89 2.343-5.89 2.315v5.299l5.89 7.62z"
          />
          <Path
            fillOpacity={0.145}
            d="m10.095 8.366 5.89-2.343v4.658zm11.78 15.231-5.89 2.344v-4.659z"
          />
        </G>
      </G>
    </Svg>
  );
}
export default CryptoElixir
