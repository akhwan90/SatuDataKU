import Sekilas from "./sekilasLayout";
import { getSekilasData } from "../api/chain-sekilas";

export default async function SekilasWrapper() {
    const sekilas = await getSekilasData({ revalidate: 300 });

    return (
        <Sekilas
            datasetCount={sekilas.datasetCount}
            opdCount={sekilas.opdCount}
            urusanCount={sekilas.urusanCount}
        />
    );
}
