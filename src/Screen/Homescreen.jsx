import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileHeader from '../Components/Profileheader';
import BalanceSection from '../Components/Balance';
import CoupleCard from '../Components/Couplecard';
import QuickActionsGrid from '../Components/QuickAction';
import KycBannerCarousel from '../Components/Banner';
import BottomTab from './Navigation/bottomtab';
import ScreenGlow from '../Components/ScreenGlow';
import NoiseOverlay from '../Components/NoiseOverlay';
import { COLORS } from '../theme';
import { homeData } from '../data/homeData';

export const Homescreen = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        pointerEvents="none"
        colors={['#0B0626', '#0A0620', '#07041A']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      <ScreenGlow />
      <NoiseOverlay style={StyleSheet.absoluteFill} count={260} seed={21} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader {...homeData.profile} />
        <BalanceSection {...homeData.balance} />
        <CoupleCard {...homeData.card} />
        <QuickActionsGrid actions={homeData.actions} />
        <KycBannerCarousel banners={homeData.banners} />
      </ScrollView>
      <BottomTab
        activeTab={activeTab}
        onTabPress={setActiveTab}
        bottomInset={insets.bottom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgBase,
  },
});
