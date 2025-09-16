import Banner from "../components/banner";
import SekilasWrapper from "../components/sekilas/sekilasWrapper";
import Indikator from "../components/indikator-makro/indikator";
import Statistik from "../components/data-statistik/statistik";
import Terbaru from "../components/terkini";
import LoadingScreen from "../components/loading";

export default function Home() {
  return (
    <LoadingScreen>
      <main>
        <Banner />
        <SekilasWrapper />
        <Indikator />
        <Statistik />
        <Terbaru />
      </main>
    </LoadingScreen>
  );
}
