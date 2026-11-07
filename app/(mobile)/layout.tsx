import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fiscycle — Ekosistem Perikanan Sirkular',
};

export default function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-white sm:bg-canvas flex justify-center antialiased">
      <main className="w-full max-w-md min-h-screen bg-white relative shadow-none sm:shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col font-sans text-ink">
        {children}
      </main>
    </div>
  );
}
