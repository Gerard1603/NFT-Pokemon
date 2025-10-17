// ===== POKEMON CLASS STRUCTURE =====
class Pokemon {
  constructor(id, name, type, level, maxHP, attack, defense, sprite, moves) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.level = level;
    this.maxHP = maxHP;
    this.currentHP = maxHP;
    this.attack = attack;
    this.defense = defense;
    this.sprite = sprite;
    this.moves = moves; // Array of Move objects
  }

  takeDamage(damage) {
    this.currentHP = Math.max(0, this.currentHP - damage);
    return this.currentHP === 0;
  }

  getHPPercentage() {
    return (this.currentHP / this.maxHP) * 100;
  }

  isAlive() {
    return this.currentHP > 0;
  }
}

// ===== MOVE CLASS STRUCTURE =====
class Move {
  constructor(name, type, power, accuracy = 100) {
    this.name = name;
    this.type = type;
    this.power = power;
    this.accuracy = accuracy;
  }
}

// ===== TYPE EFFECTIVENESS CHART =====
const typeChart = {
  fire: {
    grass: 2,
    ice: 2,
    bug: 2,
    steel: 2,
    water: 0.5,
    fire: 0.5,
    rock: 0.5,
    dragon: 0.5,
    electric: 1,
    normal: 1,
    fighting: 1,
    poison: 1,
    ground: 1,
    flying: 1,
    psychic: 1,
    ghost: 1,
    dark: 1,
    fairy: 1,
  },
  water: {
    fire: 2,
    ground: 2,
    rock: 2,
    grass: 0.5,
    water: 0.5,
    dragon: 0.5,
    electric: 1,
    normal: 1,
    fighting: 1,
    poison: 1,
    flying: 1,
    psychic: 1,
    bug: 1,
    ghost: 1,
    ice: 1,
    steel: 1,
    dark: 1,
    fairy: 1,
  },
  grass: {
    water: 2,
    ground: 2,
    rock: 2,
    fire: 0.5,
    grass: 0.5,
    poison: 0.5,
    flying: 0.5,
    bug: 0.5,
    dragon: 0.5,
    steel: 0.5,
    electric: 1,
    normal: 1,
    fighting: 1,
    psychic: 1,
    ice: 1,
    ghost: 1,
    dark: 1,
    fairy: 1,
  },
  electric: {
    water: 2,
    flying: 2,
    electric: 0.5,
    grass: 0.5,
    dragon: 0.5,
    ground: 0,
    fire: 1,
    normal: 1,
    fighting: 1,
    poison: 1,
    psychic: 1,
    bug: 1,
    rock: 1,
    ghost: 1,
    ice: 1,
    steel: 1,
    dark: 1,
    fairy: 1,
  },
  ice: {
    grass: 2,
    ground: 2,
    flying: 2,
    dragon: 2,
    fire: 0.5,
    water: 0.5,
    ice: 0.5,
    steel: 0.5,
    electric: 1,
    normal: 1,
    fighting: 1,
    poison: 1,
    rock: 1,
    psychic: 1,
    bug: 1,
    ghost: 1,
    dark: 1,
    fairy: 1,
  },
  fighting: {
    normal: 2,
    ice: 2,
    rock: 2,
    dark: 2,
    steel: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    fairy: 0.5,
    ghost: 0,
    fire: 1,
    water: 1,
    grass: 1,
    electric: 1,
    ground: 1,
    dragon: 1,
  },
  poison: {
    grass: 2,
    fairy: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
    fire: 1,
    water: 1,
    electric: 1,
    normal: 1,
    fighting: 1,
    flying: 1,
    psychic: 1,
    bug: 1,
    ice: 1,
    dragon: 1,
    dark: 1,
  },
  ground: {
    fire: 2,
    electric: 2,
    poison: 2,
    rock: 2,
    steel: 2,
    grass: 0.5,
    bug: 0.5,
    flying: 0,
    water: 1,
    normal: 1,
    fighting: 1,
    psychic: 1,
    ice: 1,
    dragon: 1,
    ghost: 1,
    dark: 1,
    fairy: 1,
  },
  flying: {
    grass: 2,
    fighting: 2,
    bug: 2,
    electric: 0.5,
    rock: 0.5,
    steel: 0.5,
    fire: 1,
    water: 1,
    normal: 1,
    poison: 1,
    ground: 1,
    psychic: 1,
    ice: 1,
    dragon: 1,
    ghost: 1,
    dark: 1,
    fairy: 1,
  },
  psychic: {
    fighting: 2,
    poison: 2,
    psychic: 0.5,
    steel: 0.5,
    dark: 0,
    fire: 1,
    water: 1,
    grass: 1,
    electric: 1,
    normal: 1,
    ground: 1,
    flying: 1,
    bug: 1,
    rock: 1,
    ice: 1,
    dragon: 1,
    ghost: 1,
    fairy: 1,
  },
  bug: {
    grass: 2,
    psychic: 2,
    dark: 2,
    fire: 0.5,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    ghost: 0.5,
    steel: 0.5,
    fairy: 0.5,
    water: 1,
    electric: 1,
    normal: 1,
    ground: 1,
    rock: 1,
    ice: 1,
    dragon: 1,
  },
  rock: {
    fire: 2,
    ice: 2,
    flying: 2,
    bug: 2,
    fighting: 0.5,
    ground: 0.5,
    steel: 0.5,
    water: 1,
    grass: 1,
    electric: 1,
    normal: 1,
    poison: 1,
    psychic: 1,
    dragon: 1,
    ghost: 1,
    dark: 1,
    fairy: 1,
  },
  ghost: {
    psychic: 2,
    ghost: 2,
    dark: 0.5,
    normal: 0,
    fire: 1,
    water: 1,
    grass: 1,
    electric: 1,
    fighting: 1,
    poison: 1,
    ground: 1,
    flying: 1,
    bug: 1,
    rock: 1,
    ice: 1,
    dragon: 1,
    steel: 1,
    fairy: 1,
  },
  dragon: {
    dragon: 2,
    steel: 0.5,
    fairy: 0,
    fire: 1,
    water: 1,
    grass: 1,
    electric: 1,
    normal: 1,
    fighting: 1,
    poison: 1,
    ground: 1,
    flying: 1,
    psychic: 1,
    bug: 1,
    rock: 1,
    ice: 1,
    ghost: 1,
    dark: 1,
  },
  dark: {
    psychic: 2,
    ghost: 2,
    fighting: 0.5,
    dark: 0.5,
    fairy: 0.5,
    fire: 1,
    water: 1,
    grass: 1,
    electric: 1,
    normal: 1,
    poison: 1,
    ground: 1,
    flying: 1,
    bug: 1,
    rock: 1,
    ice: 1,
    dragon: 1,
    steel: 1,
  },
  steel: {
    ice: 2,
    rock: 2,
    fairy: 2,
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    steel: 0.5,
    grass: 1,
    normal: 1,
    fighting: 1,
    poison: 1,
    ground: 1,
    flying: 1,
    psychic: 1,
    bug: 1,
    dragon: 1,
    ghost: 1,
    dark: 1,
  },
  fairy: {
    fighting: 2,
    dragon: 2,
    dark: 2,
    fire: 0.5,
    poison: 0.5,
    steel: 0.5,
    water: 1,
    grass: 1,
    electric: 1,
    normal: 1,
    ground: 1,
    flying: 1,
    psychic: 1,
    bug: 1,
    rock: 1,
    ice: 1,
    ghost: 1,
  },
  normal: {
    rock: 0.5,
    steel: 0.5,
    ghost: 0,
    fire: 1,
    water: 1,
    grass: 1,
    electric: 1,
    fighting: 1,
    poison: 1,
    ground: 1,
    flying: 1,
    psychic: 1,
    bug: 1,
    ice: 1,
    dragon: 1,
    dark: 1,
    fairy: 1,
  },
};

// ===== STARTER POKEMON DATA =====
const starterPokemon = [
  // Generation 1 Starters
  {
    id: 1,
    name: "Charmander",
    type: "fire",
    level: 5,
    maxHP: 39,
    attack: 52,
    defense: 43,
    sprite: "assets/sprites/Charmander.png",
    moves: [
      new Move("Ember", "fire", 40),
      new Move("Scratch", "normal", 40),
      new Move("Flamethrower", "fire", 90),
      new Move("Slash", "normal", 70),
    ],
  },
  {
    id: 2,
    name: "Squirtle",
    type: "water",
    level: 5,
    maxHP: 44,
    attack: 48,
    defense: 65,
    sprite: "assets/sprites/squirtle.png",
    moves: [
      new Move("Water Gun", "water", 40),
      new Move("Tackle", "normal", 40),
      new Move("Hydro Pump", "water", 110),
      new Move("Bite", "dark", 60),
    ],
  },
  {
    id: 3,
    name: "Bulbasaur",
    type: "grass",
    level: 5,
    maxHP: 45,
    attack: 49,
    defense: 49,
    sprite: "assets/sprites/bulbasaur.png",
    moves: [
      new Move("Vine Whip", "grass", 45),
      new Move("Tackle", "normal", 40),
      new Move("Solar Beam", "grass", 120),
      new Move("Razor Leaf", "grass", 55),
    ],
  },

  // Electric Type
  {
    id: 4,
    name: "Pikachu",
    type: "electric",
    level: 5,
    maxHP: 35,
    attack: 55,
    defense: 40,
    sprite: "assets/sprites/pikachu.jpg",
    moves: [
      new Move("Thunder Shock", "electric", 40),
      new Move("Quick Attack", "normal", 40),
      new Move("Thunderbolt", "electric", 90),
      new Move("Iron Tail", "steel", 100),
    ],
  },

  // Generation 2 Starters
  {
    id: 5,
    name: "Cyndaquil",
    type: "fire",
    level: 5,
    maxHP: 39,
    attack: 52,
    defense: 43,
    sprite: "assets/sprites/cyndaquil.png",
    moves: [
      new Move("Ember", "fire", 40),
      new Move("Tackle", "normal", 40),
      new Move("Flame Wheel", "fire", 60),
      new Move("Swift", "normal", 60),
    ],
  },
  {
    id: 6,
    name: "Totodile",
    type: "water",
    level: 5,
    maxHP: 50,
    attack: 65,
    defense: 64,
    sprite: "assets/sprites/totodile.png",
    moves: [
      new Move("Water Gun", "water", 40),
      new Move("Bite", "dark", 60),
      new Move("Hydro Pump", "water", 110),
      new Move("Ice Fang", "ice", 65),
    ],
  },
  {
    id: 7,
    name: "Chikorita",
    type: "grass",
    level: 5,
    maxHP: 45,
    attack: 49,
    defense: 65,
    sprite: "assets/sprites/chikorita.png",
    moves: [
      new Move("Razor Leaf", "grass", 55),
      new Move("Tackle", "normal", 40),
      new Move("Solar Beam", "grass", 120),
      new Move("Body Slam", "normal", 85),
    ],
  },

  // Popular Pokemon
  {
    id: 8,
    name: "Eevee",
    type: "normal",
    level: 5,
    maxHP: 55,
    attack: 55,
    defense: 50,
    sprite: "assets/sprites/eevee.png",
    moves: [
      new Move("Tackle", "normal", 40),
      new Move("Quick Attack", "normal", 40),
      new Move("Swift", "normal", 60),
      new Move("Take Down", "normal", 90),
    ],
  },
  {
    id: 9,
    name: "Meowth",
    type: "normal",
    level: 5,
    maxHP: 40,
    attack: 45,
    defense: 35,
    sprite: "assets/sprites/meowth.png",
    moves: [
      new Move("Scratch", "normal", 40),
      new Move("Bite", "dark", 60),
      new Move("Slash", "normal", 70),
      new Move("Pay Day", "normal", 40),
    ],
  },
  {
    id: 10,
    name: "Psyduck",
    type: "water",
    level: 5,
    maxHP: 50,
    attack: 52,
    defense: 48,
    sprite: "assets/sprites/psyduck.png",
    moves: [
      new Move("Water Gun", "water", 40),
      new Move("Confusion", "psychic", 50),
      new Move("Hydro Pump", "water", 110),
      new Move("Zen Headbutt", "psychic", 80),
    ],
  },
  {
    id: 11,
    name: "Geodude",
    type: "rock",
    level: 5,
    maxHP: 40,
    attack: 80,
    defense: 100,
    sprite: "assets/sprites/geodude.png",
    moves: [
      new Move("Rock Throw", "rock", 50),
      new Move("Tackle", "normal", 40),
      new Move("Rock Slide", "rock", 75),
      new Move("Earthquake", "ground", 100),
    ],
  },
  {
    id: 12,
    name: "Abra",
    type: "psychic",
    level: 5,
    maxHP: 25,
    attack: 20,
    defense: 15,
    sprite: "assets/sprites/abra.png",
    moves: [
      new Move("Confusion", "psychic", 50),
      new Move("Psybeam", "psychic", 65),
      new Move("Psychic", "psychic", 90),
      new Move("Shadow Ball", "ghost", 80),
    ],
  },
  {
    id: 13,
    name: "Gastly",
    type: "ghost",
    level: 5,
    maxHP: 30,
    attack: 35,
    defense: 30,
    sprite: "assets/sprites/gastly.png",
    moves: [
      new Move("Lick", "ghost", 30),
      new Move("Confuse Ray", "ghost", 0),
      new Move("Shadow Ball", "ghost", 80),
      new Move("Dark Pulse", "dark", 80),
    ],
  },
  {
    id: 14,
    name: "Machop",
    type: "fighting",
    level: 5,
    maxHP: 70,
    attack: 80,
    defense: 50,
    sprite: "assets/sprites/machop.png",
    moves: [
      new Move("Karate Chop", "fighting", 50),
      new Move("Low Kick", "fighting", 65),
      new Move("Cross Chop", "fighting", 100),
      new Move("Seismic Toss", "fighting", 60),
    ],
  },
  {
    id: 15,
    name: "Dratini",
    type: "dragon",
    level: 5,
    maxHP: 41,
    attack: 64,
    defense: 45,
    sprite: "assets/sprites/dratini.png",
    moves: [
      new Move("Dragon Rage", "dragon", 40),
      new Move("Twister", "dragon", 40),
      new Move("Dragon Pulse", "dragon", 85),
      new Move("Aqua Tail", "water", 90),
    ],
  },
];

// ===== GAME STATE =====
const gameState = {
  playerPokemon: null,
  opponentPokemon: null,
  currentTurn: "player",
  battleActive: false,
  audioEnabled: true,
};

// ===== AUDIO SYSTEM =====
const audio = {
  bgm: null,
  sfx: {},

  init() {
    // Create audio elements (would use actual audio files in production)
    // Placeholder: BGM would be loaded like this:
    // this.bgm = new Audio('assets/audio/battle-theme.mp3');
    // this.bgm.loop = true;
    // this.bgm.volume = 0.3;
    // SFX would be loaded like this:
    // this.sfx.attack = new Audio('assets/audio/attack.wav');
    // this.sfx.hit = new Audio('assets/audio/hit.wav');
    // this.sfx.victory = new Audio('assets/audio/victory.wav');
    // this.sfx.defeat = new Audio('assets/audio/defeat.wav');
  },

  playBGM() {
    if (this.bgm && gameState.audioEnabled) {
      this.bgm.play().catch((e) => console.log("BGM playback prevented:", e));
    }
  },

  stopBGM() {
    if (this.bgm) {
      this.bgm.pause();
      this.bgm.currentTime = 0;
    }
  },

  playSFX(name) {
    if (this.sfx[name] && gameState.audioEnabled) {
      this.sfx[name].currentTime = 0;
      this.sfx[name]
        .play()
        .catch((e) => console.log("SFX playback prevented:", e));
    }
  },
};

// ===== DOM ELEMENTS =====
const dom = {
  // Landing Page
  landingContainer: null,
  startBtn: null,

  // Trainer Selection
  trainerSelection: null,
  starterGrid: null,
  confirmBtn: null,

  // Battle Page
  battlePage: null,
  playerName: null,
  playerLevel: null,
  playerHpBar: null,
  playerHpText: null,
  playerSprite: null,
  opponentName: null,
  opponentLevel: null,
  opponentHpBar: null,
  opponentHpText: null,
  opponentSprite: null,
  battleLog: null,
  commandMenu: null,
  attackBtn: null,
  itemBtn: null,
  runBtn: null,
  moveMenu: null,
};

// ===== INITIALIZATION =====
function initGame() {
  // Cache DOM elements
  cacheDOMElements();

  // Initialize audio
  audio.init();

  // Setup event listeners
  setupEventListeners();

  // Generate starter selection
  generateStarters();
}

function cacheDOMElements() {
  dom.landingContainer = document.getElementById("landingContainer");
  dom.startBtn = document.getElementById("startBtn");
  dom.trainerSelection = document.getElementById("trainerSelection");
  dom.starterGrid = document.getElementById("starterGrid");
  dom.confirmBtn = document.getElementById("confirmBtn");
  dom.battlePage = document.getElementById("battlePage");
  dom.playerName = document.getElementById("playerName");
  dom.playerLevel = document.getElementById("playerLevel");
  dom.playerHpBar = document.getElementById("playerHpBar");
  dom.playerHpText = document.getElementById("playerHpText");
  dom.playerSprite = document.getElementById("playerSprite");
  dom.opponentName = document.getElementById("opponentName");
  dom.opponentLevel = document.getElementById("opponentLevel");
  dom.opponentHpBar = document.getElementById("opponentHpBar");
  dom.opponentHpText = document.getElementById("opponentHpText");
  dom.opponentSprite = document.getElementById("opponentSprite");
  dom.battleLog = document.getElementById("battleLog");
  dom.commandMenu = document.getElementById("commandMenu");
  dom.attackBtn = document.getElementById("attackBtn");
  dom.itemBtn = document.getElementById("itemBtn");
  dom.runBtn = document.getElementById("runBtn");
  dom.moveMenu = document.getElementById("moveMenu");
}

function setupEventListeners() {
  dom.startBtn.addEventListener("click", showTrainerSelection);
  dom.confirmBtn.addEventListener("click", startBattle);
  dom.attackBtn.addEventListener("click", showMoveMenu);
  dom.runBtn.addEventListener("click", handleRun);
}

// ===== PAGE TRANSITIONS =====
function showTrainerSelection() {
  dom.landingContainer.classList.add("fade-out");
  setTimeout(() => {
    dom.landingContainer.classList.add("hidden");
    dom.trainerSelection.classList.remove("hidden");
    dom.trainerSelection.classList.add("fade-in");
  }, 500);
}

function startBattle() {
  if (!gameState.playerPokemon) {
    addBattleMessage("Please select a starter Pokémon!");
    return;
  }

  dom.trainerSelection.classList.add("fade-out");
  setTimeout(() => {
    dom.trainerSelection.classList.add("hidden");
    dom.battlePage.classList.remove("hidden");
    dom.battlePage.classList.add("fade-in");

    // Generate random opponent
    generateOpponent();

    // Initialize battle
    initBattle();

    // Play BGM
    audio.playBGM();
  }, 500);
}

// ===== STARTER SELECTION =====
function generateStarters() {
  dom.starterGrid.innerHTML = "";

  starterPokemon.forEach((starter) => {
    const card = document.createElement("div");
    card.className = "starter-card";
    card.dataset.id = starter.id;

    card.innerHTML = `
            <img src="${starter.sprite}" alt="${
      starter.name
    }" class="starter-sprite-img">
            <div class="starter-name">${starter.name}</div>
            <span class="starter-type type-${
              starter.type
            }">${starter.type.toUpperCase()}</span>
            <div class="starter-stats">
                HP: ${starter.maxHP}<br>
                ATK: ${starter.attack}<br>
                DEF: ${starter.defense}
            </div>
        `;

    card.addEventListener("click", () => selectStarter(starter, card));
    dom.starterGrid.appendChild(card);
  });
}

function selectStarter(starter, cardElement) {
  // Remove previous selection
  document.querySelectorAll(".starter-card").forEach((card) => {
    card.classList.remove("selected");
  });

  // Select new starter
  cardElement.classList.add("selected");

  // Create Pokemon instance
  gameState.playerPokemon = new Pokemon(
    starter.id,
    starter.name,
    starter.type,
    starter.level,
    starter.maxHP,
    starter.attack,
    starter.defense,
    starter.sprite,
    starter.moves
  );

  // Show confirm button
  dom.confirmBtn.classList.remove("hidden");
}

// ===== OPPONENT GENERATION =====
function generateOpponent() {
  // Select random starter as opponent (excluding player's choice)
  const availableStarters = starterPokemon.filter(
    (s) => s.id !== gameState.playerPokemon.id
  );
  const randomStarter =
    availableStarters[Math.floor(Math.random() * availableStarters.length)];

  gameState.opponentPokemon = new Pokemon(
    randomStarter.id,
    randomStarter.name,
    randomStarter.type,
    randomStarter.level + Math.floor(Math.random() * 2), // Slightly higher level
    randomStarter.maxHP,
    randomStarter.attack,
    randomStarter.defense,
    randomStarter.sprite,
    randomStarter.moves
  );
}

// ===== BATTLE INITIALIZATION =====
function initBattle() {
  gameState.battleActive = true;
  gameState.currentTurn = "player";

  // Update UI
  updatePokemonDisplay("player");
  updatePokemonDisplay("opponent");

  // Clear battle log
  dom.battleLog.innerHTML = "";

  // Show initial message
  addBattleMessage(`A wild ${gameState.opponentPokemon.name} appeared!`);
  addBattleMessage(`Go, ${gameState.playerPokemon.name}!`);
}

function updatePokemonDisplay(side) {
  const pokemon =
    side === "player" ? gameState.playerPokemon : gameState.opponentPokemon;

  if (side === "player") {
    dom.playerName.textContent = pokemon.name;
    dom.playerLevel.textContent = `Lv.${pokemon.level}`;
    dom.playerSprite.innerHTML = `<img src="${pokemon.sprite}" alt="${pokemon.name}" class="battle-sprite-img">`;
    updateHPBar("player");
  } else {
    dom.opponentName.textContent = pokemon.name;
    dom.opponentLevel.textContent = `Lv.${pokemon.level}`;
    dom.opponentSprite.innerHTML = `<img src="${pokemon.sprite}" alt="${pokemon.name}" class="battle-sprite-img">`;
    updateHPBar("opponent");
  }
}

function updateHPBar(side) {
  const pokemon =
    side === "player" ? gameState.playerPokemon : gameState.opponentPokemon;
  const hpBar = side === "player" ? dom.playerHpBar : dom.opponentHpBar;
  const hpText = side === "player" ? dom.playerHpText : dom.opponentHpText;

  const hpPercentage = pokemon.getHPPercentage();
  hpBar.style.width = hpPercentage + "%";
  hpText.textContent = `${pokemon.currentHP}/${pokemon.maxHP}`;

  // Update HP bar color based on percentage
  hpBar.classList.remove("low", "critical");
  if (hpPercentage <= 20) {
    hpBar.classList.add("critical");
  } else if (hpPercentage <= 50) {
    hpBar.classList.add("low");
  }
}

// ===== BATTLE LOG =====
function addBattleMessage(message) {
  const p = document.createElement("p");
  p.textContent = message;
  dom.battleLog.appendChild(p);
  dom.battleLog.scrollTop = dom.battleLog.scrollHeight;
}

// ===== MOVE MENU =====
function showMoveMenu() {
  if (!gameState.battleActive || gameState.currentTurn !== "player") return;

  dom.commandMenu.classList.add("hidden");
  dom.moveMenu.classList.remove("hidden");
  dom.moveMenu.innerHTML = "";

  gameState.playerPokemon.moves.forEach((move) => {
    const btn = document.createElement("button");
    btn.className = "move-btn";
    btn.innerHTML = `
            <span class="move-name">${move.name}</span><br>
            <span class="move-type type-${
              move.type
            }">${move.type.toUpperCase()}</span>
            <span class="move-power">PWR: ${move.power}</span>
        `;
    btn.addEventListener("click", () => handleAttack(move));
    dom.moveMenu.appendChild(btn);
  });

  // Add back button
  const backBtn = document.createElement("button");
  backBtn.className = "move-btn";
  backBtn.innerHTML = '<span class="move-name">← Back</span>';
  backBtn.addEventListener("click", hideMoveMenu);
  dom.moveMenu.appendChild(backBtn);
}

function hideMoveMenu() {
  dom.moveMenu.classList.add("hidden");
  dom.commandMenu.classList.remove("hidden");
}

// ===== ATTACK HANDLER =====
function handleAttack(move) {
  if (!gameState.battleActive || gameState.currentTurn !== "player") return;

  hideMoveMenu();

  // Disable commands during attack sequence
  disableCommands();

  // Player attacks
  executeAttack(
    gameState.playerPokemon,
    gameState.opponentPokemon,
    move,
    "player"
  );

  // Check if opponent fainted
  setTimeout(() => {
    if (!gameState.opponentPokemon.isAlive()) {
      endBattle(true);
      return;
    }

    // Opponent's turn
    gameState.currentTurn = "opponent";
    opponentTurn();
  }, 2000);
}

function opponentTurn() {
  addBattleMessage(`${gameState.opponentPokemon.name} is attacking!`);

  setTimeout(() => {
    // AI selects random move
    const randomMove =
      gameState.opponentPokemon.moves[
        Math.floor(Math.random() * gameState.opponentPokemon.moves.length)
      ];

    executeAttack(
      gameState.opponentPokemon,
      gameState.playerPokemon,
      randomMove,
      "opponent"
    );

    setTimeout(() => {
      if (!gameState.playerPokemon.isAlive()) {
        endBattle(false);
        return;
      }

      // Back to player's turn
      gameState.currentTurn = "player";
      enableCommands();
    }, 2000);
  }, 1000);
}

// ===== ATTACK EXECUTION =====
function executeAttack(attacker, defender, move, side) {
  // Accuracy check
  const hitChance = Math.random() * 100;
  if (hitChance > move.accuracy) {
    addBattleMessage(`${attacker.name} used ${move.name}!`);
    addBattleMessage("But it missed!");
    return;
  }

  // Calculate damage
  const damage = calculateDamage(attacker, defender, move);

  // Apply damage
  const fainted = defender.takeDamage(damage);

  // Play animations
  playAttackAnimation(side);

  // Play SFX
  audio.playSFX("attack");

  setTimeout(() => {
    playHitAnimation(side === "player" ? "opponent" : "player");
    audio.playSFX("hit");
  }, 300);

  // Display messages
  addBattleMessage(`${attacker.name} used ${move.name}!`);

  // Type effectiveness message
  const effectiveness = getTypeEffectiveness(move.type, defender.type);
  if (effectiveness > 1) {
    addBattleMessage("It's super effective!");
  } else if (effectiveness < 1) {
    addBattleMessage("It's not very effective...");
  }

  // Update HP bars
  setTimeout(() => {
    updateHPBar(side === "player" ? "opponent" : "player");
  }, 500);

  if (fainted) {
    setTimeout(() => {
      addBattleMessage(`${defender.name} fainted!`);
    }, 1000);
  }
}

// ===== DAMAGE CALCULATION =====
function calculateDamage(attacker, defender, move) {
  // Pokemon damage formula (simplified)
  // Damage = (((2 * Level + 10) / 250) * (Attack / Defense) * BasePower + 2) * Modifier

  const level = attacker.level;
  const attack = attacker.attack;
  const defense = defender.defense;
  const basePower = move.power;

  // Base damage
  let damage = ((2 * level + 10) / 250) * (attack / defense) * basePower + 2;

  // Type effectiveness modifier
  const typeModifier = getTypeEffectiveness(move.type, defender.type);
  damage *= typeModifier;

  // STAB (Same Type Attack Bonus)
  if (move.type === attacker.type) {
    damage *= 1.5;
  }

  // Random factor (0.85 to 1.0)
  const randomFactor = 0.85 + Math.random() * 0.15;
  damage *= randomFactor;

  return Math.floor(damage);
}

function getTypeEffectiveness(attackType, defenderType) {
  return typeChart[attackType]?.[defenderType] || 1;
}

// ===== ANIMATIONS =====
function playAttackAnimation(side) {
  const sprite = side === "player" ? dom.playerSprite : dom.opponentSprite;
  sprite.classList.add("attack-animation");
  setTimeout(() => {
    sprite.classList.remove("attack-animation");
  }, 600);
}

function playHitAnimation(side) {
  const sprite = side === "player" ? dom.playerSprite : dom.opponentSprite;
  sprite.classList.add("hit-animation");
  setTimeout(() => {
    sprite.classList.remove("hit-animation");
  }, 400);
}

// ===== COMMAND CONTROLS =====
function disableCommands() {
  dom.attackBtn.disabled = true;
  dom.runBtn.disabled = true;
}

function enableCommands() {
  dom.attackBtn.disabled = false;
  dom.runBtn.disabled = false;
}

// ===== RUN HANDLER =====
function handleRun() {
  if (!gameState.battleActive) return;

  const escapeChance = Math.random();
  if (escapeChance > 0.5) {
    addBattleMessage("Got away safely!");
    setTimeout(() => {
      endBattle(null);
    }, 1500);
  } else {
    addBattleMessage("Can't escape!");
    disableCommands();
    gameState.currentTurn = "opponent";
    setTimeout(() => {
      opponentTurn();
    }, 1500);
  }
}

// ===== BATTLE END =====
function endBattle(playerWon) {
  gameState.battleActive = false;

  if (playerWon === true) {
    addBattleMessage(`You defeated ${gameState.opponentPokemon.name}!`);
    addBattleMessage("Victory!");
    audio.playSFX("victory");
  } else if (playerWon === false) {
    addBattleMessage(`${gameState.playerPokemon.name} fainted!`);
    addBattleMessage("You lost the battle!");
    audio.playSFX("defeat");
  } else {
    addBattleMessage("Battle ended.");
  }

  // Stop BGM
  setTimeout(() => {
    audio.stopBGM();
  }, 2000);

  // Show restart option
  setTimeout(() => {
    const restartBtn = document.createElement("button");
    restartBtn.className = "pixel-btn";
    restartBtn.textContent = "Battle Again";
    restartBtn.style.margin = "20px auto";
    restartBtn.style.display = "block";
    restartBtn.addEventListener("click", () => {
      location.reload();
    });
    dom.battleLog.appendChild(restartBtn);
  }, 3000);
}

// ===== START THE GAME =====
document.addEventListener("DOMContentLoaded", initGame);
