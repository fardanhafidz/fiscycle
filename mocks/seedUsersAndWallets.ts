import type { User, CircularWallet, PointTransaction } from '@/lib/types';

// ============================================================================
// SEED USERS, WALLETS & POINT TRANSACTIONS (DETERMINISTIC)
// ============================================================================

export const SEED_USERS: User[] = [
  {
    id: 'USR-MITRA-01',
    name: 'Budi Santoso',
    email: 'budi@tambakmakmur.id',
    phone: '081234567890',
    role: 'mitra',
    organizationName: 'Tambak Makmur',
    avatarInitials: 'BS',
    farmId: 'FARM-0028',
    partnerTokenVerified: true,
    onboardingCompleted: true,
  },
  {
    id: 'USR-B2B-01',
    name: 'Hendro Wijaya',
    email: 'procurement@abcrestaurant.id',
    phone: '081355550007',
    role: 'b2b',
    organizationName: 'ABC Restaurant',
    avatarInitials: 'AR',
    walletId: 'WAL-0007',
  },
  {
    id: 'USR-B2C-01',
    name: 'Ibu Sari Wulandari',
    email: 'sari.wulandari@gmail.com',
    phone: '081277770012',
    role: 'b2c',
    organizationName: 'Rumah Tangga Surabaya',
    avatarInitials: 'SW',
    walletId: 'WAL-0012',
  },
  {
    id: 'USR-ADMIN-01',
    name: 'Andi Pratama',
    email: 'admin@fiscycle.id',
    phone: '081199990001',
    role: 'admin',
    organizationName: 'Fiscycle Operations',
    avatarInitials: 'AP',
  },
];

export const SEED_ADDRESSES = {
  'USR-B2B-01': 'Jl. Raya Darmo No. 88, Surabaya',
  'USR-B2C-01': 'Jl. Manyar Kertoarjo No. 21, Surabaya',
} as const;

export const SEED_TRANSACTIONS: PointTransaction[] = [
  {
    id: 'PTX-0102',
    walletId: 'WAL-0007',
    type: 'EARN_WASTE',
    pointsDelta: 900,
    rupiahEquivalent: 90000,
    referenceId: 'IN-0040',
    description: 'Setoran Sampah Organik 90 kg (IN-0040)',
    createdAt: '2026-10-28T14:00:00+07:00',
  },
  {
    id: 'PTX-0101',
    walletId: 'WAL-0007',
    type: 'EARN_WASTE',
    pointsDelta: 1260,
    rupiahEquivalent: 126000,
    referenceId: 'IN-0038',
    description: 'Setoran Sampah Organik 126 kg (IN-0038)',
    createdAt: '2026-10-14T10:00:00+07:00',
  },
  {
    id: 'PTX-0103',
    walletId: 'WAL-0007',
    type: 'EARN_WASTE',
    pointsDelta: 420,
    rupiahEquivalent: 42000,
    referenceId: 'IN-0036',
    description: 'Setoran Sampah Organik 42 kg (IN-0036)',
    createdAt: '2026-10-07T09:30:00+07:00',
  },
  {
    id: 'PTX-0104',
    walletId: 'WAL-0012',
    type: 'EARN_WASTE',
    pointsDelta: 450,
    rupiahEquivalent: 45000,
    referenceId: 'IN-0041',
    description: 'Jemput Sampah Dapur 45 kg (IN-0041)',
    createdAt: '2026-10-30T17:00:00+07:00',
  },
];

export const SEED_WALLETS: Record<string, CircularWallet> = {
  'WAL-0007': {
    id: 'WAL-0007',
    userId: 'USR-B2B-01',
    ownerName: 'ABC Restaurant',
    balancePoints: 2580,
    lifetimeEarnedPoints: 2580,
    lifetimeRedeemedPoints: 0,
    totalWasteContributedKg: 258,
    qrCodePayload: 'FISCYCLE:WAL-0007',
    transactions: [
      SEED_TRANSACTIONS[0], // PTX-0102
      SEED_TRANSACTIONS[1], // PTX-0101
      SEED_TRANSACTIONS[2], // PTX-0103
    ],
  },
  'WAL-0012': {
    id: 'WAL-0012',
    userId: 'USR-B2C-01',
    ownerName: 'Ibu Sari Wulandari',
    balancePoints: 450,
    lifetimeEarnedPoints: 450,
    lifetimeRedeemedPoints: 0,
    totalWasteContributedKg: 45,
    qrCodePayload: 'FISCYCLE:WAL-0012',
    transactions: [
      SEED_TRANSACTIONS[3], // PTX-0104
    ],
  },
};
