/* Dashboard di layar HP (hanya salinan publik GitHub Pages).
   Tabel dengan 5 kolom atau lebih diberi kelas "hp-kartu" dan setiap sel diberi label
   dari judul kolomnya, supaya di layar sempit tabel tampil sebagai kartu per baris
   (lihat dashboard-hp.css). Tabel digambar ulang oleh ix.js, jadi pelabelan diulang
   setiap kali isi dashboard berubah. */
(function () {
  'use strict';
  var MIN_KOLOM = 5;
  var sempit = window.matchMedia ? window.matchMedia('(max-width: 760px)') : { matches: false };

  function teks(el) { return (el.textContent || '').replace(/\s+/g, ' ').trim(); }

  function meluber(tb) {
    var wadah = tb.closest ? tb.closest('.ix-scroll') : null;
    return !!(wadah && sempit.matches && wadah.scrollWidth > wadah.clientWidth + 2);
  }

  function labeli(tb) {
    var kepala = tb.tHead && tb.tHead.rows.length ? tb.tHead.rows[tb.tHead.rows.length - 1].cells : [];
    var judul = Array.prototype.map.call(kepala, teks);
    // Kartu bila kolomnya banyak, atau bila tabel yang lebih kecil tidak muat di layar sempit.
    var kartu = judul.length >= MIN_KOLOM || (judul.length >= 2 && (tb.classList.contains('hp-kartu') || meluber(tb)));
    if (!kartu) { tb.classList.remove('hp-kartu'); return; }
    tb.classList.add('hp-kartu');
    tb.classList.toggle('hp-nomor', /^(no\.?|#)$/i.test(judul[0] || ''));
    Array.prototype.forEach.call(tb.tBodies, function (badan) {
      Array.prototype.forEach.call(badan.rows, function (tr) {
        var i = 0;
        Array.prototype.forEach.call(tr.cells, function (td) {
          var lebar = td.colSpan || 1;
          if (lebar > 1) td.classList.add('hp-penuh');
          else if (judul[i]) td.setAttribute('data-label', judul[i]);
          i += lebar;
        });
      });
    });
  }

  function semua() { Array.prototype.forEach.call(document.querySelectorAll('.ix-table'), labeli); }

  var jeda = 0;
  var akar = document.getElementById('dash-root') || document.body;
  new MutationObserver(function () { clearTimeout(jeda); jeda = setTimeout(semua, 30); })
    .observe(akar, { childList: true, subtree: true });
  semua();
})();
