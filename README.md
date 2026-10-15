# TelU Hub 🎓

> **TelU Hub** adalah platform komunitas mahasiswa Telkom University berbasis web yang menyediakan ruang tulisan/artikel, forum diskusi komunitas, dan rekomendasi tempat menarik di sekitar kampus.

---

## 👥 Informasi Kelompok

**Nama Kelompok:** Perceng Cabang Bandung  
**Kelas:** SE-48-01  

### Anggota Kelompok:

| No | Nama | NIM |
|:--:|:---|:---:|
| 1 | Rifky Muhammad Prayudhi | 103022400003 |
| 2 | Sofia Maheira Simanihuruk | 103022400084 |
| 3 | Muhamad Naufal Nabillansyah | 103022400073 |
| 4 | Zulfan Falah Permana | 103022400076 |
| 5 | Joanne Agnesia Nempung | 10302200114 |
| 6 | Aruna Jannu Rezasyah | 103022430015 |

---

## 📁 Struktur Proyek

Proyek ini telah distrukturisasi secara modular dengan arsitektur terpisah antara halaman HTML, skrip JavaScript (API, Templating, Controller), stylesheet CSS, dan data JSON Server:

```text
webpro_kelompok_perceng-cabang-bandung/
├── datas.json               # Database lokal untuk JSON Server
├── package.json             # Dependensi proyek (json-server)
├── README.md                # Dokumentasi proyek
├── pages/                   # Halaman-halaman HTML
│   ├── index.html           # Beranda utama
│   ├── bookmark.html        # Halaman bookmark tersimpan
│   ├── article-detail.html  # Halaman detail artikel & komentar
│   ├── login.html           # Halaman masuk
│   ├── register.html        # Halaman pendaftaran
│   └── settings.html        # Halaman pengaturan preferensi & akun
├── scripts/                 # Logika JavaScript, API, & Templating
│   ├── api.js               # Komunikasi AJAX ke JSON Server
│   ├── index.js             # Controller untuk beranda
│   ├── index-templates.js   # Generator template HTML beranda (XSS-safe)
│   ├── bookmark.js          # Controller & manajemen state bookmark
│   └── bookmark-templates.js# Generator template HTML bookmark (XSS-safe)
└── styles/                  # Stylesheet
    └── style.css            # Stylesheet utama (CSS Native, Variables, Grid, Responsive)
```

---

## 📄 Daftar Halaman

1. **`pages/index.html`** — Halaman utama/beranda yang menampilkan hero banner, rekomendasi tempat populer, tulisan pilihan, dan diskusi terbaru yang dimuat secara dinamis melalui REST API.
2. **`pages/bookmark.html`** — Halaman kelola bookmark pengguna. Mendukung filter kategori (Semua, Artikel, Tempat, Diskusi), fitur hapus bookmark via AJAX, dan penanganan empty state.
3. **`pages/article-detail.html`** — Halaman detail artikel yang menampilkan teks lengkap tulisan, meta penulis, sistem komentar, dan artikel terkait.
4. **`pages/login.html`** — Halaman autentikasi/masuk untuk akun mahasiswa Telkom University.
5. **`pages/register.html`** — Halaman pendaftaran akun mahasiswa baru dengan form data mahasiswa dan data akun.
6. **`pages/settings.html`** — Halaman pengaturan preferensi akun, keamanan (ubah kata sandi), notifikasi email, tema (terang/gelap), serta tautan bantuan.

---

## 🛠️ Fitur & Spesifikasi Teknis

- **Integrasi REST API & AJAX (JSON Server):** 
  - Menggunakan `jQuery.ajax()` untuk komunikasi asinkron dengan `json-server` (`http://localhost:3000`).
  - Pengambilan data beranda secara dinamis (`/articles`, `/places`, `/discussions`).
  - Manajemen bookmark lengkap (GET & DELETE) untuk `/saved-articles`, `/saved-places`, dan `/saved-discussions`.
- **Manajemen State & Client-Side Filtering:** 
  - Penyimpanan state lokal pada halaman bookmark untuk pembaruan UI secara langsung tanpa perlu *reload* halaman.
  - Filter interaktif berdasarkan kategori (Semua, Artikel, Tempat, Diskusi).
- **Keamanan & Aksesibilitas:**
  - Fungsi `escapeHtml()` di semua generator template untuk mencegah kerentanan **XSS (Cross-Site Scripting)**.
  - Penggunaan tag HTML5 Semantik (`<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<fieldset>`) dan atribut ARIA (`aria-live`, `aria-busy`, `aria-current`, `role="alert"`).
- **Desain Responsive & CSS Modern:**
  - Stylesheet tersentralisasi di `styles/style.css` menggunakan CSS Custom Properties (Variables), Flexbox, dan CSS Grid System (`grid-2`, `grid-3`).
  - Breakpoint media query `@media (max-width: 820px)` dan `@media (max-width: 600px)` untuk tampilan mobile yang nyaman.

---

## 📸 Preview Tampilan

### 1. Halaman Beranda (`pages/index.html`)
<img width="1916" height="935" alt="Halaman Beranda 1" src="https://github.com/user-attachments/assets/6fd09f0a-e11e-43a3-a735-2d2c0dd3cc37" />
<img width="1901" height="932" alt="Halaman Beranda 2" src="https://github.com/user-attachments/assets/90f33ba6-9b0e-4e58-876e-eec62c3deb86" />

### 2. Halaman Bookmark (`pages/bookmark.html`)
<img width="1896" height="935" alt="Halaman Bookmark 1" src="https://github.com/user-attachments/assets/c53afa1f-4d12-4718-a151-827641257a0e" />
<img width="1895" height="932" alt="Halaman Bookmark 2" src="https://github.com/user-attachments/assets/89ee0d84-d099-435c-803b-856a1fa1ac60" />
<img width="1900" height="927" alt="Halaman Bookmark 3" src="https://github.com/user-attachments/assets/e1e5d3f7-3635-4723-8640-9b20e0ad5714" />

### 3. Halaman Detail Artikel (`pages/article-detail.html`)
<img width="1912" height="962" alt="Halaman Detail Artikel" src="https://github.com/user-attachments/assets/3de0211f-54e3-4f96-8da3-4ac846a05c16" />

### 4. Halaman Masuk (`pages/login.html`)
<img width="1913" height="960" alt="Halaman Login" src="https://github.com/user-attachments/assets/ff7ebea5-5fb9-432a-977a-00821b543db3" />

### 5. Halaman Daftar (`pages/register.html`)
**Desktop:**  
<img width="1600" height="896" alt="Halaman Register Desktop" src="https://github.com/user-attachments/assets/b4b0dc9f-aae3-4a8b-bb7f-c946dc04b5cd" />

**Mobile:**  
<img width="688" height="922" alt="Halaman Register Mobile 1" src="https://github.com/user-attachments/assets/f6c3b99e-301f-4e83-ae07-56bc2e57d6dc" />
<img width="687" height="932" alt="Halaman Register Mobile 2" src="https://github.com/user-attachments/assets/b5f673fe-b21a-4b33-8b39-d11f2e596b55" />

### 6. Halaman Pengaturan (`pages/settings.html`)
<img width="1910" height="961" alt="Halaman Settings" src="https://github.com/user-attachments/assets/e2ffec70-cdd9-497d-96a4-4abdea71513b" />

---

## 🚀 Cara Menjalankan Proyek

1. **Clone Repositori:**
   ```bash
   git clone <URL_REPOSITORY>
   cd webpro_kelompok_perceng-cabang-bandung
   ```

2. **Jalankan JSON Server (Mock Backend):**
   Pastikan Node.js sudah terinstal, lalu jalankan perintah berikut di terminal root proyek:
   ```bash
   npx json-server datas.json --port 3000
   ```
   Data akan tersedia di `http://localhost:3000` dengan endpoint:
   - `http://localhost:3000/articles`
   - `http://localhost:3000/places`
   - `http://localhost:3000/discussions`
   - `http://localhost:3000/saved-articles`
   - `http://localhost:3000/saved-places`
   - `http://localhost:3000/saved-discussions`

3. **Buka Aplikasi:**
   Buka file `pages/index.html` menggunakan ekstensi **Live Server** di VS Code atau web server lokal lainnya agar permintaan AJAX tidak terhalang oleh aturan CORS browser.
