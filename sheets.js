function kirimKeSpreadsheet(nama, kelas, benar) {
  fetch('https://script.google.com/macros/s/AKfycbw8lnXRdxIKA0sLhFTHfh_PiBZcfG_ERGB6F8MDARYxmwiJlXI4W4ZhMN0uYP8ApuC7Jg/exec', {
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
