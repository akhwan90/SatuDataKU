// app/components/DataTerbaru.jsx
import Link from "next/link"
import Image from "next/image"
import { FaCheckCircle } from "react-icons/fa"
import { getList } from "../lib/api/dataset"

export default async function DataTerbaru() {

  // ambil data dari API
  const res = await getList({ page: 1, revalidate: 300 })

  // API format: res.datas.data
  const items =
    res?.datas?.data?.slice(0, 10).map((d) => d.nama_elemen) ?? []
  // ------------------------------------------------------------------------------------------------

  return (
    <div className="bg-[#EDFCED]">
      <section className="px-6 py-20 max-w-7xl mx-auto">
        {/* Judul */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#01BBA6]">Data Terkini</h2>
          <p className="text-slate-800 mt-1">
            Daftar data sektoral dan data spasial terkini
          </p>
        </div>

        {/* Dua Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* KIRI - Data Sektoral */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-800/20 flex flex-col justify-between">
            <h3 className="text-lg font-bold text-slate-800 text-center mb-4">Data Sektoral</h3>
            <ul className="space-y-3 text-slate-700 text-sm">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <FaCheckCircle className="text-[#01BBA6] mt-1 flex-shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <Link href="/statistik" className="bg-gradient-to-r from-[#01BBA6] to-[#007686] text-white text-sm px-5 py-2 rounded-full hover:from-[#007686] hover:to-[#007686] transition-all">Lihat Selengkapnya</Link>
            </div>
          </div>

          {/* KANAN - Data Spasial (gambar kp.png) */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-800/20 flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-800 text-center mb-4">Data Spasial</h3>
            <Image src="/assets/kp.png" alt="Peta Kabupaten Purworejo" width={400} height={250} className="rounded-lg object-contain" />
            <Link href="/" className="bg-gradient-to-r from-[#01BBA6] to-[#007686] text-white text-sm px-5 py-2 rounded-full hover:from-[#007686] hover:to-[#007686] transition-all">Lihat Selengkapnya</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
