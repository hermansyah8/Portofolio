# Porto Diki

Website portofolio Asep Diki Hermansyah (Software QA Engineer). HTML, CSS dan JavaScript biasa, tanpa build tool dan tanpa backend.

## Cara kerja (halaman dinamis)
Semua isi ada di `data.js`. `app.js` membaca data itu dan membangun halaman. Mau ubah proyek, pengalaman, skill atau kontak? Edit `data.js` saja, tidak perlu menyentuh HTML.

Yang dinamis:
- semua bagian (proyek, pengalaman, pendidikan, skill, sertifikasi, kontak) dibangun dari `data.js`
- tombol EN/ID mengganti semua teks, termasuk nama bulan
- animasi (semua mati otomatis kalau perangkat memakai "reduce motion"):
  - loading: layar gelap dengan logo D dan bar mengisi, lalu naik membuka halaman (juga jadi transisi masuk halaman); hero main setelah itu
  - scroll reveal dan fade/slide in: kartu proyek, kartu pengalaman dan pendidikan (kolom kiri dari kiri, kolom kanan dari kanan), chip, panel masuk bergantian; judul section muncul dengan efek wipe
  - scroll trigger: elemen beranimasi saat masuk 15% layar dan main lagi setiap di-scroll balik dari bawah; angka besar di kartu proyek bergeser; ikon mouse di hero menunjukkan "scroll"
  - fade out: hero memudar saat di-scroll turun
  - parallax: foto, panel, dan bulatan cahaya di hero bergerak dengan kecepatan beda saat scroll
  - smooth scroll: klik menu atau tombol anchor menggulung dengan easing sendiri; bar progres di atas halaman dan menu aktif mengikuti posisi
  - hover: garis menu tumbuh, kartu dan panel terangkat, foto membesar pelan
  - micro interaction: tombol menekan (scale), kilau lewat saat hover, ripple di titik klik
  - transisi bahasa: halaman memudar, teks diganti, lalu muncul lagi
  - titik hijau di kartu pekerjaan saat ini berdenyut
- tanggal diformat otomatis (nama bulan ikut bahasa)
- teks About diambil dari Summary di CV (`about` di `data.js`)
- sertifikat: isi `issuer` (penyelenggara) dan `url` (link atau file sertifikat, misalnya `"https://..."` atau `"certificates/bootcamp.pdf"`). Baris yang punya `url` menjadi link dengan tanda panah ↗ dan membuka sertifikatnya langsung

## File
- `index.html` — kerangka halaman. Satu halaman saja; pelatihan dan sertifikasi ada di kartu sendiri di bawah Education (daftar dari `certs` di `data.js`, terbaru di atas)
- `data.js` — semua isi (teks `{ en, id }` tampil sesuai bahasa pengunjung; tanggal format `"YYYY-MM"`, `end: null` berarti sekarang)
- `app.js` — render dari `data.js`, tombol bahasa, fade-in, dan reload otomatis saat ada deploy baru
- `style.css` — tampilan terinspirasi gojek.com (bukan salinan): navbar navy, hero hijau full-width dengan foto arch, kartu proyek, kartu pengalaman dan pendidikan (Work Experience dua kolom, Education di bawahnya). Warna di `:root`, mulai dari `--green`
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
