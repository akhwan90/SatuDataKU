// app/statistik/page.jsx
import { getList } from "../../lib/api/dataset";
import FilterSidebar from "./komponen/FilterSidebar";
import SearchBar from "./komponen/SearchBar";
import SortDropdown from "./komponen/SortDropdown";
import DatasetCard from "./komponen/DatasetCard";
import Pagination from "./komponen/Pagination";

export const revalidate = 60; // ISR 60 detik

export default async function StatistikPage({ searchParams }) {
  const params = await searchParams;

  const page = Number(params?.page || 1);
  const opd = params?.opd || "";
  const urusan = params?.urusan || "";
  const q = (params?.q || "").toLowerCase();
  const sort = params?.sort || "az";

  let datasets = [];
  let totalFound = 0;

  // ✅ Jika ada pencarian, ambil semua page
  if (q) {
    let allData = [];
    let currentPage = 1;
    let lastPage = 1;

    do {
      const resp = await getList({
        page: currentPage,
        opd: opd || undefined,
        urusan: urusan || undefined,
        revalidate,
      });

      const data = resp?.datas?.data ?? [];
      allData = [...allData, ...data];

      lastPage = resp?.datas?.last_page ?? 1;
      currentPage++;
    } while (currentPage <= lastPage);

    datasets = allData;
    totalFound = allData.length;
  } else {
    // ✅ Kalau tidak ada search → cukup fetch sesuai page
    const resp = await getList({
      page,
      opd: opd || undefined,
      urusan: urusan || undefined,
      revalidate,
    });

    datasets = resp?.datas?.data ?? [];
    totalFound = resp?.datas?.total ?? datasets.length;
  }

  // Filter berdasarkan q (local filter setelah data terkumpul)
  let filtered = datasets;
  if (q) {
    filtered = filtered.filter(
      (it) =>
        (it?.nama_elemen || "").toLowerCase().includes(q) ||
        (it?.nama_instansi || "").toLowerCase().includes(q)
    );
    totalFound = filtered.length;
  }

  // Sort
  filtered = [...filtered].sort((a, b) => {
    const A = (a?.nama_elemen || "").toLowerCase();
    const B = (b?.nama_elemen || "").toLowerCase();
    if (sort === "za") return B.localeCompare(A);
    return A.localeCompare(B);
  });

  // Pagination manual (hanya untuk hasil filter)
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filtered.slice(startIndex, endIndex);

  // Ambil kamus OPD & Urusan (dari salah satu response)
  const metaResp = await getList({ page: 1 });
  const pInstansi = metaResp?.pInstansi ?? {};
  const pUrusan = metaResp?.pUrusan ?? {};

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="max-w-7xl mx-auto px-8 md:px-20">

        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <div className="flex-1">
            <SearchBar initialQuery={q} />
          </div>
          <div className="w-full md:w-48">
            <SortDropdown initialSort={sort} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filter */}
          <aside className="w-full md:w-72 shrink-0">
            <FilterSidebar
              initialOpd={opd}
              initialUrusan={urusan}
              pInstansi={pInstansi}
              pUrusan={pUrusan}
            />
          </aside>

          {/* Konten Utama */}
          <main className="flex-1 space-y-4">
            <h1 className="text-lg font-semibold">
              {totalFound} Dataset Ditemukan
            </h1>

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

            <div className="pb-6">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                preserve={{ opd, urusan, q, sort }}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
