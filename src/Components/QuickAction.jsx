import React from 'react';
import {
  Animated,
  Pressable,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import {
  ArrowLeftRight,
  ChartNoAxesColumnIncreasing,
  CreditCard,
  Ellipsis,
  FileText,
  History,
  IndianRupee,
  ScanQrCode,
} from 'lucide-react-native';
import { COLORS } from '../theme';

const ACTION_ICONS = {
  scan: ScanQrCode,
  rupee: IndianRupee,
  transfer: ArrowLeftRight,
  history: History,
  statistics: ChartNoAxesColumnIncreasing,
  file: FileText,
  card: CreditCard,
  more: Ellipsis,
};

const QuickActionItem = ({ item, onPress }) => {
  const scale = React.useRef(new Animated.Value(1)).current;

  const animateScale = (toValue) => {
    Animated.spring(scale, {
      toValue,
      speed: 28,
      bounciness: 5,
      useNativeDriver: true,
    }).start();
  };

  const Icon = ACTION_ICONS[item.icon];

  return (
    <Animated.View style={[styles.actionSlot, { transform: [{ scale }] }]}>
      <Pressable
        style={styles.actionItem}
        onPress={() => onPress?.(item)}
        onPressIn={() => animateScale(0.95)}
        onPressOut={() => animateScale(1)}
        accessibilityRole="button"
        accessibilityLabel={item.label}
      >
        <View style={styles.iconCircle}>
          <LinearGradient
            pointerEvents="none"
            colors={['rgba(139,108,240,0.12)', 'rgba(23,18,58,0)']}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconCircleGlow}
          />
          <Icon size={18} color={COLORS.textSoft} strokeWidth={1.8} />
        </View>
        <Text style={styles.actionLabel} numberOfLines={1}>
          {item.label}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const QuickActionsGrid = ({
  actions = [],
  onActionPress,
}) => {
  return (
    <View style={styles.container}>
      <Svg
        pointerEvents="none"
        width="100%"
        height="100%"
        viewBox="0 0 100 36"
        preserveAspectRatio="none"
        style={styles.actionsGlow}
      >
        <Defs>
          <RadialGradient id="actionsTopGlow" cx="50%" cy="50%" r="75%">
            <Stop offset="0%" stopColor="#6E9A2E" stopOpacity="0.3" />
            <Stop offset="75%" stopColor="#6E9A2E" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect width="100" height="36" fill="url(#actionsTopGlow)" />
      </Svg>
      <LinearGradient
        colors={[
          'rgba(140,190,60,1)',
          'rgba(110,154,46,0.65)',
          'rgba(74,107,42,0.25)',
          'rgba(74,107,42,0.12)',
          'rgba(110,154,46,0.45)',
        ]}
        locations={[0, 0.12, 0.35, 0.7, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientBorder}
      >
        <LinearGradient
          colors={['rgba(12,8,34,0.96)', 'rgba(6,4,20,0.98)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.panel}
        >
          <LinearGradient
            pointerEvents="none"
            colors={[
              'rgba(74,107,42,0.1)',
              'rgba(74,107,42,0)',
              'rgba(74,107,42,0.04)',
            ]}
            locations={[0, 0.5, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.panelInnerGlow}
          />
          <View style={styles.grid}>
            {actions.map((item) => (
              <QuickActionItem
                key={item.id}
                item={item}
                onPress={onActionPress}
              />
            ))}
          </View>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: -58,
    zIndex: 3,
    position: 'relative',
    borderRadius: 24,
    elevation: 0,
  },
  actionsGlow: {
    position: 'absolute',
    top: -18,
    left: '10%',
    right: '10%',
    height: 36,
    zIndex: 0,
  },
  gradientBorder: {
    borderRadius: 24,
    padding: 1.2,
    overflow: 'hidden',
    zIndex: 1,
  },
  panel: {
    borderRadius: 22.8,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  panelInnerGlow: {
    ...StyleSheet.absoluteFillObject,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionItem: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 4,
  },
  actionSlot: {
    width: '25%',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.actionCircle,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  iconCircleGlow: {
    ...StyleSheet.absoluteFillObject,
  },
  actionLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
});

export default QuickActionsGrid;
