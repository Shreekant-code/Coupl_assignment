import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

const BalanceSection = ({
  label,
  balance,
  statusText,
  isActive,
}) => {
  const formattedBalance = Number(balance || 0).toLocaleString('en-IN');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.balanceText}>{String.fromCharCode(8377)} {formattedBalance}</Text>
      <Text
        style={[
          styles.statusText,
          { color: isActive ? COLORS.success : COLORS.textMuted },
        ]}
      >
        {statusText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 18,
    paddingHorizontal: 20,
  },
  label: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  balanceText: {
    color: COLORS.textPrimary,
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -0.5,
    fontVariant: ['tabular-nums'],
    textShadowColor: 'rgba(139, 108, 240, 0.18)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
    letterSpacing: 0.2,
  },
});

export default BalanceSection;
