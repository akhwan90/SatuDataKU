"use client"
import React, { useRef, useState, useEffect } from "react";  // <-- ini agar animasi jalan
import Image from "next/image"
import { ImSpinner2 } from "react-icons/im";

const Kartu = ({ title, description, infoData, imageSrc, onClick, isPending }) => {

  //  ini yang mengatur animasi aktif saat muncul ke layar/viewport
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 } // 10% terlihat
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);
  // ---------------------------------------------------------------

  return (
    <div ref={ref} className={`group bg-white rounded-2xl p-6 w-full mx-auto text-center shadow-sm border border-slate-800/30 transition-all duration-300 transform hover:-translate-y-1 ${visible ? "pop-up" : "opacity-0"}`}>

      {/* info Data di Pojok Kanan Atas */}
      <div className="absolute top-4 right-4 bg-[#01BBA6] text-white text-xs px-3 py-1 rounded-full shadow-sm">
        {infoData}
      </div>

      {/* Gambar dengan efek zoom saat hover */}
      <div className="w-40 h-40 mx-auto mb-4 relative transition-transform duration-300 ease-in-out group-hover:scale-110">
        <Image src={imageSrc} fill className="object-contain" sizes="165px" alt="..." />
      </div>

      {/* Judul dan deskripsi */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>

      {/* Tombol */}
      {isPending ? (
        <button disabled className="rounded-full bg-gray-400 mt-4 px-4 py-2 text-sm text-white cursor-not-allowed transition duration-300 w-[150px]">
          <div className="flex gap-2">
            <ImSpinner2 className="animate-spin my-auto" /> Memuat
          </div>
        </button>
      ) : (
        <button onClick={onClick} className="bg-gradient-to-r from-[#01BBA6] to-[#007686] text-white mt-4 px-4 py-2 rounded-full text-sm transition duration-300 hover:from-[#007686] hover:to-[#007686] cursor-pointer">
          Lihat Data
        </button>
      )}
    </div>
  )
}

export default Kartu
