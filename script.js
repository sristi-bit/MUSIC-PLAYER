const songs =   [
  { 
    title: "Ocean View", 
    artist: "Ghostrifter Official", 
    src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_3db46c4650.mp3?filename=ocean-view-110166.mp3"
  },
  { 
    title: "Sunset Vibes", 
    artist: "Pablo Rindt", 
    src: "https://cdn.pixabay.com/download/audio/2022/02/23/audio_22f72e8d93.mp3?filename=sunrise-10546.mp3"
  },
  { 
    title: "Chill Beat", 
    artist: "Coma Media", 
    src: "https://cdn.pixabay.com/download/audio/2021/10/01/audio_fb3bc1be77.mp3?filename=lofi-study-112191.mp3"
  },
  { 
    title: "Dreaming", 
    artist: "NEFFEX", 
    src: "https://cdn.pixabay.com/download/audio/2021/08/08/audio_1e16e0ef20.mp3?filename=dreaming-11059.mp3"
  },
  { 
    title: "Night Walk", 
    artist: "Aries Beats", 
    src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_ac81c3cc07.mp3?filename=night-walk-110147.mp3"
  }
];


let currentSongIndex = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const volumeSlider = document.getElementById("volume");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playlist = document.getElementById("playlist");
const addSong = document.getElementById("addSong");

// Load song details
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

// Play/Pause song
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

// Next/Previous
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  audio.play();
  playBtn.textContent = "⏸";
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  audio.play();
  playBtn.textContent = "⏸";
}

// Progress bar update
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Playlist
function renderPlaylist() {
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent =`${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentSongIndex = index;
      loadSong(song);
      audio.play();
      playBtn.textContent = "⏸";
    });
    playlist.appendChild(li);
  });
}

// Add new songs dynamically
addSong.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    const url = URL.createObjectURL(file);
    songs.push({ title: file.name.replace(".mp3",""), artist: "Unknown", src: url });
  });
  renderPlaylist();
});

// Event listeners
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("ended", nextSong);

loadSong(songs[currentSongIndex]);
renderPlaylist();


