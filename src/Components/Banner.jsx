import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ChevronRight } from 'lucide-react-native';
import { COLORS } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const KycBannerCarousel = ({
  banners = [],
  onBannerPress,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const bannerWidth = SCREEN_WIDTH - 60;
  const bannerSpacing = 10;

  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (bannerWidth + bannerSpacing));
    const clampedIndex = Math.max(0, Math.min(index, banners.length - 1));
    setActiveIndex(clampedIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        bounces={false}
        snapToInterval={bannerWidth + bannerSpacing}
        snapToAlignment="start"
        contentContainerStyle={styles.scrollContent}
        onMomentumScrollEnd={handleScrollEnd}
      >
        {banners.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            onPress={() => onBannerPress && onBannerPress(item, index)}
            style={[
              styles.bannerWrapper,
              {
                width: bannerWidth,
                marginRight: index < banners.length - 1 ? bannerSpacing : 0,
              },
            ]}
          >
            <LinearGradient
              colors={item.colors}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.bannerGradient}
            >
              {item.progress ? (
                <View style={styles.progressPreview}>
                  <View style={styles.progressTrack} />
                  <View style={styles.progressArc} />
                </View>
              ) : (
                <>
                  <Text style={styles.bannerLead} numberOfLines={1}>{item.leading}</Text>
                  <Text style={styles.bannerText} numberOfLines={1}>{item.trailing}</Text>
                  <View style={styles.chevronCircle}>
                    <ChevronRight size={18} color={COLORS.textPrimary} strokeWidth={2.4} />
                  </View>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.paginationRow}>
        {banners.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <View
              key={item.id}
              style={[
                styles.dot,
                isActive ? styles.dotActive : styles.dotInactive,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  bannerWrapper: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  bannerGradient: {
    height: 52,
    paddingHorizontal: 20,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
    marginLeft: 4,
    marginRight: 5,
  },
  bannerLead: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  chevronCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPreview: {
    width: 38,
    height: 38,
    marginLeft: 'auto',
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(74,140,255,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4A8CFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 3,
  },
  progressTrack: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: 'rgba(74,140,255,0.32)',
  },
  progressArc: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderTopColor: '#4A8CFF',
    borderRightColor: '#4A8CFF',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  dotActive: {
    backgroundColor: '#4A5CF0',
  },
  dotInactive: {
    backgroundColor: '#3A3750',
  },
});

export default KycBannerCarousel;
