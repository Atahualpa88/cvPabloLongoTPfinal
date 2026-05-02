const tracks = [
  { title: 'Auto DJ: Synthwave Nights', genre: 'Electro Pop', duration: 222 },
  { title: 'Auto DJ: Indie Morning Drive', genre: 'Indie Rock', duration: 198 },
  { title: 'Auto DJ: Urban Sunset Session', genre: 'Hip Hop / R&B', duration: 210 },
  { title: 'Auto DJ: Deep House Pulse', genre: 'House', duration: 246 },
  { title: 'Auto DJ: Chill Focus Flow', genre: 'Lo-fi', duration: 234 },
];

const schedule = [
  '00:00 - 06:00 · Modo madrugada (Chill + Downtempo)',
  '06:00 - 10:00 · Amanecer activo (Pop & Hits)',
  '10:00 - 14:00 · Auto DJ Work Mix',
  '14:00 - 18:00 · Tarde urbana (Latin + Urban)',
  '18:00 - 22:00 · Prime time (Top tracks)',
  '22:00 - 00:00 · Night vibes (Deep & Chill)',
];

const trackTitle = document.querySelector('#track-title');
const trackMeta = document.querySelector('#track-meta');
const progressBar = document.querySelector('#progress-bar');
const playBtn = document.querySelector('#play-btn');
const nextBtn = document.querySelector('#next-btn');
const listenersEl = document.querySelector('#listeners');
const statusEl = document.querySelector('#live-status');
const scheduleList = document.querySelector('#schedule-list');

let currentTrackIndex = 0;
let elapsed = 0;
let isPlaying = true;
let timer;

function formatTime(seconds) {
  const min = Math.floor(seconds / 60).toString().padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

function renderTrack() {
  const track = tracks[currentTrackIndex];
  trackTitle.textContent = track.title;
  trackMeta.textContent = `Género: ${track.genre} · Duración: ${formatTime(track.duration)}`;
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  elapsed = 0;
  renderTrack();
}

function tick() {
  if (!isPlaying) {
    return;
  }

  const track = tracks[currentTrackIndex];
  elapsed += 1;
  const progress = Math.min((elapsed / track.duration) * 100, 100);
  progressBar.style.width = `${progress}%`;

  if (elapsed >= track.duration) {
    nextTrack();
  }

  const variation = Math.floor(Math.random() * 5) - 2;
  const current = Number(listenersEl.textContent);
  listenersEl.textContent = Math.max(40, current + variation);
}

function togglePlayback() {
  isPlaying = !isPlaying;
  playBtn.textContent = isPlaying ? 'Pausar stream' : 'Reanudar stream';
  statusEl.textContent = isPlaying ? 'Transmitiendo' : 'En pausa';
}

function renderSchedule() {
  scheduleList.innerHTML = '';
  schedule.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    scheduleList.appendChild(li);
  });
}

playBtn.addEventListener('click', togglePlayback);
nextBtn.addEventListener('click', nextTrack);

renderTrack();
renderSchedule();
timer = setInterval(tick, 1000);
