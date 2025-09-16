// app/statistik/page.jsx
import { getList } from "../../lib/api/dataset";
import FilterSidebar from "./komponen/FilterSidebar";
import FilterForMobile from "./komponen/FilterForMobile";
import SearchBar from "./komponen/SearchBar";
import DatasetCard from "./komponen/DatasetCard";
import Pagination from "./komponen/Pagination";

export const revalidate = 60;

export default async function StatistikPage({ searchParams }) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const opd = params?.opd || "";
  const urusan = params?.urusan || "";
  const q = (params?.q || "").toLowerCase();
  const sort = params?.sort || "az";

  const itemsPerPageUI = 10;
  const itemsPerApiPage = 100;

  // Ambil semua data dari API
  let allDatasets = [];
  let apiPage = 1;
  let hasMore = true;

  while (hasMore) {
    const resp = await getList({
      page: apiPage,
      opd: opd || undefined,
      urusan: urusan || undefined,
      revalidate,
    });

    const data = resp?.datas?.data ?? [];
    allDatasets.push(...data);

    hasMore = data.length === itemsPerApiPage;
    apiPage++;

    // Simpan kamus OPD & Urusan dari halaman pertama
    if (apiPage === 2) {
      var pInstansi = resp?.pInstansi ?? {};
      var pUrusan = resp?.pUrusan ?? {};
    }
  }

  let filtered = allDatasets;

  // Filter search lokal
  if (q) {
    filtered = filtered.filter(
      (it) =>
        (it?.nama_elemen || "").toLowerCase().includes(q) ||
        (it?.nama_instansi || "").toLowerCase().includes(q)
    );
  }

  const totalFound = filtered.length;

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    const A = (a?.nama_elemen || "").toLowerCase();
    const B = (b?.nama_elemen || "").toLowerCase();
    return sort === "za" ? B.localeCompare(A) : A.localeCompare(B);
  });

  // Slice untuk UI page
  const startIndex = ((page - 1) % (itemsPerApiPage / itemsPerPageUI)) * itemsPerPageUI;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPageUI);

  const totalPagesUI = Math.ceil(totalFound / itemsPerPageUI);

  return (
    // canvas utama dengan bg-image
    <div className="w-full bg-[url('/assets/bg1.jpg')] bg-cover bg-center bg-no-repeat">

      {/* section halaman utama */}
      <section className="px-6 py-20 max-w-7xl mx-auto space-y-6">

        {/* searchbar */}
        <div className="w-full flex flex-col md:flex-row md:justify-end mb-4">
          <div className="w-full md:w-96">
            <SearchBar initialQuery={q} />
          </div>
        </div>

        {/* panel bawah */}
        <div className="grid grid-cols-12 gap-3">

          {/* panel kiri */}
          {/* Mobile Filter Button + Modal */}
          <div className="col-span-12">
            <FilterForMobile opd={opd} pInstansi={pInstansi} urusan={urusan} pUrusan={pUrusan} />
          </div>

          {/* Sidebar hanya untuk desktop */}
          <div className="hidden md:block md:col-span-4 bg-white/40 backdrop-blur-md rounded-xl border border-white/20 p-2">
            <FilterSidebar
              initialOpd={opd}
              pInstansi={pInstansi}
              initialUrusan={urusan}
              pUrusan={pUrusan}
            />
          </div>

          {/* panel kanan */}
          <div className="col-span-12 md:col-span-8 flex flex-col bg-white/40 backdrop-blur-md rounded-xl border border-white/20 p-2">
            <div className="w-full my-5">
              <h1 className="text-slate-800 font-semibold">
                Ditemukan : {totalFound} Dataset
              </h1>
            </div>

            {/* kartu dataset */}
            <main className="flex-1 space-y-4">
              <div className="space-y-3">
                {paginatedData.map((item) => (
                  <DatasetCard
                    key={item.id}
                    item={item}
                    currentPage={page}
                    opd={opd}
                    urusan={urusan}
                    q={q}
                    sort={sort}
                  />
                ))}
                {paginatedData.length === 0 && (
                  <div className="p-6 bg-white/80 border rounded-2xl text-gray-500">
                    Tidak ada dataset yang cocok dengan pencarian.
                  </div>
                )}
              </div>
            </main>

            {/* pagination */}
            <div className="mt-auto pb-6">
              <Pagination
                currentPage={page}
                totalPages={totalPagesUI}
                preserve={{ opd, urusan, q, sort }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
