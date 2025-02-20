import React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

const CryptoCoin = (props: Partial<SvgProps>) => {
  const { fontSize } = props;
  const svgSize = fontSize || 400;
  return (
    <Svg
      width={svgSize}
      height={svgSize}
      viewBox="0 0 1024 1024"
    >
      <Circle
        cx={512}
        cy={512}
        r={512}
        fill={"#002967"}
      />
      <Path
        d="M714.2 628.8 512 745.5 309.8 628.8V395.3L512 278.5l202.2 116.8v233.5zM512 256 290.3 384v256L512 768l221.7-128V384L512 256zm86.9 110.5H424.7l-20.2 88.8h215.4l-21-88.8zM455.6 577.6v-59L404 485.8l-58.4 43.4 79.6 138.4H457l37.6-35V615l-39-37.4zm113-108.9H455.8l19 49.6L469 574h43l43.4-.2-5.4-55.4 18.6-49.7zm51.6 16.7-51 33.2v59l-39 37.4v17.6l37.6 34.6h31.4l79.2-138-58.2-43.8z"
        fill={"#fff"}
      />
    </Svg>
  );
}
export default CryptoCoin
