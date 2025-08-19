import React from 'react'
import Link from "next/link";

const page = () => {
    return (
        <section className="container mx-auto h-screen max-w-7xl px-6 flex items-center justify-center">
            <div className="grid items-center gap-10 md:grid-cols-2">
                <div className="mt-10 flex justify-center">
                    <img src="/assets/lcheck.png" alt="Chart" className="md:w-[420px] object-contain transition duration-300 hover:-translate-y-1 hover:scale-105" />
                </div>

                {/* teks & icon statistik */}
                <div className="text-justify text-slate-800">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#01BBA6] mb-6">Layanan</h2>
                    <p>Melalui halaman ini, Anda dapat memberikan Feedback, mengikuti Survei, atau mengajukan Permohonan Data melalui formulir online yang tersedia.</p>

                    <div className="flex flex-wrap gap-3 my-6">
                        <Link href="#" target="_blank" className="bg-gradient-to-r from-[#01BBA6] to-[#007686] text-white text-sm px-5 py-2 rounded-full hover:from-[#007686] hover:to-[#007686] transition-all">Feedback</Link>


                        <Link href="#" target="_blank" className="bg-gradient-to-r from-[#01BBA6] to-[#007686] text-white text-sm px-5 py-2 rounded-full hover:from-[#007686] hover:to-[#007686] transition-all">Survei</Link>

                        <Link href="#" target="_blank" className="bg-gradient-to-r from-[#01BBA6] to-[#007686] text-white text-sm px-5 py-2 rounded-full hover:from-[#007686] hover:to-[#007686] transition-all">Permohonan Data</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page