import React from 'react';
import Svg, { SvgProps, Circle, Path, G } from 'react-native-svg';

const CryptoLitecoin = (props: Partial<SvgProps>) => {
  const { fontSize } = props;
  const svgSize = fontSize || 400;
  return (
    <Svg
      width={svgSize}
      height={svgSize}
      viewBox="0 0 24 24"
    >
      <Path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm-.262 3.678h2.584a.343.343 0 0 1 .33.435l-2.03 6.918 1.905-.582-.408 1.385-1.924.56-1.248 4.214h6.676a.343.343 0 0 1 .328.437l-.582 2a.459.459 0 0 1-.44.33H6.733l1.723-5.822-1.906.58.42-1.361 1.91-.58 2.422-8.18a.456.456 0 0 1 .437-.334z" />
    </Svg>
  );
}
export default CryptoLitecoin
