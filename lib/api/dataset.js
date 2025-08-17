import { serverFetch } from "../fetcher";

export async function getList({ page = 1, opd, urusan, revalidate = 60 } = {}) {
    const query = { page };
    if (opd) query.opd = opd;
    if (urusan) query.urusan = urusan;
    return serverFetch("data-ku", { query, revalidate });
}

export async function getElemenDetail(id, { revalidate = 300 } = {}) {
    return serverFetch(`data-ku/elemen-detil/${id}`, { revalidate });
}

export async function getDatasetDetail(id, tahunAwal, tahunAkhir) {
    return serverFetch(`data-ku/elemen-detil/${id}`, {
        query: { tahun_awal: tahunAwal, tahun_akhir: tahunAkhir },
        revalidate: 0, // selalu fresh (SSR)
    });
}

