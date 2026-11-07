'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const imgSearch = '/images/admin-search.svg';
const imgBell = '/images/desktop-bell.svg';
const imgChevronDown = '/images/desktop-chevron-down.svg';
const imgDownload = '/images/desktop-download.svg';
const imgPlus = '/images/desktop-plus.svg';
const imgPackage = '/images/desktop-package.svg';
const imgClipboardCheck = '/images/desktop-clipboard-check.svg';
const imgPackageOpen = '/images/desktop-package-open.svg';
const imgClock = '/images/desktop-clock.svg';
const imgFish = '/images/desktop-fish.svg';
const imgWeight = '/images/desktop-weight.svg';
const imgChartNoAxesCombined = '/images/desktop-chart-column.svg';
const imgActualTrend = '/images/desktop-feed-actual-trend.svg';
const imgTargetTrend = '/images/desktop-feed-target-trend.png';
const imgLightbulb = '/images/desktop-lightbulb1.svg';
const imgTriangleAlert = '/images/desktop-triangle-alert.svg';
const imgCircleCheck = '/images/desktop-circle-check.svg';

export default function DesktopFeedPage() {
  const [showLogFeedModal, setShowLogFeedModal] = useState(false);
  const [showSamplingModal, setShowSamplingModal] = useState(false);

  return (
    <div className="p-6 flex flex-col gap-3.5 text-[#173251] max-w-[1224px]">
      {/* Top Bar: Search and Account Controls */}
      <div className="flex h-9 items-center justify-between w-full">
        <div className="flex items-center gap-2 h-8 px-3 rounded-md border border-[#e7eff4] bg-white w-[440px]">
          <Image src={imgSearch} alt="Cari" width={14} height={14} className="opacity-60" />
          <input
            type="text"
            placeholder="Cari kolam, tambak, atau aktivitas..."
            className="w-full text-[11px] bg-transparent outline-none placeholder:text-[#8192a5]"
          />
        </div>

        <div className="flex items-center gap-4 relative">
          <button
            type="button"
            className="relative p-1 hover:bg-[#e2f3fc] rounded-full transition-colors"
            title="Notifikasi"
          >
            <Image src={imgBell} alt="Notifikasi" width={22} height={22} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#f34860]" />
          </button>

          <div className="w-px h-6 bg-[#e7eff4]" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#00629b] flex items-center justify-center text-white font-bold text-xs">
              B
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-bold text-[11px] text-[#173251]">Budi Santoso</span>
              <span className="text-[9px] text-[#8192a5]">Mitra Tambak Makmur</span>
            </div>
            <Image src={imgChevronDown} alt="Menu" width={13} height={13} className="opacity-60 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <p className="text-[10px] text-[#8192a5]">
        Kolam &amp; Ikan &nbsp;›&nbsp; Pakan &amp; Pertumbuhan
      </p>

      {/* Page Heading & Actions */}
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[25px] font-bold text-[#173251] leading-tight">
            Pakan &amp; Pertumbuhan
          </h1>
          <p className="text-[12px] text-[#8192a5]">
            Pantau pemberian pakan dan perkembangan pertumbuhan ikan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert('Mengunduh laporan pakan & pertumbuhan (PDF)...')}
            className="flex items-center gap-2 h-[34px] px-3.5 rounded-md border border-[#a9c9db] bg-white text-[#00629b] font-bold text-[11px] hover:bg-[#e2f3fc] transition-colors"
          >
            <Image src={imgDownload} alt="Unduh" width={14} height={14} />
            <span>Unduh Laporan</span>
          </button>

          <button
            type="button"
            onClick={() => setShowLogFeedModal(true)}
            className="flex items-center gap-2 h-[34px] px-3.5 rounded-md bg-[#00629b] border border-[#00629b] text-white font-bold text-[11px] hover:bg-[#004e7c] transition-colors shadow-sm"
          >
            <Image src={imgPlus} alt="Catat" width={14} height={14} />
            <span>Catat Pakan</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Row 1 (500px) */}
      <div className="grid grid-cols-12 gap-3.5 w-full">
        {/* Left Panel: Pakan (col-span-6 / 570px) */}
        <div className="col-span-6 bg-white rounded-[10px] p-4 flex flex-col justify-between border border-[#e7eff4] shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-[15px] text-[#173251]">Pakan</span>
              <span className="text-[10px] text-[#4d94c2] cursor-pointer hover:underline">
                Hari ini, 8 Okt 2024 &nbsp;‹&nbsp; ›
              </span>
            </div>

            {/* Feed Summary 3 Cards */}
            <div className="grid grid-cols-3 gap-2 mb-3.5">
              <div className="bg-[#e2f3fc] rounded-[8px] p-2.5 flex items-center gap-2">
                <Image src={imgPackage} alt="Total" width={20} height={20} className="shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-[#8192a5]">Total Kebutuhan</span>
                  <span className="text-[18px] font-bold text-[#173251]">320 kg</span>
                </div>
              </div>

              <div className="bg-[#e5f8ef] rounded-[8px] p-2.5 flex items-center gap-2">
                <Image src={imgClipboardCheck} alt="Realisasi" width={20} height={20} className="shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-[#8192a5]">Realisasi</span>
                  <span className="text-[18px] font-bold text-[#173251]">200 kg</span>
                  <span className="text-[8px] text-[#14b97c]">63% dari kebutuhan</span>
                </div>
              </div>

              <div className="bg-[#fdebea] rounded-[8px] p-2.5 flex items-center gap-2">
                <Image src={imgPackageOpen} alt="Sisa" width={20} height={20} className="shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-[#8192a5]">Sisa</span>
                  <span className="text-[18px] font-bold text-[#173251]">120 kg</span>
                </div>
              </div>
            </div>

            {/* Feed Table Heading */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[12px] text-[#173251]">Jadwal &amp; Realisasi Pakan</span>
              <span className="text-[10px] text-[#4d94c2] cursor-pointer hover:underline">
                Semua kolam ⌄
              </span>
            </div>

            {/* Data Table */}
            <div className="w-full text-[11px] border border-[#e7eff4] rounded-md overflow-hidden mb-2">
              <div className="bg-[#f3f9fc] flex items-center px-2.5 py-1.5 text-[10px] font-semibold text-[#8192a5]">
                <div className="w-20">Kolam</div>
                <div className="w-24">Rekomendasi</div>
                <div className="w-16">Pagi</div>
                <div className="w-16">Sore</div>
                <div className="flex-1 text-right">Status</div>
              </div>

              <div className="divide-y divide-[#e7eff4]">
                <div className="flex items-center px-2.5 py-2">
                  <div className="w-20 font-semibold text-[#173251]">Kolam 1</div>
                  <div className="w-24 text-[#173251]">60 kg</div>
                  <div className="w-16 text-[#173251]">30 kg</div>
                  <div className="w-16 text-[#173251]">30 kg</div>
                  <div className="flex-1 flex justify-end">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#e5f8ef] text-[#14b97c] text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#14b97c]" />
                      Selesai
                    </span>
                  </div>
                </div>

                <div className="flex items-center px-2.5 py-2">
                  <div className="w-20 font-semibold text-[#173251]">Kolam 2</div>
                  <div className="w-24 text-[#173251]">40 kg</div>
                  <div className="w-16 text-[#f34860] font-semibold">20 kg</div>
                  <div className="w-16 text-[#8192a5]">—</div>
                  <div className="flex-1 flex justify-end">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#fdebea] text-[#f34860] text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f34860]" />
                      Belum Selesai
                    </span>
                  </div>
                </div>

                <div className="flex items-center px-2.5 py-2">
                  <div className="w-20 font-semibold text-[#173251]">Kolam 3</div>
                  <div className="w-24 text-[#173251]">35 kg</div>
                  <div className="w-16 text-[#173251]">25 kg</div>
                  <div className="w-16 text-[#173251]">10 kg</div>
                  <div className="flex-1 flex justify-end">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#e5f8ef] text-[#14b97c] text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#14b97c]" />
                      Selesai
                    </span>
                  </div>
                </div>

                <div className="flex items-center px-2.5 py-2">
                  <div className="w-20 font-semibold text-[#173251]">Kolam 4</div>
                  <div className="w-24 text-[#173251]">35 kg</div>
                  <div className="w-16 text-[#173251]">35 kg</div>
                  <div className="w-16 text-[#8192a5]">—</div>
                  <div className="flex-1 flex justify-end">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#fdebea] text-[#f34860] text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f34860]" />
                      Belum Selesai
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] text-[#8192a5] mb-2">
              <span>Menampilkan 4 dari 12 kolam</span>
              <span className="text-[#00629b] font-semibold cursor-pointer hover:underline">
                Lihat Semua →
              </span>
            </div>
          </div>

          {/* Attention Box */}
          <div className="bg-[#fff3df] rounded-[6px] p-2.5 flex items-start gap-2 border border-[#fed7d7]">
            <Image src={imgClock} alt="Perhatian" width={18} height={18} className="shrink-0 mt-0.5" />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-[11px] text-[#173251]">2 kolam belum selesai</span>
              <p className="text-[10px] text-[#173251] mt-0.5">
                Pakan Kolam 2 disesuaikan dengan DO. Realisasi Kolam 4 menunggu konfirmasi petugas.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel: Pertumbuhan (col-span-6) */}
        <div className="col-span-6 bg-white rounded-[10px] p-4 flex flex-col justify-between border border-[#e7eff4] shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-[15px] text-[#173251]">Pertumbuhan</span>
              <span className="text-[10px] text-[#4d94c2] cursor-pointer hover:underline">
                Semua Kolam ⌄
              </span>
            </div>

            {/* Growth Metrics */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-[#e5f8ef] rounded-[8px] p-2.5 flex items-center gap-2">
                <Image src={imgFish} alt="Berat" width={20} height={20} className="shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-[#8192a5]">Berat rata-rata</span>
                  <span className="text-[18px] font-bold text-[#173251]">185 gram</span>
                  <span className="text-[8px] text-[#14b97c]">+12% vs minggu lalu</span>
                </div>
              </div>

              <div className="bg-[#e2f3fc] rounded-[8px] p-2.5 flex items-center gap-2">
                <Image src={imgWeight} alt="Biomassa" width={20} height={20} className="shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-[#8192a5]">Biomassa estimasi</span>
                  <span className="text-[18px] font-bold text-[#173251]">8,5 ton</span>
                </div>
              </div>

              <div className="bg-[#e5f8ef] rounded-[8px] p-2.5 flex items-center gap-2">
                <Image src={imgChartNoAxesCombined} alt="Target" width={20} height={20} className="shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-[#8192a5]">Pertumbuhan vs Target</span>
                  <span className="text-[18px] font-bold text-[#173251]">92%</span>
                  <span className="text-[8px] text-[#14b97c]">Sesuai target</span>
                </div>
              </div>
            </div>

            {/* Growth Trend Heading & Chart */}
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[12px] text-[#173251]">
                Tren Pertumbuhan (Berat Rata-rata)
              </span>
              <span className="text-[9px] text-[#8192a5]">8 minggu terakhir</span>
            </div>

            <div className="flex justify-between items-center text-[9px] mb-1">
              <span className="text-[#8192a5]">Berat rata-rata (gram)</span>
              <span className="text-[#00629b] font-medium">— Aktual &nbsp;&nbsp; - - Target</span>
            </div>

            {/* Chart Area (height 145px) */}
            <div className="flex gap-2 items-start w-full">
              <div className="flex flex-col justify-between h-[130px] text-[9px] text-[#8192a5] w-6 shrink-0 text-right pr-1">
                <span>300</span>
                <span>200</span>
                <span>100</span>
                <span>0</span>
              </div>

              <div className="flex-1 h-[130px] relative border-b border-[#e7eff4]">
                <div className="absolute inset-x-0 top-0 border-t border-[#e7eff4]" />
                <div className="absolute inset-x-0 top-[43px] border-t border-[#e7eff4]" />
                <div className="absolute inset-x-0 top-[86px] border-t border-[#e7eff4]" />
                <div className="absolute inset-x-0 bottom-0 border-t border-[#e7eff4]" />

                {/* Target Trend dashed png curve */}
                <div className="absolute inset-0 z-10 flex items-center">
                  <Image
                    src={imgTargetTrend}
                    alt="Target Pertumbuhan"
                    fill
                    className="object-contain opacity-70"
                  />
                </div>

                {/* Actual Trend SVG curve */}
                <div className="absolute inset-0 z-20 flex items-center">
                  <Image
                    src={imgActualTrend}
                    alt="Aktual Pertumbuhan"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Horizontal Weeks */}
            <div className="flex justify-between pl-8 text-[9px] text-[#8192a5] pt-1 mb-2">
              <span>Minggu 1</span>
              <span>Minggu 2</span>
              <span>Minggu 3</span>
              <span>Minggu 4</span>
              <span>Minggu 5</span>
              <span>Minggu 6</span>
              <span>Minggu 7</span>
              <span>Minggu 8</span>
            </div>
          </div>

          {/* Growth Insight Box */}
          <div className="bg-[#fdebea] rounded-[8px] p-3 flex items-start gap-2.5 border border-[#fed7d7]">
            <Image src={imgLightbulb} alt="Insight" width={22} height={22} className="shrink-0 mt-0.5" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[12px] text-[#f34860]">Insight Fiscycle</span>
              <p className="text-[11px] text-[#173251] my-0.5">
                Kurangi pakan sementara pada Kolam 2 karena oksigen air rendah.
              </p>
              <Link href="/desktop/ponds/kolam-2" className="text-[10px] font-semibold text-[#00629b] hover:underline">
                Lihat Detail Kolam 2 →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Workspace Row 2 (183px) */}
      <div className="grid grid-cols-12 gap-3.5 w-full">
        {/* Rekomendasi Pakan per Kolam (col-span-6 / 570px) */}
        <div className="col-span-6 bg-white rounded-[10px] p-4 flex flex-col justify-between border border-[#e7eff4] shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[15px] text-[#173251]">
                Rekomendasi Pakan per Kolam
              </span>
              <span className="text-[10px] text-[#4d94c2] cursor-pointer hover:underline">
                Lihat Semua →
              </span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between p-2 rounded-md bg-[#fff7f7] border border-[#fed7d7]">
                <div className="flex items-center gap-2">
                  <Image src={imgTriangleAlert} alt="Prioritas" width={18} height={18} />
                  <div className="flex flex-col">
                    <span className="font-bold text-[#173251]">Kolam 2 · Kurangi pakan sementara</span>
                    <span className="text-[10px] text-[#8192a5]">
                      DO 2,8 mg/L · Tingkatkan aerasi sebelum pakan berikutnya.
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#fdebea] text-[#f34860] text-[10px] font-semibold">
                  Prioritas
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-md bg-[#f6fdf9] border border-[#d2f4e3]">
                <div className="flex items-center gap-2">
                  <Image src={imgCircleCheck} alt="Stabil" width={18} height={18} />
                  <div className="flex flex-col">
                    <span className="font-bold text-[#173251]">Kolam 1 &amp; Kolam 3 · Pertahankan jadwal</span>
                    <span className="text-[10px] text-[#8192a5]">
                      Pemberian pakan sesuai rencana dan pertumbuhan terpantau.
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#e5f8ef] text-[#14b97c] text-[10px] font-semibold">
                  Stabil
                </span>
              </div>
            </div>
          </div>

          <p className="text-[9px] text-[#8192a5]">
            Rekomendasi mengikuti data sensor dan realisasi pakan terakhir.
          </p>
        </div>

        {/* Sampling Pertumbuhan Terakhir (col-span-6) */}
        <div className="col-span-6 bg-white rounded-[10px] p-4 flex flex-col justify-between border border-[#e7eff4] shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[15px] text-[#173251]">
                Sampling Pertumbuhan Terakhir
              </span>
              <button
                type="button"
                onClick={() => setShowSamplingModal(true)}
                className="text-[10px] text-[#4d94c2] hover:underline cursor-pointer"
              >
                Catat Sampling →
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col justify-center">
                <span className="text-[11px] font-bold text-[#173251]">Kolam 2</span>
                <span className="text-[24px] font-bold text-[#173251] leading-tight my-0.5">
                  120 gram
                </span>
                <span className="text-[10px] text-[#8192a5] mb-1.5">
                  Biomassa estimasi: 480 kg
                </span>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#fff3df] text-[#f69b23] text-[10px] font-semibold w-max">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f69b23]" />
                  Sedikit di bawah target
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] border-l border-[#e7eff4] pl-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#8192a5]">Umur budidaya</span>
                  <span className="font-semibold text-[#173251]">42 hari</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8192a5]">Ukuran target panen</span>
                  <span className="font-semibold text-[#173251]">250–300 gram</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8192a5]">Jadwal sampling</span>
                  <span className="font-semibold text-[#173251]">Setiap 7 hari</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-[#8192a5]">
            Catat bobot ikan secara berkala untuk memperbarui rekomendasi pakan.
          </p>
        </div>
      </div>

      {/* Modal Catat Pakan */}
      {showLogFeedModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 flex flex-col gap-4 border border-[#e7eff4]">
            <div className="flex items-center justify-between border-b border-[#e7eff4] pb-3">
              <h3 className="font-bold text-[16px] text-[#173251]">Catat Realisasi Pemberian Pakan</h3>
              <button
                type="button"
                onClick={() => setShowLogFeedModal(false)}
                className="text-[#8192a5] hover:text-[#173251] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              <div>
                <label className="block font-semibold text-[#173251] mb-1">Pilih Kolam</label>
                <select className="w-full border border-[#e7eff4] rounded-md p-2 text-[#173251] bg-[#f8fbfe]">
                  <option>Kolam 2 (DO 2,8 mg/L - Rekomendasi 20 kg)</option>
                  <option>Kolam 4 (Rekomendasi 35 kg)</option>
                  <option>Kolam 1</option>
                  <option>Kolam 3</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#173251] mb-1">Sesi Pakan</label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" className="p-2 rounded border border-[#00629b] bg-[#e2f3fc] font-bold text-[#00629b]">
                    Pagi (08.00)
                  </button>
                  <button type="button" className="p-2 rounded border border-[#e7eff4] text-[#8192a5]">
                    Sore (16.00)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#173251] mb-1">Jumlah Pakan Diberikan (kg)</label>
                <input
                  type="number"
                  defaultValue="20"
                  className="w-full border border-[#e7eff4] rounded-md p-2 text-[#173251]"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-3 border-t border-[#e7eff4]">
              <button
                type="button"
                onClick={() => setShowLogFeedModal(false)}
                className="px-4 py-2 rounded-md border border-[#a9c9db] text-[#00629b] font-bold text-[12px]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Pakan berhasil dicatat!');
                  setShowLogFeedModal(false);
                }}
                className="px-4 py-2 rounded-md bg-[#00629b] text-white font-bold text-[12px] hover:bg-[#004e7c]"
              >
                Simpan Log Pakan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Catat Sampling */}
      {showSamplingModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 flex flex-col gap-4 border border-[#e7eff4]">
            <div className="flex items-center justify-between border-b border-[#e7eff4] pb-3">
              <h3 className="font-bold text-[16px] text-[#173251]">Catat Sampling Ikan</h3>
              <button
                type="button"
                onClick={() => setShowSamplingModal(false)}
                className="text-[#8192a5] hover:text-[#173251] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              <div>
                <label className="block font-semibold text-[#173251] mb-1">Pilih Kolam</label>
                <select className="w-full border border-[#e7eff4] rounded-md p-2 text-[#173251] bg-[#f8fbfe]">
                  <option>Kolam 2</option>
                  <option>Kolam 1</option>
                  <option>Kolam 3</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#173251] mb-1">Rata-rata Bobot Sampel (Gram/ekor)</label>
                <input
                  type="number"
                  defaultValue="125"
                  className="w-full border border-[#e7eff4] rounded-md p-2 text-[#173251]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#173251] mb-1">Jumlah Sampel Diukur (Ekor)</label>
                <input
                  type="number"
                  defaultValue="30"
                  className="w-full border border-[#e7eff4] rounded-md p-2 text-[#173251]"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-3 border-t border-[#e7eff4]">
              <button
                type="button"
                onClick={() => setShowSamplingModal(false)}
                className="px-4 py-2 rounded-md border border-[#a9c9db] text-[#00629b] font-bold text-[12px]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Sampling berhasil disimpan!');
                  setShowSamplingModal(false);
                }}
                className="px-4 py-2 rounded-md bg-[#00629b] text-white font-bold text-[12px] hover:bg-[#004e7c]"
              >
                Simpan Sampling
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
