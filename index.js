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
