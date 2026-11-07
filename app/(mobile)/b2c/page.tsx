'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useB2BCartStore } from '@/store/useB2BCartStore';
import { RetailFishProduct } from '@/lib/types';
import { formatRupiah } from '@/lib/format';
import {
  Search,
  Sparkles,
  ShoppingBag,
  Plus,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MapPin,
} from 'lucide-react';

export default function B2CMarketplacePage() {
  const { retailCatalog, b2cCart, addToB2CCart } = useB2BCartStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Semua' | 'Nila' | 'Bandeng' | 'Lele'>('Semua');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredProducts = retailCatalog.filter((product) => {
    const matchesCategory =
      selectedCategory === 'Semua' ? true : product.species === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: RetailFishProduct) => {
    addToB2CCart(product, 1);
    setToastMessage(`1 kg ${product.name} berhasil ditambahkan ke keranjang belanja!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalCartCount = b2cCart.reduce((acc, item) => acc + item.quantityKg, 0);

  return (
    <div className="min-h-screen bg-[#f3f9fc] pb-28 text-[#173251] font-sans antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm">
          <div className="bg-[#14b97c] text-white p-3 rounded-[10px] text-[11.5px] font-semibold flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <div className="px-4 pt-3">
        <div className="bg-gradient-to-r from-[#00566b] via-[#008d91] to-[#20a39e] rounded-[14px] p-4 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-[240px]">
            <span className="bg-white/20 text-white font-bold text-[9px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 mb-1.5">
              <Sparkles className="size-2.5" />
              Panen Segar Subuh Tadi
            </span>
            <h1 className="text-[17px] font-extrabold leading-tight">
              Ikan Tambak Bebas Bau Tanah
            </h1>
            <p className="text-[11px] text-white/85 mt-1 leading-snug">
              Dipelihara di kolam terkontrol IoT dengan pakan larva maggot BSF alami.
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[10.5px]">
            <span className="flex items-center gap-1 text-white/90">
              <ShieldCheck className="size-3.5 text-[#a1f3de]" />
              Sertifikasi Higienis
            </span>
            <Link
              href="/b2c/waste"
              className="text-[#a1f3de] font-bold flex items-center gap-0.5 hover:underline"
            >
              Tukar Sampah Jadi Poin <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="px-4 mt-3">
        <div className="bg-white border border-[#dce6ee] rounded-[8px] h-10 px-3 flex items-center gap-2 shadow-xs">
          <Search className="size-4 text-[#8192a5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari ikan nila, bandeng cabut duri, lele..."
            className="w-full bg-transparent text-[12px] text-[#173251] placeholder:text-[#8192a5] focus:outline-hidden"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="px-4 mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
        {(['Semua', 'Nila', 'Bandeng', 'Lele'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-[6px] text-[11px] font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-[#008d91] text-white shadow-xs'
                : 'bg-white border border-[#e1e7ec] text-[#71859c] hover:bg-slate-50'
            }`}
          >
            {cat === 'Semua' ? 'Semua Ikan' : `Ikan ${cat}`}
          </button>
        ))}
      </div>

      {/* Product Catalog Grid */}
      <div className="px-4 mt-3 space-y-3">
        {filteredProducts.map((product) => {
          const inCartItem = b2cCart.find((i) => i.product.id === product.id);

          return (
            <div
              key={product.id}
              className="bg-white border border-[#e7eff4] rounded-[12px] p-3.5 shadow-xs space-y-2.5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="size-16 rounded-[8px] bg-[#eaf4f7] border border-[#d2e4ec] flex items-center justify-center text-[#008d91] shrink-0 font-bold text-[18px]">
                    🐟
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#008d91] bg-[#e2f7f4] px-1.5 py-0.2 rounded-[3px]">
                      {product.harvestedLabel}
                    </span>
                    <h3 className="text-[13.5px] font-bold text-[#173251] mt-0.5 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-[10.5px] text-[#8192a5] mt-0.5 flex items-center gap-1">
                      <MapPin className="size-3 text-[#8192a5]" />
                      {product.farmName} ({product.distanceKm} km)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#f8fbfd] border border-[#eaf1f5] rounded-[7px] p-2 flex items-center justify-between text-[11px]">
                <span className="text-[#8192a5]">Grade: {product.sizeGradeLabel}</span>
                <span className="font-bold text-[#008d91] text-[14px]">
                  {formatRupiah(product.pricePerKgIdr)} <span className="text-[10px] text-[#8192a5] font-normal">/ kg</span>
                </span>
              </div>

              <div className="pt-1 flex items-center justify-between">
                <span className="text-[10px] text-[#8192a5]">
                  Stok Tambak: <strong>{product.stockAvailableKg} kg</strong>
                </span>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#008d91] hover:bg-[#007478] text-white font-bold text-[11.5px] px-3.5 py-1.5 rounded-[6px] flex items-center gap-1.5 transition active:scale-95 shadow-xs"
                >
                  <Plus className="size-3.5" />
                  {inCartItem ? `Tambah (${inCartItem.quantityKg} kg di keranjang)` : '+ Keranjang'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Cart Bar if items in cart */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-40 px-2">
          <Link
            href="/b2c/checkout"
            className="bg-[#1A365D] hover:bg-[#132845] text-white px-4 py-2.5 rounded-[10px] shadow-xl flex items-center justify-between transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-4 text-[#00B4D8]" />
              <span className="text-[12px] font-bold">
                {totalCartCount} kg Ikan di Keranjang
              </span>
            </div>

            <span className="text-[12px] font-bold text-[#00B4D8] flex items-center gap-1">
              Checkout &amp; Gunakan Poin <ArrowRight className="size-3.5" />
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
