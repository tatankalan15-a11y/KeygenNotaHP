# Keygen Nota Service HP

Aplikasi Android sederhana untuk **developer** agar bisa generate kode aktivasi dari SN pelanggan.

> **Peringatan:** Jangan bagikan APK keygen ke pelanggan. Hanya untuk Anda.

## Cara pakai
1. Buka app Keygen.
2. Masukkan **SN** yang dikirim pelanggan (dari form aktivasi di app Nota Service HP).
3. Tekan **Generate Kode Aktivasi**.
4. Salin kode → kirim ke pelanggan.

## Build APK via GitHub
1. Buat repository GitHub baru.
2. Upload **isi folder** `KeygenNotaHP` (bukan file ZIP-nya saja). Pastikan `.github/workflows/build-apk.yml` ikut.
3. Tab **Actions** → **Build APK** → **Run workflow**.
4. Unduh artifact `KeygenNotaHP-debug-apk`.

## Penting
- Nilai `SECRET` di `src/app.js` **harus sama** dengan `LICENSE.SECRET` di aplikasi utama (`NotaServiceHP-Capacitor/src/app.js`).
- Jika Anda ganti SECRET di app utama, ganti juga di keygen ini.
