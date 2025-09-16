"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ initialQuery = "" }) {
  const [value, setValue] = useState(initialQuery);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => setValue(initialQuery), [initialQuery]);

  // Auto reset ketika input kosong
  useEffect(() => {
    if (value === "") {
      const n = new URLSearchParams(params);
      n.delete("q");
      router.push(`${pathname}?${n.toString()}`);
    }
  }, [value, params, pathname, router]);

  const submit = (e) => {
    e?.preventDefault?.();
    const n = new URLSearchParams(params);
    if (value) n.set("q", value);
    else n.delete("q");
    n.set("page", "1"); // reset page
    router.push(`${pathname}?${n.toString()}`);
  };

  return (
    <form onSubmit={submit} className="flex items-center justify-center rounded-full border-2 border-slate-300/40 bg-white/60 ps-4 pe-1 shadow-sm focus-within:border-[#01BBA6] focus-within:shadow-[0_0_6px_#01BBA6] focus-within:ring-2 focus-within:ring-[#01BBA6]/30">
      <input value={value} onChange={(e) => setValue(e.target.value)} className="w-full flex-1 bg-transparent py-2 me-2 text-slate-800 placeholder:text-slate-800/50 focus:outline-none" placeholder="Cari data disini" />

      <button type="submit" className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#01BBA6] to-[#007686] px-4 py-2 text-sm text-white transition duration-300 hover:from-[#007686] hover:to-[#005C66] active:from-[#007686] active:to-[#005C66] cursor-pointer" ><FaSearch className="h-4 w-4" /> Cari </button>
    </form>
  );
}
