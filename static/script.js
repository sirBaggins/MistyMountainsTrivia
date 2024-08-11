// project constants
const MENU = document.getElementById("mainMenu");
const LEVELS = document.getElementById("levelSelector");
const GAME = document.getElementById("gamePlay");
const SCORE = document.getElementById("scoreDisplay");
const MUSIC = new Audio("../resources/song/MistyMountainsTrivia.mp3");
const maxLives = 5;


// buttons
const BTN_SoundOn = "../resources/svg/sound_on.svg";
const BTN_SoundOff = "../resources/svg/sound_off.svg";


// project variables
// sys
let language = 0;
let music = 0;
let gamemode = 0;
let questionsSet = [];
let playing = true;
// game
let playedQuestions = [];
let currentQuestion;
let score = 0;
let lives = 0;


function init() {
    score = 0;
    lives = maxLives;
    selectLanguage();
    pageUpdater(0);
}

// ------ MAIN ------

function pageUpdater(page) {
    switch (page) {
        case 0:
            MENU.style.display = "flex";
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
            GAME.style.display = "flex";
            LEVELS.style.display = "none"
            MENU.style.display = "none";
            SCORE.style.display = "none";
            updateLives();
            updateScore();
            buildLevel();
            break;

        case 3:
            SCORE.style.display = "flex";
            LEVELS.style.display = "none"
            MENU.style.display = "none";
            GAME.style.display = "none";
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
        switchSource("sound_btn", BTN_SoundOn);
        MUSIC.play();
        MUSIC.loop = true;
        MUSIC.muted = false;
    }
    else {
        music = 0;
        switchSource("sound_btn", BTN_SoundOff);
        MUSIC.muted = true;
    }
}

function selectLanguage(lang) {
    switch (lang) {
        case "pt":
            language = 1;
            setBlur("language_pt", false);
            setBlur("language_en", true);
            nowAllIsPortuguese(true);
            break;
        case "en":
            language = 0;
            setBlur("language_pt", true);
            setBlur("language_en", false);
            nowAllIsPortuguese(false);
            break;
        default:
            selectLanguage("en");
            break;
    }
}

function nowAllIsPortuguese(bool) {
    const giveBTN = document.getElementById("giveUp");
    const nextBTN = document.getElementById("next");
    const easyBTN = document.getElementById("easy");
    const normalBTN = document.getElementById("normal");
    const hardBTN = document.getElementById("hard");
    const startPlayBTN = document.getElementById("startPlayBTN");
    const playBTN = document.getElementById("playGame");
    const yourScoreIs = document.getElementById("yourScoreIs");
    const playAgain = document.getElementById("playAgain");

    if (bool) {
        giveBTN.innerText = "Sair";
        nextBTN.innerText = "Próximo";
        easyBTN.innerText = "Fácil";
        normalBTN.innerText = "Normal";
        hardBTN.innerText = "Difícil";
        playBTN.innerText = "Jogar";
        startPlayBTN.innerText = "Jogar";
        yourScoreIs.innerText = "Você acertou:"
        playAgain.innerText = "Jogar novamente";
    }
    else {
        {
            giveBTN.innerText = "Quit";
            nextBTN.innerText = "Next";
            easyBTN.innerText = "Easy";
            normalBTN.innerText = "Normal";
            hardBTN.innerText = "Hard";
            playBTN.innerText = "Play";
            startPlayBTN.innerText = "Play";
            yourScoreIs.innerText = "Your score is"
            playAgain.innerText = "Play Again";
        }
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
            questionsSet = getSet(0)
            putQuestion();
            break;

        case 1:
            bg.classList.add("normal");
            questionsSet = getSet(1)
            putQuestion();
            break;

        case 2:
            bg.classList.add("hard");
            questionsSet = getSet(2)
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

function getSet(difficulty) {
    if (language === 1) {
        switch (difficulty) {
            case 0:
                return questionsBank_easy_pt;

            case 1:
                return questionsBank_normal_pt;

            case 2:
                return questionsBank_hard_pt;

            default:
                return questionsBank_easy_pt;
        }
    }
    else {
        switch (difficulty) {
            case 0:
                return questionsBank_easy_en;

            case 1:
                return questionsBank_normal_en;

            case 2:
                return questionsBank_hard_en;

            default:
                return questionsBank_easy_en;
        }
    }
}

function getRandom(limit) {
    return Math.floor(Math.random() * limit);
}

function updateLives() {
    let heartString = "";

    for (let i = 0; i < lives; i++) {
        heartString = heartString.concat(heartFillSvg);
    }
    for (let j = 0; j < (maxLives - lives); j++) {
        heartString = heartString.concat(heartEmptySvg);
    }

    document.getElementById("livesBar").innerHTML = heartString;
}

function updateScore() {
    document.getElementById("scoreBar").innerHTML = score;
}

function leaveGame() {
    if (language === 0) {
        if (window.confirm("Are you sure you want to leave?")) {
            pageUpdater(3);
        }
    }
    else {
        if (window.confirm("Você tem certeza de que deseja sair?")) {
            pageUpdater(3);
        }
    }
}

// ------ GAME LOOP ------

// --------------- question manager --------------- 
function putQuestion() {
    currentQuestion = getQuestion(getRandom(questionsSet.length));

    if (!currentQuestion) {
        return pageUpdater(3);
    }

    document.getElementById("questionLine").innerHTML = currentQuestion["question"];
    document.getElementById("a").innerHTML = currentQuestion["a"];
    document.getElementById("b").innerHTML = currentQuestion["b"];
    document.getElementById("c").innerHTML = currentQuestion["c"];
    document.getElementById("d").innerHTML = currentQuestion["d"];

}

function getQuestion(QuestionIndex) {
    if (!verifyPlayed(QuestionIndex)) {
        playedQuestions.push(QuestionIndex);
        return questionsSet[QuestionIndex];
    }
    else {
        if (playedQuestions.length === questionsSet.length) {
            return null;
        }
        else {
            // SHOULD ENHANCE THIS TO CALL RANDOM ONLY ON AVAILABLE
            let whileIndex = getRandom(questionsSet.length);
            while (verifyPlayed(whileIndex)) {
                whileIndex = getRandom(questionsSet.length);
                continue;
            }
            return questionsSet[whileIndex];
        }
    }
}

function verifyPlayed(index) {
    return playedQuestions.includes(index);
}

// -------------------------------------------------

function verifyLetter(letter) {
    if (letter === currentQuestion["correct"]) {
        return true;
    }
    else {
        return false;
    }
}

function userAnswerCheck(letter) {
    if (playing) {
        playing = false;
        if (verifyLetter(letter)) {
            document.getElementById(currentQuestion["correct"]).classList.add("right");
            score++;
            updateScore();
        }
        else {
            lives--;
            document.getElementById(letter).classList.add("wrong");
            document.getElementById(currentQuestion["correct"]).classList.add("right");
        }
    }
}

function loadNext() {
    if (!playing) {
        playing = true;

        const letter = ["a", "b", "c", "d"];
        for (let i = 0; i < 4; i++) {
            document.getElementById(letter[i]).classList.remove("right");
            document.getElementById(letter[i]).classList.remove("wrong");
        }
        updateLives();

        if (lives === 0) {
            return pageUpdater(3);
        }

        putQuestion();
    }
}

// ################################################
// ################## HEARTS SVG ##################
// ################################################


const heartFillSvg = `
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd"
            clip-rule="evenodd" d="M8.96173 19.3707C6.01943 16.9714 2 13.0079
            2 9.26044C2 3.3495 7.50016 0.662637 12 5.49877C16.4998 0.662637 22
            3.34931 22 9.2604C22 13.008 17.9806 16.9714 15.0383 19.3707C13.7063
            20.4569 13.0403 21 12 21C10.9597 21 10.2937 20.4569 8.96173 19.3707ZM10.0932
            10.7463C10.1827 10.6184 10.2571 10.5122 10.3233 10.4213C10.3793 10.5188 10.4418
            10.6324 10.517 10.7692L12.2273 13.8787C12.3933 14.1808 12.5562 14.4771 12.7197
            14.6921C12.8947 14.9221 13.2023 15.2374 13.6954 15.2466C14.1884 15.2559 14.5077
            14.9524 14.6912 14.7291C14.8627 14.5204 15.0365 14.2305 15.2138 13.9349L15.2692
            13.8425C15.49 13.4745 15.629 13.2444 15.752 13.0782C15.8654 12.9251 15.9309
            12.8751 15.9798 12.8475C16.0286 12.8198 16.1052 12.7894 16.2948 12.7709C16.5006
            12.7509 16.7694 12.7501 17.1986 12.7501H18C18.4142 12.7501 18.75 12.4143 18.75
            12.0001C18.75 11.5859 18.4142 11.2501 18 11.2501L17.1662 11.2501C16.7791
            11.2501 16.4367 11.2501 16.1497 11.278C15.8385 11.3082 15.5357
            11.3751 15.2407 11.5422C14.9457 11.7092 14.7325 11.9344 14.5465 12.1857C14.3749
            12.4174 14.1988 12.711 13.9996 13.043L13.9521 13.1222C13.8654 13.2668 13.793
            13.3872 13.7284 13.4906C13.6676 13.3849 13.5999 13.2618 13.5186 13.1141L11.8092
            10.006C11.6551 9.7256 11.5015 9.44626 11.3458 9.24147C11.1756 9.01775 10.8839
            8.72194 10.4164 8.6967C9.94887 8.67146 9.62698 8.93414 9.43373 9.13823C9.25683
            9.32506 9.0741 9.58625 8.89069 9.84841L8.58131 10.2904C8.35416 10.6149 8.21175
            10.8171 8.08848 10.9629C7.975 11.0971 7.91193 11.1411 7.86538 11.1653C7.81882
            11.1896 7.74663 11.216 7.57159 11.232C7.38144 11.2494 7.13413 11.2501 6.73803
            11.2501H6C5.58579 11.2501 5.25 11.5859 5.25 12.0001C5.25 12.4143 5.58579 12.7501
            6 12.7501L6.76812 12.7501C7.12509 12.7501 7.44153 12.7501 7.70801 12.7258C7.99707
            12.6994 8.27904 12.6411 8.55809 12.4958C8.83714 12.3505 9.04661 12.153 9.234
            11.9313C9.40676 11.7269 9.58821 11.4677 9.79291 11.1752L10.0932 10.7463Z"
            fill="#1C274C" /></svg>`

const heartEmptySvg = `<svg width="100%" height="100%" viewBox="0 0 24 24"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M5.62436 4.4241C3.96537 5.18243 2.75 6.98614
                        2.75 9.13701C2.75 11.3344 3.64922 13.0281 4.93829
                        14.4797C6.00072 15.676 7.28684 16.6675 8.54113
                        17.6345C8.83904 17.8642 9.13515 18.0925 9.42605
                        18.3218C9.95208 18.7365 10.4213 19.1004 10.8736
                        19.3647C11.3261 19.6292 11.6904 19.7499 12 19.7499C12.3096
                        19.7499 12.6739 19.6292 13.1264 19.3647C13.5787
                        19.1004 14.0479 18.7365 14.574 18.3218C14.8649
                        18.0925 15.161 17.8642 15.4589 17.6345C16.7132
                        16.6675 17.9993 15.676 19.0617 14.4797C20.3508
                        13.0281 21.25 11.3344 21.25 9.13701C21.25 6.98614
                        20.0346 5.18243 18.3756 4.4241C16.7639 3.68739
                        14.5983 3.88249 12.5404 6.02065C12.399 6.16754
                        12.2039 6.25054 12 6.25054C11.7961 6.25054
                        11.601 6.16754 11.4596 6.02065C9.40166 3.88249
                        7.23607 3.68739 5.62436 4.4241ZM12
                        4.45873C9.68795 2.39015 7.09896 2.10078 5.00076
                        3.05987C2.78471 4.07283 1.25 6.42494 1.25 9.13701C1.25
                        11.8025 2.3605 13.836 3.81672 15.4757C4.98287 16.7888
                        6.41022 17.8879 7.67083 18.8585C7.95659 19.0785 8.23378
                        19.292 8.49742 19.4998C9.00965 19.9036 9.55954 20.3342
                        10.1168 20.6598C10.6739 20.9853 11.3096 21.2499 12 21.2499C12.6904
                        21.2499 13.3261 20.9853 13.8832 20.6598C14.4405 20.3342
                        14.9903 19.9036 15.5026 19.4998C15.7662 19.292 16.0434
                        19.0785 16.3292 18.8585C17.5898 17.8879 19.0171 16.7888
                        20.1833 15.4757C21.6395 13.836 22.75 11.8025 22.75 9.13701C22.75
                        6.42494 21.2153 4.07283 18.9992 3.05987C16.901 2.10078 14.3121
                        2.39015 12 4.45873Z" fill="#1C274C" /></svg>`


// ################################################
// ################ QUESTIONS BANK ################
// ################################################

const questionsBank_easy_en = [
    {
        "question": "Which artist is famous for painting the Mona Lisa?",
        "a": "Vincent van Gogh",
        "b": "Leonardo da Vinci",
        "c": "Pablo Picasso",
        "d": "Claude Monet",
        "correct": "b"
    },
    {
        "question": "What type of art involves shaping clay?",
        "a": "Sculpture",
        "b": "Drawing",
        "c": "Photography",
        "d": "Painting",
        "correct": "a"
    },
    {
        "question": "Which artist is known for his colorful 'Starry Night' painting?",
        "a": "Pablo Picasso",
        "b": "Claude Monet",
        "c": "Vincent van Gogh",
        "d": "Leonardo da Vinci",
        "correct": "c"
    },
    {
        "question": "Which material is commonly used for making sculptures?",
        "a": "Wood",
        "b": "Marble",
        "c": "Canvas",
        "d": "Paper",
        "correct": "b"
    },
    {
        "question": "Which of the following is a primary color?",
        "a": "Green",
        "b": "Purple",
        "c": "Red",
        "d": "Orange",
        "correct": "c"
    },
    {
        "question": "Which art form involves the use of a camera?",
        "a": "Sculpture",
        "b": "Painting",
        "c": "Photography",
        "d": "Drawing",
        "correct": "c"
    },
    {
        "question": "What is the name of the famous sculpture with no arms, 'Venus de ___'?",
        "a": "Rome",
        "b": "Milo",
        "c": "Athens",
        "d": "Cairo",
        "correct": "b"
    },
    {
        "question": "Who painted the ceiling of the Sistine Chapel?",
        "a": "Raphael",
        "b": "Donatello",
        "c": "Michelangelo",
        "d": "Leonardo da Vinci",
        "correct": "c"
    },
    {
        "question": "Which country is the famous painter Frida Kahlo from?",
        "a": "Italy",
        "b": "France",
        "c": "Mexico",
        "d": "Spain",
        "correct": "c"
    },
    {
        "question": "Which of these is NOT a famous painting?",
        "a": "The Scream",
        "b": "The Starry Night",
        "c": "The Mona Lisa",
        "d": "The Laughing Man",
        "correct": "d"
    },
    {
        "question": "What type of paint is most commonly used in schools?",
        "a": "Oil paint",
        "b": "Watercolor",
        "c": "Acrylic paint",
        "d": "Tempera paint",
        "correct": "d"
    },
    {
        "question": "Which artist is known for his Blue Period?",
        "a": "Vincent van Gogh",
        "b": "Leonardo da Vinci",
        "c": "Pablo Picasso",
        "d": "Claude Monet",
        "correct": "c"
    },
    {
        "question": "Which of these is a type of printmaking?",
        "a": "Etching",
        "b": "Watercolor",
        "c": "Collage",
        "d": "Sketching",
        "correct": "a"
    },
    {
        "question": "What is the art of making images by cutting paper called?",
        "a": "Collage",
        "b": "Origami",
        "c": "Stencil",
        "d": "Silhouette",
        "correct": "d"
    },
    {
        "question": "Which artist is famous for his abstract drip paintings?",
        "a": "Claude Monet",
        "b": "Jackson Pollock",
        "c": "Pablo Picasso",
        "d": "Andy Warhol",
        "correct": "b"
    },
    {
        "question": "Which tool is used to mix paint colors?",
        "a": "Palette",
        "b": "Chisel",
        "c": "Brush",
        "d": "Sponge",
        "correct": "a"
    },
    {
        "question": "What is a self-portrait?",
        "a": "A painting of a landscape",
        "b": "A painting of a famous person",
        "c": "A painting an artist makes of themselves",
        "d": "A painting of an animal",
        "correct": "c"
    },
    {
        "question": "What do you call the person who models for an artist?",
        "a": "Subject",
        "b": "Model",
        "c": "Sculptor",
        "d": "Canvas",
        "correct": "b"
    },
    {
        "question": "Which of these is a famous museum in France?",
        "a": "The Louvre",
        "b": "The Prado",
        "c": "The British Museum",
        "d": "The Uffizi",
        "correct": "a"
    },
    {
        "question": "What do you call a painting done with thick layers of paint?",
        "a": "Watercolor",
        "b": "Impasto",
        "c": "Fresco",
        "d": "Pastel",
        "correct": "b"
    },
    {
        "question": "Who is known as the artist who cut off his ear?",
        "a": "Leonardo da Vinci",
        "b": "Claude Monet",
        "c": "Vincent van Gogh",
        "d": "Michelangelo",
        "correct": "c"
    },
    {
        "question": "What is the process of applying color to a surface called?",
        "a": "Sculpting",
        "b": "Drawing",
        "c": "Painting",
        "d": "Etching",
        "correct": "c"
    },
    {
        "question": "Which of these is NOT a type of art medium?",
        "a": "Oil paint",
        "b": "Canvas",
        "c": "Watercolor",
        "d": "Charcoal",
        "correct": "b"
    },
    {
        "question": "Which of these is a type of dance?",
        "a": "Ballet",
        "b": "Collage",
        "c": "Pottery",
        "d": "Mosaic",
        "correct": "a"
    },
    {
        "question": "What do you call the technique of painting on wet plaster?",
        "a": "Fresco",
        "b": "Impasto",
        "c": "Mosaic",
        "d": "Watercolor",
        "correct": "a"
    },
    {
        "question": "Which famous artist painted water lilies?",
        "a": "Pablo Picasso",
        "b": "Claude Monet",
        "c": "Leonardo da Vinci",
        "d": "Edgar Degas",
        "correct": "b"
    },
    {
        "question": "What is a mosaic made of?",
        "a": "Pieces of glass or tile",
        "b": "Pieces of paper",
        "c": "Paint",
        "d": "Fabric",
        "correct": "a"
    },
    {
        "question": "Which art movement is Salvador Dalí associated with?",
        "a": "Impressionism",
        "b": "Surrealism",
        "c": "Cubism",
        "d": "Expressionism",
        "correct": "b"
    },
    {
        "question": "What do you call a three-dimensional work of art?",
        "a": "Drawing",
        "b": "Painting",
        "c": "Sculpture",
        "d": "Collage",
        "correct": "c"
    },
    {
        "question": "Which tool is used to make lines in a drawing?",
        "a": "Brush",
        "b": "Pencil",
        "c": "Sponge",
        "d": "Chisel",
        "correct": "b"
    }
    ];

const questionsBank_normal_en = [
    {
        question: "What is the smallest prime number?",
        a: "1",
        b: "2",
        c: "3",
        d: "5",
        correct: "b"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        a: "China",
        b: "South Korea",
        c: "Japan",
        d: "Vietnam",
        correct: "c"
    },
    {
        question: "What element does 'O' represent on the periodic table?",
        a: "Osmium",
        b: "Oxygen",
        c: "Oganesson",
        d: "Oxide",
        correct: "b"
    },
    {
        question: "What is the hardest known natural material?",
        a: "Graphite",
        b: "Diamond",
        c: "Quartz",
        d: "Steel",
        correct: "b"
    },
    {
        question: "Who is the author of 'To Kill a Mockingbird'?",
        a: "J.D. Salinger",
        b: "F. Scott Fitzgerald",
        c: "Harper Lee",
        d: "Mark Twain",
        correct: "c"
    },
    {
        question: "Which planet is known for having a ring system?",
        a: "Mars",
        b: "Venus",
        c: "Saturn",
        d: "Jupiter",
        correct: "c"
    },
    {
        question: "What year did World War I begin?",
        a: "1912",
        b: "1914",
        c: "1916",
        d: "1918",
        correct: "b"
    },
    {
        question: "Which artist painted the ceiling of the Sistine Chapel?",
        a: "Michelangelo",
        b: "Leonardo da Vinci",
        c: "Raphael",
        d: "Donatello",
        correct: "a"
    },
    {
        question: "What is the capital of Canada?",
        a: "Toronto",
        b: "Ottawa",
        c: "Montreal",
        d: "Vancouver",
        correct: "b"
    },
    {
        question: "In which year did the Titanic sink?",
        a: "1908",
        b: "1910",
        c: "1912",
        d: "1914",
        correct: "c"
    },
    {
        question: "What is the tallest building in the world as of 2021?",
        a: "Shanghai Tower",
        b: "Abraj Al Bait",
        c: "One World Trade Center",
        d: "Burj Khalifa",
        correct: "d"
    },
    {
        question: "Who developed the theory of general relativity?",
        a: "Isaac Newton",
        b: "Albert Einstein",
        c: "Galileo Galilei",
        d: "Niels Bohr",
        correct: "b"
    },
    {
        question: "What is the chemical formula for table salt?",
        a: "NaCl",
        b: "KCl",
        c: "CaCl2",
        d: "NaHCO3",
        correct: "a"
    },
    {
        question: "Which country won the first FIFA World Cup?",
        a: "Brazil",
        b: "Argentina",
        c: "Uruguay",
        d: "Germany",
        correct: "c"
    },
    {
        question: "What is the capital of New Zealand?",
        a: "Auckland",
        b: "Christchurch",
        c: "Wellington",
        d: "Hamilton",
        correct: "c"
    },
    {
        question: "Who is the Greek god of the sea?",
        a: "Zeus",
        b: "Hades",
        c: "Poseidon",
        d: "Apollo",
        correct: "c"
    },
    {
        question: "What is the main ingredient in traditional Japanese miso soup?",
        a: "Tofu",
        b: "Seaweed",
        c: "Miso paste",
        d: "Rice",
        correct: "c"
    },
    {
        question: "Which Shakespeare play features the characters Rosencrantz and Guildenstern?",
        a: "Macbeth",
        b: "Hamlet",
        c: "Othello",
        d: "King Lear",
        correct: "b"
    },
    {
        question: "What is the powerhouse of the cell?",
        a: "Nucleus",
        b: "Ribosome",
        c: "Mitochondria",
        d: "Golgi apparatus",
        correct: "c"
    },
    {
        question: "Which planet is closest to the Sun?",
        a: "Earth",
        b: "Mars",
        c: "Venus",
        d: "Mercury",
        correct: "d"
    },
    {
        question: "What is the capital of South Korea?",
        a: "Seoul",
        b: "Busan",
        c: "Incheon",
        d: "Daegu",
        correct: "a"
    },
    {
        question: "Who painted 'Starry Night'?",
        a: "Claude Monet",
        b: "Vincent van Gogh",
        c: "Pablo Picasso",
        d: "Leonardo da Vinci",
        correct: "b"
    },
    {
        question: "What is the primary language spoken in Brazil?",
        a: "Spanish",
        b: "French",
        c: "Portuguese",
        d: "English",
        correct: "c"
    },
    {
        question: "In what year did the Berlin Wall fall?",
        a: "1985",
        b: "1987",
        c: "1989",
        d: "1991",
        correct: "c"
    },
    {
        question: "Who was the first man to travel into space?",
        a: "Neil Armstrong",
        b: "Buzz Aldrin",
        c: "Yuri Gagarin",
        d: "Alan Shepard",
        correct: "c"
    },
    {
        question: "Which gas is most abundant in the Earth's atmosphere?",
        a: "Oxygen",
        b: "Carbon Dioxide",
        c: "Nitrogen",
        d: "Hydrogen",
        correct: "c"
    },
    {
        question: "What is the currency of India?",
        a: "Dollar",
        b: "Rupee",
        c: "Yen",
        d: "Pound",
        correct: "b"
    },
    {
        question: "Which city is known as the Big Apple?",
        a: "Los Angeles",
        b: "San Francisco",
        c: "Chicago",
        d: "New York",
        correct: "d"
    },
    {
        question: "What is the largest island in the Mediterranean Sea?",
        a: "Sicily",
        b: "Sardinia",
        c: "Cyprus",
        d: "Crete",
        correct: "a"
    },
    {
        question: "Who wrote the novel '1984'?",
        a: "George Orwell",
        b: "Aldous Huxley",
        c: "Ray Bradbury",
        d: "J.R.R. Tolkien",
        correct: "a"
    },
    {
        question: "Which organ in the human body is primarily responsible for detoxification?",
        a: "Kidneys",
        b: "Liver",
        c: "Lungs",
        d: "Heart",
        correct: "b"
    },
    {
        question: "Who is the Roman equivalent of the Greek god Zeus?",
        a: "Mars",
        b: "Poseidon",
        c: "Jupiter",
        d: "Apollo",
        correct: "c"
    },
    {
        question: "Which country is the largest producer of coffee in the world?",
        a: "Vietnam",
        b: "Colombia",
        c: "Brazil",
        d: "Ethiopia",
        correct: "c"
    },
    {
        question: "What is the capital of Norway?",
        a: "Bergen",
        b: "Oslo",
        c: "Trondheim",
        d: "Stavanger",
        correct: "b"
    },
    {
        question: "Which Nobel Prize did Marie Curie win twice?",
        a: "Peace",
        b: "Literature",
        c: "Physics",
        d: "Chemistry",
        correct: "c"
    },
    {
        question: "Which element has the chemical symbol 'Fe'?",
        a: "Fermium",
        b: "Iron",
        c: "Fluorine",
        d: "Francium",
        correct: "b"
    },
    {
        question: "Which river flows through Paris?",
        a: "Thames",
        b: "Danube",
        c: "Seine",
        d: "Rhone",
        correct: "c"
    },
    {
        question: "Who is the director of the movie 'Inception'?",
        a: "Steven Spielberg",
        b: "Quentin Tarantino",
        c: "Christopher Nolan",
        d: "Martin Scorsese",
        correct: "c"
    }
];

const questionsBank_hard_en = [
    {
        question: "What is the smallest country in South America by area?",
        a: "Suriname",
        b: "Uruguay",
        c: "Guyana",
        d: "Paraguay",
        correct: "a"
    },
    {
        question: "Who developed the general theory of relativity?",
        a: "Isaac Newton",
        b: "Albert Einstein",
        c: "Niels Bohr",
        d: "Galileo Galilei",
        correct: "b"
    },
    {
        question: "What is the capital city of Mongolia?",
        a: "Ulaanbaatar",
        b: "Astana",
        c: "Tashkent",
        d: "Bishkek",
        correct: "a"
    },
    {
        question: "Which planet is known for having a hexagonal storm?",
        a: "Jupiter",
        b: "Saturn",
        c: "Neptune",
        d: "Uranus",
        correct: "b"
    },
    {
        question: "What is the hardest known natural material?",
        a: "Graphene",
        b: "Diamond",
        c: "Carbyne",
        d: "Lonsdaleite",
        correct: "b"
    },
    {
        question: "Who wrote 'The Divine Comedy'?",
        a: "Homer",
        b: "Virgil",
        c: "Dante Alighieri",
        d: "Ovid",
        correct: "c"
    },
    {
        question: "Which ancient civilization built Machu Picchu?",
        a: "Aztec",
        b: "Maya",
        c: "Inca",
        d: "Olmec",
        correct: "c"
    },
    {
        question: "What is the name of the deepest part of the world's oceans?",
        a: "Mariana Trench",
        b: "Tonga Trench",
        c: "Kuril-Kamchatka Trench",
        d: "Java Trench",
        correct: "a"
    },
    {
        question: "What is the largest moon of Saturn?",
        a: "Europa",
        b: "Ganymede",
        c: "Titan",
        d: "Callisto",
        correct: "c"
    },
    {
        question: "What is the chemical symbol for Plutonium?",
        a: "Pu",
        b: "Pm",
        c: "Pt",
        d: "Pb",
        correct: "a"
    },
    {
        question: "Which empire was ruled by Cyrus the Great?",
        a: "Roman Empire",
        b: "Macedonian Empire",
        c: "Persian Empire",
        d: "Ottoman Empire",
        correct: "c"
    },
    {
        question: "Who painted the 'School of Athens'?",
        a: "Leonardo da Vinci",
        b: "Raphael",
        c: "Michelangelo",
        d: "Titian",
        correct: "b"
    },
    {
        question: "What is the SI unit of electric capacitance?",
        a: "Ohm",
        b: "Farad",
        c: "Henry",
        d: "Tesla",
        correct: "b"
    },
    {
        question: "Who is the author of 'A Brief History of Time'?",
        a: "Carl Sagan",
        b: "Richard Feynman",
        c: "Stephen Hawking",
        d: "Neil deGrasse Tyson",
        correct: "c"
    },
    {
        question: "What is the second highest mountain in the world?",
        a: "K2",
        b: "Kangchenjunga",
        c: "Lhotse",
        d: "Makalu",
        correct: "a"
    },
    {
        question: "What is the most abundant gas in the Earth's atmosphere?",
        a: "Oxygen",
        b: "Carbon Dioxide",
        c: "Nitrogen",
        d: "Hydrogen",
        correct: "c"
    },
    {
        question: "Which country has won the most Nobel Prizes in Literature?",
        a: "France",
        b: "United States",
        c: "United Kingdom",
        d: "Germany",
        correct: "a"
    },
    {
        question: "Who was the first emperor of China?",
        a: "Qin Shi Huang",
        b: "Han Wudi",
        c: "Emperor Gaozu",
        d: "Kublai Khan",
        correct: "a"
    },
    {
        question: "Which element has the highest melting point?",
        a: "Tungsten",
        b: "Carbon",
        c: "Osmium",
        d: "Iridium",
        correct: "a"
    },
    {
        question: "What is the rarest naturally occurring element on Earth?",
        a: "Francium",
        b: "Astatine",
        c: "Technetium",
        d: "Promethium",
        correct: "b"
    },
    {
        question: "Which language is primarily spoken in the Canadian province of Quebec?",
        a: "English",
        b: "French",
        c: "Spanish",
        d: "Portuguese",
        correct: "b"
    },
    {
        question: "What is the longest river in Asia?",
        a: "Yellow River",
        b: "Mekong River",
        c: "Yangtze River",
        d: "Ganges River",
        correct: "c"
    },
    {
        question: "Which scientist is known for the law of planetary motion?",
        a: "Galileo Galilei",
        b: "Johannes Kepler",
        c: "Nicolaus Copernicus",
        d: "Tycho Brahe",
        correct: "b"
    },
    {
        question: "Who was the founder of the Mongol Empire?",
        a: "Genghis Khan",
        b: "Kublai Khan",
        c: "Tamerlane",
        d: "Attila the Hun",
        correct: "a"
    },
    {
        question: "What is the capital of Iceland?",
        a: "Oslo",
        b: "Helsinki",
        c: "Reykjavik",
        d: "Copenhagen",
        correct: "c"
    },
    {
        question: "Which element has the highest electrical conductivity?",
        a: "Copper",
        b: "Gold",
        c: "Aluminum",
        d: "Silver",
        correct: "d"
    },
    {
        question: "What is the largest volcano in the solar system?",
        a: "Mauna Loa",
        b: "Mount Olympus",
        c: "Olympus Mons",
        d: "Mount Etna",
        correct: "c"
    },
    {
        question: "Who wrote 'War and Peace'?",
        a: "Fyodor Dostoevsky",
        b: "Leo Tolstoy",
        c: "Anton Chekhov",
        d: "Ivan Turgenev",
        correct: "b"
    },
    {
        question: "What is the national currency of Japan?",
        a: "Won",
        b: "Yuan",
        c: "Yen",
        d: "Ruble",
        correct: "c"
    },
    {
        question: "Which country has the longest coastline in the world?",
        a: "Australia",
        b: "United States",
        c: "Russia",
        d: "Canada",
        correct: "d"
    }
];

const questionsBank_easy_pt = [
    {
        "question": "Qual artista é famoso por pintar a Mona Lisa?",
        "a": "Vincent van Gogh",
        "b": "Leonardo da Vinci",
        "c": "Pablo Picasso",
        "d": "Claude Monet",
        "correct": "b"
    },
    {
        "question": "Qual tipo de arte envolve moldar argila?",
        "a": "Escultura",
        "b": "Desenho",
        "c": "Fotografia",
        "d": "Pintura",
        "correct": "a"
    },
    {
        "question": "Qual artista é conhecido por sua pintura colorida 'Noite Estrelada'?",
        "a": "Pablo Picasso",
        "b": "Claude Monet",
        "c": "Vincent van Gogh",
        "d": "Leonardo da Vinci",
        "correct": "c"
    },
    {
        "question": "Qual material é comumente usado para fazer esculturas?",
        "a": "Madeira",
        "b": "Mármore",
        "c": "Tela",
        "d": "Papel",
        "correct": "b"
    },
    {
        "question": "Qual dessas é uma cor primária?",
        "a": "Verde",
        "b": "Roxo",
        "c": "Vermelho",
        "d": "Laranja",
        "correct": "c"
    },
    {
        "question": "Qual forma de arte envolve o uso de uma câmera?",
        "a": "Escultura",
        "b": "Pintura",
        "c": "Fotografia",
        "d": "Desenho",
        "correct": "c"
    },
    {
        "question": "Qual é o nome da famosa escultura sem braços, 'Vênus de ___'?",
        "a": "Roma",
        "b": "Milo",
        "c": "Atenas",
        "d": "Cairo",
        "correct": "b"
    },
    {
        "question": "Quem pintou o teto da Capela Sistina?",
        "a": "Rafael",
        "b": "Donatello",
        "c": "Michelangelo",
        "d": "Leonardo da Vinci",
        "correct": "c"
    },
    {
        "question": "De qual país é a famosa pintora Frida Kahlo?",
        "a": "Itália",
        "b": "França",
        "c": "México",
        "d": "Espanha",
        "correct": "c"
    },
    {
        "question": "Qual das opções NÃO é uma pintura famosa?",
        "a": "O Grito",
        "b": "A Noite Estrelada",
        "c": "A Mona Lisa",
        "d": "O Homem Risonho",
        "correct": "d"
    },
    {
        "question": "Qual é o tipo de tinta mais comumente usado nas escolas?",
        "a": "Tinta a óleo",
        "b": "Aquarela",
        "c": "Tinta acrílica",
        "d": "Tinta guache",
        "correct": "d"
    },
    {
        "question": "Qual artista é conhecido por seu Período Azul?",
        "a": "Vincent van Gogh",
        "b": "Leonardo da Vinci",
        "c": "Pablo Picasso",
        "d": "Claude Monet",
        "correct": "c"
    },
    {
        "question": "Qual dessas é uma forma de gravura?",
        "a": "Água-forte",
        "b": "Aquarela",
        "c": "Colagem",
        "d": "Desenho",
        "correct": "a"
    },
    {
        "question": "Qual é o nome da técnica de pintar com camadas espessas de tinta?",
        "a": "Aquarela",
        "b": "Impasto",
        "c": "Fresco",
        "d": "Pastel",
        "correct": "b"
    },
    {
        "question": "Quem é conhecido como o artista que cortou sua própria orelha?",
        "a": "Leonardo da Vinci",
        "b": "Claude Monet",
        "c": "Vincent van Gogh",
        "d": "Michelangelo",
        "correct": "c"
    },
    {
        "question": "Qual é o processo de aplicar cor a uma superfície chamado?",
        "a": "Escultura",
        "b": "Desenho",
        "c": "Pintura",
        "d": "Gravura",
        "correct": "c"
    },
    {
        "question": "Qual dessas NÃO é um meio de arte?",
        "a": "Tinta a óleo",
        "b": "Tela",
        "c": "Aquarela",
        "d": "Carvão",
        "correct": "b"
    },
    {
        "question": "Qual dessas é uma forma de dança?",
        "a": "Balé",
        "b": "Colagem",
        "c": "Cerâmica",
        "d": "Mosaico",
        "correct": "a"
    },
    {
        "question": "Qual é o nome da técnica de pintar sobre gesso molhado?",
        "a": "Fresco",
        "b": "Impasto",
        "c": "Mosaico",
        "d": "Aquarela",
        "correct": "a"
    },
    {
        "question": "Qual artista é famoso por suas pinturas de nenúfares?",
        "a": "Pablo Picasso",
        "b": "Claude Monet",
        "c": "Leonardo da Vinci",
        "d": "Edgar Degas",
        "correct": "b"
    },
    {
        "question": "Do que é feito um mosaico?",
        "a": "Pedaços de vidro ou azulejo",
        "b": "Pedaços de papel",
        "c": "Pintura",
        "d": "Tecido",
        "correct": "a"
    },
    {
        "question": "Qual movimento artístico Salvador Dalí está associado?",
        "a": "Impressionismo",
        "b": "Surrealismo",
        "c": "Cubismo",
        "d": "Expressionismo",
        "correct": "b"
    },
    {
        "question": "Como se chama uma obra de arte tridimensional?",
        "a": "Desenho",
        "b": "Pintura",
        "c": "Escultura",
        "d": "Colagem",
        "correct": "c"
    },
    {
        "question": "Qual ferramenta é usada para fazer linhas em um desenho?",
        "a": "Pincel",
        "b": "Lápis",
        "c": "Esponja",
        "d": "Cinzel",
        "correct": "b"
    }
];

const questionsBank_normal_pt = [
    {
        question: "Qual é o menor número primo?",
        a: "1",
        b: "2",
        c: "3",
        d: "5",
        correct: "b"
    },
    {
        question: "Qual país é conhecido como a Terra do Sol Nascente?",
        a: "China",
        b: "Coreia do Sul",
        c: "Japão",
        d: "Vietnã",
        correct: "c"
    },
    {
        question: "Qual elemento representa 'O' na tabela periódica?",
        a: "Osmiun",
        b: "Oxigênio",
        c: "Oganessônio",
        d: "Óxido",
        correct: "b"
    },
    {
        question: "Qual é o material natural mais duro conhecido?",
        a: "Grafite",
        b: "Diamante",
        c: "Quartzo",
        d: "Aço",
        correct: "b"
    },
    {
        question: "Quem é o autor de 'O Sol é para Todos'?",
        a: "J.D. Salinger",
        b: "F. Scott Fitzgerald",
        c: "Harper Lee",
        d: "Mark Twain",
        correct: "c"
    },
    {
        question: "Qual planeta é conhecido por ter um sistema de anéis?",
        a: "Marte",
        b: "Vênus",
        c: "Saturno",
        d: "Júpiter",
        correct: "c"
    },
    {
        question: "Em que ano começou a Primeira Guerra Mundial?",
        a: "1912",
        b: "1914",
        c: "1916",
        d: "1918",
        correct: "b"
    },
    {
        question: "Qual artista pintou o teto da Capela Sistina?",
        a: "Michelangelo",
        b: "Leonardo da Vinci",
        c: "Rafael",
        d: "Donatello",
        correct: "a"
    },
    {
        question: "Qual é a capital do Canadá?",
        a: "Toronto",
        b: "Ottawa",
        c: "Montreal",
        d: "Vancouver",
        correct: "b"
    },
    {
        question: "Em que ano o Titanic afundou?",
        a: "1908",
        b: "1910",
        c: "1912",
        d: "1914",
        correct: "c"
    },
    {
        question: "Qual é o edifício mais alto do mundo em 2021?",
        a: "Shanghai Tower",
        b: "Abraj Al Bait",
        c: "One World Trade Center",
        d: "Burj Khalifa",
        correct: "d"
    },
    {
        question: "Quem desenvolveu a teoria da relatividade geral?",
        a: "Isaac Newton",
        b: "Albert Einstein",
        c: "Galileu Galilei",
        d: "Niels Bohr",
        correct: "b"
    },
    {
        question: "Qual é a fórmula química do sal de cozinha?",
        a: "NaCl",
        b: "KCl",
        c: "CaCl2",
        d: "NaHCO3",
        correct: "a"
    },
    {
        question: "Qual país venceu a primeira Copa do Mundo da FIFA?",
        a: "Brasil",
        b: "Argentina",
        c: "Uruguai",
        d: "Alemanha",
        correct: "c"
    },
    {
        question: "Qual é a capital da Nova Zelândia?",
        a: "Auckland",
        b: "Christchurch",
        c: "Wellington",
        d: "Hamilton",
        correct: "c"
    },
    {
        question: "Quem é o deus grego do mar?",
        a: "Zeus",
        b: "Hades",
        c: "Poseidon",
        d: "Apolo",
        correct: "c"
    },
    {
        question: "Qual é o ingrediente principal na sopa de miso tradicional japonesa?",
        a: "Tofu",
        b: "Alga marinha",
        c: "Pasta de miso",
        d: "Arroz",
        correct: "c"
    },
    {
        question: "Qual peça de Shakespeare apresenta os personagens Rosencrantz e Guildenstern?",
        a: "Macbeth",
        b: "Hamlet",
        c: "Othello",
        d: "Rei Lear",
        correct: "b"
    },
    {
        question: "Qual é a usina de energia da célula?",
        a: "Núcleo",
        b: "Ribossomo",
        c: "Mitocôndria",
        d: "Aparelho de Golgi",
        correct: "c"
    },
    {
        question: "Qual planeta está mais próximo do Sol?",
        a: "Terra",
        b: "Marte",
        c: "Vênus",
        d: "Mercúrio",
        correct: "d"
    },
    {
        question: "Qual é a capital da Coreia do Sul?",
        a: "Seul",
        b: "Busan",
        c: "Incheon",
        d: "Daegu",
        correct: "a"
    },
    {
        question: "Quem pintou 'Noite Estrelada'?",
        a: "Claude Monet",
        b: "Vincent van Gogh",
        c: "Pablo Picasso",
        d: "Leonardo da Vinci",
        correct: "b"
    },
    {
        question: "Qual é a língua principal falada no Brasil?",
        a: "Espanhol",
        b: "Francês",
        c: "Português",
        d: "Inglês",
        correct: "c"
    },
    {
        question: "Em que ano caiu o Muro de Berlim?",
        a: "1985",
        b: "1987",
        c: "1989",
        d: "1991",
        correct: "c"
    },
    {
        question: "Quem foi o primeiro homem a viajar para o espaço?",
        a: "Neil Armstrong",
        b: "Buzz Aldrin",
        c: "Yuri Gagarin",
        d: "Alan Shepard",
        correct: "c"
    },
    {
        question: "Qual gás é o mais abundante na atmosfera da Terra?",
        a: "Oxigênio",
        b: "Dióxido de Carbono",
        c: "Nitrogênio",
        d: "Hidrogênio",
        correct: "c"
    },
    {
        question: "Qual é a moeda da Índia?",
        a: "Dólar",
        b: "Rúpia",
        c: "Iene",
        d: "Libra",
        correct: "b"
    },
    {
        question: "Qual cidade é conhecida como a Grande Maçã?",
        a: "Los Angeles",
        b: "São Francisco",
        c: "Chicago",
        d: "Nova York",
        correct: "d"
    },
    {
        question: "Qual é a maior ilha do Mar Mediterrâneo?",
        a: "Sicília",
        b: "Sardenha",
        c: "Chipre",
        d: "Creta",
        correct: "a"
    },
    {
        question: "Quem escreveu o romance '1984'?",
        a: "George Orwell",
        b: "Aldous Huxley",
        c: "Ray Bradbury",
        d: "J.R.R. Tolkien",
        correct: "a"
    },
    {
        question: "Qual órgão no corpo humano é principalmente responsável pela desintoxicação?",
        a: "Rins",
        b: "Fígado",
        c: "Pulmões",
        d: "Coração",
        correct: "b"
    },
    {
        question: "Quem é o equivalente romano do deus grego Zeus?",
        a: "Marte",
        b: "Poseidon",
        c: "Júpiter",
        d: "Apolo",
        correct: "c"
    },
    {
        question: "Qual país é o maior produtor de café do mundo?",
        a: "Vietnã",
        b: "Colômbia",
        c: "Brasil",
        d: "Etiópia",
        correct: "c"
    },
    {
        question: "Qual é a capital da Noruega?",
        a: "Bergen",
        b: "Oslo",
        c: "Trondheim",
        d: "Stavanger",
        correct: "b"
    },
    {
        question: "Qual Prêmio Nobel Marie Curie ganhou duas vezes?",
        a: "Paz",
        b: "Literatura",
        c: "Física",
        d: "Química",
        correct: "c"
    },
    {
        question: "Qual elemento tem o símbolo químico 'Fe'?",
        a: "Fermio",
        b: "Ferro",
        c: "Flúor",
        d: "Francio",
        correct: "b"
    },
    {
        question: "Qual rio passa por Paris?",
        a: "Tâmisa",
        b: "Danúbio",
        c: "Seine",
        d: "Ródano",
        correct: "c"
    },
    {
        question: "Quem é o diretor do filme 'A Origem'?",
        a: "Steven Spielberg",
        b: "Quentin Tarantino",
        c: "Christopher Nolan",
        d: "Martin Scorsese",
        correct: "c"
    }
];

const questionsBank_hard_pt = [
    {
        question: "Qual é o menor país da América do Sul em termos de área?",
        a: "Suriname",
        b: "Uruguai",
        c: "Guiana",
        d: "Paraguai",
        correct: "a"
    },
    {
        question: "Quem desenvolveu a teoria geral da relatividade?",
        a: "Isaac Newton",
        b: "Albert Einstein",
        c: "Niels Bohr",
        d: "Galileu Galilei",
        correct: "b"
    },
    {
        question: "Qual é a capital da Mongólia?",
        a: "Ulaanbaatar",
        b: "Astana",
        c: "Tashkent",
        d: "Bishkek",
        correct: "a"
    },
    {
        question: "Qual planeta é conhecido por ter uma tempestade hexagonal?",
        a: "Júpiter",
        b: "Saturno",
        c: "Netuno",
        d: "Urano",
        correct: "b"
    },
    {
        question: "Qual é o material natural mais duro conhecido?",
        a: "Grafeno",
        b: "Diamante",
        c: "Carbino",
        d: "Lonsdaleíta",
        correct: "b"
    },
    {
        question: "Quem escreveu 'A Divina Comédia'?",
        a: "Homero",
        b: "Virgílio",
        c: "Dante Alighieri",
        d: "Ovídio",
        correct: "c"
    },
    {
        question: "Qual civilização antiga construiu Machu Picchu?",
        a: "Azteca",
        b: "Maia",
        c: "Inca",
        d: "Olmeca",
        correct: "c"
    },
    {
        question: "Qual é o nome da parte mais profunda dos oceanos do mundo?",
        a: "Fossa das Marianas",
        b: "Fossa de Tonga",
        c: "Fossa Kuril-Kamchatka",
        d: "Fossa de Java",
        correct: "a"
    },
    {
        question: "Qual é a maior lua de Saturno?",
        a: "Europa",
        b: "Ganimedes",
        c: "Titã",
        d: "Calisto",
        correct: "c"
    },
    {
        question: "Qual é o símbolo químico do Plutônio?",
        a: "Pu",
        b: "Pm",
        c: "Pt",
        d: "Pb",
        correct: "a"
    },
    {
        question: "Qual império foi governado por Ciro, o Grande?",
        a: "Império Romano",
        b: "Império Macedônio",
        c: "Império Persa",
        d: "Império Otomano",
        correct: "c"
    },
    {
        question: "Quem pintou a 'Escola de Atenas'?",
        a: "Leonardo da Vinci",
        b: "Rafael",
        c: "Michelangelo",
        d: "Titian",
        correct: "b"
    },
    {
        question: "Qual é a unidade SI de capacitância elétrica?",
        a: "Ohm",
        b: "Farad",
        c: "Henry",
        d: "Tesla",
        correct: "b"
    },
    {
        question: "Quem é o autor de 'Uma Breve História do Tempo'?",
        a: "Carl Sagan",
        b: "Richard Feynman",
        c: "Stephen Hawking",
        d: "Neil deGrasse Tyson",
        correct: "c"
    },
    {
        question: "Qual é a segunda montanha mais alta do mundo?",
        a: "K2",
        b: "Kangchenjunga",
        c: "Lhotse",
        d: "Makalu",
        correct: "a"
    },
    {
        question: "Qual é o gás mais abundante na atmosfera da Terra?",
        a: "Oxigênio",
        b: "Dióxido de Carbono",
        c: "Nitrogênio",
        d: "Hidrogênio",
        correct: "c"
    },
    {
        question: "Qual país ganhou mais Prêmios Nobel de Literatura?",
        a: "França",
        b: "Estados Unidos",
        c: "Reino Unido",
        d: "Alemanha",
        correct: "a"
    },
    {
        question: "Quem foi o primeiro imperador da China?",
        a: "Qin Shi Huang",
        b: "Han Wudi",
        c: "Imperador Gaozu",
        d: "Kublai Khan",
        correct: "a"
    },
    {
        question: "Qual elemento tem o ponto de fusão mais alto?",
        a: "Tungstênio",
        b: "Carbono",
        c: "Osmiun",
        d: "Irídio",
        correct: "a"
    },
    {
        question: "Qual é o elemento naturalmente mais raro na Terra?",
        a: "Francium",
        b: "Astato",
        c: "Tecnécio",
        d: "Promécio",
        correct: "b"
    },
    {
        question: "Qual língua é falada principalmente na província canadense de Quebec?",
        a: "Inglês",
        b: "Francês",
        c: "Espanhol",
        d: "Português",
        correct: "b"
    },
    {
        question: "Qual é o rio mais longo da Ásia?",
        a: "Rio Amarelo",
        b: "Rio Mekong",
        c: "Rio Yangtze",
        d: "Rio Ganges",
        correct: "c"
    },
    {
        question: "Qual cientista é conhecido pela lei dos movimentos planetários?",
        a: "Galileu Galilei",
        b: "Johannes Kepler",
        c: "Nicolau Copérnico",
        d: "Tycho Brahe",
        correct: "b"
    },
    {
        question: "Quem foi o fundador do Império Mongol?",
        a: "Genghis Khan",
        b: "Kublai Khan",
        c: "Tamerlão",
        d: "Atila, o Huno",
        correct: "a"
    },
    {
        question: "Qual é a capital da Islândia?",
        a: "Oslo",
        b: "Helsinque",
        c: "Reykjavik",
        d: "Copenhague",
        correct: "c"
    },
    {
        question: "Qual elemento tem a maior condutividade elétrica?",
        a: "Cobre",
        b: "Ouro",
        c: "Alumínio",
        d: "Prata",
        correct: "d"
    },
    {
        question: "Qual é o maior vulcão do sistema solar?",
        a: "Mauna Loa",
        b: "Monte Olimpo",
        c: "Olympus Mons",
        d: "Monte Etna",
        correct: "c"
    },
    {
        question: "Quem escreveu 'Guerra e Paz'?",
        a: "Fiódor Dostoiévski",
        b: "Leon Tolstói",
        c: "Antón Tchékhov",
        d: "Ivan Turguêniev",
        correct: "b"
    },
    {
        question: "Qual é a moeda nacional do Japão?",
        a: "Won",
        b: "Yuan",
        c: "Iene",
        d: "Rublo",
        correct: "c"
    },
    {
        question: "Qual país tem a costa mais longa do mundo?",
        a: "Austrália",
        b: "Estados Unidos",
        c: "Rússia",
        d: "Canadá",
        correct: "d"
    }
];
