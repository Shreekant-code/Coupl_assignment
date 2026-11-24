import { COLORS } from '../theme';

export const homeData = {
  profile: {
    primaryName: 'Shagun Kalra',
    secondaryName: 'Khushali Verma',
    primaryInitials: 'SK',
    secondaryInitials: 'KV',
  },
  balance: {
    label: 'Combined Wallet Balance',
    balance: 45000,
    statusText: 'Wallet & Card Active',
    isActive: true,
  },
  card: {
    initials: 'SK',
    cardTitle: 'RUPAY PLATINUM COUPL CARD',
    cardNumber: '3456 5678 2728 6778',
    expiry: '12/28',
    cvv: '234',
    budgetPercent: 60,
    totalDots: 13,
  },
  actions: [
    { id: 'scan_pay', label: 'Scan & Pay', icon: 'scan' },
    { id: 'add_money', label: 'Add Money', icon: 'rupee' },
    { id: 'transfer', label: 'Transfer', icon: 'transfer' },
    { id: 'history', label: 'History', icon: 'history' },
    { id: 'statistics', label: 'Statistics', icon: 'statistics' },
    { id: 'bills', label: 'Bills', icon: 'file' },
    { id: 'card', label: 'Card', icon: 'card' },
    { id: 'more', label: 'More', icon: 'more' },
  ],
  banners: [
    {
      id: 'kyc_status',
      leading: 'KYC Status :',
      trailing: 'Approval pending',
      colors: [COLORS.kycStart, COLORS.kycMiddle, COLORS.kycEnd],
    },
    {
      id: 'rewards_tier',
      leading: 'Rewards :',
      trailing: '1,250 pts available',
      colors: [COLORS.kycStart, COLORS.kycMiddle, COLORS.kycEnd],
    },
    {
      id: 'auto_topup',
      leading: 'Auto Top-up :',
      trailing: 'Set monthly limit',
      colors: [COLORS.kycStart, COLORS.kycMiddle, COLORS.kycEnd],
    },
  ],
};
