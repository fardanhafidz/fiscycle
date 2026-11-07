import Image from 'next/image';
import Link from 'next/link';

export default function HalamanAwal() {
  return (
    <div
      className="w-full min-h-screen flex flex-col justify-between relative bg-white select-none"
      data-node-id="9:2522"
      data-name="Halaman awal"
    >
      {/* Top Hero Section */}
      <div
        className="w-full h-[514px] overflow-hidden relative shrink-0"
        data-node-id="22:4"
      >
        {/* Background Image with Smooth Gradient Mask at Bottom */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 76%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 76%, rgba(0,0,0,0) 100%)',
          }}
          data-node-id="22:5"
          data-name="mita-64-P35csnyIh5M-unsplash 1"
        >
          <Image
            src="/images/splash-hero.png"
            alt="Tambak Budidaya Fiscycle"
            fill
            priority
            className="object-cover object-center pointer-events-none"
          />
        </div>

        {/* White Fiscycle Brand Logo Centered at Top */}
        <div
          className="absolute top-9 inset-x-0 flex justify-center z-20 pointer-events-none"
          data-node-id="25:24"
          data-name="whitee 1"
        >
          <div className="relative w-[140px] h-[56px]">
            <Image
              src="/images/logo-white.png"
              alt="Fiscycle Logo"
              fill
              priority
              unoptimized
              className="object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="absolute left-6 right-6 top-[295px] z-10">
          <h1
            className="[text-shadow:0px_2px_8px_rgba(0,0,0,0.3)] text-white text-[30px] leading-[1.2] tracking-normal font-sans"
            data-node-id="22:17"
          >
            <span className="font-normal">Dari limbah menjadi</span>{' '}
            <span className="font-bold">sumber daya</span>
          </h1>
          <p
            className="[text-shadow:0px_2px_8px_rgba(0,0,0,0.3)] text-[#f3f4f6] text-[16px] leading-[1.25] font-normal font-sans mt-2 max-w-[320px]"
            data-node-id="25:21"
          >
            Platform terintegrasi untuk ekosistem perikanan yang lebih berkelanjutan
          </p>
        </div>
      </div>

      {/* Welcome Actions (Masuk & Daftar) */}
      <div
        className="w-full px-5 -mt-11 z-20 flex flex-col gap-3"
        data-node-id="9:2541"
        data-name="Welcome actions"
      >
        {/* Tombol Masuk */}
        <Link
          href="/auth/login"
          className="bg-[#0f766e] border border-[#0f766e] flex flex-col gap-1 h-16 items-center justify-center rounded-[7px] shrink-0 text-white w-full transition-all duration-150 hover:bg-[#0c635c] active:scale-[0.99] shadow-sm cursor-pointer"
          data-node-id="9:2542"
          data-name="Button Masuk"
        >
          <span
            className="font-bold text-[16px] leading-none"
            data-node-id="9:2543"
          >
            Masuk
          </span>
          <span
            className="font-normal text-[12px] leading-none text-white/95"
            data-node-id="9:2544"
          >
            Saya sudah punya akun Fiscycle
          </span>
        </Link>

        {/* Tombol Daftar */}
        <Link
          href="/auth/register"
          className="bg-white border border-[#0f766e] flex flex-col gap-1 h-16 items-center justify-center rounded-[7px] shrink-0 text-[#0f766e] w-full transition-all duration-150 hover:bg-[#edfcf8] active:scale-[0.99] shadow-sm cursor-pointer"
          data-node-id="9:2545"
          data-name="Button Daftar"
        >
          <span
            className="font-bold text-[16px] leading-none"
            data-node-id="9:2546"
          >
            Daftar
          </span>
          <span
            className="font-normal text-[12px] leading-none text-[#0f766e]/95"
            data-node-id="9:2547"
          >
            Saya baru menggunakan Fiscycle
          </span>
        </Link>
      </div>

      {/* 3 Core Value / Benefits */}
      <div
        className="w-full px-4 mt-7 pb-8 grid grid-cols-3 gap-2 items-start"
        data-node-id="9:2548"
        data-name="Benefits"
      >
        {/* Benefit 1: Kelola Tambak */}
        <div
          className="flex flex-col gap-3 items-center text-center w-full"
          data-node-id="9:2549"
          data-name="Benefit"
        >
          <div
            className="bg-[#ccfbf1] flex items-center justify-center rounded-full shrink-0 size-[53px]"
            data-node-id="9:2550"
            data-name="Benefit icon"
          >
            <div className="relative size-[27px]" data-node-id="9:2813">
              <Image
                src="/images/icon-sprout.svg"
                alt="Kelola Tambak"
                width={27}
                height={27}
                className="size-[27px] block"
              />
            </div>
          </div>
          <div
            className="text-[#0f766e] text-[11.5px] leading-[1.35] font-normal"
            data-node-id="9:2552"
          >
            <p className="m-0">Kelola Tambak</p>
            <p className="m-0">lebih mudah</p>
          </div>
        </div>

        {/* Benefit 2: Akses Pasar */}
        <div
          className="flex flex-col gap-3 items-center text-center w-full"
          data-node-id="9:2553"
          data-name="Benefit"
        >
          <div
            className="bg-[#ccfbf1] flex items-center justify-center rounded-full shrink-0 size-[53px]"
            data-node-id="9:2554"
            data-name="Benefit icon"
          >
            <div className="relative size-[27px]" data-node-id="9:2816">
              <Image
                src="/images/icon-store.svg"
                alt="Akses pasar"
                width={27}
                height={27}
                className="size-[27px] block"
              />
            </div>
          </div>
          <div
            className="text-[#0f766e] text-[11.5px] leading-[1.35] font-normal"
            data-node-id="9:2556"
          >
            <p className="m-0">Akses pasar</p>
            <p className="m-0">lebih luas</p>
          </div>
        </div>

        {/* Benefit 3: Dukung Ekosistem */}
        <div
          className="flex flex-col gap-3 items-center text-center w-full"
          data-node-id="9:2557"
          data-name="Benefit"
        >
          <div
            className="bg-[#ccfbf1] flex items-center justify-center rounded-full shrink-0 size-[53px]"
            data-node-id="9:2558"
            data-name="Benefit icon"
          >
            <div className="relative size-[27px]" data-node-id="9:2819">
              <Image
                src="/images/icon-recycle.svg"
                alt="Dukung ekosistem berkelanjutan"
                width={27}
                height={27}
                className="size-[27px] block"
              />
            </div>
          </div>
          <div
            className="text-[#0f766e] text-[11.5px] leading-[1.35] font-normal"
            data-node-id="9:2560"
          >
            <p className="m-0">Dukung</p>
            <p className="m-0">ekosistem berkelanjutan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
