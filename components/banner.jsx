"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = keyword.trim();
    setKeyword("");
    startTransition(() => {
      router.push(query ? `/statistik?q=${encodeURIComponent(query)}&page=1` : `/statistik`);
    });
  };

  return (
    // Banner utama dengan background image penuh layar
    <section className="relative h-screen w-full bg-[url('/assets/bg1.jpg')] bg-cover bg-center bg-no-repeat text-white">
      {/* Overlay gradasi atas untuk efek transisi warna */}
      <div className="pointer-events-none absolute top-0 left-0 h-1/2 w-full bg-gradient-to-t from-transparent to-white/30"></div>

      {/* Container konten banner */}
      <div className="container mx-auto flex h-full items-center justify-center px-6">
        <div className="relative z-20 text-center md:w-4/7">
          {/* Judul utama */}
          <h1 className="mt-32 text-3xl font-bold drop-shadow-md md:text-4xl">
            Selamat datang di <span className="text-[#05EBD0]">Satu Data</span>{" "} Kabupaten Kulon Progo
          </h1>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="mt-12 flex items-center justify-center rounded-full border-2 border-slate-100/60 bg-white/50 ps-4 pe-1 backdrop-blur-md focus-within:border-[#01BBA6] focus-within:shadow-[0_0_6px_#01BBA6] focus-within:ring-2 focus-within:ring-[#01BBA6]/30">
            <input type="search" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Cari data..." className="w-full flex-1 bg-transparent py-2 me-2 text-slate-800 placeholder:text-slate-800/50 focus:outline-none" />
            {isPending ? (
              <button disabled className="flex items-center gap-2 rounded-full bg-gray-400 px-4 py-2 text-sm text-white cursor-not-allowed transition duration-300">
                <span className="h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full cursor-pointer" /> Memuat
              </button>
            ) : (
              <button type="submit" className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#01BBA6] to-[#007686] px-4 py-2 text-sm text-white transition duration-300 hover:from-[#007686] hover:to-[#005C66] active:from-[#007686] active:to-[#005C66] cursor-pointer">
                <FaSearch className="h-4 w-4" /> Cari
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
