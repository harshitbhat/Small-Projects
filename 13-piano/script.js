'use strict';

let keyBoard = document.querySelector('.piano-keyboard');
let controls = document.querySelectorAll('.piano-control-option');
let pianoNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
let keys = [];
let keyBoardMap = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
];

// Create Key
let createKey = (type, note, octave) => {
  const key = document.createElement('button');
  key.className = `piano-key piano-key-${type}`;
  key.dataset.letterNote =
    type === 'white' ? note + octave : note + '#' + octave;
  key.dataset.letterNoteFileName =
    type === 'white' ? note + octave : note + 's' + octave;
  key.textContent = key.dataset.letterNote;
  keys.push(key);

  key.addEventListener('mousedown', () => {
    playSound(key);
    key.classList.add('piano-key-playing');
  });

  key.addEventListener('mouseup', () => {
    key.classList.remove('piano-key-playing');
  });

  key.addEventListener('mouseleave', () => {
    key.classList.remove('piano-key-playing');
  });
  return key;
};

// Fill Keys
let init = () => {
  for (let i = 1; i <= 5; i++) {
    for (let j = 0; j < 7; j++) {
      let key = createKey('white', pianoNotes[j], i);
      key.dataset.keyboard = keyBoardMap[j + (i - 1) * 7];
      keyBoard.appendChild(key);
      if (j != 2 && j != 6) {
        key = createKey('black', pianoNotes[j], i);
        key.dataset.keyboard = '⇧+' + keyBoardMap[j + (i - 1) * 7];
        let emptySpace = document.createElement('div');
        emptySpace.className = 'empty-space';
        emptySpace.appendChild(key);
        keyBoard.appendChild(emptySpace);
      }
    }
  }
};

const pressKey = (mouseEvent, e) => {
  let lastLetter = e.code.substring(e.code.length - 1);
  let isShiftTrue = e.shiftKey;
  let selector;
  if (isShiftTrue) {
    selector = `[data-keyboard="⇧+${lastLetter}"]`;
  } else {
    selector = `[data-keyboard=${lastLetter}]`;
  }
  let key = document.querySelector(selector);
  if (key != null) {
    let event = new Event(mouseEvent);
    key.dispatchEvent(event);
  }
};

document.addEventListener('keydown', (e) => {
  if (e.repeat) {
    return;
  }
  pressKey('mousedown', e);
});

document.addEventListener('keyup', (e) => {
  pressKey('mouseup', e);
});

let playSound = (key) => {
  let audio = document.createElement('audio');
  audio.src = `sounds/${key.dataset.letterNoteFileName}.mp3`;
  audio.play().then(() => audio.remove());
};

controls.forEach((input) => {
  input.addEventListener('input', () => {
    let val = input.value;
    let type;
    switch (val) {
      case 'letterNotes':
        type = 'letterNote';
        break;
      case 'keyboard':
        type = 'keyboard';
        break;
      case 'none':
        type = '';
        break;
    }
    keys.forEach((key) => {
      key.textContent = key.dataset[type];
    });
  });
});
init();
