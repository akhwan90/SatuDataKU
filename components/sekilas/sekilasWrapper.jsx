// yang dipanggil wrapper nya karena ini server komponent

import Sekilas from "./sekilas";
import { getSekilasData } from "../../lib/api/sekilas";

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
