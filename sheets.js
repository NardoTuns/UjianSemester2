function kirimKeSpreadsheet(nama, kelas, benar) {
  fetch('https://script.google.com/macros/s/AKfycbx57ZXB6FuNv2Ueh3lZRDmIQtdv-iwdWlf5wje2Wmc7OO50geusK161qzt_KS09Ad0G/exec', {
    method: 'POST',
    body: JSON.stringify({ nama, kelas, benar }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.text())
  .then(result => {
    console.log("Berhasil kirim:", result);
  })
  .catch(err => {
    console.error("Gagal kirim:", err);
  });
}
