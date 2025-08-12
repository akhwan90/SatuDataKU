'use client'
import React from 'react'
import Image from 'next/image'

const Kartu = ({ title, description, jumlahData, imageSrc }) => {
  return (
    <div className="group relative bg-white rounded-2xl p-6 w-full mx-auto text-center shadow-sm border border-slate-800/30 transition-all duration-300 transform hover:-translate-y-1">

      {/* Jumlah Data di Pojok Kanan Atas */}
      <div className="absolute top-4 right-4 bg-[#01BBA6] text-white text-xs px-3 py-1 rounded-full shadow-sm">
        {jumlahData} data
      </div>

      {/* Gambar dengan efek zoom saat hover */}
      <div className="w-40 h-40 mx-auto mb-4 relative transition-transform duration-300 ease-in-out group-hover:scale-110">
        <Image src={imageSrc} alt={title} layout="fill" objectFit="contain" />
      </div>

      {/* Judul dan deskripsi */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>

      {/* Tombol */}
      <button className="mt-4 bg-gradient-to-r from-[#01BBA6] to-[#007686] text-white px-4 py-2 rounded-full text-sm transition duration-300 hover:from-[#007686] hover:to-[#007686] cursor-pointer"> Lihat Selengkapnya</button>
    </div>
  )
}

export default Kartu
