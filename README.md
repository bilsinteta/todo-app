# Go-React Todo App 🇮🇩

Halo! Ini adalah aplikasi **Todo List Fullstack** sederhana tapi modern. Proyek ini dibuat untuk belajar bagaimana cara menggabungkan **Golang** (backend) dan **React** (frontend) menjadi satu aplikasi yang utuh.

Cocok banget buat kamu yang mau belajar bikin aplikasi Fullstack atau sekedar *kepo* sama Golang & React.

---

## 🚀 Teknologi yang Dipakai

Aplikasi ini dibangun menggunakan teknologi kekinian:

### Backend (Sisi Server)
- **Golang**: Bahasa pemrograman yang kencang dan *type-safe*.
- **Fiber v2**: Framework web buat Go yang mirip Express.js (cepat banget!).
- **GORM**: Library buat ngobrol sama database (ORM), jadi gak perlu tulis query SQL manual terus.
- **MySQL**: Databasenya.
- **JWT**: Untuk sistem login yang aman (biar gak sembarang orang bisa akses).

### Frontend (Sisi Tampilan)
- **React**: Library JavaScript paling populer buat bikin UI.
- **Vite**: *Build tool* pengganti CRA (Create React App) yang super ngebut.
- **Axios**: Buat "nembak" API ke backend.
- **CSS Custom**: Desainnya pakai gaya *Glassmorphism* (efek kaca) biar estetik ✨.

---

## 🛠️ Persiapan (Wajib Install)

Sebelum mulai, pastikan di laptop kamu sudah terinstall "Tiga Serangkai" ini ya:

1.  **[Go (Golang)](https://go.dev/dl/)** (Minimal versi 1.20) - *Buat jalanin backendnya.*
2.  **[Node.js](https://nodejs.org/)** (Minimal versi 18) - *Buat jalanin frontendnya.*
3.  **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** - *Buat jalanin database MySQL tanpa ribet install manual.*

---

## 🏃‍♂️ Cara Menjalankan (Step-by-Step)

Ikuti langkah-langkah ini, dijamin jalan!

### 1. Clone Project Ini
Pertama, download dulu kodingannya ke laptop kamu. Buka terminal/CMD/Git Bash:

```bash
git clone https://github.com/bilsinteta/todo-app
cd todo-app
```
*(Ganti URL di atas dengan URL repository kamu sendiri nanti)*

### 2. Nyalakan Database (Paling Gampang Pakai Docker)
Kita pakai Docker biar nggak perlu setting MySQL manual. Pastikan Docker Desktop sudah jalan, lalu ketik:

```bash
docker-compose up -d
```
*Tunggu sebentar... Docker akan mendownload MySQL dan menjalankannya di background.*

### 3. Jalankan Backend (Golang)
Buka terminal baru, masuk ke folder backend:

```bash
cd backend
```

Bikin file rahasia `.env` dulu (ini isinya konfigurasi database & password).
**Cara cepat di Windows (PowerShell):**
```powershell
echo PORT=8080 > .env
echo DB_DSN="root:rootpassword@tcp(localhost:3310)/todo_db?charset=utf8mb4&parseTime=True&loc=Local" >> .env
echo JWT_SECRET="ganti_tulisan_ini_jadi_password_rahasia_kamu" >> .env
```
*(Atau kamu bisa bikin file baru bernama `.env` manual dan copy isinya)*

Terus, install library-nya dan jalankan servernya:
```bash
go mod tidy
go run main.go
```
🚀 Backend sekarang jalan di `http://localhost:8080`

### 4. Jalankan Frontend (React)
Buka terminal baru lagi (jangan matikan terminal backend), masuk ke folder frontend:

```bash
cd frontend
```

Install semua kebutuhan frontend:
```bash
npm install
```

Nyalakan web-nya:
```bash
npm run dev
```
✨ Frontend sekarang jalan di `http://localhost:5173`. Buka link itu di browser kamu!

---

## 📝 Fitur yang Bisa Dicoba

1.  **Register & Login**: Coba bikin akun baru, terus login. Kalau password salah, bakal ditolak.
2.  **Tambah Tugas**: Klik tombol "New Task" isi judul dan deskripsi.
3.  **Hapus / Selesai**: Centang tugas kalau sudah selesai, atau hapus kalau batal.
4.  **Responsive**: Coba buka di HP atau kecilkan browser, tampilannya tetap rapi (navbar pindah ke atas).

---

## 📂 Struktur Folder (Biar Gak Bingung)

```
todo-app/
├── backend/            # Dapur Backend (Golang)
│   ├── config/         # Settingan koneksi Database
│   ├── controllers/    # "Otak"-nya aplikasi (Logika login, tambah todo ada disini)
│   ├── models/         # Bentuk tabel database (Schema)
│   ├── routes/         # Daftar alamat API (misal: /login, /todos)
│   └── main.go         # Pintu masuk (Entry point) aplikasi
│
├── frontend/           # Muka Depan (React)
│   ├── src/
│   │   ├── components/ # Potongan UI (Tombol, Form, Navbar)
│   │   ├── pages/      # Halaman utama (Login & Dashboard)
│   │   └── index.css   # File styling (CSS)
│   └── package.json    # Daftar belanjaan library JS
│
└── docker-compose.yml  # Resep buat bikin container MySQL
```

---

Selamat mencoba! Kalau ada error, coba cek lagi apakah Docker sudah nyala atau port-nya bentrok. Happy Coding! 💻🔥
