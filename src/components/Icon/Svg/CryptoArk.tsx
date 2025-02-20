import React from 'react';
import Svg, { SvgProps, Circle, Path, G } from 'react-native-svg';

const CryptoArk = (props: Partial<SvgProps>) => {
  const { fontSize } = props;
  const svgSize = fontSize || 400;
  return (
    <Svg
      width={svgSize}
      height={svgSize}
      viewBox="0 0 32 32"
    >
      <G fill="none">
        <Circle cx={16} cy={16} r={16} fill="#F70000" />
        <Path
          fill="#FFF"
          d="M15.947 13.347 5 24.89 15.996 7 27 25 15.947 13.347zm1.588 4.585h-3.422l1.76-1.936 1.662 1.953v-.017zm-6.6 3.177v-.024l1.941-1.987v-.009l5.92-.025 1.998 2.045h-9.858z"
        />
      </G>
    </Svg>
  );
}
export default CryptoArk
