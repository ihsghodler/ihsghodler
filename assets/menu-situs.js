/* =============================================================================
   Menu situs IHSGHodler
   - Halaman utama: pop-up sambutan berisi menu. Setelah ditutup, pop-up
     "melipat" menjadi menu ringkas di paling atas halaman.
   - Halaman lain: menu ringkas langsung tampil di paling atas.
   Semua teks dan tautan dibaca dari pengaturan.js (window.IHSG_SITUS);
   jangan menulis nama menu di berkas ini.

   Cara pasang di halaman baru:
     <html lang="id" data-halaman="id-halaman-di-pengaturan">
     <link rel="stylesheet" href="assets/menu-situs.css">          (di <head>)
     <script src="pengaturan.js"></script>
     <script src="assets/menu-situs.js"></script>                  (tepat setelah <body>)
   Tambahkan ?popup=1 di alamat halaman utama untuk memaksa pop-up muncul.
   ============================================================================= */
(function () {
  'use strict';

  var S = window.IHSG_SITUS;
  if (!S || !Array.isArray(S.menu) || !S.menu.length) return;

  var doc = document;
  var root = doc.documentElement;
  var idHalaman = root.getAttribute('data-halaman') || '';
  var merek = S.merek || '';
  var P = S.popup || {};
  var KUNCI = 'ihsghodler-popup-menu';
  var gerakMinim = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  var IKON = {
    grafik: '<path d="M4 19.5h16"/><path d="M5 15l4.2-4.2 3.3 3.3L19 7.6"/><path d="M14.5 7.5H19V12"/>',
    dompet: '<path d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>',
    perisai: '<path d="M12 3l7.5 3v5.6c0 4.6-3.1 8.1-7.5 9.4-4.4-1.3-7.5-4.8-7.5-9.4V6L12 3z"/><path d="M9 12l2 2 4-4"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.2 9.3v5.4l4.6-2.7z" fill="currentColor" stroke="none"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/>',
    tiktok: '<path d="M14 3.5v11a3.6 3.6 0 11-3.6-3.6"/><path d="M14 3.5c.4 2.6 2.2 4.4 5 4.6"/>',
    discord: '<path d="M7 7.5c3.2-1.4 6.8-1.4 10 0 1.7 2.4 2.5 5.3 2.3 8.5-1.5 1.2-3 1.9-4.6 2.2l-.9-1.6c-2.5.6-5.1.6-7.6 0l-.9 1.6c-1.6-.3-3.1-1-4.6-2.2C4.5 12.8 5.3 9.9 7 7.5z"/><circle cx="9.6" cy="12.6" r="1.2" fill="currentColor" stroke="none"/><circle cx="14.4" cy="12.6" r="1.2" fill="currentColor" stroke="none"/>',
    tautan: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5"/>',
    tutup: '<path d="M6 6l12 12M18 6L6 18"/>',
    panah: '<path d="M9 6l6 6-6 6"/>'
  };

  function ikon(nama, kelas) {
    return '<svg class="' + (kelas || 'ms-ikon') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (IKON[nama] || IKON.tautan) + '</svg>';
  }

  function logo() {
    return '<svg class="ms-logo" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect class="ms-logo__dasar" width="32" height="32" rx="9"/>' +
      '<path class="ms-logo__garis" d="M8 21.5l5.5-5.5 4 4 7-7.5"/><path class="ms-logo__garis" d="M19 12.5h5.5V18"/></svg>';
  }

  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var menu = S.menu.filter(function (m) { return m && m.nama && m.url; });
  var ini = null, home = null;
  menu.forEach(function (m) {
    if (m.id === idHalaman) ini = m;
    if (m.id === 'home') home = m;
  });

  // Judul tab browser mengikuti pengaturan.
  if (ini && ini.judul) doc.title = ini.judul + (merek && ini.judul.indexOf(merek) < 0 ? ' · ' + merek : '');

  function luar(m) { return m.jenis === 'tautan'; }

  function attrTautan(m) {
    var s = 'href="' + esc(m.url) + '"';
    if (luar(m)) s += ' target="_blank" rel="noopener"';
    if (m.id === idHalaman) s += ' aria-current="page"';
    return s;
  }

  /* ---------------------------------------------------------------- menu ringkas */
  function buatBar() {
    var nav = doc.createElement('nav');
    nav.className = 'ms-bar';
    nav.id = 'menu-situs';
    nav.setAttribute('aria-label', 'Menu situs');
    var li = menu.map(function (m) {
      return '<li class="ms-li' + (luar(m) ? ' is-luar' : '') + '">' +
        '<a class="ms-item ms-i-' + esc(m.ikon || 'tautan') + (m.id === idHalaman ? ' is-aktif' : '') + '" ' + attrTautan(m) +
        (luar(m) ? ' title="' + esc((m.ket || m.nama) + ' (tab baru)') + '"' : '') + '>' +
        ikon(m.ikon) + '<span>' + esc(m.nama) + '</span></a></li>';
    }).join('');
    nav.innerHTML = '<div class="ms-bar__isi">' +
      '<a class="ms-merek" href="' + esc(home ? home.url : './') + '" aria-label="' + esc(merek + ', halaman utama') + '">' +
      logo() + '<span>' + esc(merek) + '</span></a>' +
      '<ul class="ms-daftar">' + li + '</ul></div>';
    return nav;
  }

  // Petunjuk geser (pudar di tepi) saat menu lebih lebar dari layar, dan item aktif dibawa ke tengah.
  function aturGeser(bar) {
    var ul = bar.querySelector('.ms-daftar');
    if (!ul) return function () {};
    function cek() {
      var maks = ul.scrollWidth - ul.clientWidth;
      ul.classList.toggle('is-kiri', ul.scrollLeft > 2);
      ul.classList.toggle('is-kanan', ul.scrollLeft < maks - 2);
    }
    function tengahkan() {
      var aktif = ul.querySelector('.is-aktif');
      if (aktif && ul.scrollWidth > ul.clientWidth + 2) {
        ul.scrollLeft = Math.max(0, aktif.offsetLeft - (ul.clientWidth - aktif.offsetWidth) / 2);
      }
      cek();
    }
    ul.addEventListener('scroll', cek, { passive: true });
    window.addEventListener('resize', cek);
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(tengahkan, function () {});
    window.addEventListener('load', cek);
    tengahkan();
    return tengahkan;
  }

  /* ---------------------------------------------------------------- pop-up */
  function versi() { return String(P.versi == null ? '' : P.versi); }

  function bacaTutup() {
    try {
      var v = JSON.parse(localStorage.getItem(KUNCI) || 'null');
      return v && typeof v === 'object' ? v : null;
    } catch (e) { return null; }
  }

  function simpanTutup() {
    try { localStorage.setItem(KUNCI, JSON.stringify({ t: Date.now(), v: versi() })); } catch (e) { /* penyimpanan tidak tersedia */ }
  }

  function perluPopup() {
    if (!P.diHalaman || P.diHalaman !== idHalaman || P.aktif === false) return false;
    if (/[?&]popup=1(?:&|$)/.test(location.search)) return true;
    var c = bacaTutup();
    if (!c || !c.t) return true;
    if (String(c.v) !== versi()) return true;
    var hari = Number(P.munculLagiSetelahHari);
    if (!isFinite(hari) || hari < 0) hari = 7;
    return Date.now() - c.t >= hari * 864e5;
  }

  function buatPopup() {
    var hal = menu.filter(function (m) { return !luar(m); });
    var sos = menu.filter(luar);
    var el = doc.createElement('div');
    el.className = 'ms-lapis';
    el.innerHTML =
      '<div class="ms-lapis__latar" data-tutup></div>' +
      '<div class="ms-pop" role="dialog" aria-modal="true" aria-labelledby="ms-pop-judul"' + (P.teks ? ' aria-describedby="ms-pop-teks"' : '') + ' tabindex="-1">' +
        '<button type="button" class="ms-pop__x" data-tutup aria-label="Tutup">' + ikon('tutup') + '</button>' +
        '<p class="ms-pop__merek">' + logo() + '<span>' + esc(merek) + '</span></p>' +
        '<h2 class="ms-pop__judul" id="ms-pop-judul">' + esc(P.judul || ('Selamat datang di ' + merek)) + '</h2>' +
        (P.teks ? '<p class="ms-pop__teks" id="ms-pop-teks">' + esc(P.teks) + '</p>' : '') +
        '<ul class="ms-pop__hal">' + hal.map(function (m) {
          var di = m.id === idHalaman;
          return '<li><a class="ms-pop__kartu' + (di ? ' is-aktif' : '') + '" ' + attrTautan(m) + ' data-id="' + esc(m.id) + '">' +
            '<span class="ms-pop__ikon">' + ikon(m.ikon) + '</span>' +
            '<span class="ms-pop__label"><b>' + esc(m.nama) + '</b>' + (m.ket ? '<small>' + esc(m.ket) + '</small>' : '') + '</span>' +
            (di ? '<span class="ms-pop__disini">Anda di sini</span>' : ikon('panah', 'ms-ikon ms-pop__panah')) +
            '</a></li>';
        }).join('') + '</ul>' +
        (sos.length ? '<p class="ms-pop__sub">' + esc(P.judulSosial || 'Ikuti kami') + '</p>' +
          '<ul class="ms-pop__sos">' + sos.map(function (m) {
            return '<li><a class="ms-pop__sosial ms-i-' + esc(m.ikon || 'tautan') + '" ' + attrTautan(m) + ' data-id="' + esc(m.id) + '"' +
              (m.ket ? ' title="' + esc(m.ket) + '"' : '') + '>' + ikon(m.ikon) + '<span>' + esc(m.nama) + '</span></a></li>';
          }).join('') + '</ul>' : '') +
        '<button type="button" class="ms-pop__lanjut" data-tutup>' + esc(P.tombol || 'Tutup') + '</button>' +
        (P.catatan ? '<p class="ms-pop__catatan">' + esc(P.catatan) + '</p>' : '') +
      '</div>';
    return el;
  }

  function bukaPopup(bar, segarkanBar) {
    var lapis = buatPopup();
    var pop = lapis.querySelector('.ms-pop');
    var ditutup = false, beres = false;

    bar.hidden = true;
    root.classList.add('ms-kunci');
    doc.body.appendChild(lapis);
    var lebarKunci = root.clientWidth;

    function bisaFokus() {
      return Array.prototype.filter.call(pop.querySelectorAll('a[href], button:not([disabled])'), function (x) {
        return x.getClientRects().length > 0;
      });
    }

    function onKey(e) {
      if (e.key === 'Escape' || e.key === 'Esc') { e.preventDefault(); tutup(); return; }
      if (e.key !== 'Tab') return;
      var f = bisaFokus();
      if (!f.length) return;
      var a = f[0], z = f[f.length - 1], aktif = doc.activeElement;
      if (!pop.contains(aktif)) { e.preventDefault(); (e.shiftKey ? z : a).focus(); }
      else if (e.shiftKey && (aktif === a || aktif === pop)) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && aktif === z) { e.preventDefault(); a.focus(); }
    }
    doc.addEventListener('keydown', onKey, true);

    lapis.addEventListener('click', function (e) {
      var t = e.target && e.target.closest ? e.target.closest('[data-tutup], a[data-id]') : null;
      if (!t) return;
      if (t.hasAttribute('data-tutup')) { e.preventDefault(); tutup(); return; }
      if (t.getAttribute('data-id') === idHalaman) { e.preventDefault(); tutup(); return; }
      simpanTutup();
      // Tautan luar terbuka di tab baru: lipat pop-up di tab ini supaya saat kembali menu sudah di atas.
      if (t.getAttribute('target') === '_blank') setTimeout(function () { tutup({ fokus: false }); }, 60);
    });

    try { pop.focus({ preventScroll: true }); } catch (e) { pop.focus(); }

    function akhiri(opsi) {
      if (beres) return;
      beres = true;
      if (lapis.parentNode) lapis.parentNode.removeChild(lapis);
      root.classList.remove('ms-kunci');
      bar.classList.remove('ms-bar--baru');
      // Bila lebar halaman berubah setelah kunci gulir dilepas, gambar ulang grafik dashboard.
      if (root.clientWidth !== lebarKunci && typeof window.__run === 'function') {
        try { window.__run(); } catch (e) { /* abaikan */ }
      }
      segarkanBar();
      if (!opsi || opsi.fokus !== false) {
        var t = bar.querySelector('.ms-item.is-aktif') || bar.querySelector('.ms-item');
        if (t) { try { t.focus({ preventScroll: true }); } catch (e) { /* abaikan */ } }
      }
    }

    function tutup(opsi) {
      if (ditutup) return;
      ditutup = true;
      simpanTutup();
      doc.removeEventListener('keydown', onKey, true);

      var a = pop.getBoundingClientRect();
      bar.classList.add('ms-bar--baru');
      bar.hidden = false;
      segarkanBar();
      var b = bar.getBoundingClientRect();

      if (gerakMinim || typeof pop.animate !== 'function') { akhiri(opsi); return; }

      var ke = { top: b.top, left: b.left, width: b.width, height: b.height };
      if (b.bottom <= 0 || b.top >= window.innerHeight) ke = { top: 0, left: 0, width: root.clientWidth, height: b.height || 52 };

      var hantu = doc.createElement('div');
      hantu.className = 'ms-hantu';
      lapis.appendChild(hantu);

      var durasi = 460;
      pop.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.97)' }],
        { duration: 160, easing: 'ease-out', fill: 'forwards' });
      var latar = lapis.querySelector('.ms-lapis__latar');
      if (latar) latar.animate([{ opacity: 1 }, { opacity: 0 }], { duration: durasi, easing: 'ease', fill: 'forwards' });

      var lipat = hantu.animate([
        { top: a.top + 'px', left: a.left + 'px', width: a.width + 'px', height: a.height + 'px', borderRadius: '20px' },
        { top: ke.top + 'px', left: ke.left + 'px', width: ke.width + 'px', height: ke.height + 'px', borderRadius: '0px' }
      ], { duration: durasi, easing: 'cubic-bezier(.22,.8,.24,1)', fill: 'forwards' });

      lipat.onfinish = function () {
        bar.classList.remove('ms-bar--baru');
        var pudar = hantu.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: 'ease-out', fill: 'forwards' });
        pudar.onfinish = function () { akhiri(opsi); };
      };
      setTimeout(function () { akhiri(opsi); }, durasi + 900);
    }
  }

  /* ---------------------------------------------------------------- mulai */
  function isiTeks() {
    if (ini) {
      Array.prototype.forEach.call(doc.querySelectorAll('[data-judul-halaman]'), function (el) { el.textContent = ini.judul || ini.nama; });
      Array.prototype.forEach.call(doc.querySelectorAll('[data-nama-halaman]'), function (el) { el.textContent = ini.nama; });
    }
    if (merek) Array.prototype.forEach.call(doc.querySelectorAll('[data-merek]'), function (el) { el.textContent = merek; });
  }

  function mulai() {
    var bar = buatBar();
    doc.body.insertBefore(bar, doc.body.firstChild);
    var segarkanBar = aturGeser(bar);
    if (perluPopup()) {
      try { bukaPopup(bar, segarkanBar); }
      catch (e) {
        var sisa = doc.querySelector('.ms-lapis');
        if (sisa && sisa.parentNode) sisa.parentNode.removeChild(sisa);
        bar.hidden = false;
        root.classList.remove('ms-kunci');
      }
    }
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', isiTeks);
    else isiTeks();
  }

  if (doc.body) mulai();
  else doc.addEventListener('DOMContentLoaded', mulai);
})();
