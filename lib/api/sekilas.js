import { serverFetch } from "../fetcher";

export async function getSekilasData({ revalidate = 300 } = {}) {
    const data = await serverFetch("data-ku", { revalidate });

    return {
        datasetCount: data.datas?.total ?? 0,
        opdCount: new Set(Object.keys(data.pInstansi ?? {}).filter(Boolean)).size,
        urusanCount: new Set(Object.keys(data.pUrusan ?? {}).filter(Boolean)).size,
    };
}
