function kirimKeSpreadsheet(nama, kelas, benar) {
  fetch('https://script.google.com/macros/s/AKfycbwJhEvnUgK-L_VKEERyzAQL3EMiiB9PB_dL1q_g8hFjuY3fYyEfybcHgfiBf0x7lJOtmg/exec, { 
    method: 'POST',
    body: JSON.stringify({ nama, kelas, benar }),
    headers: { 'Content-Type': 'application/json' }
  });
}
