// Konfigurasi indikator: id + nama subelemen (kosong = ambil elemen pertama)
const indikatorConfig = [
    { id: "j2ng6ag1rx", sub: "" },
    { id: "wOLMpQJnjr", sub: "" },
    { id: "8J1xp3Q1Wr", sub: "Pengangguran" },
    { id: "0k9qJoy18J", sub: "Laju Pertumbuhan Ekonomi Kabupaten Kulon Progo" },
];

// Fungsi fetch data dari API Kulonprogo
async function serverFetch(endpoint, { revalidate = 300 } = {}) {
    const url = `https://satudata.kulonprogokab.go.id/api/public/${endpoint}`;
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) throw new Error(`Gagal fetch ${url}: ${res.statusText}`);
    return res.json();
}

// Ambil data indikator
export async function getIndikatorData({ revalidate = 300 } = {}) {
    // Ambil data untuk satu indikator
    const fetchIndikator = async ({ id, sub }) => {
        const json = await serverFetch(`data-ku/elemen-detil/${id}`, { revalidate });
        const datas = json?.datas || {};

        // Pilih subelemen sesuai nama, kalau kosong ambil yang pertama
        const key = sub
            ? Object.keys(datas).find(
                (k) => datas[k]?.metadata?.nama_elemen?.toLowerCase() === sub.toLowerCase()
            )
            : Object.keys(datas)[0];

        if (!key) return null;

        const meta = datas[key].metadata || {};
        const dataObj = datas[key].data || {};

        // Ambil tahun dengan data valid, urut dari terbaru ke lama
        const tahun = Object.keys(dataObj)
            .filter((t) => dataObj[t]?.value != null)
            .sort((a, b) => b - a);

        if (tahun.length < 2) return null;

        const tahunA = tahun[1];
        const tahunB = tahun[0];

        return {
            id: `${id}-${tahunB}`,
            caption: meta.nama_elemen || json?.elemen?.label || "Tidak diketahui",
            satuan: meta.satuan || "",
            tahunA,
            persenA: dataObj[tahunA].value,
            tahunB,
            persenB: dataObj[tahunB].value,
        };
    };

    // Ambil semua indikator sekaligus
    const results = await Promise.all(indikatorConfig.map(fetchIndikator));
    return results.filter(Boolean);
}
