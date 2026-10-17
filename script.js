
"use strict";

/* ==========================================
   QUIZMASTER - COMPLETE FRONTEND STARTER
   HTML + CSS + JavaScript + localStorage
========================================== */

const STORAGE = {
  users: "qm_users_v1",
  currentUser: "qm_current_user_v1",
  results: "qm_results_v1",
  daily: "qm_daily_v1"
};

const categories = [
  { id: "general", name: "General Knowledge", icon: "🌍", description: "Discover the world" },
  { id: "science", name: "Science", icon: "🔬", description: "Explore discoveries" },
  { id: "technology", name: "Technology", icon: "💻", description: "Explore the digital world" },
  { id: "mathematics", name: "Mathematics", icon: "➗", description: "Test your logic" },
  { id: "history", name: "History", icon: "🏛️", description: "Explore the past" },
  { id: "geography", name: "Geography", icon: "🗺️", description: "Explore our planet" },
  { id: "sports", name: "Sports", icon: "⚽", description: "Test your sports knowledge" },
  { id: "movies", name: "Movies", icon: "🎬", description: "Lights, camera, quiz!" },
  { id: "music", name: "Music", icon: "🎵", description: "Discover music facts" },
  { id: "animals", name: "Animals", icon: "🐾", description: "Meet the animal kingdom" },
  { id: "space", name: "Space", icon: "🚀", description: "Explore the universe" },
  { id: "literature", name: "Literature", icon: "📚", description: "Books and authors" },
  { id: "coding", name: "Programming", icon: "👨‍💻", description: "Think like a developer" },
  { id: "food", name: "Food", icon: "🍕", description: "Food around the world" },
  { id: "nature", name: "Nature", icon: "🌿", description: "Discover our environment" },
  { id: "inventions", name: "Inventions", icon: "💡", description: "Ideas that changed the world" }
];

/*
  Each question has four options.
  The answer field is the zero-based index of the correct option.
*/
const questionBank = {
  general: [
    { q: "Which is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2 },
    { q: "How many days are there in a leap year?", options: ["364", "365", "366", "367"], answer: 2 },
    { q: "What is the capital of Japan?", options: ["Seoul", "Tokyo", "Beijing", "Bangkok"], answer: 1 },
    { q: "Which language is primarily spoken in Brazil?", options: ["Spanish", "French", "Portuguese", "Italian"], answer: 2 },
    { q: "How many colours are traditionally named in a rainbow?", options: ["Five", "Six", "Seven", "Eight"], answer: 2 }
  ],
  science: [
    { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Mercury"], answer: 1 },
    { q: "What is the chemical formula for water?", options: ["CO2", "O2", "H2O", "NaCl"], answer: 2 },
    { q: "Which organ pumps blood around the human body?", options: ["Lungs", "Brain", "Liver", "Heart"], answer: 3 },
    { q: "What force pulls objects toward Earth?", options: ["Friction", "Gravity", "Magnetism", "Pressure"], answer: 1 },
    { q: "Which gas do plants absorb during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: 2 }
  ],
  technology: [
    { q: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Power Utility", "Central Program User", "Control Processing User"], answer: 0 },
    { q: "Which of these is a web browser?", options: ["Python", "Chrome", "Linux", "MySQL"], answer: 1 },
    { q: "What does URL stand for?", options: ["Universal Reading Link", "Uniform Resource Locator", "United Resource Line", "User Reference Location"], answer: 1 },
    { q: "Which device is commonly used to input text?", options: ["Monitor", "Speaker", "Keyboard", "Projector"], answer: 2 },
    { q: "What does Wi-Fi primarily provide?", options: ["Wireless networking", "Paper printing only", "Power generation", "Screen cleaning"], answer: 0 }
  ],
  mathematics: [
    { q: "What is 12 × 8?", options: ["86", "92", "96", "108"], answer: 2 },
    { q: "What is the square root of 144?", options: ["10", "11", "12", "14"], answer: 2 },
    { q: "What is 25% of 200?", options: ["25", "40", "50", "75"], answer: 2 },
    { q: "How many degrees are in a right angle?", options: ["45", "90", "180", "360"], answer: 1 },
    { q: "What is the next prime number after 7?", options: ["8", "9", "10", "11"], answer: 3 }
  ],
  history: [
    { q: "In which year did World War II end?", options: ["1939", "1942", "1945", "1950"], answer: 2 },
    { q: "Which ancient civilization built the pyramids at Giza?", options: ["Romans", "Ancient Egyptians", "Vikings", "Persians"], answer: 1 },
    { q: "Who was the first person to walk on the Moon?", options: ["Yuri Gagarin", "Buzz Aldrin", "Neil Armstrong", "John Glenn"], answer: 2 },
    { q: "The Renaissance began in which country?", options: ["Italy", "Canada", "Japan", "Egypt"], answer: 0 },
    { q: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "John Adams", "Thomas Jefferson"], answer: 1 }
  ],
  geography: [
    { q: "Which is the highest mountain above sea level?", options: ["K2", "Kangchenjunga", "Mount Everest", "Denali"], answer: 2 },
    { q: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: 2 },
    { q: "Which continent is the Sahara Desert in?", options: ["Asia", "Africa", "Europe", "South America"], answer: 1 },
    { q: "Which is the largest continent by area?", options: ["Africa", "Europe", "Asia", "Australia"], answer: 2 },
    { q: "Which country is famous for the city of Rio de Janeiro?", options: ["Brazil", "Portugal", "Mexico", "Chile"], answer: 0 }
  ],
  sports: [
    { q: "How many players from one team are on the field in football (soccer)?", options: ["9", "10", "11", "12"], answer: 2 },
    { q: "How many rings are on the Olympic symbol?", options: ["Four", "Five", "Six", "Seven"], answer: 1 },
    { q: "Which sport uses a shuttlecock?", options: ["Tennis", "Badminton", "Squash", "Table tennis"], answer: 1 },
    { q: "In cricket, how many runs are scored when the ball reaches the boundary without bouncing?", options: ["Four", "Five", "Six", "Seven"], answer: 2 },
    { q: "Which sport is associated with Wimbledon?", options: ["Golf", "Tennis", "Rugby", "Swimming"], answer: 1 }
  ],
  movies: [
    { q: "Which animated film features a snowman named Olaf?", options: ["Moana", "Frozen", "Coco", "Up"], answer: 1 },
    { q: "What is the name of the fictional school in the Harry Potter films?", options: ["Hogwarts", "Narnia", "Nevermore", "Xavier's"], answer: 0 },
    { q: "Which award is associated with the American film industry?", options: ["Grammy", "Oscar", "Pulitzer", "Booker"], answer: 1 },
    { q: "Which film series features the character Darth Vader?", options: ["Star Wars", "Toy Story", "Shrek", "Jurassic Park"], answer: 0 },
    { q: "What type of animal is Dumbo?", options: ["Lion", "Elephant", "Bear", "Horse"], answer: 1 }
  ],
  music: [
    { q: "How many keys does a standard modern piano usually have?", options: ["66", "76", "88", "100"], answer: 2 },
    { q: "Which instrument typically has six strings?", options: ["Flute", "Guitar", "Trumpet", "Drum"], answer: 1 },
    { q: "Which symbol raises a musical note by a semitone?", options: ["Flat", "Sharp", "Rest", "Clef"], answer: 1 },
    { q: "Which family does the violin belong to?", options: ["Percussion", "Brass", "String", "Woodwind"], answer: 2 },
    { q: "What is a group of people singing together called?", options: ["Choir", "Orchestra only", "Solo", "Trio only"], answer: 0 }
  ],
  animals: [
    { q: "Which is the largest living land animal?", options: ["Giraffe", "African elephant", "Hippopotamus", "Rhinoceros"], answer: 1 },
    { q: "What is a baby frog called?", options: ["Cub", "Calf", "Tadpole", "Chick"], answer: 2 },
    { q: "Which mammal can fly?", options: ["Penguin", "Bat", "Ostrich", "Squirrel"], answer: 1 },
    { q: "What do pandas mainly eat in the wild?", options: ["Bamboo", "Fish", "Grasshoppers", "Fruit only"], answer: 0 },
    { q: "Which animal is known for changing colour to blend in?", options: ["Camel", "Chameleon", "Dolphin", "Kangaroo"], answer: 1 }
  ],
  space: [
    { q: "Which star is closest to Earth?", options: ["Sirius", "The Sun", "Polaris", "Vega"], answer: 1 },
    { q: "How many planets are in our Solar System?", options: ["Seven", "Eight", "Nine", "Ten"], answer: 1 },
    { q: "Which planet is famous for its prominent rings?", options: ["Mars", "Saturn", "Venus", "Mercury"], answer: 1 },
    { q: "What is Earth's natural satellite?", options: ["The Moon", "The Sun", "Mars", "Europa"], answer: 0 },
    { q: "What galaxy contains our Solar System?", options: ["Andromeda", "Whirlpool", "Milky Way", "Sombrero"], answer: 2 }
  ],
  literature: [
    { q: "Who wrote Romeo and Juliet?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], answer: 1 },
    { q: "Who wrote The Jungle Book?", options: ["Rudyard Kipling", "J.R.R. Tolkien", "Lewis Carroll", "Roald Dahl"], answer: 0 },
    { q: "What is a story's main character commonly called?", options: ["Publisher", "Protagonist", "Editor", "Narrator always"], answer: 1 },
    { q: "Which of these is a traditional Japanese poem form?", options: ["Haiku", "Sonnet", "Epic", "Ode only"], answer: 0 },
    { q: "Who wrote the Harry Potter book series?", options: ["J.K. Rowling", "Suzanne Collins", "Enid Blyton", "Mary Shelley"], answer: 0 }
  ],
  coding: [
    { q: "Which HTML tag creates a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], answer: 1 },
    { q: "Which JavaScript keyword declares a block-scoped variable that can be reassigned?", options: ["let", "const", "static", "define"], answer: 0 },
    { q: "What does CSS primarily control?", options: ["Page styling", "Database storage", "Server hardware", "Network routing"], answer: 0 },
    { q: "Which data type represents true or false?", options: ["String", "Boolean", "Array", "Float"], answer: 1 },
    { q: "Which symbol is commonly used for a single-line comment in JavaScript?", options: ["<!--", "//", "**", "##"], answer: 1 }
  ],
  food: [
    { q: "Which ingredient is traditionally used to make guacamole?", options: ["Avocado", "Potato", "Cucumber", "Pumpkin"], answer: 0 },
    { q: "Sushi is strongly associated with which country?", options: ["Japan", "Italy", "Brazil", "India"], answer: 0 },
    { q: "Which spice gives many dishes a yellow colour?", options: ["Black pepper", "Turmeric", "Cinnamon", "Clove"], answer: 1 },
    { q: "What is the main ingredient in traditional hummus?", options: ["Chickpeas", "Rice", "Corn", "Cabbage"], answer: 0 },
    { q: "Which fruit is commonly dried to make raisins?", options: ["Grape", "Apple", "Pear", "Orange"], answer: 0 }
  ],
  nature: [
    { q: "What process do plants use to make food from sunlight?", options: ["Respiration only", "Photosynthesis", "Fermentation", "Evaporation"], answer: 1 },
    { q: "Which part of a plant usually absorbs water from soil?", options: ["Flower", "Leaf", "Root", "Fruit"], answer: 2 },
    { q: "What is the term for animals that eat only plants?", options: ["Carnivores", "Herbivores", "Omnivores", "Decomposers"], answer: 1 },
    { q: "Which is a renewable energy source?", options: ["Coal", "Oil", "Solar energy", "Natural gas"], answer: 2 },
    { q: "What do bees collect from flowers to help make honey?", options: ["Nectar", "Sand", "Bark", "Salt"], answer: 0 }
  ],
  inventions: [
    { q: "Who is widely credited with developing the practical telephone?", options: ["Alexander Graham Bell", "Isaac Newton", "Galileo Galilei", "Louis Pasteur"], answer: 0 },
    { q: "Which invention is associated with Johannes Gutenberg?", options: ["Printing press", "Steam engine", "Telephone", "Airplane"], answer: 0 },
    { q: "Which brothers are famous for early powered flight?", options: ["Wright brothers", "Grimm brothers", "Marx brothers", "Warner brothers"], answer: 0 },
    { q: "Which invention helps measure temperature?", options: ["Barometer", "Thermometer", "Compass", "Altimeter"], answer: 1 },
    { q: "Who is commonly associated with inventing the World Wide Web?", options: ["Tim Berners-Lee", "Alan Turing", "Steve Wozniak", "Bill Gates"], answer: 0 }
  ]
};

/* ---------- State ---------- */

let currentPage = "home";
let currentQuiz = null;
let currentQuestionIndex = 0;
let selectedAnswer = null;
let correctAnswers = 0;
let quizLocked = false;
let authMode = "login";
let dailyMode = false;
let toastTimeout = null;

/* ---------- Storage helpers ---------- */

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (error) {
    console.warn("Could not read local storage:", key, error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn("Could not save local storage:", key, error);
    showToast("Could not save data in this browser.");
    return false;
  }
}

function getUsers() {
  const users = readStorage(STORAGE.users, []);
  return Array.isArray(users) ? users : [];
}

function getSavedResults() {
  const results = readStorage(STORAGE.results, []);
  return Array.isArray(results) ? results : [];
}

function getCurrentUser() {
  const email = readStorage(STORAGE.currentUser, null);
  if (!email) return null;
  return getUsers().find(user => user.email === email) || null;
}

function getUserResults(email) {
  return getSavedResults().filter(result => result.email === email);
}

function saveCurrentUser(email) {
  writeStorage(STORAGE.currentUser, email);
}

/* ---------- Small helpers ---------- */

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function getInitials(name) {
  return String(name || "Player")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0] || "")
    .join("")
    .toUpperCase();
}

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("visible");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("visible");
  }, 2800);
}

/* ---------- Navigation ---------- */

function navigateTo(page) {
  const target = document.getElementById(page);
  if (!target) return;

  currentPage = page;

  document.querySelectorAll(".page").forEach(section => {
    section.classList.toggle("active-page", section.id === page);
  });

  document.querySelectorAll(".nav-link").forEach(button => {
    button.classList.toggle("active", button.dataset.page === page);
  });

  document.getElementById("mainNav").classList.remove("open");

  if (page === "categories") renderCategories();
  if (page === "leaderboard") renderLeaderboard();
  if (page === "profile") renderProfile();
  if (page === "daily") renderDaily();
  if (page === "auth") updateAuthUI();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", event => {
  const button = event.target.closest("[data-page]");
  if (!button) return;

  event.preventDefault();
  navigateTo(button.dataset.page);
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("open");
});

/* ---------- Category cards ---------- */

function categoryCardHTML(category) {
  return `
    <button class="category-card" data-category="${escapeHTML(category.id)}">
      <span class="category-arrow">↗</span>
      <span class="category-icon">${category.icon}</span>
      <strong>${escapeHTML(category.name)}</strong>
      <small>${escapeHTML(category.description)}</small>
    </button>
  `;
}

function renderCategories() {
  const search = document.getElementById("categorySearch").value
    .trim()
    .toLowerCase();

  const filtered = categories.filter(category =>
    category.name.toLowerCase().includes(search) ||
    category.description.toLowerCase().includes(search)
  );

  document.getElementById("allCategories").innerHTML =
    filtered.map(categoryCardHTML).join("") ||
    '<p class="empty-state">No categories found. Try another search.</p>';
}

function renderHomeCategories() {
  document.getElementById("homeCategories").innerHTML =
    categories.slice(0, 8).map(categoryCardHTML).join("");
}

document.getElementById("categorySearch").addEventListener("input", renderCategories);

document.addEventListener("click", event => {
  const card = event.target.closest("[data-category]");
  if (!card) return;
  startQuiz(card.dataset.category, false);
});

/* ---------- Quiz engine ---------- */

function shuffledCopy(items) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function startQuiz(categoryId, isDaily) {
  const category = categories.find(item => item.id === categoryId);
  const bank = questionBank[categoryId];

  if (!category || !bank || bank.length === 0) {
    showToast("This quiz is not available yet.");
    return;
  }

  const today = todayKey();
  const user = getCurrentUser();

  if (isDaily && user) {
    const dailyRecords = readStorage(STORAGE.daily, {});
    if (dailyRecords[user.email] === today) {
      showToast("You've already completed today's challenge!");
      renderDaily();
      navigateTo("daily");
      return;
    }
  }

  currentQuiz = {
    category,
    questions: shuffledCopy(bank),
    startedAt: Date.now()
  };

  currentQuestionIndex = 0;
  selectedAnswer = null;
  correctAnswers = 0;
  quizLocked = false;
  dailyMode = Boolean(isDaily);

  navigateTo("quiz");
  renderQuestion();
}

function renderQuestion() {
  if (!currentQuiz) return;

  const question = currentQuiz.questions[currentQuestionIndex];

  selectedAnswer = null;
  quizLocked = false;

  document.getElementById("quizCategory").textContent =
    currentQuiz.category.name.toUpperCase();

  document.getElementById("quizCounter").textContent =
    `Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}`;

  document.getElementById("questionNumber").textContent =
    `QUESTION ${String(currentQuestionIndex + 1).padStart(2, "0")}`;

  document.getElementById("questionText").textContent = question.q;

  document.getElementById("quizProgress").style.width =
    `${(currentQuestionIndex / currentQuiz.questions.length) * 100}%`;

  document.getElementById("answerFeedback").textContent = "";
  document.getElementById("answerFeedback").className = "answer-feedback";

  document.getElementById("nextQuestion").disabled = true;
  document.getElementById("nextQuestion").textContent = "Check answer";

  document.getElementById("answerOptions").innerHTML =
    question.options.map((option, index) => `
      <button class="answer-option" data-answer="${index}">
        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
        <span>${escapeHTML(option)}</span>
      </button>
    `).join("");
}

document.getElementById("answerOptions").addEventListener("click", event => {
  const option = event.target.closest("[data-answer]");
  if (!option || quizLocked) return;

  selectedAnswer = Number(option.dataset.answer);

  document.querySelectorAll(".answer-option").forEach(button => {
    button.classList.toggle(
      "selected",
      Number(button.dataset.answer) === selectedAnswer
    );
  });

  document.getElementById("nextQuestion").disabled = false;
  document.getElementById("nextQuestion").textContent = "Check answer";
});

document.getElementById("nextQuestion").addEventListener("click", () => {
  if (!currentQuiz || selectedAnswer === null) return;

  if (!quizLocked) {
    checkAnswer();
    return;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < currentQuiz.questions.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
});

function checkAnswer() {
  const question = currentQuiz.questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === question.answer;

  quizLocked = true;

  if (isCorrect) correctAnswers++;

  document.querySelectorAll(".answer-option").forEach(button => {
    const answerIndex = Number(button.dataset.answer);
    button.disabled = true;

    if (answerIndex === question.answer) {
      button.classList.add("correct");
    } else if (answerIndex === selectedAnswer) {
      button.classList.add("wrong");
    }
  });

  const feedback = document.getElementById("answerFeedback");
  feedback.textContent = isCorrect
    ? "✓ Correct! Well done."
    : `Not quite. Correct answer: ${question.options[question.answer]}`;

  feedback.classList.add(isCorrect ? "good" : "bad");

  document.getElementById("quizProgress").style.width =
    `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%`;

  document.getElementById("nextQuestion").textContent =
    currentQuestionIndex === currentQuiz.questions.length - 1
      ? "See results →"
      : "Next question →";
}

document.getElementById("exitQuiz").addEventListener("click", () => {
  currentQuiz = null;
  dailyMode = false;
  navigateTo("categories");
});

/* ---------- Save quiz results ---------- */

function finishQuiz() {
  const total = currentQuiz.questions.length;
  const percent = Math.round((correctAnswers / total) * 100);
  const xp = correctAnswers * 10 + (dailyMode ? 50 : 0);
  const user = getCurrentUser();

  const result = {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    email: user ? user.email : "guest",
    playerName: user ? user.name : "Guest",
    title: currentQuiz.category.name,
    categoryId: currentQuiz.category.id,
    score: correctAnswers,
    total,
    percent,
    xp,
    date: new Date().toISOString(),
    daily: dailyMode
  };

  const results = getSavedResults();
  results.push(result);
  writeStorage(STORAGE.results, results);

  if (user) {
    const users = getUsers();
    const userIndex = users.findIndex(item => item.email === user.email);

    if (userIndex !== -1) {
      users[userIndex].xp = (Number(users[userIndex].xp) || 0) + xp;
      users[userIndex].quizzesCompleted =
        (Number(users[userIndex].quizzesCompleted) || 0) + 1;

      writeStorage(STORAGE.users, users);
    }

    if (dailyMode) {
      const dailyRecords = readStorage(STORAGE.daily, {});
      dailyRecords[user.email] = todayKey();
      writeStorage(STORAGE.daily, dailyRecords);
    }
  }

  document.getElementById("resultIcon").textContent =
    percent === 100 ? "🏆" : percent >= 60 ? "🎉" : "💪";

  document.getElementById("resultTitle").textContent =
    percent === 100 ? "Perfect score!" :
    percent >= 60 ? "Great job!" : "Keep practicing!";

  document.getElementById("resultMessage").textContent =
    `${currentQuiz.category.name} completed${dailyMode ? " — Daily Challenge" : ""}.`;

  document.getElementById("resultPercent").textContent = `${percent}%`;
  document.getElementById("resultCorrect").textContent = `${correctAnswers}/${total}`;
  document.getElementById("resultXP").textContent = `+${xp} XP`;

  currentQuiz = null;
  dailyMode = false;

  navigateTo("result");
  renderLeaderboard();
}

document.getElementById("retryQuiz").addEventListener("click", () => {
  const categoryId = currentQuiz?.category.id || lastCategoryId;
  if (categoryId) startQuiz(categoryId, false);
  else navigateTo("categories");
});

let lastCategoryId = "general";

const originalStartQuiz = startQuiz;
startQuiz = function(categoryId, isDaily) {
  lastCategoryId = categoryId;
  return originalStartQuiz(categoryId, isDaily);
};

/* ---------- Daily challenge ---------- */

function renderDaily() {
  const user = getCurrentUser();
  const startButton = document.getElementById("startDaily");
  const status = document.getElementById("dailyStatus");

  document.getElementById("dailyTitle").textContent =
    `Today's ${categories.find(item => item.id === "general").name} Challenge`;

  if (!user) {
    status.textContent = "Log in to record your daily completion.";
    startButton.textContent = "Start challenge →";
    startButton.disabled = false;
    return;
  }

  const dailyRecords = readStorage(STORAGE.daily, {});
  const completed = dailyRecords[user.email] === todayKey();

  if (completed) {
    status.textContent = "✓ Completed today! Come back tomorrow for a new challenge.";
    startButton.textContent = "Completed today";
    startButton.disabled = true;
  } else {
    status.textContent = "Complete all five questions to earn bonus XP.";
    startButton.textContent = "Start daily challenge →";
    startButton.disabled = false;
  }
}

document.getElementById("startDaily").addEventListener("click", () => {
  const user = getCurrentUser();

  if (!user) {
    showToast("Log in to save your daily challenge progress.");
    navigateTo("auth");
    return;
  }

  startQuiz("general", true);
});

/* ---------- Leaderboard ---------- */

function renderLeaderboard() {
  const rows = document.getElementById("leaderboardRows");
  const empty = document.getElementById("leaderboardEmpty");
  const results = getSavedResults();

  // Keep each player's best percentage result.
  const bestByPlayer = new Map();

  results.forEach(result => {
    const key = result.email || result.playerName || "guest";
    const previous = bestByPlayer.get(key);

    if (
      !previous ||
      Number(result.percent) > Number(previous.percent) ||
      (
        Number(result.percent) === Number(previous.percent) &&
        Number(result.xp) > Number(previous.xp)
      )
    ) {
      bestByPlayer.set(key, result);
    }
  });

  const ranked = [...bestByPlayer.values()].sort((a, b) => {
    if (Number(b.percent) !== Number(a.percent)) {
      return Number(b.percent) - Number(a.percent);
    }
    return Number(b.xp) - Number(a.xp);
  });

  empty.hidden = ranked.length > 0;

  rows.innerHTML = ranked.map((result, index) => `
    <div class="leaderboard-row">
      <span class="leaderboard-rank">
        ${index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
      </span>

      <span class="player-details">
        <span class="player-avatar">${escapeHTML(getInitials(result.playerName))}</span>
        <span>
          <strong>${escapeHTML(result.playerName || "Guest")}</strong>
          <small>${escapeHTML(result.title || "Quiz")}</small>
        </span>
      </span>

      <strong class="score-value">${Number(result.percent) || 0}%</strong>
      <strong class="xp-value">${Number(result.xp) || 0}</strong>
    </div>
  `).join("");
}

/* ---------- Profile ---------- */

function renderProfile() {
  const container = document.getElementById("profileContent");
  const user = getCurrentUser();

  if (!user) {
    container.innerHTML = `
      <div class="panel empty-state">
        <h2>Welcome, future champion!</h2>
        <p>Create an account or log in to view your saved progress.</p>
        <button class="btn primary" data-page="auth">Login or register</button>
      </div>
    `;
    return;
  }

  const results = getUserResults(user.email);
  const totalCorrect = results.reduce(
    (sum, result) => sum + (Number(result.score) || 0), 0
  );

  const average = results.length
    ? Math.round(results.reduce((sum, result) =>
        sum + (Number(result.percent) || 0), 0) / results.length)
    : 0;

  const recent = [...results].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  ).slice(0, 8);

  container.innerHTML = `
    <div class="profile-card">
      <div class="profile-user">
        <span class="player-avatar">${escapeHTML(getInitials(user.name))}</span>
        <div>
          <h2>${escapeHTML(user.name)}</h2>
          <p>${escapeHTML(user.email)}</p>
          <p>Member since ${formatDate(user.joinedAt)}</p>
        </div>
      </div>
      <button id="logoutButton" class="btn secondary">Log out</button>
    </div>

    <div class="profile-overview">
      <div class="profile-card">
        <p>Total XP</p>
        <strong class="stat-number">${Number(user.xp) || 0}</strong>
      </div>
      <div class="profile-card">
        <p>Quizzes completed</p>
        <strong class="stat-number">${results.length}</strong>
      </div>
      <div class="profile-card">
        <p>Average score</p>
        <strong class="stat-number">${average}%</strong>
      </div>
    </div>

    <div class="panel profile-history">
      <h2>Recent quiz history</h2>
      ${
        recent.length
          ? recent.map(result => `
              <div class="history-row">
                <span>
                  <strong>${escapeHTML(result.title)}</strong><br>
                  <small class="muted-text">${formatDate(result.date)} · ${result.score}/${result.total} correct</small>
                </span>
                <span>${result.percent}% · +${result.xp} XP</span>
              </div>
            `).join("")
          : '<p class="empty-state">Your completed quizzes will appear here.</p>'
      }
    </div>

    <p class="muted-text">Correct answers across all attempts: ${totalCorrect}</p>
  `;

  document.getElementById("logoutButton").addEventListener("click", () => {
    writeStorage(STORAGE.currentUser, null);
    updateAuthUI();
    showToast("You have logged out.");
    navigateTo("home");
  });
}

/* ---------- Login and registration ---------- */

function setAuthMode(mode) {
  authMode = mode;

  const isRegister = mode === "register";
  const nameInput = document.getElementById("authName");
  const nameLabel = document.getElementById("nameLabel");
  const passwordInput = document.getElementById("authPassword");

  nameInput.hidden = !isRegister;
  nameLabel.hidden = !isRegister;
  nameInput.required = isRegister;

  passwordInput.autocomplete = isRegister ? "new-password" : "current-password";
  passwordInput.placeholder = isRegister ? "At least 6 characters" : "Enter your password";

  document.getElementById("authTitle").textContent =
    isRegister ? "Create your account" : "Welcome back!";

  document.getElementById("authDescription").textContent =
    isRegister
      ? "Join QuizMaster and start your learning journey."
      : "Log in to continue your learning journey.";

  document.getElementById("authSubmit").textContent =
    isRegister ? "Create account" : "Login";

  document.getElementById("loginTab").classList.toggle("selected", !isRegister);
  document.getElementById("registerTab").classList.toggle("selected", isRegister);

  const message = document.getElementById("authMessage");
  message.textContent = "";
  message.className = "form-message";
}

document.getElementById("loginTab").addEventListener("click", () => setAuthMode("login"));
document.getElementById("registerTab").addEventListener("click", () => setAuthMode("register"));

function updateAuthUI() {
  const user = getCurrentUser();
  const authNav = document.getElementById("authNav");

  authNav.textContent = user ? "Log out" : "Login";

  if (user) {
    authNav.dataset.page = "profile";
  } else {
    authNav.dataset.page = "auth";
  }
}

document.getElementById("authForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("authName").value.trim();
  const email = document.getElementById("authEmail").value.trim().toLowerCase();
  const password = document.getElementById("authPassword").value;
  const message = document.getElementById("authMessage");

  const showMessage = (text, type) => {
    message.textContent = text;
    message.className = `form-message ${type}`;
  };

  if (authMode === "register") {
    if (name.length < 2) {
      showMessage("Please enter a name with at least 2 characters.", "error");
      return;
    }

    if (password.length < 6) {
      showMessage("Use at least 6 characters for this demo password.", "error");
      return;
    }

    const users = getUsers();

    if (users.some(user => user.email === email)) {
      showMessage("An account with this email already exists.", "error");
      return;
    }

    users.push({
      name,
      email,
      // Demo only. Real apps must hash passwords on a server.
      password,
      xp: 0,
      quizzesCompleted: 0,
      joinedAt: new Date().toISOString()
    });

    if (!writeStorage(STORAGE.users, users)) {
      showMessage("Could not save your account in this browser.", "error");
      return;
    }

    saveCurrentUser(email);
    document.getElementById("authForm").reset();
    updateAuthUI();
    showToast("Welcome to QuizMaster, " + name + "!");
    navigateTo("profile");
    return;
  }

  const user = getUsers().find(
    item => item.email === email && item.password === password
  );

  if (!user) {
    showMessage("Email or password is incorrect.", "error");
    return;
  }

  saveCurrentUser(user.email);
  document.getElementById("authForm").reset();
  updateAuthUI();
  showToast("Welcome back, " + user.name + "!");
  navigateTo("profile");
});

/* ---------- Initial setup ---------- */

function initializeQuizMaster() {
  document.getElementById("currentYear").textContent =
    new Date().getFullYear();

  renderHomeCategories();
  renderCategories();
  renderLeaderboard();
  renderDaily();
  updateAuthUI();

  setAuthMode("login");
}

initializeQuizMaster();
