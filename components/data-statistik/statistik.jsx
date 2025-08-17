'use client'
import { useRef, useState, useEffect } from 'react'
import Kartu from './kartu'
import dataKategori from './value'
import { useRouter } from 'next/navigation'

export default function DataStatistik() {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const router = useRouter()
  const handleSelectFilter = (type, value) => {
    if (!value) return
    const query =
      type === 'opd'
        ? `?opd=${encodeURIComponent(value)}`
        : `?urusan=${encodeURIComponent(value)}`
    router.push(`/statistik${query}`)
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const onScroll = () => setActiveIndex(Math.round(container.scrollLeft / (container.firstChild?.offsetWidth || 1)))
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      {/* Judul & Subjudul */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#01BBA6]">Data Statistik Sektoral</h2>
        <p className="text-slate-800 mt-1">Data sektoral menggambarkan kondisi spesifik sektor</p>
      </div>

      {/* Grid desktop */}
      <div className="hidden md:grid md:grid-cols-4 gap-6">
        {dataKategori.map(({ title, description, infoData, imageSrc, type, filterValue }, i) => (
          <Kartu
            key={i}
            title={title}
            description={description}
            infoData={infoData}
            imageSrc={imageSrc}
            type={type}
            filterValue={filterValue}
            onClick={() => handleSelectFilter(type, filterValue)}
          />
        ))}
      </div>

      {/* Slider mobile */}
      <div className="md:hidden mt-10">
        <div ref={scrollRef} className="card-wrapper flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 -mx-4">
          {dataKategori.map(({ title, description, infoData, imageSrc, type, filterValue }, i) => (
            <div key={i} className="snap-center shrink-0 w-full max-w-sm">
              <Kartu
                title={title}
                description={description}
                infoData={infoData}
                imageSrc={imageSrc}
                type={type}
                filterValue={filterValue}
                onClick={() => handleSelectFilter(type, filterValue)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {dataKategori.map((_, i) => (
            <span key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-[#01BBA6]' : 'bg-slate-400/30'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}