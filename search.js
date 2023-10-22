// Event listener untuk opsi dropdown
const filterOptions = document.querySelectorAll(".dropdown-item");
const filterButton = document.getElementById("filter-button");
const searchInput = document.getElementById("search-input");
const tombolPencarian = document.getElementById("search-button");
const hasilPencarian = document.getElementById("hasil-pencarian");
const direkomendasikanVideos = document.getElementById("direkomendasi");
const terpopulerVideos = document.getElementById("terpopuler");
const akademikVideos = document.getElementById("akademik");
const lainnyaVideos = document.getElementById("lainnya");

// Event listener untuk opsi dropdown
filterOptions.forEach((option) => {
  option.addEventListener("click", function () {
    const selectedFilter = option.getAttribute("data-filter");
    filterButton.innerText = selectedFilter; // Mengubah teks tombol dropdown

    // Setelah filter berubah, panggil fungsi pencarian kembali
    searchVideos();

    // Sembunyikan semua kategori
    direkomendasikanVideos.style.display = "none";
    terpopulerVideos.style.display = "none";
    akademikVideos.style.display = "none";
    lainnyaVideos.style.display = "none";

    // if (selectedFilter === "search") {
    //   hasilPencarian.style.display = "block";
    // } else if (selectedFilter === "direkomendasi") {
    //   direkomendasikanVideos.style.display = "block";
    // } else if (selectedFilter === "terpopuler") {
    //   terpopulerVideos.style.display = "block";
    // } else if (selectedFilter === "akademik") {
    //   akademikVideos.style.display = "block";
    // } else if (selectedFilter === "lainnya") {
    //   lainnyaVideos.style.display = "block";
    // }
  });
});

// Fungsi untuk mengambil data dari API dan menampilkan video sesuai filter pencarian
function searchVideos() {
  const filterText = filterButton.innerText.toLowerCase();
  const searchText = searchInput.value.toLowerCase();
  const apiUrl = "https://652d3ffcf9afa8ef4b271ed7.mockapi.io/Video";

  // Hapus semua video yang ditampilkan sebelumnya
  const videosContainer = document.getElementById("videos-container");
  videosContainer.innerHTML = "";

  // Kirim permintaan ke API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const seenVideos = new Set();

      data.forEach((video) => {
        const title = video.title.toLowerCase();
        const author = video.author.toLowerCase();
        const category = video.category.toLowerCase();
        const all = `${title} ${author} ${category}`.toLowerCase(); // Menggabungkan title, author, dan category
        const shouldDisplay =
          (filterText === "all" && all.includes(searchText)) ||
          (filterText === "title" && title.includes(searchText)) ||
          (filterText === "author" && author.includes(searchText));

        if (shouldDisplay && video.id && !seenVideos.has(video.id)) {
          seenVideos.add(video.id);
          // Tampilkan video yang sesuai dan belum ditampilkan sebelumnya
          const videoCard = createVideoCard(video);
          videosContainer.appendChild(videoCard);
        }
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Fungsi untuk membuat elemen video
function createVideoCard(video) {
  const card = document.createElement("div");
  card.className = "col-6";

  //   const authors = book.author.split(",").map((author) => author.trim());

  // Tambahkan event listener untuk mengarahkan ke halaman detail buku
  card.addEventListener("click", function () {
    // Redirect ke halaman detail dengan mengirimkan ID buku sebagai parameter
    window.location.href = `detail-video.html?id=${video.id}`;
  });

  card.innerHTML = `
  <a href="detail-video.html?id=${video.id}" target="_blank" class="text-decoration-none">
  <div class="card h-100 rounded-3" id="warna-card">
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

// Event listener untuk input pencarian
searchInput.addEventListener("input", function () {
  searchVideos();
});

// Event listener awal untuk memuat semua buku saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  searchVideos();
});

tombolPencarian.addEventListener("click", function () {
  hasilPencarian.style.display = "block"; // Mengubah display menjadi "block" untuk menampilkan elemen
});
