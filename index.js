let counter = 0;
let minLimitInput = document.getElementById('minLimit');
let maxLimitInput = document.getElementById('maxLimit');

const COUNTER_TYPES = {
  INCREASE: 'INCREASE',
  DECREASE: 'DECREASE',
  ERROR: 'ERROR',
  RESET: 'RESET',
};

const SOUND_MAP = {
  INCREASE: './mixkit-gear-metallic-lock-sound-2858.wav',
  DECREASE: './mixkit-mouse-click-close-1113.wav',
  ERROR: './mixkit-game-show-buzz-in-3090.wav',
  RESET: './mixkit-opening-software-interface-2578.wav',
};

function updateCounter() {
  document.getElementById('counter').textContent = counter;
}

function increaseCounter() {
  let maxLimit = parseInt(maxLimitInput.value);
  if (counter < maxLimit) {
    counter++;
    updateCounter();
    playSound(COUNTER_TYPES.INCREASE);
  } else {
    playSound(COUNTER_TYPES.ERROR, function () {
      alert('Counter reached the maximum limit!');
    });
  }
}

function decreaseCounter() {
  let minLimit = parseInt(minLimitInput.value);
  if (counter > minLimit) {
    counter--;
    updateCounter();
    playSound(COUNTER_TYPES.DECREASE);
  } else {
    playSound(COUNTER_TYPES.ERROR, function () {
      alert('Counter reached the minimum limit!');
    });
  }
}

function resetCounter() {
  counter = parseInt(minLimitInput.value);
  updateCounter();
  playSound(COUNTER_TYPES.RESET);
}

function playSound(type, callback) {
  const audio = new Audio(SOUND_MAP[type]);
  audio.onended = function () {
    if (callback && typeof callback === 'function') {
      callback();
    }
  };
  audio.play();
}

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the saved theme
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
} else {
    body.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
}

// Toggle theme function
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Play a sound when toggling theme
    playSound(isDark ? COUNTER_TYPES.INCREASE : COUNTER_TYPES.DECREASE);
});