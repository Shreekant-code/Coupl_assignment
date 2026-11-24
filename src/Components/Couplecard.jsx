import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { Copy, Eye, EyeOff } from 'lucide-react-native';
import { COLORS } from '../theme';

const CARD_GRAIN = Array.from({ length: 120 }, (_, index) => {
  const value = Math.sin((index + 1) * 7.13) * 10000;
  const random = value - Math.floor(value);
  const size = 0.5 + random * 0.7;
  return {
    key: index,
    left: (index * 37.17 + random * 19.3) % 350,
    top: (index * 71.31 + random * 41.7) % 166,
    size,
    opacity: 0.04 + random * 0.04,
  };
});

const CoupleCard = ({
  initials,
  cardTitle,
  cardNumber,
  expiry,
  cvv,
  budgetPercent,
  totalDots,
  onCopyCard,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const visibilityAnim = React.useRef(new Animated.Value(1)).current;
  const lightSweepAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const lightSweep = Animated.loop(
      Animated.timing(lightSweepAnim, {
        toValue: 1,
        duration: 5200,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    );

    lightSweep.start();
    return () => lightSweep.stop();
  }, [lightSweepAnim]);

  const toggleVisibility = () => {
    const nextVisible = !isVisible;
    setIsVisible(nextVisible);
    Animated.timing(visibilityAnim, {
      toValue: nextVisible ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const maskedCardNumber = cardNumber.replace(/\d/g, String.fromCharCode(8226));

  const displayCardNumber = isVisible ? cardNumber : maskedCardNumber;
  const displayCvv = isVisible ? cvv : String.fromCharCode(8226).repeat(3);

  const normalizedBudget = Math.min(Math.max(budgetPercent, 0), 100);
  const activeDots =
    normalizedBudget === 60 && totalDots === 13
      ? 10
      : Math.round((normalizedBudget / 100) * totalDots);

  return (
    <View style={styles.wrapper}>
      {/* Main Card Surface */}
      <Animated.View style={[styles.cardOuter, {
        transform: [{ scale: visibilityAnim.interpolate({ inputRange: [0, 1], outputRange: [0.985, 1] }) }],
      }]}>
        <LinearGradient
          colors={['#5A2A86', '#1B1B5E', '#2B3FD0']}
          locations={[0, 0.55, 1]}
          start={{ x: 0.08, y: 0 }}
          end={{ x: 0.92, y: 1 }}
          style={styles.cardGradient}
        >
          <LinearGradient
            pointerEvents="none"
            colors={[
              'rgba(214,80,190,0.55)',
              'rgba(214,80,190,0.2)',
              'rgba(214,80,190,0)',
            ]}
            locations={[0, 0.28, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.75, y: 0.72 }}
            style={styles.cardMagentaGlow}
          />
          <LinearGradient
            pointerEvents="none"
            colors={[
              'rgba(43,63,208,0)',
              'rgba(43,63,208,0.48)',
              'rgba(43,63,208,0.95)',
            ]}
            locations={[0, 0.62, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardBlueGlow}
          />
          <LinearGradient
            pointerEvents="none"
            colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0)']}
            locations={[0, 0.35]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.8 }}
            style={styles.cardGloss}
          />
          <Animated.View
            pointerEvents="none"
            style={[
              styles.lightSweep,
              {
                opacity: lightSweepAnim.interpolate({
                  inputRange: [0, 0.12, 0.84, 1],
                  outputRange: [0, 0.72, 0.72, 0],
                }),
                transform: [
                  {
                    translateX: lightSweepAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-180, 420],
                    }),
                  },
                  { rotate: '14deg' },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={[
                'rgba(79, 106, 255, 0)',
                'rgba(90, 115, 255, 0.1)',
                'rgba(137, 151, 255, 0.24)',
                'rgba(77, 124, 255, 0.12)',
                'rgba(79, 106, 255, 0)',
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.lightSweepGradient}
            />
          </Animated.View>
          <View pointerEvents="none" style={styles.cardGrainLayer}>
            {CARD_GRAIN.map((speck) => (
              <View
                key={speck.key}
                style={[
                  styles.cardGrainSpeck,
                  {
                    left: speck.left,
                    top: speck.top,
                    width: speck.size,
                    height: speck.size,
                    opacity: speck.opacity,
                  },
                ]}
              />
            ))}
          </View>

          {/* Top Row: Initial Badge + Card Title */}
          <View style={styles.cardTopRow}>
            <View style={styles.miniBadge}>
              <Text style={styles.miniBadgeText}>{initials}</Text>
            </View>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {cardTitle}
            </Text>
          </View>

          {/* Bottom Row: Card Number, Expiry, CVV */}
          <View style={styles.cardDetailsRow}>
            <View style={styles.numberBlock}>
              <Text
                style={styles.cardNumberText}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
              >
                {displayCardNumber}
              </Text>
              <Text style={styles.metaLabel}>Card No.</Text>
            </View>

            <View style={styles.expiryBlock}>
              <Text style={styles.metaValue}>{expiry}</Text>
              <Text style={styles.metaLabel}>Exp.</Text>
            </View>

            <View style={styles.cvvBlock}>
              <Text style={styles.metaValue}>{displayCvv}</Text>
              <Text style={styles.metaLabel}>CVV</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Budget Strip Attached Below Card */}
      <View style={styles.budgetWrap}>
        <Svg
          pointerEvents="none"
          width="100%"
          height="100%"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          style={styles.budgetGlow}
        >
          <Defs>
            <RadialGradient id="budgetTopGlow" cx="50%" cy="55%" r="75%">
              <Stop offset="0%" stopColor="#8B6CF0" stopOpacity="0.45" />
              <Stop offset="75%" stopColor="#8B6CF0" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect width="100" height="40" fill="url(#budgetTopGlow)" />
        </Svg>
        <LinearGradient
          colors={[
            'rgba(139,108,240,1)',
            'rgba(110,100,240,0.7)',
            'rgba(90,100,240,0)',
            'rgba(90,100,240,0)',
          ]}
          locations={[0, 0.18, 0.45, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.budgetBorder}
        >
          <LinearGradient
            colors={['rgba(14,9,40,0.96)', 'rgba(8,5,26,0.98)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.budgetSurface}
          >
            <View style={styles.budgetBar}>
            <Text style={styles.budgetLabel}>Budget</Text>

            <View style={styles.dotsContainer}>
              {Array.from({ length: totalDots }).map((_, index) => {
                const isFilled = index < activeDots;
                return (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      isFilled ? styles.dotActive : styles.dotInactive,
                    ]}
                  />
                );
              })}
            </View>

            <Text style={styles.budgetPercent}>{budgetPercent}%</Text>
            </View>
          </LinearGradient>
        </LinearGradient>
      </View>

      {/* Floating Vertical Action Pill (Eye & Copy) */}
      <LinearGradient
        colors={['rgba(20,14,50,0.85)', 'rgba(20,14,50,0.85)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.actionPill}
      >
        <TouchableOpacity
          style={styles.pillButton}
          onPress={toggleVisibility}
          activeOpacity={0.75}
        >
          {isVisible ? (
            <Eye
              size={18}
              color="#E5DDFF"
              strokeWidth={1.7}
            />
          ) : (
            <EyeOff
              size={18}
              color="#E5DDFF"
              strokeWidth={1.7}
            />
          )}
        </TouchableOpacity>

        <View style={styles.pillDivider} />

        <TouchableOpacity
          style={styles.pillButton}
          onPress={() => onCopyCard && onCopyCard(cardNumber)}
          activeOpacity={0.75}
        >
          <Copy
            size={17}
            color="#E5DDFF"
            strokeWidth={1.7}
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginTop: 8,
    position: 'relative',
  },
  cardOuter: {
    position: 'relative',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden',
    zIndex: 1,
    shadowColor: '#3C28C8',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.35,
    shadowRadius: 40,
    elevation: 9,
  },
  cardGradient: {
    position: 'relative',
    overflow: 'hidden',
    height: 170,
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 28,
    justifyContent: 'flex-start',
  },
  cardGloss: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
    zIndex: 0,
  },
  cardMagentaGlow: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  cardBlueGlow: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  cardGrainLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  cardGrainSpeck: {
    position: 'absolute',
    borderRadius: 1,
    backgroundColor: '#F0E8FF',
  },
  cardTopRow: {
    position: 'relative',
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  miniBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.17)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniBadgeText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
  },
  cardTitle: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    flex: 1,
  },
  cardDetailsRow: {
    position: 'relative',
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom:5,
    paddingRight: 0,
    
  },
  numberBlock: {
    width: '63%',
    minWidth: 0,
  },
  expiryBlock: {
    width: '23%',
    alignItems: 'flex-start',
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(198, 189, 230, 0.2)',
  },
  cvvBlock: {
    width: '13.5%',
    alignItems: 'flex-start',
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(198, 189, 230, 0.2)',
  },
  cardNumberText: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.35,
    fontVariant: ['tabular-nums'],
  },
  metaValue: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    fontVariant: ['tabular-nums'],
  },
  lightSweep: {
    position: 'absolute',
    left: 0,
    top: -32,
    bottom: -32,
    width: 150,
    zIndex: 0,
  },
  lightSweepGradient: {
    flex: 1,
  },
  metaLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 4,
  },
  budgetWrap: {
    marginTop: -40,
    position: 'relative',
    zIndex: 2,
  },
  budgetBorder: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 1.5,
    overflow: 'hidden',
    zIndex: 1,
  },
  budgetGlow: {
    position: 'absolute',
    top: -22,
    left: '8%',
    right: '8%',
    height: 40,
    zIndex: 0,
  },
  budgetSurface: {
    borderTopLeftRadius: 26.5,
    borderTopRightRadius: 26.5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
    paddingTop: 14,
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  budgetBar: {
    minHeight: 38,
    paddingLeft: 32,
    paddingRight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  budgetLabel: {
    color: COLORS.accentPurple,
    fontSize: 18,
    fontWeight: '500',
    marginRight: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  dotActive: {
    backgroundColor: COLORS.danger,
    shadowColor: COLORS.danger,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 4,
    elevation: 3,
  },
  dotInactive: {
    backgroundColor: COLORS.dotEmpty,
  },
  budgetPercent: {
    color: COLORS.accentPurple,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    fontVariant: ['tabular-nums'],
  },
  actionPill: {
    position: 'absolute',
    right: 12,
    top: -52,
    zIndex: 10,
    width: 44,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    paddingVertical: 3,
    shadowColor: '#7356FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 4,
  },
  pillButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillDivider: {
    width: 24,
    height: 1,
    backgroundColor: 'rgba(148, 163, 184, 0.12)',
    marginVertical: 2,
  },
});

export default CoupleCard;
