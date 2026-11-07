'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PengajuanBerhasil() {
  return (
    <div
      className="w-full min-h-screen bg-white flex flex-col justify-between pb-8 select-none"
      data-node-id="13:1530"
      data-name="Pengajuan Berhasil"
    >
      <div className="flex flex-col gap-[20px] items-center pt-[28px] px-[20px] w-full" data-node-id="13:1537">
        {/* Submission Received Illustration */}
        <div
          className="relative w-[238px] h-[166px] overflow-hidden"
          data-node-id="13:1538"
          data-name="Submission received illustration"
        >
          {/* Halo */}
          <div className="absolute inset-[10.84%_24.79%_14.46%_23.11%] pointer-events-none">
            <Image
              src="/images/illustration-halo.svg"
              alt=""
              fill
              unoptimized
              className="object-contain"
            />
          </div>

          {/* Confetti */}
          <div className="absolute inset-[10.24%_9.66%_10.84%_10.92%] pointer-events-none">
            <Image
              src="/images/illustration-confetti.svg"
              alt=""
              fill
              unoptimized
              className="object-contain"
            />
          </div>

          {/* Envelope Back */}
          <div className="absolute inset-[14.46%_24.37%_19.28%_23.53%] pointer-events-none">
            <Image
              src="/images/illustration-envelope-back.svg"
              alt=""
              fill
              unoptimized
              className="object-contain"
            />
          </div>

          {/* Letter */}
          <div className="absolute inset-[22.89%_31.93%_33.13%_30.25%] pointer-events-none animate-bounce duration-1000">
            <Image
              src="/images/illustration-letter.svg"
              alt=""
              fill
              unoptimized
              className="object-contain"
            />
          </div>

          {/* Envelope Front */}
          <div className="absolute inset-[40.96%_24.37%_18.07%_23.53%] pointer-events-none">
            <Image
              src="/images/illustration-envelope-front.svg"
              alt=""
              fill
              unoptimized
              className="object-contain"
            />
          </div>

          {/* Success Badge */}
          <div className="absolute inset-[54.22%_16.39%_10.24%_60.08%] pointer-events-none">
            <Image
              src="/images/illustration-success-badge.svg"
              alt=""
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <div
          className="text-center font-bold text-[#163252] text-[25px] leading-[1.15] font-sans"
          data-node-id="13:1539"
        >
          <p className="mb-0">Pengajuan Berhasil</p>
          <p>Dikirim!</p>
        </div>

        {/* Subtitle */}
        <p
          className="font-normal text-[#8492a2] text-[13.5px] leading-[1.4] text-center font-sans max-w-[320px]"
          data-node-id="13:1540"
        >
          Data kamu sudah kami terima. Tim kemitraan akan menghubungimu untuk
          mengenal kebutuhan dan kondisi tambakmu.
        </p>

        {/* Next Steps Box */}
        <div
          className="bg-[#e5f5fd] flex flex-col gap-[16px] items-start p-[18px] rounded-[9px] w-full"
          data-node-id="13:1541"
          data-name="Next steps"
        >
          <p
            className="font-bold text-[#163252] text-[15.5px] font-sans"
            data-node-id="13:1542"
          >
            Apa yang terjadi selanjutnya?
          </p>

          <div className="flex flex-col gap-[14px] w-full">
            {/* Step 1 */}
            <div className="flex gap-[12px] items-center" data-node-id="13:1543">
              <div
                className="bg-[#cfeefc] flex items-center justify-center rounded-full shrink-0 size-[23px]"
                data-node-id="13:1544"
              >
                <span className="font-bold text-[#288db9] text-[13px] font-sans">
                  1
                </span>
              </div>
              <p
                className="font-normal text-[#8492a2] text-[12.5px] leading-[1.35] font-sans flex-1"
                data-node-id="13:1546"
              >
                Tim kami meninjau data kamu.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex gap-[12px] items-center" data-node-id="13:1547">
              <div
                className="bg-[#cfeefc] flex items-center justify-center rounded-full shrink-0 size-[23px]"
                data-node-id="13:1548"
              >
                <span className="font-bold text-[#288db9] text-[13px] font-sans">
                  2
                </span>
              </div>
              <p
                className="font-normal text-[#8492a2] text-[12.5px] leading-[1.35] font-sans flex-1"
                data-node-id="13:1550"
              >
                Kami akan menghubungi kamu lewat telepon / WhatsApp.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex gap-[12px] items-center" data-node-id="13:1551">
              <div
                className="bg-[#cfeefc] flex items-center justify-center rounded-full shrink-0 size-[23px]"
                data-node-id="13:1552"
              >
                <span className="font-bold text-[#288db9] text-[13px] font-sans">
                  3
                </span>
              </div>
              <p
                className="font-normal text-[#8492a2] text-[12.5px] leading-[1.35] font-sans flex-1"
                data-node-id="13:1554"
              >
                Jika perlu, kami melakukan diskusi lanjutan atau site assessment.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex gap-[12px] items-center" data-node-id="13:1555">
              <div
                className="bg-[#cfeefc] flex items-center justify-center rounded-full shrink-0 size-[23px]"
                data-node-id="13:1556"
              >
                <span className="font-bold text-[#288db9] text-[13px] font-sans">
                  4
                </span>
              </div>
              <p
                className="font-normal text-[#8492a2] text-[12.5px] leading-[1.35] font-sans flex-1"
                data-node-id="13:1558"
              >
                Kamu akan menerima penawaran kerja sama dan kontrak.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col gap-[10px] items-start w-full pt-[4px]"
          data-node-id="13:1559"
          data-name="Actions"
        >
          {/* Primary Button */}
          <Link
            href="/auth/mitra/apply/status"
            className="bg-[#006a8a] flex gap-[10px] h-[47px] items-center justify-center rounded-[7px] w-full text-white font-bold text-[15px] hover:bg-[#005a76] active:scale-[0.99] transition-all shadow-sm"
            data-node-id="13:1560"
            data-name="Button"
          >
            <div className="relative size-[21px]" data-node-id="13:1725">
              <Image
                src="/images/icon-clipboard-clock.svg"
                alt=""
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <span data-node-id="13:1562">Tunggu Tim Menghubungi</span>
          </Link>

          {/* Secondary Button */}
          <a
            href="https://wa.me/6281234567890?text=Halo%20Tim%20Fiscycle,%20saya%20sudah%20mengajukan%20kemitraan%20tambak."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border-[1.5px] border-[#73cdb5] flex gap-[10px] h-[47px] items-center justify-center rounded-[7px] w-full text-[#008c8b] font-bold text-[15px] hover:bg-[#edfcf8] active:scale-[0.99] transition-all shadow-xs"
            data-node-id="13:1563"
            data-name="Button"
          >
            <div className="relative size-[21px]" data-node-id="13:1728">
              <Image
                src="/images/icon-phone-green.svg"
                alt=""
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <span data-node-id="13:1565">Hubungi Fiscycle via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
