'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Static asset constants from Figma Node 35:5387
const imgFishPond1 = '/images/desktop-fish-pond1.png';
const imgFishPond2 = '/images/desktop-fish-pond2.png';
const imgFishPond3 = '/images/desktop-fish-pond3.png';
const imgChevronDown = '/images/desktop-chevron-down.svg';
const imgBell = '/images/desktop-bell.svg';
const imgWaves = '/images/desktop-waves.svg';
const imgCircleCheck = '/images/desktop-circle-check.svg';
const imgTriangleAlert = '/images/desktop-triangle-alert.svg';
const imgCircleAlert = '/images/desktop-circle-alert.svg';
const imgCircleAlert1 = '/images/desktop-circle-alert1.svg';
const imgChevronRight = '/images/desktop-chevron-right.svg';
const imgCircleAlert2 = '/images/desktop-circle-alert2.svg';
const imgLightbulb1 = '/images/desktop-lightbulb1.svg';
const imgCircleCheck1 = '/images/desktop-circle-check1.svg';
const imgChevronRight1 = '/images/desktop-chevron-right1.svg';
const imgTriangleAlert1 = '/images/desktop-triangle-alert1.svg';
const imgCircleCheck2 = '/images/desktop-circle-check2.svg';
const imgCircle = '/images/desktop-circle.svg';
const imgCircleAlert3 = '/images/desktop-circle-alert3.svg';
const imgDroplet = '/images/desktop-droplet.svg';
const imgThermometer = '/images/desktop-thermometer.svg';
const imgWind = '/images/desktop-wind.svg';
const imgThermometer1 = '/images/desktop-thermometer1.svg';
const imgFlaskConical = '/images/desktop-flask-conical.svg';
const imgCircleAlert4 = '/images/desktop-circle-alert4.svg';
const imgTriangleAlert2 = '/images/desktop-triangle-alert2.svg';
const imgCircleCheck3 = '/images/desktop-circle-check3.svg';
const imgClock = '/images/desktop-clock.svg';
const imgChevronRight2 = '/images/desktop-chevron-right2.svg';
const imgChartNoAxesColumnIncreasing = '/images/desktop-chart-column.svg';
const imgChartNoAxesColumnIncreasing1 = '/images/desktop-chart-column1.svg';
const imgHandshake = '/images/desktop-handshake.svg';
const imgServer1 = '/images/desktop-server1.svg';

export default function FiscycleDesktopDashboard() {
  const [alertHandled, setAlertHandled] = useState(false);
  const [taskCompletedList, setTaskCompletedList] = useState<number[]>([0]); // 0 is completed

  const toggleTask = (index: number) => {
    if (taskCompletedList.includes(index)) {
      setTaskCompletedList(taskCompletedList.filter((i) => i !== index));
    } else {
      setTaskCompletedList([...taskCompletedList, index]);
    }
  };

  return (
    <div
      className="bg-[#f3f9fc] content-stretch flex flex-col gap-[14px] items-start overflow-x-hidden p-[24px] relative w-full select-none"
      data-node-id="35:5387"
      data-name="Fiscycle · Desktop dashboard"
    >
      {/* Dashboard header */}
      <div
        className="content-stretch flex h-[64px] items-start justify-between relative shrink-0 w-full"
        data-node-id="35:5444"
        data-name="Dashboard header"
      >
        <div
          className="content-stretch flex flex-col gap-[4px] items-start overflow-clip relative shrink-0"
          data-node-id="35:5445"
          data-name="Farm greeting"
        >
          <h1
            className="font-extrabold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[25px] whitespace-nowrap"
            data-node-id="35:5446"
          >
            Halo, Budi! 👋
          </h1>
          <div
            className="content-stretch flex gap-[7px] items-center overflow-clip relative shrink-0"
            data-node-id="35:5447"
            data-name="Farm selector"
          >
            <p
              className="font-semibold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[12px] whitespace-nowrap"
              data-node-id="35:5448"
            >
              Tambak Makmur
            </p>
            <div className="relative shrink-0 size-[14px]" data-node-id="35:5893" data-name="chevron-down">
              <Image
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgChevronDown}
                width={14}
                height={14}
              />
            </div>
          </div>
          <div
            className="content-stretch flex gap-[14px] items-center overflow-clip relative shrink-0"
            data-node-id="35:5450"
            data-name="Farm metadata"
          >
            <p
              className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[9px] whitespace-nowrap"
              data-node-id="35:5451"
            >
              ⌖ MITRA FSC-FARM-0028
            </p>
            <div
              className="bg-[#14b97c] relative rounded-[100px] shrink-0 size-[6px]"
              data-node-id="35:5452"
              data-name="Connection indicator"
            />
            <p
              className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[9px] whitespace-nowrap"
              data-node-id="35:5453"
            >
              Data sensor diperbarui 2 menit lalu
            </p>
          </div>
        </div>

        <div
          className="content-stretch flex gap-[17px] items-center overflow-clip relative shrink-0"
          data-node-id="35:5454"
          data-name="Account controls"
        >
          <div
            className="content-stretch flex h-[30px] items-center overflow-clip relative shrink-0 w-[28px] cursor-pointer"
            data-node-id="35:5455"
            data-name="Notifications"
            onClick={() => alert('Notifikasi: Kolam 2 memerlukan perhatian segera')}
          >
            <div className="relative shrink-0 size-[22px]" data-node-id="35:5896" data-name="bell">
              <Image
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgBell}
                width={22}
                height={22}
              />
            </div>
            <div
              className="absolute bg-[#f34860] left-[17px] rounded-[100px] size-[8px] top-0"
              data-node-id="35:5457"
              data-name="Unread indicator"
            />
          </div>
          <div
            className="bg-[#e7eff4] h-[25px] relative shrink-0 w-px"
            data-node-id="35:5458"
            data-name="Account separator"
          />
          <div
            className="bg-[#00629b] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[34px]"
            data-node-id="35:5459"
            data-name="Avatar"
          >
            <p
              className="font-bold leading-[1.35] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap"
              data-node-id="35:5460"
            >
              B
            </p>
          </div>
          <p
            className="font-semibold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[11px] whitespace-nowrap"
            data-node-id="35:5461"
          >
            Budi Santoso
          </p>
          <div className="relative shrink-0 size-[14px]" data-node-id="35:5899" data-name="chevron-down">
            <Image
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgChevronDown}
              width={14}
              height={14}
            />
          </div>
        </div>
      </div>

      {/* Farm summary (4 cards) */}
      <div
        className="content-stretch flex gap-[14px] items-start overflow-clip relative shrink-0 w-full"
        data-node-id="35:5463"
        data-name="Farm summary"
      >
        <div
          className="bg-white content-stretch flex flex-[1_0_0] gap-[16px] h-[72px] items-center min-w-px overflow-clip p-[16px] relative rounded-[10px] border border-[#e7eff4]"
          data-node-id="35:5464"
          data-name="Summary metric"
        >
          <div
            className="bg-[#e2f3fc] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[44px]"
            data-node-id="35:5465"
            data-name="Metric symbol"
          >
            <div className="relative shrink-0 size-[24px]" data-node-id="35:5902" data-name="waves">
              <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgWaves} width={24} height={24} />
            </div>
          </div>
          <div
            className="content-stretch flex flex-col items-start leading-[1.35] not-italic overflow-clip relative shrink-0 text-[#173251] whitespace-nowrap"
            data-node-id="35:5467"
            data-name="Metric information"
          >
            <p className="font-bold relative shrink-0 text-[28px]" data-node-id="35:5468">
              6
            </p>
            <p className="font-normal relative shrink-0 text-[#8192a5] text-[12px]" data-node-id="35:5469">
              Total Kolam
            </p>
          </div>
        </div>

        <div
          className="bg-white content-stretch flex flex-[1_0_0] gap-[16px] h-[72px] items-center min-w-px overflow-clip p-[16px] relative rounded-[10px] border border-[#e7eff4]"
          data-node-id="35:5470"
          data-name="Summary metric"
        >
          <div
            className="bg-[#e5f8ef] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[44px]"
            data-node-id="35:5471"
            data-name="Metric symbol"
          >
            <div className="relative shrink-0 size-[24px]" data-node-id="35:5905" data-name="circle-check">
              <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgCircleCheck} width={24} height={24} />
            </div>
          </div>
          <div
            className="content-stretch flex flex-col items-start leading-[1.35] not-italic overflow-clip relative shrink-0 text-[#173251] whitespace-nowrap"
            data-node-id="35:5473"
            data-name="Metric information"
          >
            <p className="font-bold relative shrink-0 text-[28px]" data-node-id="35:5474">
              4
            </p>
            <p className="font-normal relative shrink-0 text-[#8192a5] text-[12px]" data-node-id="35:5475">
              Kondisi Baik
            </p>
          </div>
        </div>

        <div
          className="bg-white content-stretch flex flex-[1_0_0] gap-[16px] h-[72px] items-center min-w-px overflow-clip p-[16px] relative rounded-[10px] border border-[#e7eff4]"
          data-node-id="35:5476"
          data-name="Summary metric"
        >
          <div
            className="bg-[#fff3df] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[44px]"
            data-node-id="35:5477"
            data-name="Metric symbol"
          >
            <div className="relative shrink-0 size-[24px]" data-node-id="35:5908" data-name="triangle-alert">
              <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgTriangleAlert} width={24} height={24} />
            </div>
          </div>
          <div
            className="content-stretch flex flex-col items-start leading-[1.35] not-italic overflow-clip relative shrink-0 text-[#173251] whitespace-nowrap"
            data-node-id="35:5479"
            data-name="Metric information"
          >
            <p className="font-bold relative shrink-0 text-[28px]" data-node-id="35:5480">
              1
            </p>
            <p className="font-normal relative shrink-0 text-[#8192a5] text-[12px]" data-node-id="35:5481">
              Perlu Perhatian
            </p>
          </div>
        </div>

        <div
          className="bg-white content-stretch flex flex-[1_0_0] gap-[16px] h-[72px] items-center min-w-px overflow-clip p-[16px] relative rounded-[10px] border border-[#e7eff4]"
          data-node-id="35:5482"
          data-name="Summary metric"
        >
          <div
            className="bg-[#fdebea] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[44px]"
            data-node-id="35:5483"
            data-name="Metric symbol"
          >
            <div className="relative shrink-0 size-[24px]" data-node-id="35:5911" data-name="circle-alert">
              <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgCircleAlert} width={24} height={24} />
            </div>
          </div>
          <div
            className="content-stretch flex flex-col items-start leading-[1.35] not-italic overflow-clip relative shrink-0 text-[#173251] whitespace-nowrap"
            data-node-id="35:5485"
            data-name="Metric information"
          >
            <p className="font-bold relative shrink-0 text-[28px]" data-node-id="35:5486">
              1
            </p>
            <p className="font-normal relative shrink-0 text-[#8192a5] text-[12px]" data-node-id="35:5487">
              Kritis
            </p>
          </div>
        </div>
      </div>

      {/* Pond monitoring and tasks */}
      <div
        className="content-stretch flex gap-[14px] items-start overflow-clip relative shrink-0 w-full"
        data-node-id="35:5488"
        data-name="Pond monitoring and tasks"
      >
        <div
          className="content-stretch flex flex-[1_0_0] flex-col gap-[14px] items-start min-w-px overflow-clip relative"
          data-node-id="35:5489"
          data-name="Pond monitoring"
        >
          {/* Urgent pond alert */}
          {!alertHandled && (
            <div
              className="bg-[#fdebea] content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[16px] relative rounded-[10px] shrink-0 w-full border border-rose-200"
              data-node-id="35:5490"
              data-name="Urgent pond alert"
            >
              <div
                className="content-stretch flex gap-[7px] items-center overflow-clip relative shrink-0 w-full"
                data-node-id="35:5491"
                data-name="Alert heading"
              >
                <div className="relative shrink-0 size-[19px]" data-node-id="35:5914" data-name="circle-alert">
                  <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgCircleAlert1} width={19} height={19} />
                </div>
                <p
                  className="font-extrabold leading-[1.35] not-italic relative shrink-0 text-[#f34860] text-[12px] whitespace-nowrap"
                  data-node-id="35:5493"
                >
                  PERLU DITANGANI SEKARANG
                </p>
                <div
                  className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px overflow-clip relative"
                  data-node-id="35:5494"
                  data-name="Alert disclosure"
                >
                  <div className="relative shrink-0 size-[16px]" data-node-id="35:5917" data-name="chevron-right">
                    <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronRight} width={16} height={16} />
                  </div>
                </div>
              </div>

              <div
                className="content-stretch flex gap-[14px] items-start overflow-clip relative shrink-0 w-full"
                data-node-id="35:5496"
                data-name="Alert details"
              >
                <div
                  className="h-[99px] relative rounded-[6px] shrink-0 w-[112px] overflow-hidden"
                  data-node-id="35:5497"
                  data-name="Fish pond"
                >
                  <Image
                    alt="Kolam 2"
                    className="absolute inset-0 object-cover pointer-events-none rounded-[6px] size-full"
                    src={imgFishPond1}
                    fill
                    sizes="112px"
                  />
                </div>
                <div
                  className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-w-px overflow-clip relative"
                  data-node-id="35:5498"
                  data-name="Critical reading"
                >
                  <div
                    className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0"
                    data-node-id="35:5499"
                    data-name="Pond identity"
                  >
                    <p
                      className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[16px] whitespace-nowrap"
                      data-node-id="35:5500"
                    >
                      Kolam 2
                    </p>
                    <div
                      className="bg-[#fdebea] content-stretch flex gap-[4px] items-center overflow-clip px-[5px] py-[2px] relative rounded-[100px] shrink-0"
                      data-node-id="35:5501"
                      data-name="Pond status"
                    >
                      <div className="relative shrink-0 size-[11px]" data-node-id="35:5920" data-name="circle-alert">
                        <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgCircleAlert2} width={11} height={11} />
                      </div>
                      <p
                        className="font-semibold leading-[1.35] not-italic relative shrink-0 text-[#f34860] text-[9px] whitespace-nowrap"
                        data-node-id="35:5503"
                      >
                        Kritis
                      </p>
                    </div>
                  </div>
                  <p
                    className="font-semibold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[13px] whitespace-nowrap"
                    data-node-id="35:5504"
                  >
                    Kadar oksigen air rendah
                  </p>
                  <p
                    className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[9px] whitespace-nowrap"
                    data-node-id="35:5505"
                  >
                    Oksigen (DO)
                  </p>
                  <p
                    className="font-bold not-italic relative shrink-0 text-[#f34860] whitespace-nowrap"
                    data-node-id="35:5506"
                  >
                    <span className="leading-[1.35] text-[24px]">3,2 </span>
                    <span className="leading-[1.35] text-[11px]">mg/L ↓</span>
                  </p>
                </div>

                <div
                  className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative shrink-0 w-[292px]"
                  data-node-id="35:5507"
                  data-name="Suggested response"
                >
                  <div
                    className="bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col gap-[4px] items-start overflow-clip p-[10px] relative rounded-[6px] shrink-0 w-full border border-rose-100"
                    data-node-id="35:5508"
                    data-name="Quick suggestion"
                  >
                    <div
                      className="content-stretch flex gap-[7px] items-start overflow-clip relative shrink-0"
                      data-node-id="35:5509"
                      data-name="Suggestion label"
                    >
                      <div className="relative shrink-0 size-[16px]" data-node-id="35:5923" data-name="lightbulb">
                        <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgLightbulb1} width={16} height={16} />
                      </div>
                      <p
                        className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[12px] whitespace-nowrap"
                        data-node-id="35:5511"
                      >
                        Saran Singkat
                      </p>
                    </div>
                    <p
                      className="font-normal leading-[1.35] min-w-full not-italic relative shrink-0 text-[#173251] text-[10px] w-[min-content]"
                      data-node-id="35:5512"
                    >
                      Tingkatkan aerasi sekarang dan kurangi pemberian pakan sementara.
                    </p>
                  </div>
                  <div
                    className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full"
                    data-node-id="35:5513"
                    data-name="Alert actions"
                  >
                    <Link
                      href="/desktop/insights"
                      className="bg-[#00629b] border border-[#00629b] border-solid content-stretch flex flex-[1_0_0] h-[36px] items-center justify-center min-w-px overflow-clip relative rounded-[6px] hover:bg-[#005282] transition"
                      data-node-id="35:5514"
                      data-name="Action"
                    >
                      <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap">
                        Lihat Analisis
                      </p>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setAlertHandled(true)}
                      className="bg-white border border-[#a9c9db] border-solid content-stretch flex flex-[1_0_0] h-[36px] items-center justify-center min-w-px overflow-clip relative rounded-[6px] hover:bg-sky-50 transition cursor-pointer"
                      data-node-id="35:5516"
                      data-name="Action"
                    >
                      <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#00629b] text-[11px] whitespace-nowrap">
                        Tandai Ditangani
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All ponds cards */}
          <div
            className="bg-white content-stretch flex flex-col gap-[9px] items-start overflow-clip p-[12px] relative rounded-[10px] shrink-0 w-full border border-[#e7eff4]"
            data-node-id="35:5518"
            data-name="All ponds"
          >
            <div
              className="content-stretch flex items-center justify-between leading-[1.35] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap"
              data-node-id="35:5519"
              data-name="Section heading"
            >
              <p className="font-bold relative shrink-0 text-[#173251] text-[14px]" data-node-id="35:5520">
                Kondisi Semua Kolam
              </p>
              <Link
                href="/desktop/farms"
                className="font-semibold relative shrink-0 text-[#4d94c2] text-[10px] hover:underline"
                data-node-id="35:5521"
              >
                Lihat Semua Kolam →
              </Link>
            </div>

            <div
              className="content-stretch flex gap-[7px] items-start overflow-clip relative shrink-0 w-full"
              data-node-id="35:5522"
              data-name="Pond cards"
            >
              {/* Kolam 1 */}
              <div
                className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip p-[8px] relative rounded-[6px] border border-[#e7eff4]"
                data-node-id="35:5523"
                data-name="Pond card"
              >
                <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                  <div className="h-[48px] relative rounded-[6px] shrink-0 w-[45px] overflow-hidden">
                    <Image alt="" src={imgFishPond2} fill className="object-cover" sizes="45px" />
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px overflow-clip relative">
                    <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[12px] whitespace-nowrap">
                      Kolam 1
                    </p>
                    <div className="bg-[#e5f8ef] content-stretch flex gap-[4px] items-center overflow-clip px-[5px] py-[2px] relative rounded-[100px] shrink-0">
                      <div className="relative shrink-0 size-[11px]">
                        <Image alt="" src={imgCircleCheck1} width={11} height={11} />
                      </div>
                      <p className="font-semibold leading-[1.35] not-italic relative shrink-0 text-[#14b97c] text-[9px] whitespace-nowrap">
                        Baik
                      </p>
                    </div>
                    <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[8px] whitespace-nowrap">
                      Nila · Hari ke-35
                    </p>
                  </div>
                  <div className="relative shrink-0 size-[12px]">
                    <Image alt="" src={imgChevronRight1} width={12} height={12} />
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[2px] items-start leading-[1.35] not-italic overflow-clip relative shrink-0 text-[10px] w-full pt-1">
                  <div className="content-stretch flex gap-[5px] items-start overflow-clip relative shrink-0 w-full">
                    <p className="font-normal relative shrink-0 text-[#8192a5] w-[45px]">pH</p>
                    <p className="font-medium relative shrink-0 text-[#173251]">7,4</p>
                  </div>
                  <div className="content-stretch flex gap-[5px] items-start overflow-clip relative shrink-0 w-full">
                    <p className="font-normal relative shrink-0 text-[#8192a5] w-[45px]">Suhu</p>
                    <p className="font-medium relative shrink-0 text-[#173251]">28,1 °C</p>
                  </div>
                  <div className="content-stretch flex gap-[5px] items-start overflow-clip relative shrink-0 w-full">
                    <p className="font-normal relative shrink-0 text-[#8192a5] w-[45px]">DO</p>
                    <p className="font-medium relative shrink-0 text-[#173251]">6,2 mg/L</p>
                  </div>
                </div>
                <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[8px] whitespace-nowrap pt-1">
                  Diperbarui 2 menit lalu
                </p>
              </div>

              {/* Kolam 2 */}
              <div
                className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip p-[8px] relative rounded-[6px] border border-[#e7eff4]"
                data-node-id="35:5544"
                data-name="Pond card"
              >
                <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                  <div className="h-[48px] relative rounded-[6px] shrink-0 w-[45px] overflow-hidden">
                    <Image alt="" src={imgFishPond2} fill className="object-cover" sizes="45px" />
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px overflow-clip relative">
                    <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[12px] whitespace-nowrap">
                      Kolam 2
                    </p>
                    <div className="bg-[#fdebea] content-stretch flex gap-[4px] items-center overflow-clip px-[5px] py-[2px] relative rounded-[100px] shrink-0">
                      <div className="relative shrink-0 size-[11px]">
                        <Image alt="" src={imgCircleAlert2} width={11} height={11} />
                      </div>
                      <p className="font-semibold leading-[1.35] not-italic relative shrink-0 text-[#f34860] text-[9px] whitespace-nowrap">
                        Kritis
                      </p>
                    </div>
                    <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[8px] whitespace-nowrap">
                      Nila · Hari ke-35
                    </p>
                  </div>
                  <div className="relative shrink-0 size-[12px]">
                    <Image alt="" src={imgChevronRight1} width={12} height={12} />
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[2px] items-start leading-[1.35] not-italic overflow-clip relative shrink-0 text-[10px] w-full pt-1">
                  <div className="content-stretch flex gap-[5px] items-start overflow-clip relative shrink-0 w-full">
                    <p className="font-normal relative shrink-0 text-[#8192a5] w-[45px]">pH</p>
                    <p className="font-medium relative shrink-0 text-[#173251]">7,1</p>
                  </div>
                  <div className="content-stretch flex gap-[5px] items-start overflow-clip relative shrink-0 w-full">
                    <p className="font-normal relative shrink-0 text-[#8192a5] w-[45px]">Suhu</p>
                    <p className="font-medium relative shrink-0 text-[#173251]">29,4 °C</p>
                  </div>
                  <div className="content-stretch flex gap-[5px] items-start overflow-clip relative shrink-0 w-full">
                    <p className="font-normal relative shrink-0 text-[#8192a5] w-[45px]">DO</p>
                    <p className="font-medium relative shrink-0 text-[#f34860]">3,2 mg/L</p>
                  </div>
                </div>
                <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[8px] whitespace-nowrap pt-1">
                  Diperbarui 2 menit lalu
                </p>
              </div>

              {/* Kolam 3 */}
              <div
                className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip p-[8px] relative rounded-[6px] border border-[#e7eff4]"
                data-node-id="35:5565"
                data-name="Pond card"
              >
                <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                  <div className="h-[48px] relative rounded-[6px] shrink-0 w-[45px] overflow-hidden">
                    <Image alt="" src={imgFishPond2} fill className="object-cover" sizes="45px" />
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px overflow-clip relative">
                    <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[12px] whitespace-nowrap">
                      Kolam 3
                    </p>
                    <div className="bg-[#fff3df] content-stretch flex gap-[4px] items-center overflow-clip px-[5px] py-[2px] relative rounded-[100px] shrink-0">
                      <div className="relative shrink-0 size-[11px]">
                        <Image alt="" src={imgTriangleAlert1} width={11} height={11} />
                      </div>
                      <p className="font-semibold leading-[1.35] not-italic relative shrink-0 text-[#f69b23] text-[9px] whitespace-nowrap">
                        Perhatian
                      </p>
                    </div>
                    <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[8px] whitespace-nowrap">
                      Nila · Hari ke-35
                    </p>
                  </div>
                  <div className="relative shrink-0 size-[12px]">
                    <Image alt="" src={imgChevronRight1} width={12} height={12} />
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[2px] items-start leading-[1.35] not-italic overflow-clip relative shrink-0 text-[10px] w-full pt-1">
                  <div className="content-stretch flex gap-[5px] items-start overflow-clip relative shrink-0 w-full">
                    <p className="font-normal relative shrink-0 text-[#8192a5] w-[45px]">pH</p>
                    <p className="font-medium relative shrink-0 text-[#173251]">7,6</p>
                  </div>
                  <div className="content-stretch flex gap-[5px] items-start overflow-clip relative shrink-0 w-full">
                    <p className="font-normal relative shrink-0 text-[#8192a5] w-[45px]">Suhu</p>
                    <p className="font-medium relative shrink-0 text-[#173251]">28,9 °C</p>
                  </div>
                  <div className="content-stretch flex gap-[5px] items-start overflow-clip relative shrink-0 w-full">
                    <p className="font-normal relative shrink-0 text-[#8192a5] w-[45px]">DO</p>
                    <p className="font-medium relative shrink-0 text-[#173251]">4,1 mg/L</p>
                  </div>
                </div>
                <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[8px] whitespace-nowrap pt-1">
                  Diperbarui 2 menit lalu
                </p>
              </div>

              {/* Kolam 4 */}
              <div
                className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip p-[8px] relative rounded-[6px] border border-[#e7eff4]"
                data-node-id="35:5586"
                data-name="Pond card"
              >
                <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                  <div className="h-[48px] relative rounded-[6px] shrink-0 w-[45px] overflow-hidden">
                    <Image alt="" src={imgFishPond2} fill className="object-cover" sizes="45px" />
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px overflow-clip relative">
                    <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[12px] whitespace-nowrap">
                      Kolam 4
                    </p>
                    <div className="bg-[#e5f8ef] content-stretch flex gap-[4px] items-center overflow-clip px-[5px] py-[2px] relative rounded-[100px] shrink-0">
                      <div className="relative shrink-0 size-[11px]">
                        <Image alt="" src={imgCircleCheck1} width={11} height={11} />
                      </div>
                      <p className="font-semibold leading-[1.35] not-italic relative shrink-0 text-[#14b97c] text-[9px] whitespace-nowrap">
                        Baik
                      </p>
                    </div>
                    <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[8px] whitespace-nowrap">
                      Nila · Hari ke-35
                    </p>
                  </div>
                  <div className="relative shrink-0 size-[12px]">
                    <Image alt="" src={imgChevronRight1} width={12} height={12} />
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[2px] items-start leading-[1.35] not-italic overflow-clip relative shrink-0 text-[10px] w-full pt-1">
                  <div className="content-stretch flex gap-[5px] items-start overflow-clip relative shrink-0 w-full">
                    <p className="font-normal relative shrink-0 text-[#8192a5] w-[45px]">pH</p>
                    <p className="font-medium relative shrink-0 text-[#173251]">7,2</p>
                  </div>
                  <div className="content-stretch flex gap-[5px] items-start overflow-clip relative shrink-0 w-full">
                    <p className="font-normal relative shrink-0 text-[#8192a5] w-[45px]">Suhu</p>
                    <p className="font-medium relative shrink-0 text-[#173251]">28,4 °C</p>
                  </div>
                  <div className="content-stretch flex gap-[5px] items-start overflow-clip relative shrink-0 w-full">
                    <p className="font-normal relative shrink-0 text-[#8192a5] w-[45px]">DO</p>
                    <p className="font-medium relative shrink-0 text-[#173251]">5,8 mg/L</p>
                  </div>
                </div>
                <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[8px] whitespace-nowrap pt-1">
                  Diperbarui 2 menit lalu
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily checklist */}
        <div
          className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[252px]"
          data-node-id="35:5607"
          data-name="Daily checklist"
        >
          <div
            className="bg-white content-stretch flex flex-col gap-[11px] items-start overflow-clip p-[14px] relative rounded-[10px] w-full border border-[#e7eff4]"
            data-node-id="35:5608"
            data-name="Today’s tasks"
          >
            <div
              className="content-stretch flex items-start justify-between leading-[1.35] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap"
              data-node-id="35:5609"
              data-name="Section heading"
            >
              <p className="font-bold relative shrink-0 text-[#173251] text-[14px]">
                Tugas Hari Ini
              </p>
              <p className="font-normal relative shrink-0 text-[#8192a5] text-[9px]">
                {taskCompletedList.length} / 5 selesai
              </p>
            </div>

            {[
              { task: 'Pemberian pakan Kolam 1', time: '08.00', critical: false },
              { task: 'Pemberian pakan Kolam 2', time: '10.30', critical: false },
              { task: 'Cek kualitas Kolam 3', time: '11.00', critical: false },
              { task: 'Tinjau rekomendasi Kolam 2', time: 'Sekarang', critical: true },
              { task: 'Cek ketersediaan pakan', time: 'Sore hari', critical: false },
            ].map((t, idx) => {
              const isChecked = taskCompletedList.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleTask(idx)}
                  className="content-stretch flex gap-[9px] items-center overflow-clip relative shrink-0 w-full cursor-pointer hover:bg-slate-50 p-1 rounded-sm"
                  data-name="Task"
                >
                  <div className="relative shrink-0 size-[17px]">
                    <Image
                      alt=""
                      src={
                        isChecked
                          ? imgCircleCheck2
                          : t.critical
                          ? imgCircleAlert3
                          : imgCircle
                      }
                      width={17}
                      height={17}
                    />
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start leading-[1.35] min-w-px not-italic overflow-clip relative">
                    <p
                      className={`font-medium min-w-full relative shrink-0 text-[10px] ${
                        isChecked ? 'line-through text-[#8192a5]' : 'text-[#173251]'
                      }`}
                    >
                      {t.task}
                    </p>
                    <p
                      className={`font-normal relative shrink-0 text-[9px] whitespace-nowrap ${
                        t.critical && !isChecked ? 'text-[#f34860] font-semibold' : 'text-[#8192a5]'
                      }`}
                    >
                      {t.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Water insights */}
      <div
        className="content-stretch flex gap-[14px] items-start relative shrink-0 w-full"
        data-node-id="35:5637"
        data-name="Water insights"
      >
        {/* Kualitas Air Hari Ini */}
        <div
          className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px overflow-clip p-[13px] relative rounded-[10px] border border-[#e7eff4]"
          data-node-id="35:5638"
          data-name="Water quality today"
        >
          <div
            className="content-stretch flex items-center justify-between leading-[1.35] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap"
            data-node-id="35:5639"
            data-name="Section heading"
          >
            <p className="font-bold relative shrink-0 text-[#173251] text-[14px]">
              Kualitas Air Hari Ini
            </p>
            <Link
              href="/desktop/insights"
              className="font-semibold relative shrink-0 text-[#4d94c2] text-[10px] hover:underline"
            >
              Lihat Detail →
            </Link>
          </div>

          <div
            className="content-stretch flex gap-[22px] items-start overflow-clip relative shrink-0 w-full"
            data-name="Water quality columns"
          >
            {/* Col 1 */}
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-start min-w-px overflow-clip relative">
              {/* pH */}
              <div className="content-stretch flex gap-[9px] items-center overflow-clip relative shrink-0 w-full">
                <div className="bg-[#e2f3fc] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[33px]">
                  <div className="relative shrink-0 size-[20px]">
                    <Image alt="" src={imgDroplet} width={20} height={20} />
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative">
                  <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[10px] whitespace-nowrap">
                    pH
                  </p>
                  <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[9px] whitespace-nowrap">
                    5 dari 6 kolam optimal
                  </p>
                  <div className="bg-[#e6f0f4] content-stretch flex h-[4px] items-start overflow-clip relative rounded-[10px] shrink-0 w-full">
                    <div className="bg-[#14b97c] h-[4px] relative rounded-[10px] shrink-0 w-[83%]" />
                  </div>
                </div>
              </div>

              {/* Suhu */}
              <div className="content-stretch flex gap-[9px] items-center overflow-clip relative shrink-0 w-full">
                <div className="bg-[#e2f3fc] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[33px]">
                  <div className="relative shrink-0 size-[20px]">
                    <Image alt="" src={imgThermometer} width={20} height={20} />
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative">
                  <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[10px] whitespace-nowrap">
                    Suhu
                  </p>
                  <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[9px] whitespace-nowrap">
                    Semua kolam normal
                  </p>
                  <div className="bg-[#e6f0f4] content-stretch flex h-[4px] items-start overflow-clip relative rounded-[10px] shrink-0 w-full">
                    <div className="bg-[#14b97c] h-[4px] relative rounded-[10px] shrink-0 w-[100%]" />
                  </div>
                </div>
              </div>

              {/* DO */}
              <div className="content-stretch flex gap-[9px] items-center overflow-clip relative shrink-0 w-full">
                <div className="bg-[#fdebea] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[33px]">
                  <div className="relative shrink-0 size-[20px]">
                    <Image alt="" src={imgWind} width={20} height={20} />
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative">
                  <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[10px] whitespace-nowrap">
                    Oksigen Air (DO)
                  </p>
                  <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[9px] whitespace-nowrap">
                    1 kolam kritis
                  </p>
                  <div className="bg-[#e6f0f4] content-stretch flex h-[4px] items-start overflow-clip relative rounded-[10px] shrink-0 w-full">
                    <div className="bg-[#f34860] h-[4px] relative rounded-[10px] shrink-0 w-[40%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Col 2 */}
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-start min-w-px overflow-clip relative">
              {/* Kekeruhan */}
              <div className="content-stretch flex gap-[9px] items-center overflow-clip relative shrink-0 w-full">
                <div className="bg-[#fff3df] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[33px]">
                  <div className="relative shrink-0 size-[20px]">
                    <Image alt="" src={imgThermometer1} width={20} height={20} />
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative">
                  <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[10px] whitespace-nowrap">
                    Kekeruhan
                  </p>
                  <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[9px] whitespace-nowrap">
                    1 kolam perlu perhatian
                  </p>
                  <div className="bg-[#e6f0f4] content-stretch flex h-[4px] items-start overflow-clip relative rounded-[10px] shrink-0 w-full">
                    <div className="bg-[#f69b23] h-[4px] relative rounded-[10px] shrink-0 w-[55%]" />
                  </div>
                </div>
              </div>

              {/* Nitrit & Amonia */}
              <div className="content-stretch flex gap-[9px] items-center overflow-clip relative shrink-0 w-full">
                <div className="bg-[#f3eaff] content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[33px]">
                  <div className="relative shrink-0 size-[20px]">
                    <Image alt="" src={imgFlaskConical} width={20} height={20} />
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative">
                  <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[10px] whitespace-nowrap">
                    Nitrit & Amonia
                  </p>
                  <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[9px] whitespace-nowrap">
                    1 kolam meningkat
                  </p>
                  <div className="bg-[#e6f0f4] content-stretch flex h-[4px] items-start overflow-clip relative rounded-[10px] shrink-0 w-full">
                    <div className="bg-[#14b97c] h-[4px] relative rounded-[10px] shrink-0 w-[65%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rekomendasi untuk Tambakmu */}
        <div
          className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip p-[12px] relative rounded-[10px] border border-[#e7eff4]"
          data-node-id="35:5685"
          data-name="Recommendations for your farm"
        >
          <div
            className="content-stretch flex items-center justify-between leading-[1.35] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap"
            data-node-id="35:5686"
            data-name="Section heading"
          >
            <p className="font-bold relative shrink-0 text-[#173251] text-[14px]">
              Rekomendasi untuk Tambakmu
            </p>
            <Link
              href="/desktop/insights"
              className="font-semibold relative shrink-0 text-[#4d94c2] text-[10px] hover:underline"
            >
              Lihat Detail →
            </Link>
          </div>

          <div className="bg-[#fff1f2] content-stretch flex gap-[9px] items-center overflow-clip px-[9px] py-[6px] relative rounded-[6px] shrink-0 w-full border border-rose-100">
            <div className="relative shrink-0 size-[21px]">
              <Image alt="" src={imgCircleAlert4} width={21} height={21} />
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start leading-[1.35] min-w-px not-italic overflow-clip relative text-[#173251]">
              <p className="font-bold relative shrink-0 text-[10px]">Kolam 2</p>
              <p className="font-normal relative shrink-0 text-[9px]">Tingkatkan aerasi sekarang.</p>
            </div>
          </div>

          <div className="bg-[#fff7e9] content-stretch flex gap-[9px] items-center overflow-clip px-[9px] py-[6px] relative rounded-[6px] shrink-0 w-full border border-amber-100">
            <div className="relative shrink-0 size-[21px]">
              <Image alt="" src={imgTriangleAlert2} width={21} height={21} />
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start leading-[1.35] min-w-px not-italic overflow-clip relative text-[#173251]">
              <p className="font-bold relative shrink-0 text-[10px]">Kolam 3</p>
              <p className="font-normal relative shrink-0 text-[9px]">
                Periksa kekeruhan air, amati sisa pakan di dasar.
              </p>
            </div>
          </div>

          <div className="bg-[#edfaf5] content-stretch flex gap-[9px] items-center overflow-clip px-[9px] py-[6px] relative rounded-[6px] shrink-0 w-full border border-emerald-100">
            <div className="relative shrink-0 size-[21px]">
              <Image alt="" src={imgCircleCheck3} width={21} height={21} />
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-px items-start leading-[1.35] min-w-px not-italic overflow-clip relative text-[#173251]">
              <p className="font-bold relative shrink-0 text-[10px]">Kolam 1</p>
              <p className="font-normal relative shrink-0 text-[9px]">
                Kondisi stabil, pertahankan jadwal pakan seperti biasa.
              </p>
            </div>
          </div>

          <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[8px] whitespace-nowrap pt-1">
            Rekomendasi diperbarui mengikuti data sensor dan aktivitas tambak.
          </p>
        </div>
      </div>

      {/* Farm operations */}
      <div
        className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full"
        data-node-id="35:5705"
        data-name="Farm operations"
      >
        {/* Pakan & Pertumbuhan */}
        <div
          className="bg-white content-stretch flex flex-col gap-[6px] items-start overflow-clip p-[12px] relative rounded-[10px] shrink-0 w-[395px] border border-[#e7eff4]"
          data-node-id="35:5706"
          data-name="Feed and growth"
        >
          <div
            className="content-stretch flex items-center justify-between leading-[1.35] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap"
            data-node-id="35:5707"
            data-name="Section heading"
          >
            <p className="font-bold relative shrink-0 text-[#173251] text-[14px]">Pakan & Pertumbuhan</p>
            <Link
              href="/desktop/feed"
              className="font-semibold relative shrink-0 text-[#4d94c2] text-[10px] hover:underline"
            >
              Lihat Detail →
            </Link>
          </div>

          <div
            className="content-stretch flex gap-[18px] items-start overflow-clip relative shrink-0 w-full"
            data-name="Feed and growth columns"
          >
            {/* Feed inventory */}
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-w-px overflow-clip relative">
              <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[11px] whitespace-nowrap">
                Pakan Hari Ini
              </p>
              <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[9px] whitespace-nowrap">
                3 dari 5 jadwal selesai
              </p>
              <div className="bg-[#e5f8ef] content-stretch flex h-[6px] items-start overflow-clip relative rounded-[6px] shrink-0 w-full">
                <div className="bg-[#14b97c] h-[6px] relative rounded-[6px] shrink-0 w-[60%]" />
              </div>
              <p className="font-semibold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[10px] whitespace-nowrap pt-1">
                Jadwal Berikutnya
              </p>
              <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0">
                <div className="relative shrink-0 size-[22px]">
                  <Image alt="" src={imgClock} width={22} height={22} />
                </div>
                <div className="content-stretch flex flex-col items-start leading-[1.35] not-italic overflow-clip relative shrink-0 whitespace-nowrap">
                  <p className="font-semibold relative shrink-0 text-[#173251] text-[10px]">
                    Kolam 2
                  </p>
                  <p className="font-normal relative shrink-0 text-[#8192a5] text-[9px]">
                    10.30 · 4 kg
                  </p>
                </div>
                <div className="relative shrink-0 size-[14px]">
                  <Image alt="" src={imgChevronRight2} width={14} height={14} />
                </div>
              </div>
            </div>

            {/* Growth summary */}
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px overflow-clip relative">
              <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[11px] whitespace-nowrap">
                Pertumbuhan
              </p>
              <div className="bg-[#e5f8ef] content-stretch flex gap-[7px] items-start overflow-clip p-[4px] relative rounded-[4px] shrink-0 w-full">
                <div className="relative shrink-0 size-[18px]">
                  <Image alt="" src={imgChartNoAxesColumnIncreasing} width={18} height={18} />
                </div>
                <div className="content-stretch flex flex-col items-start leading-[1.35] not-italic overflow-clip relative shrink-0 whitespace-nowrap">
                  <p className="font-semibold relative shrink-0 text-[#173251] text-[9px]">Kolam 1</p>
                  <p className="font-normal relative shrink-0 text-[#14b97c] text-[8px]">Sesuai target</p>
                </div>
              </div>
              <div className="bg-[#fff3df] content-stretch flex gap-[7px] items-start overflow-clip p-[4px] relative rounded-[4px] shrink-0 w-full">
                <div className="relative shrink-0 size-[18px]">
                  <Image alt="" src={imgChartNoAxesColumnIncreasing1} width={18} height={18} />
                </div>
                <div className="content-stretch flex flex-col items-start leading-[1.35] not-italic overflow-clip relative shrink-0 whitespace-nowrap">
                  <p className="font-semibold relative shrink-0 text-[#173251] text-[9px]">Kolam 2</p>
                  <p className="font-normal relative shrink-0 text-[#f69b23] text-[8px]">Perlu perhatian</p>
                </div>
              </div>
              <div className="bg-[#e5f8ef] content-stretch flex gap-[7px] items-start overflow-clip p-[4px] relative rounded-[4px] shrink-0 w-full">
                <div className="relative shrink-0 size-[18px]">
                  <Image alt="" src={imgChartNoAxesColumnIncreasing} width={18} height={18} />
                </div>
                <div className="content-stretch flex flex-col items-start leading-[1.35] not-italic overflow-clip relative shrink-0 whitespace-nowrap">
                  <p className="font-semibold relative shrink-0 text-[#173251] text-[9px]">Kolam 3</p>
                  <p className="font-normal relative shrink-0 text-[#14b97c] text-[8px]">Sesuai target</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panen Terdekat */}
        <div
          className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px overflow-clip p-[12px] relative rounded-[10px] border border-[#e7eff4]"
          data-node-id="35:5740"
          data-name="Upcoming harvest"
        >
          <div
            className="content-stretch flex items-center justify-between leading-[1.35] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap"
            data-node-id="35:5741"
            data-name="Section heading"
          >
            <p className="font-bold relative shrink-0 text-[#173251] text-[14px]">Panen Terdekat</p>
            <Link
              href="/desktop/harvest"
              className="font-semibold relative shrink-0 text-[#4d94c2] text-[10px] hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>

          <div
            className="content-stretch flex gap-[9px] items-start overflow-clip relative shrink-0 w-full pt-1"
            data-name="Harvest details"
          >
            <div className="h-[74px] relative rounded-[6px] shrink-0 w-[55px] overflow-hidden">
              <Image alt="" src={imgFishPond3} fill className="object-cover" sizes="55px" />
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start leading-[1.35] min-w-px not-italic overflow-clip relative whitespace-nowrap">
              <p className="font-bold relative shrink-0 text-[#173251] text-[12px]">Kolam 4</p>
              <p className="font-normal relative shrink-0 text-[#8192a5] text-[9px]">Nila</p>
              <p className="font-semibold relative shrink-0 text-[#173251] text-[10px]">
                15–18 Nov 2026
              </p>
              <p className="font-normal relative shrink-0 text-[#8192a5] text-[9px]">
                Estimasi panen: 1,2 ton
              </p>
              <p className="font-semibold relative shrink-0 text-[#f69b23] text-[9px]">
                Mendekati panen
              </p>
            </div>
          </div>
        </div>

        {/* Peluang Penjualan */}
        <div
          className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px overflow-clip p-[12px] relative rounded-[10px] border border-[#e7eff4]"
          data-node-id="35:5752"
          data-name="Sales opportunities"
        >
          <div
            className="content-stretch flex items-center justify-between leading-[1.35] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap"
            data-node-id="35:5753"
            data-name="Section heading"
          >
            <p className="font-bold relative shrink-0 text-[#173251] text-[14px]">Peluang Penjualan</p>
            <Link
              href="/desktop/harvest"
              className="font-semibold relative shrink-0 text-[#4d94c2] text-[10px] hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full pt-1">
            <div className="relative shrink-0 size-[27px]">
              <Image alt="" src={imgHandshake} width={27} height={27} />
            </div>
            <p className="flex-[1_0_0] font-bold leading-[1.35] min-w-px not-italic relative text-[#173251] text-[11px]">
              Ada kebutuhan pembeli yang cocok
            </p>
          </div>

          <div className="content-stretch flex gap-[14px] items-start leading-[1.35] not-italic overflow-clip relative shrink-0 whitespace-nowrap pt-1">
            <div className="content-stretch flex flex-col gap-[2px] items-start overflow-clip relative shrink-0">
              <p className="font-semibold relative shrink-0 text-[#173251] text-[10px]">Nila</p>
              <p className="font-normal relative shrink-0 text-[#8192a5] text-[9px]">Ukuran 300–500 g</p>
            </div>
            <div className="content-stretch flex flex-col gap-[2px] items-start overflow-clip relative shrink-0">
              <p className="font-normal relative shrink-0 text-[#8192a5] text-[9px]">Dibutuhkan</p>
              <p className="font-bold relative shrink-0 text-[#173251] text-[11px]">500 kg</p>
            </div>
          </div>

          <Link
            href="/desktop/harvest"
            className="bg-white border border-[#a9c9db] border-solid content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[6px] shrink-0 w-full hover:bg-sky-50 transition mt-1"
          >
            <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#00629b] text-[11px] whitespace-nowrap">
              Lihat Kebutuhan Pembeli
            </p>
          </Link>
        </div>

        {/* Status Perangkat */}
        <div
          className="bg-white content-stretch flex flex-col gap-[8px] items-start overflow-clip p-[12px] relative rounded-[10px] shrink-0 w-[204px] border border-[#e7eff4]"
          data-node-id="35:5768"
          data-name="Connected devices"
        >
          <div
            className="content-stretch flex items-center justify-between leading-[1.35] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap"
            data-node-id="35:5769"
            data-name="Section heading"
          >
            <p className="font-bold relative shrink-0 text-[#173251] text-[14px]">Status Perangkat</p>
            <Link
              href="/desktop/devices"
              className="font-semibold relative shrink-0 text-[#4d94c2] text-[10px] hover:underline"
            >
              →
            </Link>
          </div>

          <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 pt-1">
            <div className="relative shrink-0 size-[26px]">
              <Image alt="" src={imgServer1} width={26} height={26} />
            </div>
            <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#14b97c] text-[11px] whitespace-nowrap">
              ● Online
            </p>
          </div>

          <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#173251] text-[11px] whitespace-nowrap">
            6 dari 6 perangkat aktif
          </p>
          <p className="font-normal leading-[1.35] not-italic relative shrink-0 text-[#8192a5] text-[9px] whitespace-nowrap">
            Data terakhir diterima 2 menit lalu
          </p>

          <Link
            href="/desktop/devices"
            className="bg-white border border-[#a9c9db] border-solid content-stretch flex h-[26px] items-center justify-center overflow-clip relative rounded-[6px] shrink-0 w-full hover:bg-sky-50 transition mt-1"
          >
            <p className="font-bold leading-[1.35] not-italic relative shrink-0 text-[#00629b] text-[11px] whitespace-nowrap">
              Lihat Data Perangkat
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
