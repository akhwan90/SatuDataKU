'use client'
import { useRef, useState, useEffect } from 'react'
import Kartu from './kartu'

export default function IndikatorLayout({ data }) {
    const scrollRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const container = scrollRef.current
        if (!container) return
        const onScroll = () => setActiveIndex(Math.round(container.scrollLeft / (container.firstChild?.offsetWidth || 1)))
        container.addEventListener('scroll', onScroll, { passive: true })
        return () => container.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <div className="bg-[#EDFCED]">
            <section className="px-6 py-20 max-w-7xl mx-auto">
                {/* Judul & Subjudul */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#01BBA6]">Indikator Makro</h2>
                    <p className="text-slate-800 mt-1">Capaian Kabupaten Kulon Progo</p>
                </div>

                {/* Grid desktop */}
                <div className="hidden md:grid md:grid-cols-4 gap-6">
                    {data.map((item, i) => (
                        <Kartu
                            key={i}
                            caption={item.caption}
                            tahunA={item.tahunA}
                            persenA={item.persenA}
                            tahunB={item.tahunB}
                            persenB={item.persenB}
                        />
                    ))}
                </div>

                {/* Slider mobile */}
                <div className="md:hidden mt-10">
                    <div ref={scrollRef} className="card-wrapper flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 -mx-4">
                        {data.map(({ caption, tahunA, persenA, tahunB, persenB }, i) => (
                            <div key={i} className="snap-center shrink-0 w-full max-w-sm">
                                <Kartu
                                    caption={caption}
                                    tahunA={tahunA}
                                    persenA={persenA}
                                    tahunB={tahunB}
                                    persenB={persenB}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-2 mt-4">
                        {data.map((_, i) => (
                            <span key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-[#01BBA6]' : 'bg-slate-400/30'}`} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
