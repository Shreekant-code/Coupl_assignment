import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Headset, Zap } from 'lucide-react-native';
import { COLORS } from '../theme';

const ProfileHeader = ({
  primaryName,
  secondaryName,
  primaryInitials,
  secondaryInitials,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatarGroup}>
          <View style={[styles.avatarCircle, styles.leftAvatar]}>
            <Text style={styles.avatarText}>{primaryInitials}</Text>
          </View>
          <View style={[styles.avatarCircle, styles.rightAvatar]}>
            <Text style={styles.avatarText}>{secondaryInitials}</Text>
          </View>
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.primaryName} numberOfLines={1}>
            {primaryName}
          </Text>
          <Text style={styles.secondaryName} numberOfLines={1}>
            {secondaryName}
          </Text>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <View style={styles.iconButton}>
          <Headset
            size={20}
            color={COLORS.textPrimary}
            strokeWidth={1.8}
          />
        </View>

        <View style={styles.flashOuterShadow}>
          <View style={styles.flashButtonWrapper}>
            <LinearGradient
              colors={[
                'rgba(62, 38, 132, 0.52)',
                'rgba(14, 9, 36, 0.94)',
                'rgba(6, 4, 18, 1)',
                'rgba(6, 4, 18, 1)',
              ]}
              locations={[0, 0.36, 0.72, 1]}
              start={{ x: 0.9, y: 0.08 }}
              end={{ x: 0.15, y: 0.95 }}
              style={styles.flashButton}
            >
              {/* Soft inner top-right rim highlight */}
              <LinearGradient
                colors={[
                  'rgba(167, 139, 250, 0.34)',
                  'rgba(124, 92, 235, 0.08)',
                  'rgba(124, 92, 235, 0)',
                ]}
                locations={[0, 0.45, 1]}
                start={{ x: 0.88, y: 0.1 }}
                end={{ x: 0.2, y: 0.85 }}
                pointerEvents="none"
                style={styles.innerTopRightHighlight}
              />

              <View style={styles.iconGlow}>
                <Zap
                  size={18}
                  color="#A384FF"
                  strokeWidth={1.9}
                  fill="#9675FF"
                />
              </View>
            </LinearGradient>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 31,
    paddingBottom: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftAvatar: {
    backgroundColor: COLORS.avatarOne,
    zIndex: 2,
  },
  rightAvatar: {
    backgroundColor: COLORS.avatarTwo,
    marginLeft: -12,
    zIndex: 1,
    borderWidth: 2,
    borderColor: COLORS.bgBase,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  nameContainer: {
    justifyContent: 'center',
    flexShrink: 1,
  },
  primaryName: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  secondaryName: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '400',
    marginTop: 1,
  },
  actionsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconButton: {
    padding: 6,
  },
  flashOuterShadow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#120C34',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 4,
  },
  flashButtonWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(139,108,240,0.5)',
    backgroundColor: '#120C34',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  flashButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  innerTopRightHighlight: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 19,
  },
  iconGlow: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    shadowColor: '#9D7BFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.85,
    shadowRadius: 7,
    elevation: 5,
  },
});

export default ProfileHeader;
