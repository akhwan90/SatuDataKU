import Banner from "../components/banner";
import Sekilas from "../components/sekilas";
import Indikator from "../components/indikator-makro/indikator";
import Statistik from "../components/data-statistik/statistik";
import Terbaru from "../components/terbaru";
import Footer from "../components/footer";

export default function Home() {
  return (
    <main>
      <Banner />
      <Sekilas />
      <Indikator />
      <Statistik />
      <Terbaru />
      <Footer />
    </main >
  );
}
