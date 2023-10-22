const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get("id");

async function fetchVideosPlay() {
  try {
    const response = await fetch(
      `https://652d3ffcf9afa8ef4b271ed7.mockapi.io/Video/${videoId}`
    );
    const video = await response.json();

    // Tampilkan detail video di halaman
    const tontonVideo = document.getElementById("tonton-video");
    tontonVideo.innerHTML = `
       <div class="ratio ratio-16x9">
        <iframe
          src="${video.url_video}"
          title="YouTube video"
          allowfullscreen
        ></iframe>
      </div> 
      `;
  } catch (error) {
    console.error("Gagal mengambil detail video:", error);
  }
}

if (videoId) {
  fetchVideosPlay();
} else {
  console.error("ID video tidak ditemukan.");
}
