import { BASE_UPSTREAM } from "./config";

// Fungsi fetch Server Component --> data otomatis di-cache & revalidate.
export async function serverFetch(path, { query = {}, revalidate = 60 } = {}) {
    const qs = new URLSearchParams(query).toString();
    const url = `${BASE_UPSTREAM}/${path}${qs ? `?${qs}` : ""}`;
    console.log('Urlnya: ', url);
    const res = await fetch(url, { next: { revalidate } });

    // kalau upstream error → lempar error dengan detail response
    if (!res.ok) {
        throw new Error(`Upstream error ${res.status}: ${await res.text()}`);
    }
    return res.json();
}

// Fungsi fetch Client Component -> lewat proxy API internal agar tidak langsung expose BASE_UPSTREAM
export async function clientFetch(path, { query = {} } = {}) {
    const qs = new URLSearchParams(query).toString();
    const url = `/api/proxy/${path}${qs ? `?${qs}` : ""}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Proxy error ${res.status}`);
    return res.json();
}


// res.json() itu bukan menentukan isi JSON, tapi hanya mengubah body respons dari server API menjadi object JavaScript.
// Isi JSON-nya 100% tergantung endpoint API yang dipanggil (BASE_UPSTREAM/{path}).

// 1. Kenapa bisa beda-beda?
// Karena tiap endpoint punya data yang berbeda.
// Misalnya:

// Endpoint /sekilas hanya ngirim jumlah ringkasan (datasetCount, opdCount, urusanCount).
// Endpoint /indikator bisa ngirim daftar indikator dengan caption, tahun, persentase.
// Endpoint /dataset/{id} bisa ngirim detail dataset (nama, deskripsi, sumber, tanggal update).
// res.json() tidak tahu struktur datanya, dia cuma mengembalikan apa pun yang server kasih.

// 2. Analogi gampangnya
// Bayangkan kamu punya 3 pintu berbeda (endpoint):

// Pintu A (/sekilas) → di balik pintu ada kotak berisi 3 angka ringkasan.
// Pintu B (/indikator) → di balik pintu ada daftar tabel pertumbuhan ekonomi.
// Pintu C (/dataset/123) → di balik pintu ada detail satu dataset.
// Nah fungsi serverFetch itu kayak asisten yang buka pintu dan bawain isi kotak ke kamu. Isinya bisa beda-beda, tergantung pintu mana yang kamu suruh buka.