function kirimKeSpreadsheet(nama, kelas, benar) {
  fetch('https://script.google.com/macros/s/AKfycbx57ZXB6FuNv2Ueh3lZRDmIQtdv-iwdWlf5wje2Wmc7OO50geusK161qzt_KS09Ad0G/exec', { // ganti dengan link Web App Anda
    method: 'POST',
    body: JSON.stringify({ nama, kelas, benar }),
    headers: { 'Content-Type': 'application/json' }
  });
}
