let timerDuration = 60 * 5; // Timer dalam detik (5 menit)
let timerInterval;
let nama, kelas;
let soalList = [];

function login() {
  nama = document.getElementById("nama").value;
  kelas = document.getElementById("kelas").value;
  let password = document.getElementById("password").value;

  if (password !== "123" || !nama || !kelas) {
    alert("Login gagal. Pastikan data lengkap dan password benar.");
    return;
  }

  document.getElementById("login").style.display = "none";
  document.getElementById("kuis").style.display = "block";
  document.getElementById("user-info").innerText = `Nama: ${nama}, Kelas: ${kelas}`;
  mulaiTimer();
  loadSoal();
}

function mulaiTimer() {
  let timerDisplay = document.getElementById("timer");
  let waktu = timerDuration;

  timerInterval = setInterval(() => {
    let menit = Math.floor(waktu / 60);
    let detik = waktu % 60;
    timerDisplay.innerText = `Sisa Waktu: ${menit}:${detik < 10 ? "0" : ""}${detik}`;
    waktu--;
    if (waktu < 0) {
      clearInterval(timerInterval);
      selesai();
    }
  }, 1000);
}

function loadSoal() {
  fetch('soal.txt')
    .then(response => response.text())
    .then(text => {
      soalList = parseSoal(text);
      tampilkanSoal();
    });
}

function parseSoal(text) {
  let blocks = text.trim().split(/\n(?=\d+\.\s)/g);
  return blocks.map(block => {
    let lines = block.trim().split('\n');
    let soal = lines[0].replace(/^\d+\.\s*/, '');
    let pilihan = lines.slice(1, 5).map((line, i) => ({
      huruf: String.fromCharCode(97 + i), // a, b, c, d
      teks: line.slice(3)
    }));
    let kunci = lines.find(l => l.startsWith("Kunci:")).split(":")[1].trim();
    let gambar = "";
    let gLine = lines.find(l => l.startsWith("Gambar:"));
    if (gLine) gambar = gLine.split(":")[1].trim();
    return { soal, pilihan, kunci, gambar };
  });
}

function tampilkanSoal() {
  const form = document.getElementById("form-kuis");
  soalList.forEach((s, i) => {
    let div = document.createElement("div");
    div.innerHTML = `<p><b>${i + 1}. ${s.soal}</b></p>`;
    if (s.gambar) {
      div.innerHTML += `<img src="gambar/${s.gambar}" alt="gambar soal" style="max-width:200px;"><br>`;
    }
    s.pilihan.forEach(p => {
      div.innerHTML += `
        <label>
          <input type="radio" name="soal${i}" value="${p.huruf}"> ${p.huruf}. ${p.teks}
        </label><br>
      `;
    });
    form.appendChild(div);
    form.appendChild(document.createElement("hr"));
  });
}

function selesai() {
  clearInterval(timerInterval);
  let benar = 0;
  soalList.forEach((s, i) => {
    let jawaban = document.querySelector(`input[name=soal${i}]:checked`);
    if (jawaban && jawaban.value.toLowerCase() === s.kunci.toLowerCase()) {
      benar++;
    }
  });

  document.getElementById("kuis").style.display = "none";
  document.getElementById("hasil").style.display = "block";
  document.getElementById("hasil-info").innerText = `
    Nama: ${nama}
    Kelas: ${kelas}
    Jumlah Benar: ${benar} dari ${soalList.length}
    Anda Telah Selesai Ujian.
  `;

  kirimKeSpreadsheet(nama, kelas, benar);
}
