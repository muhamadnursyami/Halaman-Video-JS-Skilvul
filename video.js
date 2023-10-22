// Fungsi untuk membuat kartu video
function createVideosCard(video) {
  const card = document.createElement("div");
  card.className = "col-6";

  //   const authors = book.author.split(",").map((author) => author.trim());

  // Tambahkan event listener untuk mengarahkan ke halaman detail video
  card.addEventListener("click", function () {
    // Redirect ke halaman detail dengan mengirimkan ID video sebagai parameter
    window.location.href = `detail-video.html?id=${video.id}`;
  });

  card.innerHTML = `
                  <a href="detail-video.html?id=${video.id}" target="_blank" class="text-decoration-none">
                  <div class=" card h-100 rounded-3" id="warna-card">
                    <img src="${video.url_thumbnail}" class="card-img-top p-2 rounded-4" alt="...">
                    <div class="card-body">
                      <h6 class="card-title">${video.title}</h6>
                      <p id="font-card-detail" class="opacity-50 mb-1">${video.tanggal_upload}</p>
                      <div class="d-flex align-items-baseline" id="font-card-detail">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" class="bi bi-star-fill" viewBox="0 0 16 16">
                          <defs>
                            <linearGradient id="star-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" style="stop-color: #fffdee;" />
                              <stop offset="100%" style="stop-color: #ffee02;" />
                            </linearGradient>
                          </defs>
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256" fill="url(#star-gradient)" />
                        </svg>
                        <span class="ms-1">${video.likes}<span/>
                      </div>
                    </div>
                  </div>
                </a>
              `;
  return card;
}

// Fungsi untuk mengambil data video dari API
async function fetchVideos() {
  try {
    const response = await fetch(
      "https://652d3ffcf9afa8ef4b271ed7.mockapi.io/Video"
    );
    const data = await response.json();

    // Filter video berdasarkan kategori
    const terpopulerVideos = data.filter(
      (video) => video.category === "Terpopuler"
    );
    const akademikVideos = data.filter(
      (video) => video.category === "Akademik"
    );
    const lainnyaVideos = data.filter((video) => video.category === "Lainnya");

    // Tampilkan video terpopuler
    const terpopulerVideosContainer =
      document.getElementById("terpopuler-videos");
    terpopulerVideosContainer.innerHTML = "";
    terpopulerVideos.forEach((video) => {
      const videoCard = createVideosCard(video);
      terpopulerVideosContainer.appendChild(videoCard);
    });

    // Tampilkan video akademik
    const akademikVideosContainer = document.getElementById("akademik-videos");
    akademikVideosContainer.innerHTML = "";
    akademikVideos.forEach((video) => {
      const videoCard = createVideosCard(video);
      akademikVideosContainer.appendChild(videoCard);
    });

    // Tampilkan video lainnya
    const lainnyaVideosContainer = document.getElementById("lainnya-videos");
    lainnyaVideosContainer.innerHTML = "";
    lainnyaVideos.forEach((video) => {
      const videoCard = createVideosCard(video);
      lainnyaVideosContainer.appendChild(videoCard);
    });

    // Tampilkan "Direkomendasikan untuk Mu" setelah semua video ditampilkan
    displayDirekomendasikanVideos(data);
  } catch (error) {
    console.error("Gagal mengambil data video:", error);
  }
}

// Fungsi untuk menampilkan "Direkomendasikan untuk Mu"
function displayDirekomendasikanVideos(data) {
  const direkomendasikanVideosContainer = document.getElementById(
    "direkomendasikan-videos"
  );
  direkomendasikanVideosContainer.innerHTML = "";

  // Mengambil 6 video secara acak dari semua jenis kategori
  const randomDirekomendasikanVideos = getRandomVideos(data, 6);

  randomDirekomendasikanVideos.forEach((video) => {
    const videoCard = createVideosCard(video);
    direkomendasikanVideosContainer.appendChild(videoCard);
  });
}

// Fungsi untuk mengambil n video secara acak dari data
function getRandomVideos(data, n) {
  const shuffledData = [...data];
  for (let i = shuffledData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
  }
  return shuffledData.slice(0, n);
}

// Panggil fungsi untuk mengambil data video dari API saat halaman dimuat
fetchVideos();
