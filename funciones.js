const preguntas = [
  {
    pregunta: '¿En qué fecha se formó la Primera Junta en Buenos Aires?',
    opciones: ['25 de mayo de 1810', '9 de julio de 1816', '20 de junio de 1820', '17 de agosto de 1850'],
    correcta: 0,
  },
  {
    pregunta: '¿Quién fue elegido presidente de la Primera Junta?',
    opciones: ['Manuel Belgrano', 'Cornelio Saavedra', 'Mariano Moreno', 'Juan José Castelli'],
    correcta: 1,
  },
  {
    pregunta: '¿Qué institución de gobierno reemplazó la Primera Junta?',
    opciones: ['El Directorio', 'El Triunvirato', 'La Asamblea del Año XIII', 'El Cabildo Abierto'],
    correcta: 1,
  },
  {
    pregunta: '¿Qué edificio fue escenario principal de los hechos de Mayo?',
    opciones: ['Casa Rosada', 'Cabildo de Buenos Aires', 'Congreso de Tucumán', 'Fuerte de Buenos Aires'],
    correcta: 1,
  },
  {
    pregunta: '¿Qué se debatió en el Cabildo Abierto del 22 de mayo de 1810?',
    opciones: ['La redacción de la Constitución', 'La continuidad del virrey Cisneros', 'La independencia de Brasil', 'La bandera nacional'],
    correcta: 1,
  },
  {
    pregunta: '¿Qué rol tuvo Mariano Moreno en la Primera Junta?',
    opciones: ['Secretario', 'Tesorero', 'Presidente', 'General del Ejército'],
    correcta: 0,
  },
  {
    pregunta: '¿Qué colores representan la escarapela argentina tradicional?',
    opciones: ['Rojo y blanco', 'Celeste y blanco', 'Azul y rojo', 'Verde y blanco'],
    correcta: 1,
  },
  {
    pregunta: '¿Qué acontecimiento internacional influyó en la Revolución de Mayo?',
    opciones: ['La Revolución Industrial', 'La invasión napoleónica a España', 'La caída del Imperio romano', 'La guerra de Crimea'],
    correcta: 1,
  },
  {
    pregunta: '¿Cómo se llamaba el virrey destituido en mayo de 1810?',
    opciones: ['Baltasar Hidalgo de Cisneros', 'Santiago de Liniers', 'Juan Manuel de Rosas', 'José de San Martín'],
    correcta: 0,
  },
  {
    pregunta: '¿Qué frase representa mejor el espíritu del 25 de Mayo?',
    opciones: ['Orden y progreso', 'Libertad y autogobierno', 'Paz y administración', 'Comercio y navegación'],
    correcta: 1,
  },
];

const questionEl = document.querySelector('#question');
const answersEl = document.querySelector('#answers');
const progressEl = document.querySelector('#progress');
const scoreEl = document.querySelector('#score');
const feedbackEl = document.querySelector('#feedback');
const nextBtn = document.querySelector('#next-btn');
const restartBtn = document.querySelector('#restart-btn');

let indiceActual = 0;
let puntaje = 0;
let respondida = false;

function renderPregunta() {
  const actual = preguntas[indiceActual];
  progressEl.textContent = `Pregunta ${indiceActual + 1} de ${preguntas.length}`;
  scoreEl.textContent = `Puntaje: ${puntaje}`;
  questionEl.textContent = actual.pregunta;
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  nextBtn.disabled = true;
  answersEl.innerHTML = '';
  respondida = false;

  actual.opciones.forEach((texto, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.type = 'button';
    btn.textContent = texto;
    btn.addEventListener('click', () => responder(i, btn));
    answersEl.appendChild(btn);
  });
}

function responder(indiceElegido, botonElegido) {
  if (respondida) {
    return;
  }

  respondida = true;
  const actual = preguntas[indiceActual];
  const botones = document.querySelectorAll('.answer-btn');

  botones.forEach((btn, i) => {
    btn.disabled = true;
    if (i === actual.correcta) {
      btn.classList.add('correct');
    }
  });

  if (indiceElegido === actual.correcta) {
    puntaje += 10;
    botonElegido.classList.add('correct');
    feedbackEl.textContent = '¡Correcto! +10 puntos';
    feedbackEl.classList.add('ok');
  } else {
    botonElegido.classList.add('wrong');
    feedbackEl.textContent = 'Respuesta incorrecta. ¡La próxima sale!';
    feedbackEl.classList.add('no');
  }

  scoreEl.textContent = `Puntaje: ${puntaje}`;
  nextBtn.disabled = false;
}

function mostrarResultadoFinal() {
  progressEl.textContent = `Juego terminado · ${preguntas.length} preguntas`;
  questionEl.textContent = `Obtuviste ${puntaje} puntos de ${preguntas.length * 10}.`;
  feedbackEl.textContent = puntaje >= 70 ? '¡Excelente espíritu patrio! 🇦🇷' : '¡Buen intento! Podés volver a jugar y superarte.';
  feedbackEl.className = `feedback ${puntaje >= 70 ? 'ok' : 'no'}`;
  answersEl.innerHTML = '';
  nextBtn.hidden = true;
  restartBtn.hidden = false;
}

nextBtn.addEventListener('click', () => {
  indiceActual += 1;
  if (indiceActual >= preguntas.length) {
    mostrarResultadoFinal();
    return;
  }

  renderPregunta();
});

restartBtn.addEventListener('click', () => {
  indiceActual = 0;
  puntaje = 0;
  nextBtn.hidden = false;
  restartBtn.hidden = true;
  renderPregunta();
});

renderPregunta();
