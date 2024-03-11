// Contenuto delle domande e delle risposte in un array di oggetti
const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

// Inizializzazione delle variabili utilizzate per la gestione delle domande
let questionNumber = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let wrongSkip = 0;


// Aspetto il caricamento del documento e prendo la prima domanda dell'array delle domande
nextQuestion();
updateQuestionCounter();

// Inzizializzazione delle variabili utilizzate dalle funzioni timer
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
 
const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};
  
const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

// Visualizzazionde le timer nel document html
document.getElementById("app").innerHTML = `
    <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g class="base-timer__circle">
                <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                <path
                    id="base-timer-path-remaining"
                    stroke-dasharray="283"
                    class="base-timer__path-remaining ${remainingPathColor}"
                    d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                    "
                ></path>
            </g>
        </svg>
        <div class="timer-label-container">
            <span>SECONDS</span>
            <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
            <span>REMAINING</span>
        </div>
    </div>
`;

// Start timer 
startTimer();
  
function onTimesUp() {
    clearInterval(timerInterval);
    timePassed = 0;
    timeLeft = 30;
    document.getElementById("base-timer-path-remaining").classList.remove("red");
    document.getElementById("base-timer-path-remaining").classList.add("green");     
    nextQuestion();
    startTimer();
};

// Funzione avvio timer 
function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        setCircleDasharray();
        setRemainingPathColor(timeLeft); 
    
        if (timeLeft === 0) {
            onTimesUp();
        }
    }, 1000);
};

// Funzione per formattare il tempo rimanente 
function formatTime(time) {
    // const minutes = Math.floor(time / 60);
    let seconds = time;
  
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${seconds}`;
};

// Funzione per impostare il colore del timer in base al tempo rimanente
function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document.getElementById("base-timer-path-remaining").classList.remove(warning.color);
        document.getElementById("base-timer-path-remaining").classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document.getElementById("base-timer-path-remaining").classList.remove(info.color);
        document.getElementById("base-timer-path-remaining").classList.add(warning.color);
    }
}; 

// Funzione per calcolare la frazione di tempo rimanente
function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
};
  
function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
};

/* 
    Questa funziona utilizza la varibiale questionNumber per estrarre dall'array "questions"
    la domanda e le relative risposte da visualizzare in modo casuale nel document html. 
*/

function nextQuestion() {
    if (questionNumber < questions.length) {
        // Inizializzo una variabile stringa vuoto
        let htmlAnswers = "";
        // Inizializzo un array delle risposte vuoto
        let answersArray = [];
        // Inizializzo un array delle risposte random vuoto
        let randomAnswers = [];
        // Inizializzo e assegno il contenuto della domanda attuale
        let htmlQuestion = `<div class="cnt-question">
                            ${questions[questionNumber].question}
                            </div>`;
        
        // Visualizzo nel document html il contenuto della domanda attuale
        document.getElementById("cnt-question").innerHTML = htmlQuestion;
        
        // Eseguo uno swich case in funzione del tipo di domanda se multipla o boolean
        switch (questions[questionNumber].type) {
            case "multiple":
                // Ciclo for per leggere il contenuto delle risposte
                questions[questionNumber].incorrect_answers.forEach((element) => {
                    answersArray.push(`<button class="asd">${element}</button> \n`);
                });
                // Aggiungo all'array il contenuto del button con il testo della domanda
                answersArray.push(`<button class="qwe">${questions[questionNumber].correct_answer}</button> \n`);
                // Rendo le domande disposte in modo casuale
                randomAnswers = answersArray.slice().sort(() => Math.random() - 0.5);
                // Stampo su console in formato tabella delle domande random
                console.table (randomAnswers);
                // Eseguo un ciclo per assegnare le domande random alla variabile htmlAnswers
                randomAnswers.forEach(element => {
                    htmlAnswers = htmlAnswers + element;
                }) 
                // Legge e stampa la risposta corretta
                document.getElementById("cnt-answers").innerHTML = htmlAnswers;
                // Aggiungo +1 al ciclo per proseguire il conteggio delle domande
                questionNumber += 1;
                // Stampo su console il conteggio attuale della domanda
                console.log(questionNumber);
                break;
            // Eventuale case per layout diverso
            case "boolean":
                // Ciclo for per leggere il contenuto delle risposte
                questions[questionNumber].incorrect_answers.forEach((element) => {
                    answersArray.push(`<button class="asd">${element}</button> \n`);
                });
                // Aggiungo all'array il contenuto del button con il testo della domanda
                answersArray.push(`<button class="qwe">${questions[questionNumber].correct_answer}</button> \n`);
                // Rendo le domande disposte in modo casuale
                randomAnswers = answersArray.slice().sort(() => Math.random() - 0.5);
                // Stampo su console in formato tabella delle domande random
                console.table (randomAnswers);
                // Eseguo un ciclo per assegnare le domande random alla variabile htmlAnswers
                randomAnswers.forEach(element => {
                    htmlAnswers = htmlAnswers + element;
                }) 
                // Legge e stampa la risposta corretta
                document.getElementById("cnt-answers").innerHTML = htmlAnswers;
                // Aggiungo +1 al ciclo per proseguire il conteggio delle domande
                questionNumber += 1;
                // Stampo su console il conteggio attuale della domanda
                console.log(questionNumber);
                break;
            default:
                // Stampo su console eventi case non gestito
                console.log("Question type non gestito...");
                break;
        }
  
        // Aggiungo l'evento click ai bottoni contenente le domande errate
        let incorrects = document.querySelectorAll(".asd");
        incorrects.forEach((element) => {
            element.addEventListener("click", function () {
                wrongAnswers += 1;
                // nextQuestion();
                onTimesUp();
            });
        });
      
        // Aggiungo l'evento click ai bottoni contenente le domande corrette
        let corrects = document.querySelectorAll(".qwe");
  
        corrects.forEach((element) => {
            element.addEventListener("click", function () {
                console.log("Correct multiple");
                correctAnswers += 1;
                // nextQuestion();
                onTimesUp();
            });
        });
  
        updateQuestionCounter();

    } else {
        // Stampo su console i risultati dell'esame
        console.log("Domande terminate");
        // Stampo su console le domande errate
        console.log("Domande errate:" + wrongAnswers);
        // Stampo su console le domande corrette
        console.log("Domande corrette:" + correctAnswers);
        document.getElementById("cnt-question").innerHTML = "";
        document.getElementById("cnt-answers").innerHTML = "";

        // Verifico se sono state saltate delle domande 
        if (wrongAnswers + correctAnswers !== 10) {
            wrongSkip = questions.length - (wrongAnswers + correctAnswers);
            console.log("Domande saltate: " + wrongSkip);
        }
    
        // Nascondo la visualizzazione sul document html del timer 
        document.getElementsByClassName("base-timer__svg ")[0].style.display = "none";
        document.getElementsByClassName("timer-label-container")[0].style.display = "none";
        // Nascondo la visualizzazione sul document html del contatore delle domande
        document.getElementsByClassName("cnt-question-counter")[0].style.display = "none";
    
        // Richiama la funzione per creare il grafico doughnut
        chartResult(wrongAnswers, correctAnswers, wrongSkip);
        
        // Visualizzazione su document html dei risultati dell'esame
        if (correctAnswers >= 6) {  
            let esitoFinale = `<div id="esito-finale">
                                <span>Superato!</span> 
                                <span>${(correctAnswers/10)*100}%</span>
                                <span>${correctAnswers}/10 domande</span>
                                </div>`;
            document.getElementById("esito-finale").innerHTML = esitoFinale;
            document.getElementById("back").style.display = "block";
        } else {
            let esitoFinale = `<div id="esito-finale">
                                <span>Insufficiente!</span>
                                <span>${(correctAnswers/10)*100}%</span>
                                <span>${correctAnswers}/10 domande</span>
                                </div>`;
            document.getElementById("esito-finale").innerHTML = esitoFinale;
            document.getElementById("back").style.display = "block";
        }
    }
};
  
// Funzione per tenere aggiornato il contatore delle domande in document html
function updateQuestionCounter() {
    document.getElementsByClassName("cnt-question-counter")[0].innerHTML = `QUESTION ${questionNumber} <span>/${questions.length} </span>`;
};

// Funzione di errore che si attiva quando il mouse esce dal document html
document.addEventListener("mouseleave", function() {
    document.getElementsByClassName("errore")[0].style.display = "block";
});

//  Funzione evento che al click del button si viene reinderizzati alla home ppage inziale
document.getElementsByClassName("reset")[0].addEventListener("click", function() {
    document.getElementsByClassName("errore")[0].style.display = "none";
    window.location.href = "./index.html";
});

document.getElementById("back").addEventListener("click", function() {
    console.log("sono qui dentro")
    window.location.href = "./index.html";
});

// Funzione per richiamare la visualizzazione in document html del grafico dei risultati a forma di doughnut
function chartResult(wrongAnswers, correctAnswers, wrongSkip) {
    // Inizializzo un array vuoto dei risultati
    let result = [];
    // Inserisco i dati ottenuti nell'array result
    result.push(correctAnswers);
    result.push(wrongAnswers);
    result.push(wrongSkip);

    const ctx = document.getElementById('myChart');
    
    // Creo il grafico in funzione dei dati inseriti contenuti nel'array
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Correct', 'Incorrect', 'Jump'],
            datasets: [{
                data: result,
                borderWidth: 1.5,
                borderColor: "white",
                backgroundColor: ["#6FF500", "#FF7400", "#d64161"],
            }]
        },
        options: {
            animation: false
        }
    });
};