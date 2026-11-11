# Porto Diki

Website portofolio Asep Diki Hermansyah (Software QA Engineer). HTML, CSS dan JavaScript biasa, tanpa build tool dan tanpa backend. Isi diambil dari `CVATSASEPDIKIHERMANSYAHV3.pdf`.

## Cara kerja (halaman dinamis)
Semua isi ada di `data.js`. `app.js` membaca data itu dan membangun halaman. Mau ubah proyek, pengalaman, skill atau kontak? Edit `data.js` saja, tidak perlu menyentuh HTML.

Yang dinamis:
- semua bagian (proyek, pengalaman, pendidikan, skill, sertifikasi, kontak) dibangun dari `data.js`
- tombol EN/ID mengganti semua teks, termasuk nama bulan
- animasi: elemen hero muncul bergantian, foto melayang pelan, angka di bawah hero menghitung naik, kartu dan chip muncul bergantian saat di-scroll, titik pekerjaan saat ini berdenyut. Semua mati otomatis kalau perangkat memakai "reduce motion"
- tanggal diformat otomatis; angka di bawah hero dihitung dari data: tahun di QA (`qaSince`), jumlah perusahaan (`experience`), jumlah tools (`tools`)

## File
- `index.html` — kerangka halaman. Satu halaman saja; pelatihan dan sertifikasi ada di kartu sendiri di bawah Education (daftar dari `certs` di `data.js`, terbaru di atas)
- `data.js` — semua isi (teks `{ en, id }` tampil sesuai bahasa pengunjung; tanggal format `"YYYY-MM"`, `end: null` berarti sekarang)
- `app.js` — render dari `data.js`, tombol bahasa, fade-in, dan reload otomatis saat ada deploy baru
- `style.css` — tampilan terinspirasi gojek.com (bukan salinan): navbar navy, hero hijau full-width dengan foto arch, strip angka, kartu proyek, timeline. Warna di `:root`, mulai dari `--green`
- `CVATSASEPDIKIHERMANSYAHV3.pdf` — CV. Kalau diganti, ubah `cv` di `data.js`
- `assets/diki.jpg` — foto profil di hero (salinan kecil dari file WhatsApp Image di folder ini; file asli boleh dihapus)
- `vercel.json` — header cache untuk Vercel

## Jalankan lokal
```bash
python3 -m http.server 5501
```
Buka http://localhost:5501

## Supaya bisa dibuka di laptop lain
- **Permanen:** deploy ke Vercel (lihat `vercel.json`). Push folder ini ke GitHub, lalu import di vercel.com. Hasilnya URL `https://nama-proyek.vercel.app`.
- **Sementara, satu WiFi:** jalankan `python3 -m http.server 5501`, lalu buka `http://IP-LAPTOP-KAMU:5501` di laptop lain. IP lihat dengan `ipconfig getifaddr en0`.
- **Sementara, beda jaringan:** `npx localtunnel --port 5501` atau `cloudflared tunnel --url http://localhost:5501` memberi URL publik selama perintahnya jalan.
