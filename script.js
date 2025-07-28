// Data inicial
const dataInicial = new Date('2024-08-08T20:00:00');

function atualizarContador() {
    const agora = new Date();
    let anos = agora.getFullYear() - dataInicial.getFullYear();
    let meses = agora.getMonth() - dataInicial.getMonth();
    let dias = agora.getDate() - dataInicial.getDate();
    let horas = agora.getHours() - dataInicial.getHours();
    let minutos = agora.getMinutes() - dataInicial.getMinutes();
    let segundos = agora.getSeconds() - dataInicial.getSeconds();

    if (segundos < 0) {
        segundos += 60;
        minutos--;
    }
    if (minutos < 0) {
        minutos += 60;
        horas--;
    }
    if (horas < 0) {
        horas += 24;
        dias--;
    }
    if (dias < 0) {
        const ultimoDiaDoMes = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
        dias += ultimoDiaDoMes;
        meses--;
    }
    if (meses < 0) {
        meses += 12;
        anos--;
    }

    document.getElementById("ano").textContent =
        `${anos}`;
    
    document.getElementById("mes").textContent =
        `${meses}`;

    document.getElementById("dia").textContent =
        `${dias}`;

    document.getElementById("hora").textContent =
        `${horas} h : ${minutos} m : ${segundos} s`;

    document.getElementById("minuto").textContent =
        `${minutos} minutos`;

    document.getElementById("segundo").textContent =
        `${segundos} segundos`;


}

setInterval(atualizarContador, 1000);

// Script Para a Musica

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const playPauseIcon = document.getElementById('playPauseIcon');
const seekBar = document.getElementById('seek-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseIcon.src = 'imagens/pause.png';
    playPauseIcon.alt = 'Pause';
  } else {
    audio.pause();
    playPauseIcon.src = 'imagens/play.png';
    playPauseIcon.alt = 'Play';
  }
});

audio.addEventListener('loadedmetadata', () => {
    seekBar.max = audio.duration;
    durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    seekBar.value = audio.currentTime;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

seekBar.addEventListener('input', () => {
 audio.currentTime = seekBar.value;
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

audio.addEventListener('timeupdate', () => {
  const percentage = (audio.currentTime / audio.duration) * 100;
  seekBar.style.setProperty('--value', `${percentage}%`);
});

audio.addEventListener('timeupdate', () => {
  const current = audio.currentTime;
  const duration = audio.duration;
  const percentage = (current / duration) * 100;

  seekBar.value = current;

  // Altera visual da barra com gradiente direto no input
  seekBar.style.background = `linear-gradient(to right, #1db954 ${percentage}%, #404040 ${percentage}%)`;
});

  // Volume
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');

volumeSlider.addEventListener('input', () => {
  const volume = volumeSlider.value;
  audio.volume = volume;

  // Atualiza o ícone com base no volume
  if (volume == 0) {
    volumeIcon.src = 'imagens/mute.png';
  } else if (volume < 0.4) {
    volumeIcon.src = 'imagens/baixo.png';
  } else if (volume < 0.7) {
    volumeIcon.src = 'imagens/medio.png';
  } else {
    volumeIcon.src = 'imagens/alto.png';
  }
});

