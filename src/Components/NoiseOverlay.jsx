import React from 'react';
import Svg, { Circle } from 'react-native-svg';

const makeNoise = (count, seed, viewHeight) =>
  Array.from({ length: count }, (_, index) => {
    const value = Math.sin((index + 1) * seed) * 10000;
    const random = value - Math.floor(value);
    const x = (index * 37.17 + random * 19.3) % 390;
    const y = (index * 71.31 + random * 41.7) % viewHeight;
    const radius = 0.35 + random * 0.45;
    return { x, y, radius, opacity: 0.025 + random * 0.025 };
  });

const NoiseOverlay = ({ style, count = 220, seed = 12, viewHeight = 844 }) => {
  const points = React.useMemo(
    () => makeNoise(count, seed, viewHeight),
    [count, seed, viewHeight],
  );

  return (
    <Svg
      pointerEvents="none"
      width="100%"
      height="100%"
      viewBox={`0 0 390 ${viewHeight}`}
      preserveAspectRatio="none"
      style={style}
    >
      {points.map((point, index) => (
        <Circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={point.radius}
          fill="#E6DEFF"
          opacity={point.opacity}
        />
      ))}
    </Svg>
  );
};

export default NoiseOverlay;
