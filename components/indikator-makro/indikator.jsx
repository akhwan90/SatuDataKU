import IndikatorLayout from './indikatorLayout'
import { getIndikatorData } from '../../api/chain-indikator'

const dataDummy = [
  { caption: "Jumlah Penduduk Miskin (Dalam persen)", tahunA: "N/A", persenA: "N/A", tahunB: "N/A", persenB: "N/A" },
  { caption: "Indeks Pembangunan Manusia (IPM)", tahunA: "N/A", persenA: "N/A", tahunB: "N/A", persenB: "N/A" },
  { caption: "Tingkat Pengangguran Terbuka (TPT)", tahunA: "N/A", persenA: "N/A", tahunB: "N/A", persenB: "N/A" },
  { caption: "Laju Pertumbuhan Ekonomi (Dalam persen)", tahunA: "N/A", persenA: "N/A", tahunB: "N/A", persenB: "N/A" }
]

export default async function IndikatorMakroWrapper() {
  let indikatorData
  try {
    const apiData = await getIndikatorData({ revalidate: 300 })
    indikatorData = Array.isArray(apiData) && apiData.length ? apiData : dataDummy
  } catch (err) {
    console.error('Fetch indikator gagal, pakai data dummy:', err)
    indikatorData = dataDummy
  }

  // Override caption sesuai dataDummy
  indikatorData = indikatorData.map((item, i) => ({ ...item, caption: dataDummy[i]?.caption || item.caption }))

  return <IndikatorLayout data={indikatorData} />
}