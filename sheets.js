function kirimKeSpreadsheet(nama, kelas, benar) {
  fetch('https://script.google.com/macros/s/AKfycbx9A8jlywchNF4ZTn1UpVZrSvE86c1P7ucL_QT1P67rWRTZtaXcDCmUuH59tNJf1PeCtg/exec', {
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
