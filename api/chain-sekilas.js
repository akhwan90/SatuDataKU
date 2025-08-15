const BASE_UPSTREAM = "https://satudata.kulonprogokab.go.id/api/public";

export async function getSekilasData() {
    const res = await fetch(`${BASE_UPSTREAM}/data-ku`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("Gagal mengambil data sekilas");

    const data = await res.json();

    return {
        datasetCount: data.datas?.total ?? 0,
        opdCount: new Set(Object.keys(data.pInstansi ?? {}).filter(k => k)).size,
        urusanCount: new Set(Object.keys(data.pUrusan ?? {}).filter(k => k)).size
    };
}
