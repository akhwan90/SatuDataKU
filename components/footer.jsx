"use client"
import Image from "next/image"
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white rounded-t-2xl shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 px-6 py-6">

        {/* bagian kiri */}
        <div className="flex items-center gap-3 pt-2">
          <Image src="/assets/favicon.png" className="object-contain" alt="Logo" width={30} height={30} />
          <div>
            <h2 className="font-bold text-xl leading-tight">Satu Data</h2>
            <p className="text-xs text-white/80">Kabupaten Kulon Progo</p>
          </div>
        </div>

        {/* bagian tengah */}
        <div className="flex flex-col md:flex-row justify-between gap-6">

          {/* alamat, telpon, email */}
          <div className="text-xs space-y-3 leading-relaxed">
            <div>
              <p className="font-bold">Alamat Kantor</p>
              <p className="text-slate-300">Jl. Tamtama, Terbah, Wates, Kabupaten Kulon Progo, DIY 55651</p>
            </div>
            <div>
              <p className="font-bold">Telepon</p>
              <p className="text-slate-300">(0274) 773010</p>
            </div>
            <div>
              <p className="font-bold">Email</p>
              <a href="mailto:kominfo@kulonprogokab.go.id" className="text-slate-300">kominfo@kulonprogokab.go.id</a>
            </div>
          </div>

          {/* sosmed */}
          <div className="text-xs space-y-3 leading-relaxed">
            <div className="flex gap-2 items-center">
              <FaInstagram className="text-xl" />
              <div>
                <p className="font-bold">Instagram</p>
                <a href="https://www.instagram.com/dinaskominfokp/" className="text-slate-300" target="_blank">@dinaskominfokp</a>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <FaFacebookF className="text-xl" />
              <div>
                <p className="font-bold">Facebook</p>
                <a href="https://web.facebook.com/Kominfo.KP" className="text-slate-300" target="_blank">Kominfo Kulon Progo</a>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <FaYoutube className="text-xl" />
              <div>
                <p className="font-bold">Youtube</p>
                <a href="https://www.youtube.com/channel/UC9_-BtLTD8oQ7druxMYWU2A" className="text-slate-300" target="_blank">Kulonprogo TV</a>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <a href="https://satudata.kulonprogokab.go.id/login" target="_blank" className="bg-slate-500 text-white px-5 py-2 rounded-md text-sm"> OPD Login</a>
          </div>

        </div>

      </div>
      <div className="w-full border-b border-white/20 my-4"></div>
      <div className="text-center pb-2"><small>© 2025 Dinas Kominfo Kabupaten Kulon Progo</small></div>
    </footer >
  )
}
