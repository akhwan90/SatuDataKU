'use client'
import React, { useRef, useState, useEffect } from 'react'
import Kartu from './kartu'
import dataIndikator from './data'

export default function DataStatistik() {
  const scrollContainerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / (container.firstChild?.offsetWidth || 1))
      setActiveIndex(index)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-[#EDFCED]">
      <section className="px-6 py-20 max-w-7xl mx-auto">

        {/* judul & Subjudul */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#01BBA6]">Indikator Makro</h2>
          <p className="text-slate-800 mt-1">Capaian Kabupaten Kulon Progo</p>
        </div>

        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {dataIndikator.map((item, i) => <Kartu key={i} {...item} />)}
        </div>

        {/* Slider Ccontainer - mobile */}
        <div className="md:hidden">
          <div ref={scrollContainerRef} className="card-wrapper flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 -mx-4 scroll-smooth">
            {dataIndikator.map((item, i) => (
              <div key={i} className="snap-center shrink-0 w-full max-w-sm mx-auto">
                <Kartu {...item} />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {dataIndikator.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-[#01BBA6]' : 'bg-slate-400/30'}`} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}