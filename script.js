let lives;
let score;
let right;
let played = [];

let questionsList = null;

function init() {
    document.getElementById("sound_btn").value = "off";
}


function setSound() {
    const btn = document.getElementById("sound_btn");
    const svg_on = "./img/svg/sound_on.svg";
    const svg_off = "./img/svg/sound_off.svg";

    const player = document.getElementById("music");

    if (btn.value === "on") {
        btn.src = svg_off;
        btn.value = "off";
        player.muted = !player.muted;
        return
    }
    else {
        btn.src = svg_on;
        btn.value = "on";
        document.getElementById("music").muted = "false";
        player.muted = !player.muted;
        player.play();
    }
}

function start() {
    const btn = document.getElementById("start_btn");
    btn.style.display = "none";

    const languageDiv = document.getElementById("language")

    languageDiv.innerHTML = flags;
    languageDiv.style.display = "flex";
    document.getElementById("gameName").style.display = "none";

}

function chooseLanguage(language) {
    switch (language) {
        case "pt":
            questionsList = questionsListPortuguese;
            proceedStart()
            break;
        case "en":
            questionsList = questionsListEnglish;
            proceedStart()
            break;
        default:
            questionsList = questionsListEnglish;
            proceedStart()
            break;
    }
}

function proceedStart() {
    lives = 5
    score = 0;

    displayLives();
    updateScore();
    loadLevel();
}

function loadLevel() {
    const gamePad = document.getElementById("game");

    gamePad.classList.remove("game");
    gamePad.classList.add("game_play");

    const question = getQuestion();
    document.getElementById("question").innerHTML = question["question"];
    document.getElementById("a").innerHTML = "<strong>A)</strong> " + question["a"];
    document.getElementById("b").innerHTML = "<strong>B)</strong> " + question["b"];
    document.getElementById("c").innerHTML = "<strong>C)</strong> " + question["c"];
    document.getElementById("d").innerHTML = "<strong>D)</strong> " + question["d"];
    document.getElementById("e").innerHTML = "<strong>E)</strong> " + question["e"];

    document.getElementById("quitMidGame").style.display = "block";
}

function getQuestion() {
    const totalQuestions = questionsList.length;
    const x = Math.floor(Math.random() * (totalQuestions));

    while (x in played) {
        x = Math.floor(Math.random() * (totalQuestions));
    }

    right = questionsList[x]["correct"];
    played.push(x);
    return questionsList[x];
}

function next() {
    if (played.length === questionsList.length) {
        displayScore();
    }
    else {
        resetButtuns();
        loadLevel();
    }
}

function checkAnswer(letter) {
    const option = document.getElementById(letter);

    if (letter === right) {
        option.classList.add("correct");
        document.getElementById("next").style.display = "block";
        score++;
        updateScore();
    }
    else {
        option.classList.add("wrong");
        setTimeout(() => option.classList.remove("wrong"), 1500);
        lives--;

        if (lives <= 0) {
            displayScore();
        }

        displayLives();

    }
}

function resetButtuns() {
    document.getElementById(right).classList.remove("correct");
    document.getElementById("next").style.display = "none";
}


function displayScore() {
    const gamePad = document.getElementById("game");

    gamePad.classList.remove("game_play");
    gamePad.classList.add("game");


    const div = document.getElementById("finalScore");
    const scoreBar = document.getElementById("theScore");

    div.style.display = "flex";
    scoreBar.innerText = `Your score is ${score}!`;
}

function displayLives() {
    const livesDiv = document.getElementById("lives");
    let hearts = [];

    for (let i = 0; i < lives; i++) {
        hearts.push(`<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.96173 19.3707C6.01943 16.9714 2 13.0079 2 9.26044C2 3.3495 7.50016 0.662637 12 5.49877C16.4998 0.662637 22 3.34931 22 9.2604C22 13.008 17.9806 16.9714 15.0383 19.3707C13.7063 20.4569 13.0403 21 12 21C10.9597 21 10.2937 20.4569 8.96173 19.3707ZM10.0932 10.7463C10.1827 10.6184 10.2571 10.5122 10.3233 10.4213C10.3793 10.5188 10.4418 10.6324 10.517 10.7692L12.2273 13.8787C12.3933 14.1808 12.5562 14.4771 12.7197 14.6921C12.8947 14.9221 13.2023 15.2374 13.6954 15.2466C14.1884 15.2559 14.5077 14.9524 14.6912 14.7291C14.8627 14.5204 15.0365 14.2305 15.2138 13.9349L15.2692 13.8425C15.49 13.4745 15.629 13.2444 15.752 13.0782C15.8654 12.9251 15.9309 12.8751 15.9798 12.8475C16.0286 12.8198 16.1052 12.7894 16.2948 12.7709C16.5006 12.7509 16.7694 12.7501 17.1986 12.7501H18C18.4142 12.7501 18.75 12.4143 18.75 12.0001C18.75 11.5859 18.4142 11.2501 18 11.2501L17.1662 11.2501C16.7791 11.2501 16.4367 11.2501 16.1497 11.278C15.8385 11.3082 15.5357 11.3751 15.2407 11.5422C14.9457 11.7092 14.7325 11.9344 14.5465 12.1857C14.3749 12.4174 14.1988 12.711 13.9996 13.043L13.9521 13.1222C13.8654 13.2668 13.793 13.3872 13.7284 13.4906C13.6676 13.3849 13.5999 13.2618 13.5186 13.1141L11.8092 10.006C11.6551 9.7256 11.5015 9.44626 11.3458 9.24147C11.1756 9.01775 10.8839 8.72194 10.4164 8.6967C9.94887 8.67146 9.62698 8.93414 9.43373 9.13823C9.25683 9.32506 9.0741 9.58625 8.89069 9.84841L8.58131 10.2904C8.35416 10.6149 8.21175 10.8171 8.08848 10.9629C7.975 11.0971 7.91193 11.1411 7.86538 11.1653C7.81882 11.1896 7.74663 11.216 7.57159 11.232C7.38144 11.2494 7.13413 11.2501 6.73803 11.2501H6C5.58579 11.2501 5.25 11.5859 5.25 12.0001C5.25 12.4143 5.58579 12.7501 6 12.7501L6.76812 12.7501C7.12509 12.7501 7.44153 12.7501 7.70801 12.7258C7.99707 12.6994 8.27904 12.6411 8.55809 12.4958C8.83714 12.3505 9.04661 12.153 9.234 11.9313C9.40676 11.7269 9.58821 11.4677 9.79291 11.1752L10.0932 10.7463Z" fill="#1C274C"/>
</svg>`);
    }
    livesDiv.innerHTML = hearts.join("");
}

function updateScore() {
    document.getElementById("currentScore").innerText = score;
}

function exit() {
    location.reload();
}

const flags = `<h1 class="shadow">Pick a language:</h1><div>
<svg class="flagCircle" onclick="chooseLanguage('pt')" width="100px" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512">
   <path fill="#009B3A" fill-rule="nonzero"
        d="M256 39.59c119.52 0 216.41 96.89 216.41 216.4 0 119.52-96.89 216.42-216.41 216.42-119.51 0-216.4-96.9-216.4-216.42 0-119.51 96.89-216.4 216.4-216.4z" />
    <path fill="#FEDF00" fill-rule="nonzero" d="m58.46 257.21 196.67 125.54 196.66-125.54-196.66-125.52z" />
    <path fill="#002776" fill-rule="nonzero"
        d="M255.13 174.29c45.8 0 82.92 37.12 82.92 82.92 0 45.8-37.12 82.94-82.92 82.94-45.8 0-82.93-37.14-82.93-82.94s37.13-82.92 82.93-82.92z" />
    <path fill="#fff" fill-rule="nonzero"
        d="M179.28 223.72c9.26-1.35 18.76-2.03 28.46-2.03 49.32 0 94.44 17.77 129.47 47.15-.58 4.54-1.6 8.91-2.94 13.13-33.51-30.14-77.89-48.5-126.53-48.5-11.2 0-22.24 1.02-32.93 2.87 1.17-4.37 2.69-8.58 4.47-12.62z" />
    </svg>
    <svg class="flagCircle" onclick="chooseLanguage('en')" width="100px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <g fill-rule="nonzero">
        <path fill="#FEFEFE"
            d="M256 39.59c119.52 0 216.41 96.89 216.41 216.4 0 119.52-96.89 216.42-216.41 216.42-119.51 0-216.4-96.9-216.4-216.42 0-119.51 96.89-216.4 216.4-216.4z" />
        <path fill="#012169"
            d="M183.49 179.55V52.05c-41.32 14.7-76.85 41.61-102.27 76.35l102.27 51.15zm0 152.9v127.5c-41.3-14.7-76.82-41.59-102.26-76.35l102.26-51.15zm144.55 0v127.67c41.45-14.63 77.09-41.54 102.61-76.34l-102.61-51.33zm0-152.9V51.88c41.45 14.63 77.11 41.54 102.62 76.35l-102.62 51.32z" />
        <path fill="#C8102E"
            d="M448.3 328.16h-48.11l49.35 24.72c3.21-6.41 6.11-13 8.69-19.75l-9.93-4.97zm-9.34-187.76-86.42 43.33h48.11l48.95-24.5c-3.23-6.46-6.79-12.75-10.64-18.83zM212.41 299.26v168.75c14.08 2.87 28.66 4.4 43.59 4.4 14.76 0 29.19-1.49 43.13-4.3V299.26h168.94c2.83-13.98 4.34-28.44 4.34-43.27 0-14.88-1.51-29.42-4.37-43.47H299.13V43.9A217.404 217.404 0 0 0 256 39.59c-14.93 0-29.51 1.54-43.59 4.4v168.53H43.97a217.777 217.777 0 0 0-4.37 43.47c0 14.83 1.51 29.29 4.34 43.27h168.47zM63.12 183.84h48.11l-48.89-24.48c-3.2 6.41-6.11 13.02-8.68 19.76l9.46 4.72zm95.87 144.43h-48.11l-48.57 24.31A216.76 216.76 0 0 0 73 371.52l86.43-43.25h-.44z" />
    </g>
</svg></div>
`

// THE TRIVIA QUESTIONS LIE BELOW BC I DON'T KNOW HOW TO IMPORT FROM FILE IN JAVASCRIPT

const questionsListEnglish = [
    {
        question: "How many colours does the rainbow have?",
        a: "five",
        b: "three",
        c: "seven",
        d: "nine",
        e: "eleven",
        correct: "c",
    },
    {
        question: "What mathematical operation is represented by the symbol ÷?",
        a: "multiplication",
        b: "division",
        c: "addition",
        d: "subtraction",
        e: "exponentiation",
        correct: "b"
    },
    {
        question: "What is the capital city of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Rome",
        d: "Paris",
        e: "Lisbon",
        correct: "d"
    },
    {
        question: "Which planet in our solar system is known as the Red Planet?",
        a: "Earth",
        b: "Venus",
        c: "Mars",
        d: "Jupiter",
        e: "Saturn",
        correct: "c"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        a: "William Shakespeare",
        b: "Charles Dickens",
        c: "Jane Austen",
        d: "Mark Twain",
        e: "Leo Tolstoy",
        correct: "a"
    },
    {
        question: "What is the chemical symbol for water?",
        a: "H2O",
        b: "CO2",
        c: "O2",
        d: "N2",
        e: "NaCl",
        correct: "a"
    },
    {
        question: "In which year did the Titanic sink?",
        a: "1905",
        b: "1912",
        c: "1920",
        d: "1935",
        e: "1940",
        correct: "b"
    },
    {
        question: "In which year did the Titanic sink?",
        a: "1905",
        b: "1912",
        c: "1920",
        d: "1935",
        e: "1940",
        correct: "b"
    },
    {
        question: "What is the tallest mountain in the world?",
        a: "K2",
        b: "Mount Everest",
        c: "Kangchenjunga",
        d: "Lhotse",
        e: "Makalu",
        correct: "b"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        a: "Oxygen",
        b: "Osmium",
        c: "Oganesson",
        d: "Osmium",
        e: "Oxygen",
        correct: "a"
    },
    {
        question: "Who painted the Mona Lisa?",
        a: "Vincent van Gogh",
        b: "Pablo Picasso",
        c: "Leonardo da Vinci",
        d: "Michelangelo",
        e: "Claude Monet",
        correct: "c"
    },
    {
        question: "Which planet is closest to the sun?",
        a: "Venus",
        b: "Earth",
        c: "Mars",
        d: "Mercury",
        e: "Jupiter",
        correct: "d"
    },
    {
        question: "What is the largest ocean on Earth?",
        a: "Atlantic Ocean",
        b: "Indian Ocean",
        c: "Southern Ocean",
        d: "Arctic Ocean",
        e: "Pacific Ocean",
        correct: "e"
    },
    {
        question: "Who is known as the 'Father of Computers'?",
        a: "Bill Gates",
        b: "Charles Babbage",
        c: "Alan Turing",
        d: "Steve Jobs",
        e: "Tim Berners-Lee",
        correct: "b"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        a: "Gold",
        b: "Iron",
        c: "Diamond",
        d: "Graphite",
        e: "Quartz",
        correct: "c"
    },
    {
        question: "Who discovered penicillin?",
        a: "Marie Curie",
        b: "Alexander Fleming",
        c: "Louis Pasteur",
        d: "Gregor Mendel",
        e: "Joseph Lister",
        correct: "b"
    },
    {
        question: "Which planet has the most moons?",
        a: "Mars",
        b: "Earth",
        c: "Jupiter",
        d: "Saturn",
        e: "Uranus",
        correct: "c"
    },
    {
        question: "What is the smallest country in the world?",
        a: "Monaco",
        b: "San Marino",
        c: "Liechtenstein",
        d: "Vatican City",
        e: "Malta",
        correct: "d"
    },
    {
        question: "Who wrote the novel '1984'?",
        a: "George Orwell",
        b: "Aldous Huxley",
        c: "Ray Bradbury",
        d: "J.R.R. Tolkien",
        e: "F. Scott Fitzgerald",
        correct: "a"
    },
    {
        question: "What is the main ingredient in traditional guacamole?",
        a: "Tomato",
        b: "Lettuce",
        c: "Avocado",
        d: "Cucumber",
        e: "Pepper",
        correct: "c"
    },
    {
        question: "Which ocean is the Bermuda Triangle located in?",
        a: "Atlantic Ocean",
        b: "Pacific Ocean",
        c: "Indian Ocean",
        d: "Southern Ocean",
        e: "Arctic Ocean",
        correct: "a"
    },
    {
        question: "What is the chemical formula for table salt?",
        a: "NaCl",
        b: "H2O",
        c: "CO2",
        d: "O2",
        e: "CH4",
        correct: "a"
    },
    {
        question: "In which year did the Berlin Wall fall?",
        a: "1987",
        b: "1988",
        c: "1989",
        d: "1990",
        e: "1991",
        correct: "c"
    },
    {
        question: "Which city hosted the 2016 Summer Olympics?",
        a: "Tokyo",
        b: "Beijing",
        c: "London",
        d: "Rio de Janeiro",
        e: "Athens",
        correct: "d"
    },
    {
        question: "Who is the author of the Harry Potter series?",
        a: "J.R.R. Tolkien",
        b: "George R.R. Martin",
        c: "J.K. Rowling",
        d: "C.S. Lewis",
        e: "Stephen King",
        correct: "c"
    },
    {
        question: "What is the square root of 64?",
        a: "6",
        b: "7",
        c: "8",
        d: "9",
        e: "10",
        correct: "c"
    },
    {
        question: "Which language is the most spoken worldwide?",
        a: "English",
        b: "Spanish",
        c: "Chinese",
        d: "Hindi",
        e: "Arabic",
        correct: "c"
    },
    {
        question: "Who was the first President of the United States?",
        a: "Thomas Jefferson",
        b: "Benjamin Franklin",
        c: "John Adams",
        d: "George Washington",
        e: "James Madison",
        correct: "d"
    },
    {
        question: "What is the largest desert in the world?",
        a: "Sahara",
        b: "Gobi",
        c: "Arctic",
        d: "Antarctic",
        e: "Kalahari",
        correct: "d"
    },
    {
        question: "In which year was the Declaration of Independence signed?",
        a: "1776",
        b: "1783",
        c: "1791",
        d: "1801",
        e: "1812",
        correct: "a"
    },
    {
        question: "What is the capital of Australia?",
        a: "Sydney",
        b: "Melbourne",
        c: "Brisbane",
        d: "Canberra",
        e: "Adelaide",
        correct: "d"
    },
    {
        question: "What is the most abundant gas in the Earth's atmosphere?",
        a: "Oxygen",
        b: "Carbon dioxide",
        c: "Nitrogen",
        d: "Hydrogen",
        e: "Argon",
        correct: "c"
    },
    {
        question: "What is the longest river in the world?",
        a: "Nile",
        b: "Amazon",
        c: "Yangtze",
        d: "Mississippi",
        e: "Congo",
        correct: "b"
    },
    {
        question: "Which famous scientist developed the theory of general relativity?",
        a: "Isaac Newton",
        b: "Albert Einstein",
        c: "Galileo Galilei",
        d: "Nikola Tesla",
        e: "Marie Curie",
        correct: "b"
    },
    {
        question: "Who was the first woman to win a Nobel Prize?",
        a: "Marie Curie",
        b: "Mother Teresa",
        c: "Jane Goodall",
        d: "Rosalind Franklin",
        e: "Dorothy Hodgkin",
        correct: "a"
    },
    {
        question: "Which organ in the human body is responsible for pumping blood?",
        a: "Brain",
        b: "Liver",
        c: "Heart",
        d: "Lungs",
        e: "Kidneys",
        correct: "c"
    },
    {
        question: "In what year did World War I begin?",
        a: "1912",
        b: "1914",
        c: "1916",
        d: "1918",
        e: "1920",
        correct: "b"
    },
    {
        question: "What is the capital of Japan?",
        a: "Osaka",
        b: "Kyoto",
        c: "Tokyo",
        d: "Nagoya",
        e: "Hiroshima",
        correct: "c"
    },
    {
        question: "Who is known as the 'King of Pop'?",
        a: "Elvis Presley",
        b: "Freddie Mercury",
        c: "Michael Jackson",
        d: "Prince",
        e: "Madonna",
        correct: "c"
    },
    {
        question: "What is the smallest prime number?",
        a: "1",
        b: "2",
        c: "3",
        d: "5",
        e: "7",
        correct: "b"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        a: "China",
        b: "Thailand",
        c: "Japan",
        d: "South Korea",
        e: "India",
        correct: "c"
    },
    {
        question: "What is the hardest substance in the human body?",
        a: "Bone",
        b: "Enamel",
        c: "Cartilage",
        d: "Nails",
        e: "Hair",
        correct: "b"
    },
    {
        question: "Who was the first man to walk on the moon?",
        a: "Yuri Gagarin",
        b: "Buzz Aldrin",
        c: "Neil Armstrong",
        d: "Michael Collins",
        e: "John Glenn",
        correct: "c"
    },
    {
        question: "What is the capital of Canada?",
        a: "Toronto",
        b: "Vancouver",
        c: "Montreal",
        d: "Ottawa",
        e: "Calgary",
        correct: "d"
    },
    {
        question: "What is the longest bone in the human body?",
        a: "Femur",
        b: "Tibia",
        c: "Humerus",
        d: "Radius",
        e: "Ulna",
        correct: "a"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        a: "Harper Lee",
        b: "F. Scott Fitzgerald",
        c: "Ernest Hemingway",
        d: "John Steinbeck",
        e: "Mark Twain",
        correct: "a"
    },
    {
        question: "What is the most common blood type in humans?",
        a: "A",
        b: "B",
        c: "AB",
        d: "O",
        e: "A+",
        correct: "d"
    },
    {
        question: "Which element is known as the 'King of the Elements'?",
        a: "Hydrogen",
        b: "Oxygen",
        c: "Carbon",
        d: "Iron",
        e: "Gold",
        correct: "c"
    },
    {
        question: "What is the national animal of Scotland?",
        a: "Eagle",
        b: "Lion",
        c: "Unicorn",
        d: "Bear",
        e: "Deer",
        correct: "c"
    },
    {
        question: "What is the largest mammal in the world?",
        a: "African Elephant",
        b: "Blue Whale",
        c: "Humpback Whale",
        d: "Giraffe",
        e: "Orca",
        correct: "b"
    }
];

const questionsListPortuguese = [
    {
        question: "Quantas cores tem o arco-íris?",
        a: "cinco",
        b: "três",
        c: "sete",
        d: "nove",
        e: "onze",
        correct: "c",
    },
    {
        question: "Qual operação matemática é representada pelo símbolo ÷?",
        a: "multiplicação",
        b: "divisão",
        c: "adição",
        d: "subtração",
        e: "exponenciação",
        correct: "b"
    },
    {
        question: "Qual é a capital da França?",
        a: "Berlim",
        b: "Madri",
        c: "Roma",
        d: "Paris",
        e: "Lisboa",
        correct: "d"
    },
    {
        question: "Qual planeta do nosso sistema solar é conhecido como o Planeta Vermelho?",
        a: "Terra",
        b: "Vênus",
        c: "Marte",
        d: "Júpiter",
        e: "Saturno",
        correct: "c"
    },
    {
        question: "Quem escreveu a peça 'Romeu e Julieta'?",
        a: "William Shakespeare",
        b: "Charles Dickens",
        c: "Jane Austen",
        d: "Mark Twain",
        e: "Leo Tolstoy",
        correct: "a"
    },
    {
        question: "Qual é o símbolo químico da água?",
        a: "H2O",
        b: "CO2",
        c: "O2",
        d: "N2",
        e: "NaCl",
        correct: "a"
    },
    {
        question: "Em que ano o Titanic afundou?",
        a: "1905",
        b: "1912",
        c: "1920",
        d: "1935",
        e: "1940",
        correct: "b"
    },
    {
        question: "Qual é a montanha mais alta do mundo?",
        a: "K2",
        b: "Monte Everest",
        c: "Kangchenjunga",
        d: "Lhotse",
        e: "Makalu",
        correct: "b"
    },
    {
        question: "Qual elemento tem o símbolo químico 'O'?",
        a: "Oxigênio",
        b: "Ósmio",
        c: "Oganésson",
        d: "Ósmio",
        e: "Oxigênio",
        correct: "a"
    },
    {
        question: "Quem pintou a Mona Lisa?",
        a: "Vincent van Gogh",
        b: "Pablo Picasso",
        c: "Leonardo da Vinci",
        d: "Michelangelo",
        e: "Claude Monet",
        correct: "c"
    },
    {
        question: "Qual planeta é o mais próximo do sol?",
        a: "Vênus",
        b: "Terra",
        c: "Marte",
        d: "Mercúrio",
        e: "Júpiter",
        correct: "d"
    },
    {
        question: "Qual é o maior oceano da Terra?",
        a: "Oceano Atlântico",
        b: "Oceano Índico",
        c: "Oceano Antártico",
        d: "Oceano Ártico",
        e: "Oceano Pacífico",
        correct: "e"
    },
    {
        question: "Quem é conhecido como o 'Pai dos Computadores'?",
        a: "Bill Gates",
        b: "Charles Babbage",
        c: "Alan Turing",
        d: "Steve Jobs",
        e: "Tim Berners-Lee",
        correct: "b"
    },
    {
        question: "Qual é a substância natural mais dura da Terra?",
        a: "Ouro",
        b: "Ferro",
        c: "Diamante",
        d: "Grafite",
        e: "Quartzo",
        correct: "c"
    },
    {
        question: "Quem descobriu a penicilina?",
        a: "Marie Curie",
        b: "Alexander Fleming",
        c: "Louis Pasteur",
        d: "Gregor Mendel",
        e: "Joseph Lister",
        correct: "b"
    },
    {
        question: "Qual planeta tem mais luas?",
        a: "Marte",
        b: "Terra",
        c: "Júpiter",
        d: "Saturno",
        e: "Urano",
        correct: "c"
    },
    {
        question: "Qual é o menor país do mundo?",
        a: "Mônaco",
        b: "San Marino",
        c: "Liechtenstein",
        d: "Vaticano",
        e: "Malta",
        correct: "d"
    },
    {
        question: "Quem escreveu o romance '1984'?",
        a: "George Orwell",
        b: "Aldous Huxley",
        c: "Ray Bradbury",
        d: "J.R.R. Tolkien",
        e: "F. Scott Fitzgerald",
        correct: "a"
    },
    {
        question: "Qual é o principal ingrediente do guacamole tradicional?",
        a: "Tomate",
        b: "Alface",
        c: "Abacate",
        d: "Pepino",
        e: "Pimenta",
        correct: "c"
    },
    {
        question: "Em qual oceano está localizado o Triângulo das Bermudas?",
        a: "Oceano Atlântico",
        b: "Oceano Pacífico",
        c: "Oceano Índico",
        d: "Oceano Antártico",
        e: "Oceano Ártico",
        correct: "a"
    },
    {
        question: "Qual é a fórmula química do sal de cozinha?",
        a: "NaCl",
        b: "H2O",
        c: "CO2",
        d: "O2",
        e: "CH4",
        correct: "a"
    },
    {
        question: "Em qual ano o Muro de Berlim caiu?",
        a: "1987",
        b: "1988",
        c: "1989",
        d: "1990",
        e: "1991",
        correct: "c"
    },
    {
        question: "Qual cidade sediou as Olimpíadas de Verão de 2016?",
        a: "Tóquio",
        b: "Pequim",
        c: "Londres",
        d: "Rio de Janeiro",
        e: "Atenas",
        correct: "d"
    },
    {
        question: "Quem é o autor da série Harry Potter?",
        a: "J.R.R. Tolkien",
        b: "George R.R. Martin",
        c: "J.K. Rowling",
        d: "C.S. Lewis",
        e: "Stephen King",
        correct: "c"
    },
    {
        question: "Qual é a raiz quadrada de 64?",
        a: "6",
        b: "7",
        c: "8",
        d: "9",
        e: "10",
        correct: "c"
    },
    {
        question: "Qual língua é a mais falada no mundo?",
        a: "Inglês",
        b: "Espanhol",
        c: "Chinês",
        d: "Hindi",
        e: "Árabe",
        correct: "c"
    },
    {
        question: "Quem foi o primeiro presidente dos Estados Unidos?",
        a: "Thomas Jefferson",
        b: "Benjamin Franklin",
        c: "John Adams",
        d: "George Washington",
        e: "James Madison",
        correct: "d"
    },
    {
        question: "Qual é o maior deserto do mundo?",
        a: "Saara",
        b: "Gobi",
        c: "Ártico",
        d: "Antártico",
        e: "Kalahari",
        correct: "d"
    },
    {
        question: "Em que ano foi assinada a Declaração de Independência dos Estados Unidos?",
        a: "1776",
        b: "1783",
        c: "1791",
        d: "1801",
        e: "1812",
        correct: "a"
    },
    {
        question: "Qual é a capital da Austrália?",
        a: "Sydney",
        b: "Melbourne",
        c: "Brisbane",
        d: "Canberra",
        e: "Adelaide",
        correct: "d"
    },
    {
        question: "Qual é o gás mais abundante na atmosfera da Terra?",
        a: "Oxigênio",
        b: "Dióxido de carbono",
        c: "Nitrogênio",
        d: "Hidrogênio",
        e: "Argônio",
        correct: "c"
    },
    {
        question: "Qual é o rio mais longo do mundo?",
        a: "Nilo",
        b: "Amazonas",
        c: "Yangtzé",
        d: "Mississippi",
        e: "Congo",
        correct: "b"
    },
    {
        question: "Qual cientista famoso desenvolveu a teoria da relatividade geral?",
        a: "Isaac Newton",
        b: "Albert Einstein",
        c: "Galileu Galilei",
        d: "Nikola Tesla",
        e: "Marie Curie",
        correct: "b"
    },
    {
        question: "Quem foi a primeira mulher a ganhar um Prêmio Nobel?",
        a: "Marie Curie",
        b: "Madre Teresa",
        c: "Jane Goodall",
        d: "Rosalind Franklin",
        e: "Dorothy Hodgkin",
        correct: "a"
    },
    {
        question: "Qual órgão no corpo humano é responsável por bombear o sangue?",
        a: "Cérebro",
        b: "Fígado",
        c: "Coração",
        d: "Pulmões",
        e: "Rins",
        correct: "c"
    },
    {
        question: "Em que ano começou a Primeira Guerra Mundial?",
        a: "1912",
        b: "1914",
        c: "1916",
        d: "1918",
        e: "1920",
        correct: "b"
    },
    {
        question: "Qual é a capital do Japão?",
        a: "Osaka",
        b: "Quioto",
        c: "Tóquio",
        d: "Nagoya",
        e: "Hiroshima",
        correct: "c"
    },
    {
        question: "Quem é conhecido como o 'Rei do Pop'?",
        a: "Elvis Presley",
        b: "Freddie Mercury",
        c: "Michael Jackson",
        d: "Prince",
        e: "Madonna",
        correct: "c"
    },
    {
        question: "Qual é o menor número primo?",
        a: "1",
        b: "2",
        c: "3",
        d: "5",
        e: "7",
        correct: "b"
    },
    {
        question: "Qual país é conhecido como a Terra do Sol Nascente?",
        a: "China",
        b: "Tailândia",
        c: "Japão",
        d: "Coreia do Sul",
        e: "Índia",
        correct: "c"
    },
    {
        question: "Qual é a substância mais dura no corpo humano?",
        a: "Osso",
        b: "Esmalte",
        c: "Cartilagem",
        d: "Unhas",
        e: "Cabelo",
        correct: "b"
    },
    {
        question: "Quem foi o primeiro homem a pisar na lua?",
        a: "Yuri Gagarin",
        b: "Buzz Aldrin",
        c: "Neil Armstrong",
        d: "Michael Collins",
        e: "John Glenn",
        correct: "c"
    },
    {
        question: "Qual é a capital do Canadá?",
        a: "Toronto",
        b: "Vancouver",
        c: "Montreal",
        d: "Ottawa",
        e: "Calgary",
        correct: "d"
    },
    {
        question: "Qual é o osso mais longo do corpo humano?",
        a: "Fêmur",
        b: "Tíbia",
        c: "Úmero",
        d: "Rádio",
        e: "Ulna",
        correct: "a"
    },
    {
        question: "Quem escreveu 'O Sol é para Todos'?",
        a: "Harper Lee",
        b: "F. Scott Fitzgerald",
        c: "Ernest Hemingway",
        d: "John Steinbeck",
        e: "Mark Twain",
        correct: "a"
    },
    {
        question: "Qual é o tipo de sangue mais comum nos seres humanos?",
        a: "A",
        b: "B",
        c: "AB",
        d: "O",
        e: "A+",
        correct: "d"
    },
    {
        question: "Qual elemento é conhecido como o 'Rei dos Elementos'?",
        a: "Hidrogênio",
        b: "Oxigênio",
        c: "Carbono",
        d: "Ferro",
        e: "Ouro",
        correct: "c"
    },
    {
        question: "Qual é o animal nacional da Escócia?",
        a: "Águia",
        b: "Leão",
        c: "Unicórnio",
        d: "Urso",
        e: "Cervo",
        correct: "c"
    },
    {
        question: "Qual é o maior mamífero do mundo?",
        a: "Elefante Africano",
        b: "Baleia Azul",
        c: "Baleia Jubarte",
        d: "Girafa",
        e: "Orca",
        correct: "b"
    }
];