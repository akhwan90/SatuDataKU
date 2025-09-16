"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function OpdFilter({ options, selected = "", onChange }) {
  const [search, setSearch] = useState("");
  const entries = Object.entries(options);
  const filtered = entries.filter(([_, label]) =>
    label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    // Panel Filter OPD
    <div className="h-[500px] flex flex-col p-4 space-y-2 bg-white/50 rounded-lg">

      {/* Judul */}
      <h1 className="font-semibold text-gray-700">Filter OPD</h1>

      {/* input teks filter opd */}
      <input type="text" placeholder="Cari OPD..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-4 py-2 text-sm border-2 border-slate-400/50 rounded-full bg-white/60 text-slate-800 placeholder:text-slate-800/50 focus:outline-none focus:border-[#01BBA6] focus:shadow-[0_0_3px_#01BBA6] focus:ring-1 focus:ring-[#01BBA6]/30" />

      {/* tombol reset pilihan */}
      {selected &&
        <button onClick={() => onChange("")} className="text-xs bg-white/60 py-2 mb-2 text-red-600 border border-red-500 rounded-full hover:bg-red-50 transition-colors cursor-pointer">Batalkan pilihan</button>}

      {/* radio select */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-2">
        {filtered.map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-[#01BBA6]/40">
            <input type="radio" name="opd" checked={selected === key} onChange={() => onChange(key)} />
            <span className="text-sm text-gray-600">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function UrusanFilter({ options, selected = "", onChange }) {
  const [search, setSearch] = useState("");
  const entries = Object.entries(options);
  const filtered = entries.filter(([_, label]) =>
    label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    // Panel Filter Urusan
    <div className="min-h-[500px] max-h-[750] flex flex-col p-4 space-y-2 bg-white/50 rounded-lg">
      {/* Judul */}
      <h1 className="font-semibold text-gray-700">Filter Urusan</h1>

      {/* input teks filter urusan */}
      <input type="text" placeholder="Cari Urusan..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-4 py-2 text-sm border-2 border-slate-400/50 rounded-full bg-white/60 text-slate-800 placeholder:text-slate-800/50 focus:outline-none focus:border-[#01BBA6] focus:shadow-[0_0_3px_#01BBA6] focus:ring-1 focus:ring-[#01BBA6]/30" />

      {/* tombol reset pilihan */}
      {selected &&
        <button onClick={() => onChange("")} className="text-xs bg-white/60 py-2 mb-2 text-red-600 border border-red-500 rounded-full hover:bg-red-50 transition-colors cursor-pointer">Batalkan pilihan</button>}

      {/* radio select */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-2">
        {filtered.map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-[#01BBA6]/40">
            <input type="radio" name="urusan" checked={selected === key} onChange={() => onChange(key)} />
            <span className="text-sm text-gray-600">{label}</span>
          </label>
        ))}
      </div>
    </div>


  );
}

export default function FilterSidebar({
  initialOpd = "",
  initialUrusan = "",
  pInstansi = {},
  pUrusan = {},
}) {
  const router = useRouter(),
    pathname = usePathname(),
    params = useSearchParams();

  const [opd, setOpd] = useState(initialOpd);
  const [urusan, setUrusan] = useState(initialUrusan);

  const updateQuery = (key, value) => {
    setOpd(key === "opd" ? value : opd);
    setUrusan(key === "urusan" ? value : urusan);

    const n = new URLSearchParams(params);
    if (!value) n.delete(key);
    else n.set(key, value);
    n.set("page", "1");
    router.replace(`${pathname}?${n}`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      <OpdFilter
        options={pInstansi}
        selected={opd}
        onChange={(v) => updateQuery("opd", v)}
      />
      <UrusanFilter
        options={pUrusan}
        selected={urusan}
        onChange={(v) => updateQuery("urusan", v)}
      />
    </div>
  );
}
