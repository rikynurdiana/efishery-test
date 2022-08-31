# Efishery Dashboard (Explanation)

## Project Overview

### Tampilan Awal

![dashboard](https://raw.githubusercontent.com/rikynurdiana/efishery-test/master/src/assets/images/list.jpeg "dashboard")

Untuk halaman awal saya membuat simple dan tidak terlalu ramai dengan warna nya. Alasan nya agar pengguna tidak bingung dan terganggu dengan banyak nya permainan warna.
Tema ini bisa di sebut dengan Simple Clean Monochrome.

### Tampilan Filter

![dashboard](https://raw.githubusercontent.com/rikynurdiana/efishery-test/master/src/assets/images/form-filter.jpeg "dashboard")

Pada halaman filter saya membuat colapse alasan nya agar ketika user pertama membuka halaman tidak terganggu dengan banyak nya filter. Jadi jika ingin menggunakan fitur filter tinggal meng click tombol `filter data`.

### Tampilan Form Tambah Data

![dashboard](https://raw.githubusercontent.com/rikynurdiana/efishery-test/master/src/assets/images/form-add.jpeg "dashboard")

Untuk tampilan form tambah data, disini saya membuat modal karena untuk mempercepat pengisian data. Jika harus masuk ke halaman lain maka akan memperlama penginputan data. Jadi saya buat popup agar lebih simple dan cepat.

### Tampilan Form Detail Data

![dashboard](https://raw.githubusercontent.com/rikynurdiana/efishery-test/master/src/assets/images/form-detail.jpeg "dashboard")

Di halaman detail pun saya buat popup agar mudah dan cepat. Untuk tampilan nya saya buat simple agar mudah di pahami data yang sedang di lihat.

### Tampilan Form Ubah Data

![dashboard](https://raw.githubusercontent.com/rikynurdiana/efishery-test/master/src/assets/images/form-edit.jpeg "dashboard")

Untuk tampilan form ubah data saya buat sama dengan tampilan tambah data baru. Alasan nya agar konsisten dann tidak membuat pengguna bingung. Untuk pengisian data nya pun bisa lebih cepat. karena sudah terbiasa dengan popup tambah data baru.

### Tampilan Konfirmasi Hapus Data

![dashboard](https://raw.githubusercontent.com/rikynurdiana/efishery-test/master/src/assets/images/form-delete.jpeg "dashboard")

Untuk tampilan konfirmasi hapus data saya buat sederhana dan lebih terfokus. Jadi ketika pengguna akan menghapus data yang dipilih maka dia akan lebih yakin lagi.

## Project Overview

### State Management

Untuk State management yang saya gunakan adalah [redux-toolkit](https://redux-toolkit.js.org/).

### CSS Framework

CSS Framework yang saya gunakan adalah [react-bootstrap](https://react-bootstrap.github.io/getting-started/introduction/).

### Loading overlay

Library untuk loading overlay yang saya gunakan adalah [react-spinner-overlay](https://npm.io/package/react-spinner-overlay).

### Api Service

Api service yang saya gunakan untuk CRUD adalah [stein-js-client](https://docs.steinhq.com/introduction).

### Helper Library

Untuk Helper Library saya gunakan [lodash](https://lodash.com/).

## Flow Data, Komponen dan Fetch Data

Untuk semua logic yang berhubungan dengan halaman, saya buat didalam satu file `slice redux` . Alasan nya agar semua pengolahan state dan logic ada di dalam satu tempat. Tidak ada logic yang saya tulis di komponen, komponent hanya menerima state saja.

Komponen yang saya buat sudah modular, Jadi ketika akan membuat menu baru tinggal `copy paste` dari menu lain dan hanya mengubah state nya saja.

## Notes

Saya tidak menggunakan [json-reactform](https://github.com/eFishery/json-reactform) milik efishery dikarenakan tidak sesuai dengan tampilan aplikasi yang saya buat. Library nya tidak bisa di configurasi untuk tampilan dan ada issue yang krusial yaitu tidak support untuk sistem pemilihan `provinsi` dan `kota`. Jadi saya putuskan tidak menggunakan nya.

Untuk pengembangan ke depan akan saya buat jsonToForm sendiri agar tidak terlalu banyak file component form. Dan dapat di kostumisasi tampilan dan logika component nya.
