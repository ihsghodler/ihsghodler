/* =============================================================================
   PENGATURAN SITUS IHSGHodler
   -----------------------------------------------------------------------------
   Ubah nama menu, judul halaman, tautan media sosial, teks pop-up, nomor
   WhatsApp, dan daftar sekuritas DI BERKAS INI SAJA. Semua halaman membacanya.

   Berkas sumber   : C:\Claude\ihsg-dashboard\web\site\pengaturan.js
   Terbitkan       : python ihsg.py web   (jalankan dari folder ihsg-dashboard),
                     atau tunggu pembaruan terjadwal berikutnya (ikut menerbitkan situs).

   Isian tiap menu:
     id    = kode tetap halaman. JANGAN diubah (dipakai oleh berkas halaman).
     nama  = teks di menu atas dan di pop-up.
     judul = judul halaman (tab browser dan judul besar di halaman).
     ket   = keterangan singkat di bawah nama, tampil di pop-up.
     url   = alamat tujuan. Untuk halaman di situs ini harus sama dengan nama
             berkasnya, misalnya "cek-keuangan.html".
     ikon  = grafik | dompet | perisai | youtube | instagram | tiktok | discord | tautan
     jenis = "halaman" (halaman situs ini) atau "tautan" (situs luar, dibuka di tab baru)

   Urutan menu mengikuti urutan daftar di bawah.
   Jaga tanda kutip, koma, dan kurung tetap utuh agar berkas tidak rusak.
   ============================================================================= */
window.IHSG_SITUS = {
  merek: 'IHSGHodler',

  menu: [
    {
      id: 'home', jenis: 'halaman',
      nama: 'Home',
      judul: 'Proyeksi Mingguan IHSG',
      ket: 'Dashboard proyeksi mingguan IHSG',
      url: './', ikon: 'grafik'
    },
    {
      id: 'cek-keuangan', jenis: 'halaman',
      nama: 'Cek kesehatan keuanganmu!',
      judul: 'Cek Kesehatan Keuangan',
      ket: 'Hitung kekayaan bersih, cashflow, dan target finansial',
      url: 'cek-keuangan.html', ikon: 'dompet'
    },
    {
      id: 'sekuritas-asuransi', jenis: 'halaman',
      nama: 'Daftar Sekuritas & Asuransi',
      judul: 'Daftar Sekuritas & Asuransi',
      ket: 'Pilihan sekuritas dan pentingnya asuransi',
      url: 'sekuritas-asuransi.html', ikon: 'perisai'
    },
    {
      id: 'youtube', jenis: 'tautan',
      nama: 'YouTube',
      ket: 'Tonton video IHSGHodler',
      url: 'https://www.youtube.com/@ihsghodler', ikon: 'youtube'
    },
    {
      id: 'instagram', jenis: 'tautan',
      nama: 'Instagram',
      ket: 'Follow @ihsghodler',
      url: 'https://www.instagram.com/ihsghodler/', ikon: 'instagram'
    },
    {
      id: 'tiktok', jenis: 'tautan',
      nama: 'TikTok',
      ket: 'Follow @ihsghodler',
      url: 'https://www.tiktok.com/@ihsghodler', ikon: 'tiktok'
    },
    {
      id: 'discord', jenis: 'tautan',
      nama: 'Join discord!',
      ket: 'Diskusi bareng komunitas',
      url: 'https://discord.gg/3V3pH9ETeM', ikon: 'discord'
    }
  ],

  /* Pop-up sambutan. Muncul di halaman "diHalaman"; setelah ditutup berubah
     menjadi menu ringkas di paling atas semua halaman. */
  popup: {
    diHalaman: 'home',
    judul: 'Selamat datang di IHSGHodler 👋',
    teks: 'Proyeksi mingguan IHSG, alat cek kesehatan keuangan, dan komunitas investor dalam satu tempat. Mau mulai dari mana?',
    judulSosial: 'Ikuti & gabung komunitas',
    tombol: 'Tutup & lihat proyeksi IHSG',
    catatan: 'Setelah ditutup, menu ini pindah ke bagian paling atas setiap halaman.',
    munculLagiSetelahHari: 7,   // pengunjung yang sudah menutup baru melihatnya lagi setelah 7 hari; 0 = setiap kunjungan
    versi: 1                    // naikkan angka ini agar pop-up langsung muncul lagi untuk semua pengunjung
  },

  kontak: {
    whatsapp: '6285122345992',  // kode negara + nomor, tanpa tanda + dan spasi
    pesanAsuransi: 'Halo IHSGHodler, saya ingin konsultasi soal asuransi.'
  },

  /* Daftar sekuritas di halaman "Daftar Sekuritas & Asuransi".
     - link         : tautan afiliasi/referral Anda. Kartu yang link-nya masih kosong TIDAK ditampilkan.
     - kodeReferral : opsional, tampil dengan tombol salin.
     - afiliasi     : true = kartu diberi label "Afiliasi" dan tautan ditandai sponsored.
     - logo         : opsional, alamat gambar logo (kosongkan untuk memakai huruf awal).
     Hapus baris sekuritas yang tidak dipakai, atau tambah baris baru dengan pola yang sama. */
  sekuritas: [
    { nama: 'Stockbit Sekuritas', ket: 'Aplikasi saham dengan fitur komunitas dan analisis.', link: '', kodeReferral: '', afiliasi: true, logo: '' },
    { nama: 'Ajaib Sekuritas', ket: 'Aplikasi investasi saham.', link: '', kodeReferral: '', afiliasi: true, logo: '' },
    { nama: 'IPOT (Indo Premier Sekuritas)', ket: 'Aplikasi investasi saham.', link: '', kodeReferral: '', afiliasi: true, logo: '' },
    { nama: 'Mirae Asset Sekuritas', ket: 'Aplikasi investasi saham.', link: '', kodeReferral: '', afiliasi: true, logo: '' },
    { nama: 'BRI Danareksa Sekuritas (BRIGHTS)', ket: 'Aplikasi investasi saham.', link: '', kodeReferral: '', afiliasi: true, logo: '' },
    { nama: 'Mandiri Sekuritas (MOST)', ket: 'Aplikasi investasi saham.', link: '', kodeReferral: '', afiliasi: true, logo: '' }
  ]
};
