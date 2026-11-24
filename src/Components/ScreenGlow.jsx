import React from 'react';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const ScreenGlow = () => (
  <Svg
    pointerEvents="none"
    width="100%"
    height="100%"
    viewBox="0 0 390 844"
    preserveAspectRatio="none"
    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
  >
    <Defs>
      <RadialGradient id="purpleGlow" cx="15%" cy="98%" r="72%">
        <Stop offset="0%" stopColor="#5B3FA8" stopOpacity="0.45" />
        <Stop offset="55%" stopColor="#5B3FA8" stopOpacity="0.15" />
        <Stop offset="100%" stopColor="#5B3FA8" stopOpacity="0" />
      </RadialGradient>
      <RadialGradient id="blueGlow" cx="95%" cy="3%" r="58%">
        <Stop offset="0%" stopColor="#283CC8" stopOpacity="0.22" />
        <Stop offset="100%" stopColor="#283CC8" stopOpacity="0" />
      </RadialGradient>
      <RadialGradient id="balanceGlow" cx="50%" cy="30%" r="70%">
        <Stop offset="0%" stopColor="#3C1E8C" stopOpacity="0.25" />
        <Stop offset="100%" stopColor="#3C1E8C" stopOpacity="0" />
      </RadialGradient>
    </Defs>
    <Rect width="390" height="844" fill="url(#purpleGlow)" />
    <Rect width="390" height="844" fill="url(#blueGlow)" />
      <Rect width="390" height="844" fill="url(#balanceGlow)" />
  </Svg>
);

export default ScreenGlow;
