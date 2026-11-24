import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Heart, History, House, Trophy, WalletCards } from 'lucide-react-native';
import { COLORS } from '../../theme';

const TABS = [
  { name: 'Home', Icon: House },
  { name: 'Wallet', Icon: WalletCards },
  { name: 'History', Icon: History },
  { name: 'Rewards', Icon: Trophy },
  { name: 'Favorites', Icon: Heart },
];

const BottomTab = ({ activeTab = 'Home', onTabPress, bottomInset = 0 }) => (
    <View style={[styles.tabBar, { height: 70 + bottomInset, paddingBottom: bottomInset }]}>
    {TABS.map((tab) => {
      const focused = tab.name === activeTab;
      const color = focused ? COLORS.accentPurpleLight : '#8E8AA3';
      const Icon = tab.Icon;

      return (
        <TouchableOpacity
          key={tab.name}
          style={styles.tabButton}
          onPress={() => onTabPress?.(tab.name)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={tab.name}
          accessibilityState={{ selected: focused }}
        >
          {focused && <LinearGradient pointerEvents="none" colors={['rgba(139,108,240,0)', 'rgba(139,108,240,0.32)']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.activeGlow} />}
          <Icon size={22} color={color} strokeWidth={focused ? 2 : 1.7} />
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.nav,
    height: 70,
    paddingTop: 5,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeGlow: {
    position: 'absolute',
    top: 8,
    width: 70,
    height: 40,
    borderRadius: 24,
  },
});

export default BottomTab;
