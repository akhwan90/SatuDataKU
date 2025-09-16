"use client";
import { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import FilterSidebar from "./FilterSidebar";

export default function FilterForMobile({ opd, pInstansi, urusan, pUrusan }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) window.location.reload();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {/* Tombol Filter */}
            <button
                onClick={() => setOpen(true)}
                className="mb-2 flex gap-2 items-center bg-white/60 px-4 py-2 text-sm text-slate-800 rounded-lg shadow md:hidden"
            >
                <FiFilter size={16} />
                Filter
            </button>

            {/* Fullscreen Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-lg font-semibold">Filter</h2>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-red-600 font-semibold text-sm"
                        >
                            ✕ Tutup
                        </button>
                    </div>

                    {/* Konten Filter */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <FilterSidebar
                            initialOpd={opd}
                            pInstansi={pInstansi}
                            initialUrusan={urusan}
                            pUrusan={pUrusan}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
