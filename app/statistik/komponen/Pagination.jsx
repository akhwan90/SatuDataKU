"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ currentPage = 1, totalPages = 1 }) {
  const router = useRouter(), pathname = usePathname(), params = useSearchParams();
  const go = (page) => {
    if (page < 1 || page > totalPages) return;
    const n = new URLSearchParams(params);
    n.set("page", String(page));
    router.push(`${pathname}?${n.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (totalPages <= 1) return null;

  let start = Math.max(1, currentPage - 2), end = Math.min(totalPages, currentPage + 2);
  if (currentPage <= 2) end = Math.min(5, totalPages);
  if (currentPage >= totalPages - 1) start = Math.max(1, totalPages - 4);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const navBtnClass = (disabled) =>
    `w-8 h-8 flex items-center justify-center rounded-full transition text-slate-800 ${disabled ? "opacity-20 cursor-not-allowed" : "hover:bg-white/50 cursor-pointer"}`;

  return (
    <nav aria-label="Pagination">
      <ul className="flex gap-2 justify-center mt-6 items-center">
        <li>
          <button onClick={() => go(currentPage - 1)} disabled={currentPage === 1} className={navBtnClass(currentPage === 1)}>
            <FaChevronLeft size={16} />
          </button>
        </li>
        {pages.map(p => (
          <li key={p}>
            <button onClick={() => go(p)}
              className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition ${p === currentPage
                ? "bg-gradient-to-r from-[#01BBA6] to-[#007686] text-white border-[#01BBA6]"
                : "hover:bg-white/50 text-slate-800"}`}>{p}</button>
          </li>
        ))}
        <li>
          <button onClick={() => go(currentPage + 1)} disabled={currentPage === totalPages} className={navBtnClass(currentPage === totalPages)}>
            <FaChevronRight size={16} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
