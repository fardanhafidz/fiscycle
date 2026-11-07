'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  Search,
  Sparkles,
  ArrowRight,
  Compass,
  Recycle,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import type { Role } from '@/lib/types';

interface ScreenCard {
  no: number;
  title: string;
  category:
    | 'Mobile Auth'
    | 'Mobile Mitra'
    | 'Mobile Admin'
    | 'Desktop Workspace'
    | 'Desktop Admin'
    | 'Browser Frame';
  nodeId: string;
  figmaUrl: string;
  route: string;
  dimensions: string;
  desc: string;
  flowName: string;
  requiredRole?: Role;
}

const SCREENS_DATA: ScreenCard[] = [
  // --- BAGIAN 1: AUTH & ONBOARDING MOBILE (18 SCREENS) ---
  {
    no: 1,
    title: 'Fiscycle · Splash',
    category: 'Mobile Auth',
    nodeId: '9:2522',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=9-2522&m=dev',
    route: '/',
    dimensions: '360x800',
    desc: 'Layar splash pembuka aplikasi dengan logo Fiscycle dan ilustrasi latar akuakultur.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 2,
    title: 'Masuk ke Fiscycle',
    category: 'Mobile Auth',
    nodeId: '9:2562',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=9-2562&m=dev',
    route: '/auth/login',
    dimensions: '360x800',
    desc: 'Halaman autentikasi utama: input nomor HP/WhatsApp, kata sandi, dan Quick Demo Access.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 3,
    title: 'Buat akun Fiscycle',
    category: 'Mobile Auth',
    nodeId: '9:2612',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=9-2612&m=dev',
    route: '/auth/register',
    dimensions: '360x800',
    desc: 'Formulir pendaftaran akun mitra baru dengan input nama lengkap, email, HP, dan kata sandi.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 4,
    title: 'Pilih jenis pengguna',
    category: 'Mobile Auth',
    nodeId: '9:2664',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=9-2664&m=dev',
    route: '/auth/role-select',
    dimensions: '360x800',
    desc: 'Seleksi 4 peran: Usaha/Industri (B2B), Rumah Tangga (B2C), Mitra Tambak, atau Admin.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 5,
    title: 'Pengajuan mitra tambak',
    category: 'Mobile Auth',
    nodeId: '9:2718',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=9-2718&m=dev',
    route: '/auth/mitra',
    dimensions: '360x800',
    desc: 'Gerbang pemilahan mitra: sudah terdaftar (aktivasi token) atau belum terdaftar (isi form).',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 6,
    title: 'Form Pengajuan Calon Mitra',
    category: 'Mobile Auth',
    nodeId: '13:1453',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=13-1453&m=dev',
    route: '/auth/mitra/register',
    dimensions: '360x943',
    desc: 'Formulir detail pengajuan calon mitra: nama tambak, lokasi, luas m², jumlah kolam, dan komoditas.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 7,
    title: 'Pengajuan Berhasil',
    category: 'Mobile Auth',
    nodeId: '13:1530',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=13-1530&m=dev',
    route: '/auth/mitra/submitted',
    dimensions: '360x800',
    desc: 'Konfirmasi pendaftaran berhasil dengan ID Lead otomatis dan estimasi review 1-3 hari.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 8,
    title: 'Status Pengajuan',
    category: 'Mobile Auth',
    nodeId: '13:1567',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=13-1567&m=dev',
    route: '/auth/mitra/status',
    dimensions: '360x800',
    desc: 'Pelacakan linimasa status verifikasi administrasi, survei lapangan, dan kontrak kemitraan.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 9,
    title: 'Masukkan Token Mitra',
    category: 'Mobile Auth',
    nodeId: '18:59',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=18-59&m=dev',
    route: '/auth/mitra/token',
    dimensions: '360x800',
    desc: 'Input token kemitraan (misal: FSC-FARM-0028) dan verifikasi nomor HP terdaftar.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 10,
    title: 'Verifikasi OTP',
    category: 'Mobile Auth',
    nodeId: '18:90',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=18-90&m=dev',
    route: '/auth/mitra/otp',
    dimensions: '360x800',
    desc: 'Verifikasi kode keamanan 4-digit OTP dengan countdown dan auto-verification.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 11,
    title: 'Selamat Datang, Mitra Disetujui',
    category: 'Mobile Auth',
    nodeId: '32:4801',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=32-4801&m=dev',
    route: '/mitra/onboarding',
    dimensions: '360x800',
    desc: 'Sambutan aktivasi akun mitra tambak dengan ringkasan 4 langkah onboarding perangkat IoT.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 12,
    title: 'Data Usaha / Tambak',
    category: 'Mobile Auth',
    nodeId: '32:4847',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=32-4847&m=dev',
    route: '/mitra/onboarding/business',
    dimensions: '360x800',
    desc: 'Konfirmasi profil legalitas usaha tambak, titik koordinat GPS, dan kapasitas lahan.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 13,
    title: 'Data Kolam',
    category: 'Mobile Auth',
    nodeId: '32:4896',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=32-4896&m=dev',
    route: '/mitra/onboarding/ponds',
    dimensions: '360x800',
    desc: 'Inventarisasi kolam budidaya: jenis kolam bundar/terpal, luas m², kedalaman, dan spesies ikan.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 14,
    title: 'Jadwal Instalasi',
    category: 'Mobile Auth',
    nodeId: '32:4964',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=32-4964&m=dev',
    route: '/mitra/onboarding/installation',
    dimensions: '360x800',
    desc: 'Pemilihan tanggal dan sesi waktu kedatangan teknisi IoT Fiscycle ke tambak.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 15,
    title: 'Instalasi Terjadwal',
    category: 'Mobile Auth',
    nodeId: '32:5009',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=32-5009&m=dev',
    route: '/mitra/onboarding/installation?scheduled=true',
    dimensions: '360x800',
    desc: 'Tiket konfirmasi jadwal kunjungan teknisi IoT beserta kontak teknisi lapangan.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 16,
    title: 'Status Instalasi',
    category: 'Mobile Auth',
    nodeId: '32:5080',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=32-5080&m=dev',
    route: '/mitra/onboarding/status',
    dimensions: '360x800',
    desc: 'Checklist progres pemasangan sensor DO, probe pH, gateway LoRaWAN, dan kalibrasi.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 17,
    title: 'Aktivasi Akun',
    category: 'Mobile Auth',
    nodeId: '32:5153',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=32-5153&m=dev',
    route: '/mitra/onboarding/activate',
    dimensions: '360x800',
    desc: 'Pembuatan kata sandi akun mitra dan verifikasi kelayakan operasional tambak.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },
  {
    no: 18,
    title: 'Siap Digunakan',
    category: 'Mobile Auth',
    nodeId: '32:5215',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=32-5215&m=dev',
    route: '/mitra/onboarding/activate?ready=true',
    dimensions: '360x800',
    desc: 'Layar onboarding tuntas: ucapan selamat dan tombol langsung membuka dashboard operasional.',
    flowName: '1. Onboarding & Registrasi Mitra',
  },

  // --- BAGIAN 2: MITRA TAMBAK PHONE WORKSPACE (15 SCREENS) ---
  {
    no: 19,
    title: 'Fiscycle · Phone dashboard',
    category: 'Mobile Mitra',
    nodeId: '35:5236',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=35-5236&m=dev',
    route: '/mitra/dashboard',
    dimensions: '360x1928',
    desc: 'Beranda mitra mobile: ringkasan cuaca, 6 kolam aktif, telemetri sensor, dan insight AI.',
    flowName: '2. Operasional Tambak Mobile',
    requiredRole: 'mitra',
  },
  {
    no: 20,
    title: 'Fiscycle · Phone Daftar Tambak Saya',
    category: 'Mobile Mitra',
    nodeId: '69:73085',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-73085&m=dev',
    route: '/mitra/farms',
    dimensions: '360x3064',
    desc: 'Daftar tambak terkelola mitra, status konektivitas IoT, total luas lahan, dan biomassa hidup.',
    flowName: '2. Operasional Tambak Mobile',
    requiredRole: 'mitra',
  },
  {
    no: 21,
    title: 'Fiscycle · Phone Detail Tambak',
    category: 'Mobile Mitra',
    nodeId: '69:72811',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-72811&m=dev',
    route: '/mitra/farms/FARM-0028',
    dimensions: '360x3690',
    desc: 'Detail lengkap profil Tambak Makmur: koordinat GPS, daftar kolam, gateway IoT, dan unit BSF.',
    flowName: '2. Operasional Tambak Mobile',
    requiredRole: 'mitra',
  },
  {
    no: 22,
    title: 'Fiscycle · Phone Daftar Kolam · Farm flow',
    category: 'Mobile Mitra',
    nodeId: '69:72574',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-72574&m=dev',
    route: '/mitra/ponds',
    dimensions: '360x2504',
    desc: 'Katalog daftar seluruh kolam dengan indikator kualitas air telemetri (pH, Suhu, DO, NTU).',
    flowName: '2. Operasional Tambak Mobile',
    requiredRole: 'mitra',
  },
  {
    no: 23,
    title: 'Fiscycle · Phone Detail Kolam · Farm flow',
    category: 'Mobile Mitra',
    nodeId: '69:72327',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-72327&m=dev',
    route: '/mitra/ponds/POND-02',
    dimensions: '360x2730',
    desc: 'Kondisi telemetri Kolam 2 (Anomali DO 3.2 mg/L), aerasi darurat, dan tombol mitigasi.',
    flowName: '2. Operasional Tambak Mobile',
    requiredRole: 'mitra',
  },
  {
    no: 24,
    title: 'Fiscycle · Phone Tambak & Kolam · Production flow',
    category: 'Mobile Mitra',
    nodeId: '69:71487',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-71487&m=dev',
    route: '/mitra/ponds',
    dimensions: '360x3449',
    desc: 'Perspektif produksi budidaya kolam: fase tebar benur, pembesaran, dan target biomassa.',
    flowName: '2. Operasional Tambak Mobile',
    requiredRole: 'mitra',
  },
  {
    no: 25,
    title: 'Fiscycle · Phone Detail Kolam · Production flow',
    category: 'Mobile Mitra',
    nodeId: '69:71210',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-71210&m=dev',
    route: '/mitra/ponds/POND-04',
    dimensions: '360x2942',
    desc: 'Detail Kolam 4 siap panen: biomassa 520 kg, bobot rata-rata 340g, dan kesiapan kontrak B2B.',
    flowName: '2. Operasional Tambak Mobile',
    requiredRole: 'mitra',
  },
  {
    no: 26,
    title: 'Fiscycle · Phone Siklus Budidaya',
    category: 'Mobile Mitra',
    nodeId: '69:71792',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-71792&m=dev',
    route: '/mitra/cycles',
    dimensions: '360x3035',
    desc: 'Manajemen siklus budidaya: hari ke-82, log sampling mingguan, dan estimasi tanggal panen.',
    flowName: '2. Operasional Tambak Mobile',
    requiredRole: 'mitra',
  },
  {
    no: 27,
    title: 'Fiscycle · Phone Pakan & Pertumbuhan',
    category: 'Mobile Mitra',
    nodeId: '69:70951',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-70951&m=dev',
    route: '/mitra/feed',
    dimensions: '360x3038',
    desc: 'Ransum pakan harian, perbandingan FCR, dan porsi substitusi pakan maggot BSF (35%).',
    flowName: '2. Operasional Tambak Mobile',
    requiredRole: 'mitra',
  },
  {
    no: 28,
    title: 'Fiscycle · Phone BSF & Sirkular',
    category: 'Mobile Mitra',
    nodeId: '69:73655',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-73655&m=dev',
    route: '/mitra/bsf',
    dimensions: '360x6607',
    desc: 'Biokonversi maggot BSF dari limbah organik, penghematan pakan Rp 2.450.000/bulan.',
    flowName: '2. Operasional Tambak Mobile',
    requiredRole: 'mitra',
  },
  {
    no: 29,
    title: 'Fiscycle · Phone Pasar & Penjualan',
    category: 'Mobile Mitra',
    nodeId: '69:75166',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-75166&m=dev',
    route: '/mitra/harvest',
    dimensions: '360x7046',
    desc: 'Bursa penawaran panen Horeka: kontrak ALC-0031 Rp 16.000.000 dari ABC Restaurant.',
    flowName: '2. Operasional Tambak Mobile',
    requiredRole: 'mitra',
  },
  {
    no: 30,
    title: 'Fiscycle · Phone Perangkat',
    category: 'Mobile Mitra',
    nodeId: '69:74781',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-74781&m=dev',
    route: '/mitra/devices',
    dimensions: '360x4500',
    desc: 'Manajemen sensor IoT tambak: Gateway LoRa, Sensor DO, pH, baterai, dan status sinyal.',
    flowName: '2. Operasional Tambak Mobile',
    requiredRole: 'mitra',
  },
  {
    no: 31,
    title: 'Fiscycle · Phone Laporan',
    category: 'Mobile Mitra',
    nodeId: '69:74199',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-74199&m=dev',
    route: '/mitra/reports',
    dimensions: '360x5838',
    desc: 'Laporan analitik budidaya bulanan: grafik kualitas air, mortalitas, dan ekspor data.',
    flowName: '2. Operasional Tambak Mobile',
    requiredRole: 'mitra',
  },
  {
    no: 32,
    title: 'Fiscycle · Phone Ringkasan Produksi',
    category: 'Mobile Mitra',
    nodeId: '69:72068',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-72068&m=dev',
    route: '/mitra/production',
    dimensions: '360x2962',
    desc: 'KPI agregat produksi ikan: tonase total 2.570 kg, efisiensi sirkular, dan survival rate.',
    flowName: '2. Operasional Tambak Mobile',
    requiredRole: 'mitra',
  },
  {
    no: 33,
    title: 'Fiscycle · Phone Insight & Rekomendasi',
    category: 'Mobile Mitra',
    nodeId: '69:73301',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-73301&m=dev',
    route: '/mitra/insights',
    dimensions: '360x4128',
    desc: 'Rekomendasi preskriptif AI: penanganan DO drop malam hari dan adaptasi pakan.',
    flowName: '2. Operasional Tambak Mobile',
    requiredRole: 'mitra',
  },

  // --- BAGIAN 3: ADMIN INTERNAL MOBILE (1 SCREEN) ---
  {
    no: 34,
    title: 'Fiscycle · Phone Admin Internal',
    category: 'Mobile Admin',
    nodeId: '69:70442',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-70442&m=dev',
    route: '/admin/mobile',
    dimensions: '360x5620',
    desc: 'Terminal mobile Admin: verifikasi limbah lapangan, review calon mitra, dan monitor IoT.',
    flowName: '3. Admin Lapangan Mobile',
    requiredRole: 'admin',
  },

  // --- BAGIAN 4: MITRA TAMBAK DESKTOP WORKSPACE (11 SCREENS) ---
  {
    no: 35,
    title: 'Fiscycle · Desktop dashboard',
    category: 'Desktop Workspace',
    nodeId: '35:5387',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=35-5387&m=dev',
    route: '/desktop/dashboard',
    dimensions: '1440x900',
    desc: 'Dashboard operasional widescreen: metrik produksi, bento cards kolam, live stream telemetri air, dan insight AI.',
    flowName: '4. Terminal Desktop Mitra Tambak',
  },
  {
    no: 36,
    title: 'Fiscycle · Tambak & Kolam',
    category: 'Desktop Workspace',
    nodeId: '65:17873',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=65-17873&m=dev',
    route: '/desktop/farms',
    dimensions: '1440x900',
    desc: 'Manajemen grid seluruh kolam tambak, status level aerator, dan filter komoditas terpadu.',
    flowName: '4. Terminal Desktop Mitra Tambak',
  },
  {
    no: 37,
    title: 'Fiscycle · Detail Kolam',
    category: 'Desktop Workspace',
    nodeId: '65:18237',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=65-18237&m=dev',
    route: '/desktop/ponds/POND-01',
    dimensions: '1440x900',
    desc: 'Analisis mendalam telemetri sensor air: multi-parameter DO, suhu, pH, salinitas, dengan grafik interaktif.',
    flowName: '4. Terminal Desktop Mitra Tambak',
  },
  {
    no: 38,
    title: 'Fiscycle · Siklus Budidaya',
    category: 'Desktop Workspace',
    nodeId: '65:17504',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=65-17504&m=dev',
    route: '/desktop/cycles',
    dimensions: '1440x900',
    desc: 'Kanban pelacakan siklus budidaya aktif dari persiapan lahan, tebar benur, pembesaran, hingga panen total.',
    flowName: '4. Terminal Desktop Mitra Tambak',
  },
  {
    no: 39,
    title: 'Fiscycle · Pakan & Pertumbuhan',
    category: 'Desktop Workspace',
    nodeId: '65:18568',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=65-18568&m=dev',
    route: '/desktop/feed',
    dimensions: '1440x900',
    desc: 'Optimalisasi ransum pakan: integrasi pelet maggot BSF protein tinggi, analisis kurva bobot, dan efisiensi FCR.',
    flowName: '4. Terminal Desktop Mitra Tambak',
  },
  {
    no: 40,
    title: 'Fiscycle · BSF & Sirkular',
    category: 'Desktop Workspace',
    nodeId: '55:58235',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=55-58235&m=dev',
    route: '/desktop/bsf',
    dimensions: '1440x900',
    desc: 'Ekosistem biokonversi limbah organik terpadu: batch larva BSF, kalkulator penghematan biaya pakan, dan log substrat.',
    flowName: '4. Terminal Desktop Mitra Tambak',
  },
  {
    no: 41,
    title: 'Fiscycle · Pasar & Penjualan',
    category: 'Desktop Workspace',
    nodeId: '44:4180',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=44-4180&m=dev',
    route: '/desktop/harvest',
    dimensions: '1440x900',
    desc: 'Bursa penjualan hasil panen B2B: permintaan aktif pembeli, order tracking 7 tahap, tren harga komoditas, dan histori invoice.',
    flowName: '4. Terminal Desktop Mitra Tambak',
  },
  {
    no: 42,
    title: 'Fiscycle · Perangkat',
    category: 'Desktop Workspace',
    nodeId: '55:57234',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=55-57234&m=dev',
    route: '/desktop/devices',
    dimensions: '1440x900',
    desc: 'Pusat komando telemetri IoT armada tambak: monitoring stasiun probe DO, gateway LoRaWAN, status baterai, dan tiket perbaikan.',
    flowName: '4. Terminal Desktop Mitra Tambak',
  },
  {
    no: 43,
    title: 'Fiscycle · Laporan',
    category: 'Desktop Workspace',
    nodeId: '55:57667',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=55-57667&m=dev',
    route: '/desktop/reports',
    dimensions: '1440x900',
    desc: 'Reporting engine eksekutif: laporan bulanan/tahunan performa budidaya, audit sertifikasi CBIB, dan ekspor instan.',
    flowName: '4. Terminal Desktop Mitra Tambak',
  },
  {
    no: 44,
    title: 'Fiscycle · Ringkasan Produksi',
    category: 'Desktop Workspace',
    nodeId: '65:17197',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=65-17197&m=dev',
    route: '/desktop/production',
    dimensions: '1440x900',
    desc: 'Matriks produksi komparatif 3 kolom: penanganan darurat DO rendah, siklus kolam aktif, dan jadwal panen terdekat.',
    flowName: '4. Terminal Desktop Mitra Tambak',
  },
  {
    no: 45,
    title: 'Fiscycle · Insight & Rekomendasi',
    category: 'Desktop Workspace',
    nodeId: '55:58809',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=55-58809&m=dev',
    route: '/desktop/insights',
    dimensions: '1440x900',
    desc: 'Engine rekomendasi cerdas AI Agronomist: deteksi dini anomali DO, checklist tindakan mitigasi, dan korelasi cuaca.',
    flowName: '4. Terminal Desktop Mitra Tambak',
  },

  // --- BAGIAN 5: ADMIN INTERNAL DESKTOP (1 SCREEN) ---
  {
    no: 46,
    title: 'Fiscycle · Admin Internal',
    category: 'Desktop Admin',
    nodeId: '69:2719',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=69-2719&m=dev',
    route: '/admin/dashboard',
    dimensions: '1440x900',
    desc: 'Pusat kendali internal admin Fiscycle: pita pipeline 11 tahapan akuisisi mitra, verifikasi timbangan limbah organik, dan audit telemetri.',
    flowName: '5. Hub Admin Internal Desktop',
    requiredRole: 'admin',
  },

  // --- BAGIAN 6: BROWSER WINDOW ONBOARDING (1 SCREEN) ---
  {
    no: 47,
    title: 'Browser window',
    category: 'Browser Frame',
    nodeId: '3:1027',
    figmaUrl: 'https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?node-id=3-1027&m=dev',
    route: '/desktop/browser',
    dimensions: '1440x900',
    desc: 'Mockup window browser desktop untuk antarmuka onboarding dan inisialisasi akun mitra melalui peramban web.',
    flowName: '6. Browser Setup Onboarding',
  },
];

interface CircularFlowCard {
  role: 'B2B' | 'B2C' | 'Admin';
  title: string;
  route: string;
  desc: string;
  tag: string;
  requiredRole: Role;
}

const CIRCULAR_FLOWS: CircularFlowCard[] = [
  {
    role: 'B2B',
    title: 'B2B Resto: Beranda & Pasokan',
    route: '/b2b/dashboard',
    desc: 'Pusat kendali restoran: saldo poin sirkular, histori pasokan ikan nila, dan jadwal pengiriman.',
    tag: 'Workspace 2',
    requiredRole: 'b2b',
  },
  {
    role: 'B2B',
    title: 'B2B Resto: Setor Limbah Dapur (IN-0045)',
    route: '/b2b/waste',
    desc: 'Formulir penjemputan limbah organik dapur komersial untuk konversi pakan larva BSF.',
    tag: 'Golden Thread 1',
    requiredRole: 'b2b',
  },
  {
    role: 'B2B',
    title: 'B2B Resto: Pengadaan Ikan (ORD-0241)',
    route: '/b2b/procurement',
    desc: 'Pemesanan 500 kg ikan nila segar dengan redeem saldo 3.000 poin sirkular (-Rp 300.000).',
    tag: 'Golden Thread 4',
    requiredRole: 'b2b',
  },
  {
    role: 'B2B',
    title: 'B2B Resto: Dompet Poin Sirkular',
    route: '/b2b/wallet',
    desc: 'Buku besar transaksi poin sirkular: kredit setor limbah dan debit diskon pembelian ikan.',
    tag: 'Finansial Sirkular',
    requiredRole: 'b2b',
  },
  {
    role: 'B2C',
    title: 'B2C Rumah Tangga: Beranda Belanja',
    route: '/b2c',
    desc: 'Katalog belanja ikan segar ramah lingkungan untuk konsumen rumah tangga.',
    tag: 'Workspace 3',
    requiredRole: 'b2c',
  },
  {
    role: 'B2C',
    title: 'B2C Rumah Tangga: Setor Sampah Organik',
    route: '/b2c/waste',
    desc: 'Setor sisa sayur & buah rumah tangga untuk dikonversi menjadi poin reward belanja.',
    tag: 'Sirkularitas Warga',
    requiredRole: 'b2c',
  },
  {
    role: 'B2C',
    title: 'B2C Rumah Tangga: Dompet Poin',
    route: '/b2c/points',
    desc: 'Saldo tabungan poin hijau warga dari kontribusi pilah sampah organik.',
    tag: 'Reward Warga',
    requiredRole: 'b2c',
  },
  {
    role: 'Admin',
    title: 'Admin: Verifikasi Limbah (Langkah 2)',
    route: '/admin/waste',
    desc: 'Inspeksi kualitas limbah dapur B2B, penimbangan aktual, dan kredit +420 poin ke dompet.',
    tag: 'Golden Thread 2',
    requiredRole: 'admin',
  },
  {
    role: 'Admin',
    title: 'Admin: Orkestrasi Pasokan Panen (Skor 96%)',
    route: '/admin/supply',
    desc: 'Pencocokan cerdas AI pesanan Horeka dengan stok biomassa kolam siap panen (ALC-0031).',
    tag: 'Golden Thread 5',
    requiredRole: 'admin',
  },
  {
    role: 'Admin',
    title: 'Admin: Pipeline CRM 11 Tahap',
    route: '/admin/leads',
    desc: 'Manajemen pipa akuisisi calon mitra tambak hingga penerbitan token kemitraan resmi.',
    tag: 'CRM Kemitraan',
    requiredRole: 'admin',
  },
];

export default function ShowcaseFlowNavigatorPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const { quickLoginAsRole } = useAuthStore();

  const categories = [
    'Semua',
    'Mobile Auth',
    'Mobile Mitra',
    'Mobile Admin',
    'Desktop Workspace',
    'Desktop Admin',
    'Browser Frame',
  ];

  const filteredScreens = SCREENS_DATA.filter((s) => {
    const matchesCat =
      selectedCategory === 'Semua' ? true : s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      s.nodeId.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      s.route.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      s.flowName.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#f0f4f8] min-h-screen text-[#163252] font-sans antialiased pb-24">
      {/* Top Header Banner */}
      <header className="bg-[#163252] text-white py-10 px-6 md:px-12 border-b border-[#1c4b75] shadow-md">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1c74a7]/40 text-[#8ed8f8] rounded-full text-xs font-bold mb-3 border border-white/10">
                <Sparkles className="size-3.5" />
                <span>Seluruh 47 Screen Figma Ter-slice 100% · Tanpa Slop · Bebas 404</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Fiscycle Showcase &amp; Interactive Flow Navigator
              </h1>
              <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                Navigasikan seluruh <strong>47 screen resmi Figma</strong> serta alur ekonomi sirkular B2B, B2C, dan Admin Internal. Klik langsung untuk menguji setiap layar secara independen maupun terintegrasi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="https://www.figma.com/design/vf4fdtTzNjzygSqgWpDQAP/Untitled?m=dev"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-[#00B4D8] hover:bg-[#0096c7] text-[#163252] font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
              >
                <span>Buka Figma Dev Mode (Page 1)</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-8 pt-6 border-t border-white/15 text-center">
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
              <p className="text-[10.5px] text-slate-300">Total Screen Figma</p>
              <p className="text-xl font-extrabold text-white mt-0.5">47</p>
              <p className="text-[9.5px] text-[#8ed8f8] font-bold">100% Selesai</p>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
              <p className="text-[10.5px] text-slate-300">Auth &amp; Onboarding</p>
              <p className="text-xl font-extrabold text-white mt-0.5">18</p>
              <p className="text-[9.5px] text-emerald-400 font-bold">Mobile</p>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
              <p className="text-[10.5px] text-slate-300">Mitra Phone</p>
              <p className="text-xl font-extrabold text-white mt-0.5">15</p>
              <p className="text-[9.5px] text-emerald-400 font-bold">Operasional</p>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
              <p className="text-[10.5px] text-slate-300">Mitra Desktop</p>
              <p className="text-xl font-extrabold text-white mt-0.5">11</p>
              <p className="text-[9.5px] text-emerald-400 font-bold">Widescreen</p>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
              <p className="text-[10.5px] text-slate-300">Admin Internal</p>
              <p className="text-xl font-extrabold text-white mt-0.5">2</p>
              <p className="text-[9.5px] text-emerald-400 font-bold">Desktop + Phone</p>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
              <p className="text-[10.5px] text-slate-300">Sirkular B2B/B2C</p>
              <p className="text-xl font-extrabold text-white mt-0.5">10</p>
              <p className="text-[9.5px] text-amber-300 font-bold">Ekosistem</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1280px] mx-auto px-6 md:px-12 mt-8 space-y-8">
        {/* Search & Category Tabs */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const count =
                cat === 'Semua'
                  ? SCREENS_DATA.length
                  : SCREENS_DATA.filter((s) => s.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#163252] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Cari ID node, nama screen, route..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#00629b] focus:bg-white transition"
            />
          </div>
        </div>

        {/* 47 Figma Screens Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-[#163252] flex items-center gap-2">
              <Compass className="size-5 text-[#00629b]" />
              <span>Daftar 47 Screen Resmi Figma</span>
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              Menampilkan {filteredScreens.length} dari {SCREENS_DATA.length} screen
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredScreens.map((screen) => (
              <div
                key={screen.no}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-[#00629b] hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="bg-[#ebf8fa] text-[#00629b] font-mono text-[10.5px] font-bold px-2 py-0.5 rounded-md">
                      #{screen.no.toString().padStart(2, '0')} · {screen.nodeId}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {screen.dimensions}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#163252] mt-2 group-hover:text-[#00629b] transition">
                    {screen.title}
                  </h3>
                  <p className="text-[11.5px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {screen.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={screen.figmaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10.5px] font-semibold text-slate-400 hover:text-slate-700 flex items-center gap-1 transition"
                  >
                    <span>Figma</span>
                    <ExternalLink className="size-3" />
                  </a>

                  <Link
                    href={screen.route}
                    onClick={() => {
                      if (screen.requiredRole) {
                        quickLoginAsRole(screen.requiredRole);
                      }
                    }}
                    className="bg-[#163252] group-hover:bg-[#00629b] text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition text-[11px]"
                  >
                    <span>Buka Screen</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ekosistem Sirkular B2B, B2C & Admin Section */}
        <div className="bg-gradient-to-br from-[#163252] to-[#00566b] text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-[#a1f3de] font-mono text-xs font-bold mb-2">
                <Recycle className="size-3.5" />
                <span>Alur Ekonomi Sirkular Fiscycle</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white">
                Workspace B2B, B2C &amp; Admin Internal
              </h2>
              <p className="text-xs text-white/80 mt-1 max-w-2xl">
                Layar pendukung ekosistem budidaya sirkular yang terhubung langsung dengan dompet poin, pengolahan pakan maggot BSF, dan pencocokan pasokan Horeka.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CIRCULAR_FLOWS.map((flow) => (
              <div
                key={flow.route}
                className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-[#a1f3de]">
                      {flow.tag}
                    </span>
                    <span className="font-mono text-[10.5px] font-bold text-white/80">
                      {flow.role}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-2 group-hover:text-[#a1f3de] transition">
                    {flow.title}
                  </h3>
                  <p className="text-[11px] text-white/75 mt-1 leading-relaxed">
                    {flow.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-white/50 truncate max-w-[150px]">
                    {flow.route}
                  </span>
                  <Link
                    href={flow.route}
                    onClick={() => quickLoginAsRole(flow.requiredRole)}
                    className="bg-white text-[#163252] hover:bg-[#a1f3de] font-bold px-3 py-1 rounded-lg text-[11px] flex items-center gap-1 transition"
                  >
                    <span>Masuk</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
