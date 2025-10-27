import { serverFetch } from "../fetcher";

// Konfigurasi indikator
const indikatorConfig = [
    // { id: "j2ng6ag1rx", sub: "" }, // IPM
    // { id: "wOLMpQJnjr", sub: "" }, // Kemiskinan
    // { id: "8J1xp3Q1Wr", sub: "Pengangguran" },
    // { id: "0k9qJoy18J", sub: "Laju Pertumbuhan Ekonomi Kabupaten Kulon Progo" },
    { id: "082d7fd2-1df4-47f3-8ae3-20f9f515f34e", sub: "" }, // IPM id = 19053
    { id: "c975be00-abc3-4c87-b145-17f2bdef14c8", sub: "" }, // Kemiskinan, id = 19061
    { id: "20fab900-0067-4722-9416-ce3038a53af0", sub: "Pengangguran" }, // Ketenagakerjaan / pengangguran, id = 23181
    { id: "5c545940-6c8a-458e-87ff-e18314f11fa8", sub: "Laju Pertumbuhan Ekonomi Kabupaten Kulon Progo" }, // Ketenagakerjaan / pengangguran, id = 22797
];

export async function getIndikatorData({ revalidate = 300 } = {}) {
    const fetchIndikator = async ({ id, sub }) => {
        const json = await serverFetch(`data-ku/element-data/${id}`, { revalidate });
        const datas = json?.elemen || {};

        const tahun = Object.keys(datas.data)
            .filter((t) => datas.data[t]?.value != null)
            .sort((a, b) => b - a);

        if (tahun.length < 2) return null;

        const tahunA = tahun[1];
        const tahunB = tahun[0];
        return {
            id: `${id}-${tahunB}`,
            caption: datas.label || "Tidak diketahui",
            satuan: datas.satuan || "",
            tahunA,
            persenA: datas.data[tahunA].value,
            tahunB,
            persenB: datas.data[tahunB].value,
        };
    };

    const results = await Promise.all(indikatorConfig.map(fetchIndikator));
    return results.filter(Boolean);
}
