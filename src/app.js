// Keygen Nota Service HP — HARUS memakai SECRET yang sama dengan aplikasi utama
const SECRET = 'NotaHP2026MasBrooSecretX7';

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(16).toUpperCase().padStart(8, '0');
}

function generateActivationCode(sn) {
  const clean = (sn || '').replace(/[^A-Z0-9]/gi, '').toUpperCase();
  if (!clean) return '';
  const h1 = simpleHash(clean + SECRET + 'A1');
  const h2 = simpleHash(clean + SECRET + 'B2' + h1);
  const h3 = simpleHash(clean + SECRET + 'C3' + h2);
  const h4 = simpleHash(clean + SECRET + 'D4' + h3);
  return [h1.substring(0, 6), h2.substring(0, 6), h3.substring(0, 6), h4.substring(0, 6)].join('-');
}

function generate() {
  const snEl = document.getElementById('sn');
  const out = document.getElementById('out');
  const copyBtn = document.getElementById('copyBtn');
  const sn = (snEl.value || '').trim();
  if (!sn) {
    out.style.display = 'none';
    copyBtn.style.display = 'none';
    alert('Isi Serial Number (SN) pelanggan dulu');
    return;
  }
  const code = generateActivationCode(sn);
  out.style.display = 'block';
  out.innerHTML = '<div style="font-size:13px;opacity:.8;margin-bottom:6px;">Kode Aktivasi:</div>' + code;
  copyBtn.style.display = 'block';
  copyBtn.dataset.code = code;
}

function copyCode() {
  const code = document.getElementById('copyBtn').dataset.code || '';
  if (!code) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(() => {
      showToast('✅ Kode disalin');
    }).catch(() => fallbackCopy(code));
  } else {
    fallbackCopy(code);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast('✅ Kode disalin');
  } catch (e) {
    showToast('Gagal menyalin, salin manual');
  }
  document.body.removeChild(ta);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// Auto-uppercase SN input
document.addEventListener('DOMContentLoaded', () => {
  const sn = document.getElementById('sn');
  if (sn) {
    sn.addEventListener('input', () => {
      sn.value = sn.value.toUpperCase();
    });
    sn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') generate();
    });
  }
});

window.generate = generate;
window.copyCode = copyCode;
