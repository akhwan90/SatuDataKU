import IndikatorLayout from "./indikatorLayout"
import { getIndikatorData } from "../../lib/api/indikator"

// data patokan awal
const dataDefault = [
  { caption: "Jumlah Penduduk Miskin (Dalam persen)", tahunA: "N/A", persenA: "N/A", tahunB: "N/A", persenB: "N/A" },
  { caption: "Indeks Pembangunan Manusia (IPM)", tahunA: "N/A", persenA: "N/A", tahunB: "N/A", persenB: "N/A" },
  { caption: "Tingkat Pengangguran Terbuka (TPT)", tahunA: "N/A", persenA: "N/A", tahunB: "N/A", persenB: "N/A" },
  { caption: "Laju Pertumbuhan Ekonomi (Dalam persen)", tahunA: "N/A", persenA: "N/A", tahunB: "N/A", persenB: "N/A" }
]

// logika : Coba ambil data dari API --> Jika gagal atau data kosong --> pakai default.
export default async function IndikatorMakroWrapper() {
  let indikatorData
  try {
    const apiData = await getIndikatorData({ revalidate: 300 })
    indikatorData = Array.isArray(apiData) && apiData.length ? apiData : dataDefault
  } catch (err) {
    console.error("Fetch indikator gagal, pakai data Default:", err)
    indikatorData = dataDefault
  }

  // Override caption sesuai dataDefault
  indikatorData = indikatorData.map((item, i) => ({ ...item, caption: dataDefault[i]?.caption || item.caption }))

  return <IndikatorLayout data={indikatorData} />
}