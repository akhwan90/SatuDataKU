"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SortDropdown({ initialSort = "az" }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [selected, setSelected] = useState(initialSort);

  const update = (val) => {
    setSelected(val);
    const n = new URLSearchParams(params);
    n.set("sort", val);
    router.push(`${pathname}?${n.toString()}`);
  };

  return (
    <div className="relative inline-block group">
      {/* Tombol rounded-pill */}
      <button className="px-6 py-2 bg-emerald-500 text-white rounded-full cursor-pointer">
        {selected === "az" ? "A - Z" : "Z - A"}
      </button>

      {/* Menu dropdown */}
      <ul className="absolute mt-2 w-48 bg-white rounded shadow-lg invisible opacity-0 group-hover:visible group-hover:opacity-100 transition duration-200">
        <li>
          <button className="block w-full text-left px-4 py-2 text-slate-800 hover:bg-gray-100" onClick={() => update("az")}> A - Z</button>
        </li>
        <li>
          <button className="block w-full text-left px-4 py-2 text-slate-800 hover:bg-gray-100" onClick={() => update("za")}> Z - A</button>
        </li>
      </ul>
    </div>
  );
}
