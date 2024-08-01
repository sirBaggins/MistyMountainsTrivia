// project constants
const MENU = document.getElementById("mainMenu");
const LEVELS = document.getElementById("levelSelector");
const GAME = document.getElementById("gamePlay");
const SCORE = document.getElementById("scoreDisplay");

// buttons
const BTN_SoundOn = "../resources/svg/sound_on.svg";
const BTN_SoundOff = "../resources/svg/sound_off.svg";


// project variables
// sys
let language = 0;
let music = 0;
let gamemode = 0;
let questionsSet = [];
let playedQuestions = [];
// game
let currentQuestion;
let score = 0;
let lives = 0;


function init() {
    pageUpdater(2);
}

// ------ MAIN ------

function pageUpdater(page) {
    switch (page) {
        case 0:
            MENU.style.display = "block";
            LEVELS.style.display = "none";
            GAME.style.display = "none";
            SCORE.style.display = "none";
            break;

        case 1:
            LEVELS.style.display = "flex"
            MENU.style.display = "none";
            GAME.style.display = "none";
            SCORE.style.display = "none";
            break;

        case 2:
            LEVELS.style.display = "none"
            MENU.style.display = "none";
            GAME.style.display = "flex";
            SCORE.style.display = "none";
            buildLevel();
            break;

        case 3:
            LEVELS.style.display = "none"
            MENU.style.display = "none";
            GAME.style.display = "none";
            SCORE.style.display = "flex";
            displayScore();
            break;

        default:
            pageUpdater(0);
            break;
    }
}

function setMusic() {
    if (music === 0) {
        music = 1;
        switchSource("sound_btn", BTN_SoundOn)
    }
    else {
        music = 0;
        switchSource("sound_btn", BTN_SoundOff)
    }
}

function selectLanguage(lang) {
    switch (lang) {
        case "pt":
            language = 1;
            setBlur("language_pt", false);
            setBlur("language_en", true);
            break;
        case "en":
            language = 0;
            setBlur("language_pt", true);
            setBlur("language_en", false);
            break;
        default:
            language = 0;
            setBlur("language_pt", true);
            setBlur("language_en", false);
            break;
    }
}

function gameMode(mode) {
    switch (mode) {
        case 'easy':
            gamemode = 0;
            gameModeBlur();
            break;

        case 'normal':
            gamemode = 1;
            gameModeBlur();
            break;

        case 'hard':
            gamemode = 2;
            gameModeBlur();
            break;

        default:
            gamemode = 0;
            gameModeBlur();
            break;
    }
}

function buildLevel() {
    const bg = document.getElementById("gamePlay");

    switch (gamemode) {
        case 0:
            bg.classList.add("easy");
            putQuestion();
            break;

        case 1:
            bg.classList.add("normal");
            putQuestion();
            break;

        case 2:
            bg.classList.add("hard");
            putQuestion();
            break;

        default:
            break;
    }
}

function displayScore() {
    document.getElementById("score").innerText = score;
}

// ------ HELPERS ------
function setBlur(id, on_off) {
    const item = document.getElementById(id);
    if (on_off === true) {
        item.classList.add("blur");
    }
    else {
        item.classList.remove("blur");
    }
}

function switchSource(id, src) {
    document.getElementById(id).src = src;
}

function gameModeBlur() {
    const opts = ["easy", "normal", "hard"];

    for (let i = 0; i < 3; i++) {
        if (i != gamemode) {
            setBlur(opts[i], true);
        }
        else {
            setBlur(opts[i], false);
        }
    }
}

// ------ GAME LOOP ------

function putQuestion() {
    const question = document.getElementById("question");
    const a = document.getElementById("a");
    const b = document.getElementById("b");
    const c = document.getElementById("c");
    const d = document.getElementById("d");

    currentQuestion = getQuestion();

    question.innerText = currentQuestion["question"];
    a.innerText = currentQuestion["a"];
    b.innerText = currentQuestion["b"];
    c.innerText = currentQuestion["c"];
    d.innerText = currentQuestion["d"];
}

function getQuestion() {
    questionsSet = getSet();
    const size = questionsSet.length;
    
    let pickQuestion = Math.floor(Math.random() * (size + 1));
    if (!verifyPlayed(pickQuestion)){
        playedQuestions.push(pickQuestion);
        return questionsSet[pickQuestion];
    }
    else{
        getQuestion();
    }
}

function verifyPlayed(index){
    if (playedQuestions.includes(index)){
        return true;
    }
    else{
        return false;
    }
}

function getSet() {
    switch (gamemode) {
        case 0:
            return questionsBank_easy;

        case 1:
            return questionsBank_normal;

        case 2:
            return questionsBank_hard;

        default:
            return questionsBank_easy;
    }
}

function verifyAnswer(letter){
    if (letter === currentQuestion["correct"]){
        // TODO
        return true;
    }
    else{
        // TODO
        return false;
    }
}








// ################################################
// ################ QUESTIONS BANK ################
// ################################################

const questionsBank_easy = [
    {
        question: "What is the largest planet in our solar system?",
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
        correct: "c"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        a: "China",
        b: "Japan",
        c: "Thailand",
        d: "India",
        correct: "b"
    },
    {
        question: "What is the capital city of Australia?",
        a: "Sydney",
        b: "Melbourne",
        c: "Brisbane",
        d: "Canberra",
        correct: "d"
    },
    {
        question: "Which element is represented by the symbol 'O' on the periodic table?",
        a: "Osmium",
        b: "Oxygen",
        c: "Oganesson",
        d: "Osmium",
        correct: "b"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        a: "William Shakespeare",
        b: "Charles Dickens",
        c: "Jane Austen",
        d: "Mark Twain",
        correct: "a"
    },
    {
        question: "What is the tallest animal in the world?",
        a: "Elephant",
        b: "Giraffe",
        c: "Lion",
        d: "Rhino",
        correct: "b"
    },
    {
        question: "Which continent is the Sahara Desert located on?",
        a: "Asia",
        b: "South America",
        c: "Africa",
        d: "Australia",
        correct: "c"
    },
    {
        question: "In which sport would you perform a slam dunk?",
        a: "Baseball",
        b: "Football",
        c: "Tennis",
        d: "Basketball",
        correct: "d"
    },
    {
        question: "Which planet is known as the Red Planet?",
        a: "Mercury",
        b: "Venus",
        c: "Mars",
        d: "Jupiter",
        correct: "c"
    },
    {
        question: "What is the primary language spoken in Brazil?",
        a: "Spanish",
        b: "Portuguese",
        c: "French",
        d: "English",
        correct: "b"
    }
];

const questionsBank_normal = [
    {
        question: "Which element has the atomic number 6?",
        a: "Carbon",
        b: "Nitrogen",
        c: "Oxygen",
        d: "Helium",
        correct: "a"
    },
    {
        question: "What is the capital city of Canada?",
        a: "Toronto",
        b: "Vancouver",
        c: "Ottawa",
        d: "Montreal",
        correct: "c"
    },
    {
        question: "Who painted the ceiling of the Sistine Chapel?",
        a: "Leonardo da Vinci",
        b: "Raphael",
        c: "Michelangelo",
        d: "Donatello",
        correct: "c"
    },
    {
        question: "In what year did the Titanic sink?",
        a: "1912",
        b: "1914",
        c: "1916",
        d: "1918",
        correct: "a"
    },
    {
        question: "Which famous scientist developed the theory of general relativity?",
        a: "Isaac Newton",
        b: "Albert Einstein",
        c: "Nikola Tesla",
        d: "Galileo Galilei",
        correct: "b"
    },
    {
        question: "What is the smallest prime number?",
        a: "1",
        b: "2",
        c: "3",
        d: "5",
        correct: "b"
    },
    {
        question: "Which Shakespearean play features the character Puck?",
        a: "Hamlet",
        b: "Macbeth",
        c: "A Midsummer Night's Dream",
        d: "The Tempest",
        correct: "c"
    },
    {
        question: "What is the largest organ in the human body?",
        a: "Liver",
        b: "Heart",
        c: "Skin",
        d: "Lungs",
        correct: "c"
    },
    {
        question: "In what year did the Berlin Wall fall?",
        a: "1987",
        b: "1988",
        c: "1989",
        d: "1990",
        correct: "c"
    },
    {
        question: "Which planet in our solar system has the most moons?",
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
        correct: "c"
    }
];

const questionsBank_hard = [
    {
        question: "Who is the author of the epic poem 'Paradise Lost'?",
        a: "John Milton",
        b: "Geoffrey Chaucer",
        c: "William Blake",
        d: "Edmund Spenser",
        correct: "a"
    },
    {
        question: "Which chemical element has the highest melting point?",
        a: "Iron",
        b: "Tungsten",
        c: "Carbon",
        d: "Osmium",
        correct: "b"
    },
    {
        question: "What is the oldest university in continuous operation?",
        a: "University of Bologna",
        b: "University of Oxford",
        c: "University of Paris",
        d: "Al-Qarawiyyin University",
        correct: "d"
    },
    {
        question: "Which artist is known for the painting 'The Persistence of Memory'?",
        a: "Pablo Picasso",
        b: "Salvador Dalí",
        c: "Vincent van Gogh",
        d: "Claude Monet",
        correct: "b"
    },
    {
        question: "In Greek mythology, who is the goddess of wisdom and warfare?",
        a: "Hera",
        b: "Athena",
        c: "Aphrodite",
        d: "Artemis",
        correct: "b"
    },
    {
        question: "Which country is the largest producer of coffee in the world?",
        a: "Colombia",
        b: "Vietnam",
        c: "Brazil",
        d: "Ethiopia",
        correct: "c"
    },
    {
        question: "What is the rarest blood type in the ABO blood group system?",
        a: "A",
        b: "B",
        c: "AB",
        d: "O",
        correct: "c"
    },
    {
        question: "Which ancient civilization built the Machu Picchu complex in Peru?",
        a: "Aztec",
        b: "Inca",
        c: "Maya",
        d: "Olmec",
        correct: "b"
    },
    {
        question: "In what year did the French Revolution begin?",
        a: "1787",
        b: "1788",
        c: "1789",
        d: "1790",
        correct: "c"
    },
    {
        question: "What is the chemical formula for table salt?",
        a: "NaCl",
        b: "KCl",
        c: "CaCl2",
        d: "MgCl2",
        correct: "a"
    }
];