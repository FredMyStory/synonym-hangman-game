const words = [
  { clue: 'Synonyme de SUCCEED', answer: 'THRIVE', hint: 'prospérer' },
  { clue: 'Synonyme de HAPPY', answer: 'JOYFUL', hint: 'heureux' },
  { clue: 'Synonyme de QUICK', answer: 'RAPID', hint: 'rapide' },
  { clue: 'Synonyme de BRAVE', answer: 'COURAGEOUS', hint: 'courageux' },
  { clue: 'Synonyme de CALM', answer: 'SERENE', hint: 'paisible' },
  { clue: 'Synonyme de SMART', answer: 'ASTUTE', hint: 'futé' },
  { clue: 'Synonyme de SMALL', answer: 'MINUTE', hint: 'minuscule' },
  { clue: 'Synonyme de BIG', answer: 'VAST', hint: 'vaste' }
];

const state = {
  score: 0,
  current: null,
  usedLetters: [],
  mistakes: 0,
  isLocked: false
};

const scoreEl = document.getElementById('score');
const clueTextEl = document.getElementById('clueText');
const wordDisplayEl = document.getElementById('wordDisplay');
const statusMessageEl = document.getElementById('statusMessage');
const letterGuessInput = document.getElementById('letterGuess');
const wordGuessInput = document.getElementById('wordGuess');
const overlayEl = document.getElementById('messageOverlay');
const overlayTitleEl = document.getElementById('overlayTitle');
const overlayImageEl = document.getElementById('overlayImage');
const hangmanParts = document.getElementById('hangman-parts');

const messageStyles = {
  win: { title: 'BRAVO', image: createImageSvg('BRAVO', '#22c55e', '#bbf7d0', '#14532d') },
  lose: { title: 'ENCOURAGEMENT', image: createImageSvg('KEEP GOING', '#f59e0b', '#fef3c7', '#78350f') }
};

function createImageSvg(text, colorA, colorB, textColor) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 160" role="img" aria-label="${text}">
      <defs>
        <linearGradient id="grad" x1="0" x2="1">
          <stop offset="0%" stop-color="${colorA}" />
          <stop offset="100%" stop-color="${colorB}" />
        </linearGradient>
      </defs>
      <rect width="260" height="160" rx="18" fill="rgba(15,23,42,0.9)" />
      <circle cx="62" cy="60" r="20" fill="url(#grad)" opacity="0.95"/>
      <circle cx="198" cy="62" r="18" fill="url(#grad)" opacity="0.9"/>
      <path d="M50 118 C 96 84, 160 84, 210 118" fill="none" stroke="url(#grad)" stroke-width="10" stroke-linecap="round"/>
      <text x="130" y="98" text-anchor="middle" font-size="26" font-weight="700" fill="${textColor}" font-family="Segoe UI, Arial, sans-serif">${text}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function chooseRandomWord() {
  const pool = shuffle(words);
  return pool[0];
}

function updateScore() {
  scoreEl.textContent = String(state.score);
}

function showOverlay(type) {
  const config = messageStyles[type];
  overlayImageEl.src = config.image;
  overlayTitleEl.textContent = config.title;
  overlayEl.classList.remove('hidden');
}

function hideOverlay() {
  overlayEl.classList.add('hidden');
}

function renderHangman() {
  const parts = [...hangmanParts.children];
  parts.forEach((part, index) => {
    if (index < state.mistakes) {
      part.classList.add('visible');
    } else {
      part.classList.remove('visible');
    }
  });
}

function getRevealedWord() {
  return state.current.answer
    .split('')
    .map((letter) => (state.usedLetters.includes(letter) ? letter : '_'))
    .join(' ');
}

function updateWordDisplay() {
  wordDisplayEl.textContent = getRevealedWord();
}

function setStatus(message) {
  statusMessageEl.textContent = message;
}

function startNewRound() {
  state.current = chooseRandomWord();
  state.usedLetters = [];
  state.mistakes = 0;
  state.isLocked = false;

  clueTextEl.textContent = state.current.clue;
  updateWordDisplay();
  renderHangman();
  setStatus('Bonne chance !');
  hideOverlay();
  letterGuessInput.value = '';
  wordGuessInput.value = '';
  letterGuessInput.focus();
}

function checkWordSolved() {
  return state.current.answer.split('').every((letter) => state.usedLetters.includes(letter));
}

function handleCorrectGuess(letter) {
  const value = letter.toUpperCase();

  if (!state.current.answer.includes(value)) {
    return false;
  }

  if (state.usedLetters.includes(value)) {
    return false;
  }

  state.usedLetters.push(value);
  updateWordDisplay();

  if (checkWordSolved()) {
    state.score += 1;
    updateScore();
    setStatus(`Gagné ! Le mot était ${state.current.answer}.`);
    showOverlay('win');
    state.isLocked = true;
    setTimeout(() => {
      startNewRound();
    }, 1500);
  }

  return true;
}

function handleWrongGuess(letter) {
  const value = letter.toUpperCase();

  if (state.usedLetters.includes(value)) {
    return;
  }

  state.usedLetters.push(value);
  state.mistakes += 1;
  renderHangman();
  state.score -= 1;
  updateScore();
  setStatus(`Mauvaise lettre : ${value}.`);

  if (state.mistakes >= 6) {
    showOverlay('lose');
    state.isLocked = true;
    setTimeout(() => {
      startNewRound();
    }, 1500);
    return;
  }

  showOverlay('lose');
  setTimeout(() => {
    hideOverlay();
  }, 700);
}

function handleLetterSubmission() {
  if (state.isLocked) return;

  const typed = letterGuessInput.value.trim();
  if (!typed) {
    setStatus('Entrez une lettre avant de valider.');
    return;
  }

  const letter = typed[0].toUpperCase();
  if (!/^[A-Z]$/.test(letter)) {
    setStatus('Veuillez saisir une lettre de A à Z.');
    letterGuessInput.value = '';
    return;
  }

  if (state.usedLetters.includes(letter)) {
    setStatus(`La lettre ${letter} a déjà été essayée.`);
    letterGuessInput.value = '';
    return;
  }

  if (state.current.answer.includes(letter)) {
    handleCorrectGuess(letter);
  } else {
    handleWrongGuess(letter);
  }

  letterGuessInput.value = '';
}

function handleWordSubmission() {
  if (state.isLocked) return;

  const guess = wordGuessInput.value.trim().toUpperCase();
  if (!guess) {
    setStatus('Entrez un mot complet pour tenter votre chance.');
    return;
  }

  if (guess === state.current.answer) {
    state.score += 1;
    updateScore();
    state.isLocked = true;
    setStatus(`Bravo ! Le mot était ${state.current.answer}.`);
    showOverlay('win');
    setTimeout(() => {
      startNewRound();
    }, 1500);
  } else {
    state.score -= 1;
    updateScore();
    state.mistakes += 1;
    renderHangman();
    setStatus(`Faux ! Le mot caché n'est pas ${guess}.`);
    showOverlay('lose');
    setTimeout(() => {
      hideOverlay();
      if (state.mistakes >= 6) {
        startNewRound();
      }
    }, 900);

    if (state.mistakes >= 6) {
      state.isLocked = true;
      setTimeout(() => {
        startNewRound();
      }, 1500);
    }
  }

  wordGuessInput.value = '';
}

document.getElementById('guessLetterBtn').addEventListener('click', handleLetterSubmission);
document.getElementById('guessWordBtn').addEventListener('click', handleWordSubmission);
document.getElementById('newRoundBtn').addEventListener('click', startNewRound);
letterGuessInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleLetterSubmission();
  }
});
wordGuessInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleWordSubmission();
  }
});

const musicInput = document.getElementById('musicUpload');
const toggleMusicBtn = document.getElementById('toggleMusicBtn');
const audio = new Audio();
audio.loop = true;

audio.addEventListener('error', () => {
  setStatus('Le fichier audio n’a pas pu être lu. Essayez un autre fichier MP3.');
});

musicInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.includes('mpeg') && !file.name.toLowerCase().endsWith('.mp3')) {
    setStatus('Veuillez sélectionner un fichier MP3 valide.');
    return;
  }

  const objectUrl = URL.createObjectURL(file);
  audio.src = objectUrl;
  audio.play().catch(() => {
    setStatus('Sélection enregistrée. Cliquez sur Lecture pour démarrer la musique.');
  });
  toggleMusicBtn.textContent = 'Pause';
  setStatus('Musique de fond chargée.');
});

toggleMusicBtn.addEventListener('click', () => {
  if (!audio.src) {
    setStatus('Sélectionnez d’abord un fichier MP3.');
    return;
  }

  if (audio.paused) {
    audio.play().catch(() => {
      setStatus('L’audio est prêt mais la lecture a été bloquée par le navigateur.');
    });
    toggleMusicBtn.textContent = 'Pause';
  } else {
    audio.pause();
    toggleMusicBtn.textContent = 'Lecture';
  }
});

updateScore();
startNewRound();

window.addEventListener('beforeunload', () => {
  audio.pause();
});
