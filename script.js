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

/* ==========================================
   QUIZ CATEGORIES
   TOTAL: 21
========================================== */

const categories = [
  {
    id: "general",
    name: "General Knowledge",
    icon: "🌍",
    description: "Discover the world"
  },
  {
    id: "science",
    name: "Science",
    icon: "🔬",
    description: "Explore discoveries"
  },
  {
    id: "technology",
    name: "Technology",
    icon: "💻",
    description: "Explore the digital world"
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "➗",
    description: "Test your logic"
  },
  {
    id: "history",
    name: "History",
    icon: "🏛️",
    description: "Explore the past"
  },
  {
    id: "geography",
    name: "Geography",
    icon: "🗺️",
    description: "Explore our planet"
  },
  {
    id: "sports",
    name: "Sports",
    icon: "⚽",
    description: "Test your sports knowledge"
  },
  {
    id: "movies",
    name: "Movies",
    icon: "🎬",
    description: "Lights, camera, quiz!"
  },
  {
    id: "music",
    name: "Music",
    icon: "🎵",
    description: "Discover music facts"
  },
  {
    id: "animals",
    name: "Animals",
    icon: "🐾",
    description: "Meet the animal kingdom"
  },
  {
    id: "space",
    name: "Space",
    icon: "🚀",
    description: "Explore the universe"
  },
  {
    id: "literature",
    name: "Literature",
    icon: "📚",
    description: "Books and authors"
  },
  {
    id: "coding",
    name: "Programming",
    icon: "👨‍💻",
    description: "Think like a developer"
  },
  {
    id: "food",
    name: "Food",
    icon: "🍕",
    description: "Food around the world"
  },
  {
    id: "nature",
    name: "Nature",
    icon: "🌿",
    description: "Discover our environment"
  },
  {
    id: "inventions",
    name: "Inventions",
    icon: "💡",
    description: "Ideas that changed the world"
  },

  /* ===== NEW CATEGORIES ===== */

  {
    id: "ai",
    name: "AI & Machine Learning",
    icon: "🤖",
    description: "Explore artificial intelligence"
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    icon: "🛡️",
    description: "Protect the digital world"
  },
  {
    id: "java",
    name: "Java",
    icon: "☕",
    description: "Master Java programming"
  },
  {
    id: "web",
    name: "Web Development",
    icon: "🌐",
    description: "Build the modern web"
  },
  {
    id: "business",
    name: "Business & Entrepreneurship",
    icon: "💼",
    description: "Learn business and startups"
  }
];


/*
  Each question has:
  q       = question
  options = four options
  answer  = zero-based correct option
*/

const questionBank = {

  /* ==========================================
     GENERAL KNOWLEDGE
  ========================================== */

  general: [
    {
      q: "Which is the largest ocean on Earth?",
      options: [
        "Atlantic",
        "Indian",
        "Pacific",
        "Arctic"
      ],
      answer: 2
    },
    {
      q: "How many days are there in a leap year?",
      options: [
        "364",
        "365",
        "366",
        "367"
      ],
      answer: 2
    },
    {
      q: "What is the capital of Japan?",
      options: [
        "Seoul",
        "Tokyo",
        "Beijing",
        "Bangkok"
      ],
      answer: 1
    },
    {
      q: "Which language is primarily spoken in Brazil?",
      options: [
        "Spanish",
        "French",
        "Portuguese",
        "Italian"
      ],
      answer: 2
    },
    {
      q: "How many colours are traditionally named in a rainbow?",
      options: [
        "Five",
        "Six",
        "Seven",
        "Eight"
      ],
      answer: 2
    }
  ],


  /* ==========================================
     SCIENCE
  ========================================== */

  science: [
    {
      q: "Which planet is known as the Red Planet?",
      options: [
        "Venus",
        "Mars",
        "Jupiter",
        "Mercury"
      ],
      answer: 1
    },
    {
      q: "What is the chemical formula for water?",
      options: [
        "CO2",
        "O2",
        "H2O",
        "NaCl"
      ],
      answer: 2
    },
    {
      q: "Which organ pumps blood around the human body?",
      options: [
        "Lungs",
        "Brain",
        "Liver",
        "Heart"
      ],
      answer: 3
    },
    {
      q: "What force pulls objects toward Earth?",
      options: [
        "Friction",
        "Gravity",
        "Magnetism",
        "Pressure"
      ],
      answer: 1
    },
    {
      q: "Which gas do plants absorb during photosynthesis?",
      options: [
        "Oxygen",
        "Nitrogen",
        "Carbon dioxide",
        "Hydrogen"
      ],
      answer: 2
    }
  ],


  /* ==========================================
     TECHNOLOGY
  ========================================== */

  technology: [
    {
      q: "What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Computer Power Utility",
        "Central Program User",
        "Control Processing User"
      ],
      answer: 0
    },
    {
      q: "Which of these is a web browser?",
      options: [
        "Python",
        "Chrome",
        "Linux",
        "MySQL"
      ],
      answer: 1
    },
    {
      q: "What does URL stand for?",
      options: [
        "Universal Reading Link",
        "Uniform Resource Locator",
        "United Resource Line",
        "User Reference Location"
      ],
      answer: 1
    },
    {
      q: "Which device is commonly used to input text?",
      options: [
        "Monitor",
        "Speaker",
        "Keyboard",
        "Projector"
      ],
      answer: 2
    },
    {
      q: "What does Wi-Fi primarily provide?",
      options: [
        "Wireless networking",
        "Paper printing only",
        "Power generation",
        "Screen cleaning"
      ],
      answer: 0
    }
  ],


  /* ==========================================
     MATHEMATICS
  ========================================== */

  mathematics: [
    {
      q: "What is 12 × 8?",
      options: [
        "86",
        "92",
        "96",
        "108"
      ],
      answer: 2
    },
    {
      q: "What is the square root of 144?",
      options: [
        "10",
        "11",
        "12",
        "14"
      ],
      answer: 2
    },
    {
      q: "What is 25% of 200?",
      options: [
        "25",
        "40",
        "50",
        "75"
      ],
      answer: 2
    },
    {
      q: "How many degrees are in a right angle?",
      options: [
        "45",
        "90",
        "180",
        "360"
      ],
      answer: 1
    },
    {
      q: "What is the next prime number after 7?",
      options: [
        "8",
        "9",
        "10",
        "11"
      ],
      answer: 3
    }
  ],


  /* ==========================================
     HISTORY
  ========================================== */

  history: [
    {
      q: "In which year did World War II end?",
      options: [
        "1939",
        "1942",
        "1945",
        "1950"
      ],
      answer: 2
    },
    {
      q: "Which ancient civilization built the pyramids at Giza?",
      options: [
        "Romans",
        "Ancient Egyptians",
        "Vikings",
        "Persians"
      ],
      answer: 1
    },
    {
      q: "Who was the first person to walk on the Moon?",
      options: [
        "Yuri Gagarin",
        "Buzz Aldrin",
        "Neil Armstrong",
        "John Glenn"
      ],
      answer: 2
    },
    {
      q: "The Renaissance began in which country?",
      options: [
        "Italy",
        "Canada",
        "Japan",
        "Egypt"
      ],
      answer: 0
    },
    {
      q: "Who was the first President of the United States?",
      options: [
        "Abraham Lincoln",
        "George Washington",
        "John Adams",
        "Thomas Jefferson"
      ],
      answer: 1
    }
  ],


  /* ==========================================
     GEOGRAPHY
  ========================================== */

  geography: [
    {
      q: "Which is the highest mountain above sea level?",
      options: [
        "K2",
        "Kangchenjunga",
        "Mount Everest",
        "Denali"
      ],
      answer: 2
    },
    {
      q: "What is the capital of Australia?",
      options: [
        "Sydney",
        "Melbourne",
        "Canberra",
        "Perth"
      ],
      answer: 2
    },
    {
      q: "Which continent is the Sahara Desert in?",
      options: [
        "Asia",
        "Africa",
        "Europe",
        "South America"
      ],
      answer: 1
    },
    {
      q: "Which is the largest continent by area?",
      options: [
        "Africa",
        "Europe",
        "Asia",
        "Australia"
      ],
      answer: 2
    },
    {
      q: "Which country is famous for the city of Rio de Janeiro?",
      options: [
        "Brazil",
        "Portugal",
        "Mexico",
        "Chile"
      ],
      answer: 0
    }
  ],


  /* ==========================================
     SPORTS
  ========================================== */

  sports: [
    {
      q: "How many players from one team are on the field in football (soccer)?",
      options: [
        "9",
        "10",
        "11",
        "12"
      ],
      answer: 2
    },
    {
      q: "How many rings are on the Olympic symbol?",
      options: [
        "Four",
        "Five",
        "Six",
        "Seven"
      ],
      answer: 1
    },
    {
      q: "Which sport uses a shuttlecock?",
      options: [
        "Tennis",
        "Badminton",
        "Squash",
        "Table tennis"
      ],
      answer: 1
    },
    {
      q: "In cricket, how many runs are scored when the ball reaches the boundary without bouncing?",
      options: [
        "Four",
        "Five",
        "Six",
        "Seven"
      ],
      answer: 2
    },
    {
      q: "Which sport is associated with Wimbledon?",
      options: [
        "Golf",
        "Tennis",
        "Rugby",
        "Swimming"
      ],
      answer: 1
    }
  ],


  /* ==========================================
     MOVIES
  ========================================== */

  movies: [
    {
      q: "Which animated film features a snowman named Olaf?",
      options: [
        "Moana",
        "Frozen",
        "Coco",
        "Up"
      ],
      answer: 1
    },
    {
      q: "What is the name of the fictional school in the Harry Potter films?",
      options: [
        "Hogwarts",
        "Narnia",
        "Nevermore",
        "Xavier's"
      ],
      answer: 0
    },
    {
      q: "Which award is associated with the American film industry?",
      options: [
        "Grammy",
        "Oscar",
        "Pulitzer",
        "Booker"
      ],
      answer: 1
    },
    {
      q: "Which film series features the character Darth Vader?",
      options: [
        "Star Wars",
        "Toy Story",
        "Shrek",
        "Jurassic Park"
      ],
      answer: 0
    },
    {
      q: "What type of animal is Dumbo?",
      options: [
        "Lion",
        "Elephant",
        "Bear",
        "Horse"
      ],
      answer: 1
    }
  ],


  /* ==========================================
     MUSIC
  ========================================== */

  music: [
    {
      q: "How many keys does a standard modern piano usually have?",
      options: [
        "66",
        "76",
        "88",
        "100"
      ],
      answer: 2
    },
    {
      q: "Which instrument typically has six strings?",
      options: [
        "Flute",
        "Guitar",
        "Trumpet",
        "Drum"
      ],
      answer: 1
    },
    {
      q: "Which symbol raises a musical note by a semitone?",
      options: [
        "Flat",
        "Sharp",
        "Rest",
        "Clef"
      ],
      answer: 1
    },
    {
      q: "Which family does the violin belong to?",
      options: [
        "Percussion",
        "Brass",
        "String",
        "Woodwind"
      ],
      answer: 2
    },
    {
      q: "What is a group of people singing together called?",
      options: [
        "Choir",
        "Orchestra only",
        "Solo",
        "Trio only"
      ],
      answer: 0
    }
  ],


  /* ==========================================
     ANIMALS
  ========================================== */

  animals: [
    {
      q: "Which is the largest living land animal?",
      options: [
        "Giraffe",
        "African elephant",
        "Hippopotamus",
        "Rhinoceros"
      ],
      answer: 1
    },
    {
      q: "What is a baby frog called?",
      options: [
        "Cub",
        "Calf",
        "Tadpole",
        "Chick"
      ],
      answer: 2
    },
    {
      q: "Which mammal can fly?",
      options: [
        "Penguin",
        "Bat",
        "Ostrich",
        "Squirrel"
      ],
      answer: 1
    },
    {
      q: "What do pandas mainly eat in the wild?",
      options: [
        "Bamboo",
        "Fish",
        "Grasshoppers",
        "Fruit only"
      ],
      answer: 0
    },
    {
      q: "Which animal is known for changing colour to blend in?",
      options: [
        "Camel",
        "Chameleon",
        "Dolphin",
        "Kangaroo"
      ],
      answer: 1
    }
  ],


  /* ==========================================
     SPACE
  ========================================== */

  space: [
    {
      q: "Which star is closest to Earth?",
      options: [
        "Sirius",
        "The Sun",
        "Polaris",
        "Vega"
      ],
      answer: 1
    },
    {
      q: "How many planets are in our Solar System?",
      options: [
        "Seven",
        "Eight",
        "Nine",
        "Ten"
      ],
      answer: 1
    },
    {
      q: "Which planet is famous for its prominent rings?",
      options: [
        "Mars",
        "Saturn",
        "Venus",
        "Mercury"
      ],
      answer: 1
    },
    {
      q: "What is Earth's natural satellite?",
      options: [
        "The Moon",
        "The Sun",
        "Mars",
        "Europa"
      ],
      answer: 0
    },
    {
      q: "What galaxy contains our Solar System?",
      options: [
        "Andromeda",
        "Whirlpool",
        "Milky Way",
        "Sombrero"
      ],
      answer: 2
    }
  ],


  /* ==========================================
     LITERATURE
  ========================================== */

  literature: [
    {
      q: "Who wrote Romeo and Juliet?",
      options: [
        "Charles Dickens",
        "William Shakespeare",
        "Jane Austen",
        "Mark Twain"
      ],
      answer: 1
    },
    {
      q: "Who wrote The Jungle Book?",
      options: [
        "Rudyard Kipling",
        "J.R.R. Tolkien",
        "Lewis Carroll",
        "Roald Dahl"
      ],
      answer: 0
    },
    {
      q: "What is a story's main character commonly called?",
      options: [
        "Publisher",
        "Protagonist",
        "Editor",
        "Narrator always"
      ],
      answer: 1
    },
    {
      q: "Which of these is a traditional Japanese poem form?",
      options: [
        "Haiku",
        "Sonnet",
        "Epic",
        "Ode only"
      ],
      answer: 0
    },
    {
      q: "Who wrote the Harry Potter book series?",
      options: [
        "J.K. Rowling",
        "Suzanne Collins",
        "Enid Blyton",
        "Mary Shelley"
      ],
      answer: 0
    }
  ],


  /* ==========================================
     PROGRAMMING
  ========================================== */

  coding: [
    {
      q: "Which HTML tag creates a hyperlink?",
      options: [
        "<link>",
        "<a>",
        "<href>",
        "<url>"
      ],
      answer: 1
    },
    {
      q: "Which JavaScript keyword declares a block-scoped variable that can be reassigned?",
      options: [
        "let",
        "const",
        "static",
        "define"
      ],
      answer: 0
    },
    {
      q: "What does CSS primarily control?",
      options: [
        "Page styling",
        "Database storage",
        "Server hardware",
        "Network routing"
      ],
      answer: 0
    },
    {
      q: "Which data type represents true or false?",
      options: [
        "String",
        "Boolean",
        "Array",
        "Object"
      ],
      answer: 1
    },
    {
      q: "Which language is commonly used for data science?",
      options: [
        "Python",
        "HTML",
        "CSS",
        "XML"
      ],
      answer: 0
    }
  ],


  /* ==========================================
     FOOD
  ========================================== */

  food: [
    {
      q: "Which country is famous for pizza?",
      options: [
        "Italy",
        "Japan",
        "India",
        "Canada"
      ],
      answer: 0
    },
    {
      q: "Which fruit is commonly used to make guacamole?",
      options: [
        "Apple",
        "Avocado",
        "Orange",
        "Banana"
      ],
      answer: 1
    },
    {
      q: "Which spice is known for its bright yellow colour?",
      options: [
        "Turmeric",
        "Pepper",
        "Cinnamon",
        "Cardamom"
      ],
      answer: 0
    },
    {
      q: "Sushi is traditionally associated with which country?",
      options: [
        "China",
        "Japan",
        "Thailand",
        "Korea"
      ],
      answer: 1
    },
    {
      q: "What is the main ingredient in traditional hummus?",
      options: [
        "Chickpeas",
        "Rice",
        "Potatoes",
        "Corn"
      ],
      answer: 0
    }
  ],


  /* ==========================================
     NATURE
  ========================================== */

  nature: [
    {
      q: "What process do plants use to make food?",
      options: [
        "Respiration",
        "Photosynthesis",
        "Digestion",
        "Fermentation"
      ],
      answer: 1
    },
    {
      q: "Which gas is most abundant in Earth's atmosphere?",
      options: [
        "Oxygen",
        "Carbon dioxide",
        "Nitrogen",
        "Hydrogen"
      ],
      answer: 2
    },
    {
      q: "Which layer protects Earth from much of the Sun's UV radiation?",
      options: [
        "Ozone layer",
        "Mantle",
        "Crust",
        "Core"
      ],
      answer: 0
    },
    {
      q: "What is the process by which water vapour becomes liquid?",
      options: [
        "Evaporation",
        "Condensation",
        "Sublimation",
        "Melting"
      ],
      answer: 1
    },
    {
      q: "Which ecosystem is dominated by trees and receives high rainfall?",
      options: [
        "Desert",
        "Rainforest",
        "Tundra",
        "Savanna"
      ],
      answer: 1
    }
  ],


  /* ==========================================
     INVENTIONS
  ========================================== */

  inventions: [
    {
      q: "Who is commonly credited with inventing the practical telephone?",
      options: [
        "Alexander Graham Bell",
        "Thomas Edison",
        "Nikola Tesla",
        "James Watt"
      ],
      answer: 0
    },
    {
      q: "Who developed the World Wide Web?",
      options: [
        "Bill Gates",
        "Tim Berners-Lee",
        "Steve Jobs",
        "Mark Zuckerberg"
      ],
      answer: 1
    },
    {
      q: "Which invention is associated with Johannes Gutenberg?",
      options: [
        "Printing press",
        "Steam engine",
        "Telephone",
        "Light bulb"
      ],
      answer: 0
    },
    {
      q: "The modern steam engine was significantly improved by which inventor?",
      options: [
        "James Watt",
        "Isaac Newton",
        "Galileo Galilei",
        "Louis Pasteur"
      ],
      answer: 0
    },
    {
      q: "Who is famous for pioneering alternating-current electrical systems?",
      options: [
        "Nikola Tesla",
        "Charles Darwin",
        "Alexander Fleming",
        "Gregor Mendel"
      ],
      answer: 0
    }
  ],


  /* ==================================================
     NEW CATEGORY 1
     AI & MACHINE LEARNING
  ================================================== */

  ai: [
    {
      q: "What does AI stand for?",
      options: [
        "Automated Internet",
        "Artificial Intelligence",
        "Advanced Information",
        "Applied Internet"
      ],
      answer: 1
    },
    {
      q: "What does ML stand for in AI?",
      options: [
        "Machine Learning",
        "Modern Logic",
        "Machine Language",
        "Managed Learning"
      ],
      answer: 0
    },
    {
      q: "Which type of learning uses labelled training data?",
      options: [
        "Supervised learning",
        "Unsupervised learning",
        "Random learning",
        "Manual learning"
      ],
      answer: 0
    },
    {
      q: "Which algorithm is commonly used for classification?",
      options: [
        "Decision Tree",
        "Binary Search only",
        "Bubble Sort",
        "Dijkstra only"
      ],
      answer: 0
    },
    {
      q: "What is a neural network inspired by?",
      options: [
        "Human brain",
        "Computer keyboard",
        "Internet cables",
        "Hard disk"
      ],
      answer: 0
    }
  ],


  /* ==================================================
     NEW CATEGORY 2
     CYBERSECURITY
  ================================================== */

  cybersecurity: [
    {
      q: "What does cybersecurity primarily protect?",
      options: [
        "Digital systems and data",
        "Only buildings",
        "Only vehicles",
        "Only food"
      ],
      answer: 0
    },
    {
      q: "What is phishing?",
      options: [
        "A type of social engineering attack",
        "A programming language",
        "A database",
        "A firewall rule"
      ],
      answer: 0
    },
    {
      q: "Which is commonly used to protect an account?",
      options: [
        "Strong password",
        "Public password",
        "Shared password",
        "No password"
      ],
      answer: 0
    },
    {
      q: "What does MFA stand for?",
      options: [
        "Multi-Factor Authentication",
        "Main File Access",
        "Machine Firewall Application",
        "Multiple File Analysis"
      ],
      answer: 0
    },
    {
      q: "What is malware?",
      options: [
        "Malicious software",
        "A web browser",
        "A programming framework",
        "A hardware component"
      ],
      answer: 0
    }
  ],


  /* ==================================================
     NEW CATEGORY 3
     JAVA
  ================================================== */

  java: [
    {
      q: "Who originally developed Java?",
      options: [
        "James Gosling",
        "Dennis Ritchie",
        "Guido van Rossum",
        "Bjarne Stroustrup"
      ],
      answer: 0
    },
    {
      q: "Which keyword is used to create an object in Java?",
      options: [
        "class",
        "new",
        "object",
        "create"
      ],
      answer: 1
    },
    {
      q: "Which method is the entry point of a Java application?",
      options: [
        "start()",
        "run()",
        "main()",
        "execute()"
      ],
      answer: 2
    },
    {
      q: "Which keyword is used to inherit a class in Java?",
      options: [
        "inherits",
        "extends",
        "implements",
        "superclass"
      ],
      answer: 1
    },
    {
      q: "Which of these is NOT a primitive data type in Java?",
      options: [
        "int",
        "double",
        "boolean",
        "String"
      ],
      answer: 3
    }
  ],


  /* ==================================================
     NEW CATEGORY 4
     WEB DEVELOPMENT
  ================================================== */

  web: [
    {
      q: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "Hyperlink Text Management Language",
        "Home Tool Markup Language"
      ],
      answer: 0
    },
    {
      q: "What is CSS mainly used for?",
      options: [
        "Styling web pages",
        "Creating databases",
        "Managing servers",
        "Writing operating systems"
      ],
      answer: 0
    },
    {
      q: "Which language adds interactivity to web pages?",
      options: [
        "HTML",
        "CSS",
        "JavaScript",
        "SQL"
      ],
      answer: 2
    },
    {
      q: "Which HTML element is used for the largest heading?",
      options: [
        "<h1>",
        "<heading>",
        "<head>",
        "<h6>"
      ],
      answer: 0
    },
    {
      q: "Which protocol is commonly used to transfer web pages?",
      options: [
        "HTTP",
        "FTP only",
        "SMTP",
        "SSH only"
      ],
      answer: 0
    }
  ],


  /* ==================================================
     NEW CATEGORY 5
     BUSINESS & ENTREPRENEURSHIP
  ================================================== */

  business: [
    {
      q: "What is an entrepreneur?",
      options: [
        "A person who starts and manages a business",
        "Only a government employee",
        "A professional athlete",
        "A school teacher"
      ],
      answer: 0
    },
    {
      q: "What does ROI stand for?",
      options: [
        "Return on Investment",
        "Rate of Income",
        "Revenue of Industry",
        "Return of Information"
      ],
      answer: 0
    },
    {
      q: "What is a startup?",
      options: [
        "A newly established business",
        "A finished product",
        "A bank account",
        "A government department"
      ],
      answer: 0
    },
    {
      q: "What is a business plan?",
      options: [
        "A document describing business goals and strategy",
        "A shopping list",
        "A personal diary",
        "A computer program"
      ],
      answer: 0
    },
    {
      q: "What is profit?",
      options: [
        "Revenue minus costs",
        "Costs plus losses",
        "Only total sales",
        "Money borrowed from a bank"
      ],
      answer: 0
    }
  ]

};
/* ==========================================
   APP STATE
========================================== */

const state = {
  currentPage: "home",

  selectedCategory: null,

  questions: [],

  currentQuestion: 0,

  score: 0,

  selectedAnswer: null,

  answerChecked: false,

  quizFinished: false,

  isDailyChallenge: false
};


/* ==========================================
   DOM HELPERS
========================================== */

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}


/* ==========================================
   LOCAL STORAGE HELPERS
========================================== */

function getStored(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value);

  } catch (error) {

    console.error("Storage read error:", error);

    return fallback;
  }
}


function setStored(key, value) {
  try {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  } catch (error) {

    console.error("Storage write error:", error);
  }
}


/* ==========================================
   USER HELPERS
========================================== */

function getUsers() {
  return getStored(STORAGE.users, []);
}


function getCurrentUser() {

  const email =
    localStorage.getItem(STORAGE.currentUser);

  if (!email) {
    return null;
  }

  const users = getUsers();

  return users.find(
    user => user.email === email
  ) || null;
}


function saveUsers(users) {
  setStored(STORAGE.users, users);
}


function getResults() {
  return getStored(STORAGE.results, []);
}


function saveResults(results) {
  setStored(STORAGE.results, results);
}


/* ==========================================
   PAGE NAVIGATION
========================================== */

function showPage(pageId) {

  const pages = $$(".page");

  pages.forEach(page => {

    page.classList.remove("active-page");

  });


  const target = document.getElementById(pageId);

  if (!target) {
    return;
  }


  target.classList.add("active-page");

  state.currentPage = pageId;


  const navLinks = $$(".nav-link");

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (
      link.dataset.page === pageId
    ) {

      link.classList.add("active");
    }

  });


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  if (pageId === "categories") {
    renderAllCategories();
  }


  if (pageId === "leaderboard") {
    renderLeaderboard();
  }


  if (pageId === "profile") {
    renderProfile();
  }


  if (pageId === "daily") {
    updateDailyPage();
  }


  updateAuthNavigation();
}


/* ==========================================
   NAVIGATION EVENTS
========================================== */

function setupNavigation() {

  document.addEventListener(
    "click",
    event => {

      const element =
        event.target.closest("[data-page]");

      if (!element) {
        return;
      }


      event.preventDefault();


      const page =
        element.dataset.page;


      if (page) {

        showPage(page);

      }

    }
  );


  const menuToggle =
    $("#menuToggle");


  const mainNav =
    $("#mainNav");


  if (menuToggle && mainNav) {

    menuToggle.addEventListener(
      "click",
      () => {

        mainNav.classList.toggle("open");

      }
    );

  }

}


/* ==========================================
   AUTH NAVIGATION
========================================== */

function updateAuthNavigation() {

  const authNav =
    $("#authNav");


  if (!authNav) {
    return;
  }


  const user =
    getCurrentUser();


  if (user) {

    authNav.textContent =
      "Logout";

    authNav.dataset.page = "";


    authNav.onclick = event => {

      event.preventDefault();

      logoutUser();

    };

  } else {

    authNav.textContent =
      "Login";

    authNav.dataset.page =
      "auth";

    authNav.onclick = null;

  }

}


/* ==========================================
   CATEGORY CARD
========================================== */

function createCategoryCard(category) {

  const card =
    document.createElement("button");


  card.className =
    "category-card";


  card.type =
    "button";


  card.dataset.category =
    category.id;


  card.innerHTML = `

    <span class="category-icon">
      ${category.icon}
    </span>

    <span class="category-info">

      <strong>
        ${escapeHTML(category.name)}
      </strong>

      <small>
        ${escapeHTML(category.description)}
      </small>

    </span>

    <span class="category-arrow">
      →
    </span>

  `;


  card.addEventListener(
    "click",
    () => {

      startQuiz(category.id);

    }
  );


  return card;
}


/* ==========================================
   HOME CATEGORIES
========================================== */

function renderHomeCategories() {

  const container =
    $("#homeCategories");


  if (!container) {
    return;
  }


  container.innerHTML = "";


  categories
    .slice(0, 6)
    .forEach(category => {

      container.appendChild(
        createCategoryCard(category)
      );

    });

}


/* ==========================================
   ALL CATEGORIES
========================================== */

function renderAllCategories(
  filter = ""
) {

  const container =
    $("#allCategories");


  if (!container) {
    return;
  }


  const search =
    filter.trim().toLowerCase();


  const filtered =
    categories.filter(category => {

      return (

        category.name
          .toLowerCase()
          .includes(search)

        ||

        category.description
          .toLowerCase()
          .includes(search)

      );

    });


  container.innerHTML = "";


  if (filtered.length === 0) {

    container.innerHTML = `

      <div class="empty-state">

        🔍

        <h3>
          No categories found
        </h3>

        <p>
          Try another search term.
        </p>

      </div>

    `;

    return;
  }


  filtered.forEach(category => {

    container.appendChild(
      createCategoryCard(category)
    );

  });

}


/* ==========================================
   CATEGORY SEARCH
========================================== */

function setupCategorySearch() {

  const input =
    $("#categorySearch");


  if (!input) {
    return;
  }


  input.addEventListener(
    "input",
    event => {

      renderAllCategories(
        event.target.value
      );

    }
  );

}


/* ==========================================
   SHUFFLE ARRAY
========================================== */

function shuffleArray(array) {

  const copy =
    [...array];


  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
      );


    [
      copy[i],
      copy[j]
    ] = [
      copy[j],
      copy[i]
    ];

  }


  return copy;
}


/* ==========================================
   START QUIZ
========================================== */

function startQuiz(
  categoryId,
  isDaily = false
) {

  const category =
    categories.find(
      item => item.id === categoryId
    );


  if (!category) {

    showToast(
      "Category not found."
    );

    return;
  }


  const sourceQuestions =
    questionBank[categoryId];


  if (
    !sourceQuestions ||
    sourceQuestions.length === 0
  ) {

    showToast(
      "No questions available."
    );

    return;
  }


  state.selectedCategory =
    categoryId;


  state.questions =
    shuffleArray(
      sourceQuestions
    ).slice(0, 5);


  state.currentQuestion = 0;

  state.score = 0;

  state.selectedAnswer = null;

  state.answerChecked = false;

  state.quizFinished = false;

  state.isDailyChallenge =
    isDaily;


  const quizCategory =
    $("#quizCategory");


  if (quizCategory) {

    quizCategory.textContent =
      category.name.toUpperCase();

  }


  showPage("quiz");


  renderQuestion();

}


/* ==========================================
   RENDER QUESTION
========================================== */

function renderQuestion() {

  const question =
    state.questions[
      state.currentQuestion
    ];


  if (!question) {

    finishQuiz();

    return;
  }


  state.selectedAnswer =
    null;

  state.answerChecked =
    false;


  const questionText =
    $("#questionText");


  const questionNumber =
    $("#questionNumber");


  const counter =
    $("#quizCounter");


  const progress =
    $("#quizProgress");


  const options =
    $("#answerOptions");


  const feedback =
    $("#answerFeedback");


  const nextButton =
    $("#nextQuestion");


  if (questionText) {

    questionText.textContent =
      question.q;

  }


  if (questionNumber) {

    questionNumber.textContent =
      `QUESTION ${String(
        state.currentQuestion + 1
      ).padStart(2, "0")}`;

  }


  if (counter) {

    counter.textContent =
      `Question ${
        state.currentQuestion + 1
      } of ${
        state.questions.length
      }`;

  }


  if (progress) {

    const percentage =
      (
        state.currentQuestion /
        state.questions.length
      ) * 100;


    progress.style.width =
      `${percentage}%`;

  }


  if (feedback) {

    feedback.textContent =
      "";

    feedback.className =
      "answer-feedback";

  }


  if (nextButton) {

    nextButton.disabled =
      true;

    nextButton.textContent =
      "Check answer";

  }


  if (!options) {
    return;
  }


  options.innerHTML = "";


  question.options.forEach(
    (option, index) => {

      const button =
        document.createElement("button");


      button.type =
        "button";


      button.className =
        "answer-option";


      button.dataset.index =
        index;


      button.innerHTML = `

        <span class="option-letter">
          ${String.fromCharCode(
            65 + index
          )}
        </span>

        <span class="option-text">
          ${escapeHTML(option)}
        </span>

      `;


      button.addEventListener(
        "click",
        () => {

          selectAnswer(index);

        }
      );


      options.appendChild(
        button
      );

    }
  );

}


/* ==========================================
   SELECT ANSWER
========================================== */

function selectAnswer(index) {

  if (state.answerChecked) {
    return;
  }


  state.selectedAnswer =
    index;


  const buttons =
    $$(".answer-option");


  buttons.forEach(button => {

    button.classList.remove(
      "selected"
    );

  });


  const selected =
    document.querySelector(
      `.answer-option[data-index="${index}"]`
    );


  if (selected) {

    selected.classList.add(
      "selected"
    );

  }


  const nextButton =
    $("#nextQuestion");


  if (nextButton) {

    nextButton.disabled =
      false;

    nextButton.textContent =
      "Check answer →";

  }

}


/* ==========================================
   CHECK ANSWER
========================================== */

function checkAnswer() {

  if (state.answerChecked) {

    nextQuestion();

    return;
  }


  if (
    state.selectedAnswer === null
  ) {

    showToast(
      "Please select an answer first."
    );

    return;
  }


  const question =
    state.questions[
      state.currentQuestion
    ];


  const buttons =
    $$(".answer-option");


  state.answerChecked =
    true;


  buttons.forEach(
    (button, index) => {

      button.disabled =
        true;


      if (
        index === question.answer
      ) {

        button.classList.add(
          "correct"
        );

      }


      if (
        index === state.selectedAnswer &&
        index !== question.answer
      ) {

        button.classList.add(
          "wrong"
        );

      }

    }
  );


  const feedback =
    $("#answerFeedback");


  if (
    state.selectedAnswer ===
    question.answer
  ) {

    state.score++;


    if (feedback) {

      feedback.textContent =
        "✓ Correct! Great job!";

      feedback.classList.add(
        "correct-feedback"
      );

    }

  } else {

    if (feedback) {

      feedback.textContent =
        `✗ Incorrect. The correct answer is "${question.options[question.answer]}".`;

      feedback.classList.add(
        "wrong-feedback"
      );

    }

  }


  const nextButton =
    $("#nextQuestion");


  if (nextButton) {

    nextButton.disabled =
      false;


    if (
      state.currentQuestion ===
      state.questions.length - 1
    ) {

      nextButton.textContent =
        "Finish quiz →";

    } else {

      nextButton.textContent =
        "Next question →";

    }

  }

}


/* ==========================================
   NEXT QUESTION
========================================== */

function nextQuestion() {

  if (!state.answerChecked) {

    checkAnswer();

    return;
  }


  if (
    state.currentQuestion >=
    state.questions.length - 1
  ) {

    finishQuiz();

    return;
  }


  state.currentQuestion++;


  renderQuestion();

}


/* ==========================================
   FINISH QUIZ
========================================== */

function finishQuiz() {

  state.quizFinished =
    true;


  const total =
    state.questions.length;


  const score =
    state.score;


  const percentage =
    Math.round(
      (score / total) * 100
    );


  const xp =
    calculateXP(
      score,
      total,
      state.isDailyChallenge
    );


  saveQuizResult({
    categoryId:
      state.selectedCategory,

    score,

    total,

    percentage,

    xp,

    daily:
      state.isDailyChallenge,

    date:
      new Date().toISOString()
  });


  renderResult(
    score,
    total,
    percentage,
    xp
  );


  showPage("result");

}


/* ==========================================
   XP CALCULATION
========================================== */

function calculateXP(
  score,
  total,
  daily = false
) {

  let xp =
    score * 20;


  if (daily) {

    xp += 20;

  }


  if (
    score === total
  ) {

    xp += 20;

  }


  return xp;
}


/* ==========================================
   SAVE QUIZ RESULT
========================================== */

function saveQuizResult(result) {

  const results =
    getResults();


  const user =
    getCurrentUser();


  results.push({

    ...result,

    userEmail:
      user?.email || "guest",

    userName:
      user?.name || "Guest",

    timestamp:
      Date.now()

  });


  setStored(
    STORAGE.results,
    results
  );

}


/* ==========================================
   RENDER RESULT
========================================== */

function renderResult(
  score,
  total,
  percentage,
  xp
) {

  const resultPercent =
    $("#resultPercent");


  const resultCorrect =
    $("#resultCorrect");


  const resultXP =
    $("#resultXP");


  const resultTitle =
    $("#resultTitle");


  const resultMessage =
    $("#resultMessage");


  const resultIcon =
    $("#resultIcon");


  if (resultPercent) {

    resultPercent.textContent =
      `${percentage}%`;

  }


  if (resultCorrect) {

    resultCorrect.textContent =
      `${score}/${total}`;

  }


  if (resultXP) {

    resultXP.textContent =
      `+${xp} XP`;

  }


  let title =
    "Keep going!";


  let message =
    "Every quiz is another chance to learn.";


  let icon =
    "💪";


  if (percentage === 100) {

    title =
      "Perfect score!";

    message =
      "Absolutely amazing! You got every question right.";

    icon =
      "🏆";

  } else if (percentage >= 80) {

    title =
      "Excellent work!";

    message =
      "You really know your stuff.";

    icon =
      "🎉";

  } else if (percentage >= 60) {

    title =
      "Good job!";

    message =
      "You're doing well. Keep improving.";

    icon =
      "👏";

  } else if (percentage >= 40) {

    title =
      "Nice attempt!";

    message =
      "A little more practice and you'll get there.";

    icon =
      "📚";

  }


  if (resultTitle) {

    resultTitle.textContent =
      title;

  }


  if (resultMessage) {

    resultMessage.textContent =
      message;

  }


  if (resultIcon) {

    resultIcon.textContent =
      icon;

  }

}


/* ==========================================
   RETRY QUIZ
========================================== */

function retryQuiz() {

  if (!state.selectedCategory) {

    showPage("categories");

    return;
  }


  startQuiz(
    state.selectedCategory,
    state.isDailyChallenge
  );

}


/* ==========================================
   EXIT QUIZ
========================================== */

function exitQuiz() {

  state.questions = [];

  state.currentQuestion = 0;

  state.score = 0;

  state.selectedAnswer = null;

  state.answerChecked = false;

  showPage("categories");

}


/* ==========================================
   QUIZ BUTTON EVENTS
========================================== */

function setupQuizEvents() {

  const nextButton =
    $("#nextQuestion");


  if (nextButton) {

    nextButton.addEventListener(
      "click",
      () => {

        if (
          state.answerChecked
        ) {

          nextQuestion();

        } else {

          checkAnswer();

        }

      }
    );

  }


  const exitButton =
    $("#exitQuiz");


  if (exitButton) {

    exitButton.addEventListener(
      "click",
      exitQuiz
    );

  }


  const retryButton =
    $("#retryQuiz");


  if (retryButton) {

    retryButton.addEventListener(
      "click",
      retryQuiz
    );

  }

}


/* ==========================================
   ESCAPE HTML
========================================== */

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* ==========================================
   TOAST
========================================== */

let toastTimer;


function showToast(message) {

  const toast =
    $("#toast");


  if (!toast) {
    return;
  }


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2500
    );

}
/* ==========================================
   AUTHENTICATION
========================================== */

function setupAuth() {

  const form =
    $("#authForm");

  const loginTab =
    $("#loginTab");

  const registerTab =
    $("#registerTab");

  const nameInput =
    $("#authName");

  const nameLabel =
    $("#nameLabel");

  const submitButton =
    $("#authSubmit");

  const title =
    $("#authTitle");

  const description =
    $("#authDescription");


  if (!form) {
    return;
  }


  let mode = "login";


  function setMode(newMode) {

    mode = newMode;


    const isLogin =
      mode === "login";


    if (loginTab) {

      loginTab.classList.toggle(
        "selected",
        isLogin
      );

    }


    if (registerTab) {

      registerTab.classList.toggle(
        "selected",
        !isLogin
      );

    }


    if (nameInput) {

      nameInput.hidden =
        isLogin;

      nameInput.required =
        !isLogin;

    }


    if (nameLabel) {

      nameLabel.hidden =
        isLogin;

    }


    if (title) {

      title.textContent =
        isLogin
          ? "Welcome back!"
          : "Create your account";

    }


    if (description) {

      description.textContent =
        isLogin
          ? "Log in to continue your learning journey."
          : "Create an account and start your QuizMaster journey.";

    }


    if (submitButton) {

      submitButton.textContent =
        isLogin
          ? "Login"
          : "Create account";

    }


    clearAuthMessage();

  }


  if (loginTab) {

    loginTab.addEventListener(
      "click",
      () => setMode("login")
    );

  }


  if (registerTab) {

    registerTab.addEventListener(
      "click",
      () => setMode("register")
    );

  }


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        nameInput?.value.trim() || "";


      const email =
        $("#authEmail")
          ?.value
          .trim()
          .toLowerCase() || "";


      const password =
        $("#authPassword")
          ?.value || "";


      if (!email) {

        showAuthMessage(
          "Please enter your email address.",
          "error"
        );

        return;
      }


      if (
        password.length < 6
      ) {

        showAuthMessage(
          "Password must contain at least 6 characters.",
          "error"
        );

        return;
      }


      const users =
        getUsers();


      if (mode === "register") {

        if (!name) {

          showAuthMessage(
            "Please enter your name.",
            "error"
          );

          return;
        }


        const exists =
          users.some(
            user =>
              user.email === email
          );


        if (exists) {

          showAuthMessage(
            "An account with this email already exists.",
            "error"
          );

          return;
        }


        const newUser = {

          name,

          email,

          password,

          createdAt:
            new Date().toISOString()

        };


        users.push(
          newUser
        );


        saveUsers(users);


        localStorage.setItem(
          STORAGE.currentUser,
          email
        );


        form.reset();


        showToast(
          "Account created successfully! 🎉"
        );


        updateAuthNavigation();


        setTimeout(
          () => {

            showPage(
              "profile"
            );

          },
          300
        );


      } else {

        const user =
          users.find(
            item =>
              item.email === email &&
              item.password === password
          );


        if (!user) {

          showAuthMessage(
            "Invalid email or password.",
            "error"
          );

          return;
        }


        localStorage.setItem(
          STORAGE.currentUser,
          email
        );


        form.reset();


        showToast(
          `Welcome back, ${user.name}! 👋`
        );


        updateAuthNavigation();


        setTimeout(
          () => {

            showPage(
              "profile"
            );

          },
          300
        );

      }

    }
  );


  setMode("login");

}


/* ==========================================
   AUTH MESSAGE
========================================== */

function showAuthMessage(
  message,
  type = "error"
) {

  const element =
    $("#authMessage");


  if (!element) {
    return;
  }


  element.textContent =
    message;


  element.className =
    `form-message ${type}`;

}


function clearAuthMessage() {

  const element =
    $("#authMessage");


  if (!element) {
    return;
  }


  element.textContent = "";

  element.className =
    "form-message";

}


/* ==========================================
   LOGOUT
========================================== */

function logoutUser() {

  localStorage.removeItem(
    STORAGE.currentUser
  );


  updateAuthNavigation();


  showToast(
    "You have been logged out."
  );


  showPage("home");

}


/* ==========================================
   PROFILE
========================================== */

function renderProfile() {

  const container =
    $("#profileContent");


  if (!container) {
    return;
  }


  const user =
    getCurrentUser();


  if (!user) {

    container.innerHTML = `

      <div class="panel empty-state">

        <div class="result-icon">
          🔐
        </div>

        <h2>
          Login to see your profile
        </h2>

        <p>
          Your quiz history, XP and progress
          will appear here.
        </p>

        <button
          class="btn primary"
          data-page="auth">

          Login / Register →

        </button>

      </div>

    `;

    return;
  }


  const results =
    getResults().filter(
      result =>
        result.userEmail ===
        user.email
    );


  const totalQuizzes =
    results.length;


  const totalCorrect =
    results.reduce(
      (
        total,
        result
      ) =>
        total + result.score,
      0
    );


  const totalQuestions =
    results.reduce(
      (
        total,
        result
      ) =>
        total + result.total,
      0
    );


  const totalXP =
    results.reduce(
      (
        total,
        result
      ) =>
        total + result.xp,
      0
    );


  const average =
    totalQuestions > 0
      ? Math.round(
          (
            totalCorrect /
            totalQuestions
          ) * 100
        )
      : 0;


  const bestScore =
    results.length > 0
      ? Math.max(
          ...results.map(
            result =>
              result.percentage
          )
        )
      : 0;


  const recentResults =
    [...results]
      .sort(
        (
          a,
          b
        ) =>
          b.timestamp -
          a.timestamp
      )
      .slice(0, 5);


  container.innerHTML = `

    <div class="profile-header panel">

      <div class="profile-avatar">
        ${escapeHTML(
          getInitials(user.name)
        )}
      </div>

      <div class="profile-info">

        <span class="eyebrow">
          QUIZMASTER PLAYER
        </span>

        <h2>
          ${escapeHTML(user.name)}
        </h2>

        <p>
          ${escapeHTML(user.email)}
        </p>

      </div>

      <button
        id="profileLogout"
        class="btn secondary">

        Logout

      </button>

    </div>


    <div class="profile-stats">

      <div class="stat-card">

        <span>
          🧠
        </span>

        <strong>
          ${totalQuizzes}
        </strong>

        <small>
          Quizzes completed
        </small>

      </div>


      <div class="stat-card">

        <span>
          ⭐
        </span>

        <strong>
          ${totalXP}
        </strong>

        <small>
          Total XP
        </small>

      </div>


      <div class="stat-card">

        <span>
          🎯
        </span>

        <strong>
          ${average}%
        </strong>

        <small>
          Average accuracy
        </small>

      </div>


      <div class="stat-card">

        <span>
          🏆
        </span>

        <strong>
          ${bestScore}%
        </strong>

        <small>
          Best score
        </small>

      </div>

    </div>


    <div class="panel">

      <div class="section-heading">

        <div>

          <span class="eyebrow">
            YOUR ACTIVITY
          </span>

          <h2>
            Recent quizzes
          </h2>

        </div>

      </div>


      ${
        recentResults.length === 0
          ? `

            <div class="empty-state">

              <div>
                📚
              </div>

              <h3>
                No quizzes yet
              </h3>

              <p>
                Complete your first quiz
                to start building your profile.
              </p>

              <button
                class="btn primary"
                data-page="categories">

                Explore quizzes →

              </button>

            </div>

          `
          : `

            <div class="activity-list">

              ${recentResults
                .map(
                  result => {

                    const category =
                      categories.find(
                        item =>
                          item.id ===
                          result.categoryId
                      );


                    return `

                      <div class="activity-item">

                        <div class="activity-icon">

                          ${
                            category?.icon ||
                            "🧠"
                          }

                        </div>


                        <div class="activity-info">

                          <strong>

                            ${
                              escapeHTML(
                                category?.name ||
                                "Quiz"
                              )
                            }

                          </strong>

                          <small>

                            ${result.score}/${result.total}
                            correct ·
                            ${formatDate(
                              result.date
                            )}

                          </small>

                        </div>


                        <div class="activity-score">

                          <strong>
                            ${result.percentage}%
                          </strong>

                          <small>
                            +${result.xp} XP
                          </small>

                        </div>

                      </div>

                    `;

                  }
                )
                .join("")}

            </div>

          `
      }

    </div>

  `;


  const logoutButton =
    $("#profileLogout");


  if (logoutButton) {

    logoutButton.addEventListener(
      "click",
      logoutUser
    );

  }

}


/* ==========================================
   PROFILE INITIALS
========================================== */

function getInitials(name) {

  return String(name)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(
      word =>
        word.charAt(0)
          .toUpperCase()
    )
    .join("");

}


/* ==========================================
   FORMAT DATE
========================================== */

function formatDate(date) {

  if (!date) {
    return "Unknown date";
  }


  const parsed =
    new Date(date);


  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {

    return "Unknown date";

  }


  return parsed.toLocaleDateString(
    undefined,
    {
      day: "numeric",
      month: "short",
      year: "numeric"
    }
  );

}


/* ==========================================
   LEADERBOARD
========================================== */

function renderLeaderboard() {

  const container =
    $("#leaderboardRows");


  const empty =
    $("#leaderboardEmpty");


  if (!container) {
    return;
  }


  const results =
    getResults();


  if (results.length === 0) {

    container.innerHTML =
      "";

    if (empty) {

      empty.style.display =
        "block";

    }

    return;

  }


  if (empty) {

    empty.style.display =
      "none";

  }


  /*
    Keep the best score for
    every player.
  */

  const players =
    {};


  results.forEach(result => {

    const key =
      result.userEmail ||
      "guest";


    if (
      !players[key] ||
      result.percentage >
        players[key].percentage ||
      (
        result.percentage ===
        players[key].percentage &&
        result.xp >
          players[key].xp
      )
    ) {

      players[key] =
        result;

    }

  });


  const ranking =
    Object.values(players)
      .sort(
        (
          a,
          b
        ) => {

          if (
            b.percentage !==
            a.percentage
          ) {

            return (
              b.percentage -
              a.percentage
            );

          }


          return (
            b.xp -
            a.xp
          );

        }
      );


  container.innerHTML =
    ranking
      .slice(0, 20)
      .map(
        (
          player,
          index
        ) => `

          <div class="leaderboard-row">

            <span class="rank">

              ${getRankDisplay(
                index
              )}

            </span>


            <span class="player-name">

              <span class="mini-avatar">

                ${escapeHTML(
                  getInitials(
                    player.userName ||
                    "Guest"
                  )
                )}

              </span>

              ${escapeHTML(
                player.userName ||
                "Guest"
              )}

            </span>


            <strong>
              ${player.percentage}%
            </strong>


            <span>
              ${player.xp} XP
            </span>

          </div>

        `
      )
      .join("");

}


/* ==========================================
   RANK DISPLAY
========================================== */

function getRankDisplay(index) {

  if (index === 0) {
    return "🥇";
  }


  if (index === 1) {
    return "🥈";
  }


  if (index === 2) {
    return "🥉";
  }


  return `#${index + 1}`;

}


/* ==========================================
   DAILY CHALLENGE
========================================== */

function getTodayKey() {

  const now =
    new Date();


  return [

    now.getFullYear(),

    String(
      now.getMonth() + 1
    ).padStart(2, "0"),

    String(
      now.getDate()
    ).padStart(2, "0")

  ].join("-");

}


/* ==========================================
   DAILY DATA
========================================== */

function getDailyData() {

  const saved =
    getStored(
      STORAGE.daily,
      {}
    );


  const today =
    getTodayKey();


  if (
    saved.date !== today
  ) {

    return {

      date: today,

      completed: false

    };

  }


  return saved;

}


/* ==========================================
   DAILY PAGE
========================================== */

function updateDailyPage() {

  const status =
    $("#dailyStatus");


  const startButton =
    $("#startDaily");


  const daily =
    getDailyData();


  if (!status) {
    return;
  }


  if (daily.completed) {

    status.textContent =
      "✓ You completed today's challenge. Come back tomorrow!";


    status.className =
      "muted-text daily-completed";


    if (startButton) {

      startButton.textContent =
        "Completed today";

      startButton.disabled =
        true;

    }

  } else {

    status.textContent =
      "Today's challenge is waiting for you.";


    status.className =
      "muted-text";


    if (startButton) {

      startButton.textContent =
        "Start daily challenge →";

      startButton.disabled =
        false;

    }

  }

}


/* ==========================================
   START DAILY CHALLENGE
========================================== */

function startDailyChallenge() {

  const daily =
    getDailyData();


  if (daily.completed) {

    showToast(
      "You've already completed today's challenge! 🎉"
    );

    return;

  }


  /*
    Use a different category each day
    so the challenge changes naturally.
  */

  const today =
    getTodayKey();


  const numericDate =
    Number(
      today.replaceAll("-", "")
    );


  const categoryIndex =
    numericDate %
    categories.length;


  const category =
    categories[
      categoryIndex
    ];


  startQuiz(
    category.id,
    true
  );

}


/* ==========================================
   MARK DAILY COMPLETED
========================================== */

function markDailyCompleted() {

  setStored(
    STORAGE.daily,
    {

      date:
        getTodayKey(),

      completed:
        true

    }
  );

}


/* ==========================================
   OVERRIDE FINISH FOR DAILY
========================================== */

const originalFinishQuiz =
  finishQuiz;


/*
  Wrap finishQuiz so the daily challenge
  can be marked completed.
*/

finishQuiz = function () {

  if (
    state.isDailyChallenge
  ) {

    markDailyCompleted();

  }


  originalFinishQuiz();

};


/* ==========================================
   DAILY EVENTS
========================================== */

function setupDailyEvents() {

  const button =
    $("#startDaily");


  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    startDailyChallenge
  );

}


/* ==========================================
   YEAR
========================================== */

function updateYear() {

  const year =
    $("#currentYear");


  if (year) {

    year.textContent =
      new Date()
        .getFullYear();

  }

}


/* ==========================================
   CLOSE MOBILE MENU
========================================== */

function setupMobileMenu() {

  const nav =
    $("#mainNav");


  if (!nav) {
    return;
  }


  nav.addEventListener(
    "click",
    event => {

      if (
        event.target.closest(
          "[data-page]"
        )
      ) {

        nav.classList.remove(
          "open"
        );

      }

    }
  );

}


/* ==========================================
   KEYBOARD SUPPORT
========================================== */

function setupKeyboardControls() {

  document.addEventListener(
    "keydown",
    event => {

      /*
        Enter:
        Check / next question
      */

      if (
        event.key === "Enter" &&
        state.currentPage === "quiz"
      ) {

        const active =
          document.activeElement;


        if (
          active &&
          active.tagName === "BUTTON" &&
          active.classList.contains(
            "answer-option"
          )
        ) {

          return;

        }


        const nextButton =
          $("#nextQuestion");


        if (
          nextButton &&
          !nextButton.disabled
        ) {

          nextButton.click();

        }

      }


      /*
        Escape:
        Exit quiz
      */

      if (
        event.key === "Escape" &&
        state.currentPage === "quiz"
      ) {

        exitQuiz();

      }

    }
  );

}


/* ==========================================
   DEMO DATA
========================================== */

function createDemoUser() {

  const users =
    getUsers();


  /*
    Don't create a demo account
    if users already exist.
  */

  if (
    users.length > 0
  ) {

    return;

  }


  /*
    We intentionally do NOT create
    a password automatically.
    The user can register normally.
  */

}


/* ==========================================
   INITIAL APPLICATION SETUP
========================================== */

function initializeApp() {

  console.log(
    "QuizMaster initializing..."
  );


  /*
    Basic UI
  */

  renderHomeCategories();

  renderAllCategories();

  updateYear();

  updateAuthNavigation();

  updateDailyPage();


  /*
    Event listeners
  */

  setupNavigation();

  setupCategorySearch();

  setupQuizEvents();

  setupAuth();

  setupDailyEvents();

  setupMobileMenu();

  setupKeyboardControls();


  /*
    Demo storage initialization
  */

  createDemoUser();


  /*
    Final message
  */

  console.log(
    `QuizMaster loaded successfully.
     Categories: ${categories.length}
     Questions: ${Object.values(questionBank)
       .reduce(
         (total, questions) =>
           total + questions.length,
         0
       )}`
  );

}


/* ==========================================
   START APP
========================================== */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeApp
  );

} else {

  initializeApp();

}