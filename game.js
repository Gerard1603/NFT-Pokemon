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
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 2,
    bug: 2,
    rock: 0.5,
    dragon: 0.5,
    steel: 2,
  },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: {
    water: 2,
    electric: 0.5,
    grass: 0.5,
    ground: 0,
    flying: 2,
    dragon: 0.5,
  },
  grass: {
    fire: 0.5,
    water: 2,
    grass: 0.5,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    bug: 0.5,
    rock: 2,
    dragon: 0.5,
    steel: 0.5,
  },
  ice: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 0.5,
    ground: 2,
    flying: 2,
    dragon: 2,
    steel: 0.5,
  },
  fighting: {
    normal: 2,
    ice: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    ghost: 0,
    dark: 2,
    steel: 2,
    fairy: 0.5,
  },
  poison: {
    grass: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
    fairy: 2,
  },
  ground: {
    fire: 2,
    electric: 2,
    grass: 0.5,
    poison: 2,
    flying: 0,
    bug: 0.5,
    rock: 2,
    steel: 2,
  },
  flying: {
    electric: 0.5,
    grass: 2,
    fighting: 2,
    bug: 2,
    rock: 0.5,
    steel: 0.5,
  },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: {
    fire: 0.5,
    grass: 2,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    psychic: 2,
    ghost: 0.5,
    dark: 2,
    steel: 0.5,
    fairy: 0.5,
  },
  rock: {
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    flying: 2,
    bug: 2,
    steel: 0.5,
  },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: {
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    ice: 2,
    rock: 2,
    steel: 0.5,
    fairy: 2,
  },
  fairy: {
    fire: 0.5,
    fighting: 2,
    poison: 0.5,
    dragon: 2,
    dark: 2,
    steel: 0.5,
  },
};

// ===== POKEAPI CONFIGURATION =====
const POKEAPI_BASE = "https://pokeapi.co/api/v2";

// (IDs lists same as before — keep them if you want to change pool)
const STARTER_POKEMON_IDS = [
  1, 4, 7, 25, 133, 152, 155, 158, 252, 255, 258, 387, 390, 393, 495,
];
const OPPONENT_POKEMON_IDS = [
  ...STARTER_POKEMON_IDS,
  10,
  16,
  19,
  23,
  27,
  29,
  32,
  39,
  43,
  52,
  54,
  58,
  60,
  63,
  66,
  69,
  72,
  74,
  92,
  98,
  104,
  109,
  116,
  129,
  147,
];

// ===== GAME STATE =====
const gameState = {
  playerPokemon: null,
  opponentPokemon: null,
  currentTurn: "player",
  battleActive: false,
  audioEnabled: true,
  starterPokemonData: [],
  loadingComplete: false,
};

// ===== AUDIO (unchanged) =====
const audio = {
  bgm: null,
  sfx: {},
  init() {},
  playBGM() {
    if (this.bgm && gameState.audioEnabled) this.bgm.play().catch((e) => {});
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
      this.sfx[name].play().catch(() => {});
    }
  },
};

// ===== DOM =====
const dom = {
  landingContainer: null,
  startBtn: null,
  trainerSelection: null,
  starterGrid: null,
  confirmBtn: null,
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

// ===== POKEAPI HELPERS =====
async function fetchPokemonData(pokemonId) {
  try {
    const response = await fetch(`${POKEAPI_BASE}/pokemon/${pokemonId}`);
    if (!response.ok) throw new Error("fetch fail");
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
async function fetchMoveData(url) {
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error("move fail");
    return await r.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
function getMainType(types) {
  return types[0].type.name;
}
function capitalizeFirst(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function buildPokemonFromAPI(pokemonData, level = 5) {
  if (!pokemonData) return null;
  const name = capitalizeFirst(pokemonData.name);
  const mainType = getMainType(pokemonData.types);
  const baseHP = pokemonData.stats.find((s) => s.stat.name === "hp").base_stat;
  const baseAttack = pokemonData.stats.find(
    (s) => s.stat.name === "attack"
  ).base_stat;
  const baseDefense = pokemonData.stats.find(
    (s) => s.stat.name === "defense"
  ).base_stat;
  const maxHP = Math.floor((2 * baseHP * level) / 100 + level + 10);
  const attack = Math.floor((2 * baseAttack * level) / 100 + 5);
  const defense = Math.floor((2 * baseDefense * level) / 100 + 5);
  const sprite =
    pokemonData.sprites.front_default ||
    pokemonData.sprites.other?.["official-artwork"]?.front_default ||
    "";

  // Collect up to 10 candidate level-up moves, fetch details, filter damaging moves
  const learned = pokemonData.moves
    .filter((m) => {
      const v = m.version_group_details.find(
        (vg) => vg.move_learn_method.name === "level-up"
      );
      return v && v.level_learned_at <= level + 10;
    })
    .slice(0, 10);

  const movePromises = learned.map((m) => fetchMoveData(m.move.url));
  const moveDataList = await Promise.all(movePromises);
  const moves = moveDataList
    .filter((md) => md && md.power && md.power > 0)
    .slice(0, 4)
    .map(
      (md) =>
        new Move(
          capitalizeFirst(md.name.replace(/-/g, " ")),
          md.type.name,
          md.power,
          md.accuracy || 100
        )
    );
  while (moves.length < 4) moves.push(new Move("Tackle", "normal", 40, 100));

  return new Pokemon(
    pokemonData.id,
    name,
    mainType,
    level,
    maxHP,
    attack,
    defense,
    sprite,
    moves
  );
}

// ===== LOADING STARTERS =====
async function loadStarterPokemon() {
  showLoadingMessage("Loading Pokémon from PokéAPI...");
  const promises = STARTER_POKEMON_IDS.map((id) => fetchPokemonData(id));
  const list = await Promise.all(promises);
  const build = await Promise.all(list.map((d) => buildPokemonFromAPI(d, 5)));
  gameState.starterPokemonData = build.filter((p) => p !== null);
  gameState.loadingComplete = true;
  hideLoadingMessage();
  generateStarters();
}

// ===== RANDOM OPPONENT =====
async function generateRandomOpponent() {
  let id =
    OPPONENT_POKEMON_IDS[
      Math.floor(Math.random() * OPPONENT_POKEMON_IDS.length)
    ];
  if (gameState.playerPokemon && id === gameState.playerPokemon.id) {
    const arr = OPPONENT_POKEMON_IDS.filter(
      (x) => x !== gameState.playerPokemon.id
    );
    id = arr[Math.floor(Math.random() * arr.length)];
  }
  const data = await fetchPokemonData(id);
  const lvl = 5 + Math.floor(Math.random() * 3);
  return await buildPokemonFromAPI(data, lvl);
}

// ===== LOADER UI =====
function showLoadingMessage(message) {
  const existing = document.getElementById("loadingMessage");
  if (existing) existing.remove();
  const d = document.createElement("div");
  d.id = "loadingMessage";
  d.style.cssText =
    "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:22px;border:4px solid #000;z-index:9999;text-align:center";
  d.innerHTML = `<p style="font-family:inherit">${message}</p><div style="margin-top:10px">⚡ Loading... ⚡</div>`;
  document.body.appendChild(d);
}
function hideLoadingMessage() {
  const e = document.getElementById("loadingMessage");
  if (e) e.remove();
}

// ===== INIT =====
function initGame() {
  cacheDOMElements();
  audio.init();
  setupEventListeners();
  loadStarterPokemon();
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
  // Connect wallet control added later after DOM loaded
}

// ===== PAGE TRANSITIONS =====
function showTrainerSelection() {
  if (!gameState.loadingComplete) {
    showLoadingMessage("Please wait, loading Pokémon...");
    return;
  }
  dom.landingContainer.classList.add("fade-out");
  setTimeout(() => {
    dom.landingContainer.classList.add("hidden");
    dom.trainerSelection.classList.remove("hidden");
    dom.trainerSelection.classList.add("fade-in");
  }, 500);
}

async function startBattle() {
  if (!gameState.playerPokemon) {
    addBattleMessage("Please select a starter Pokémon!");
    return;
  }
  dom.trainerSelection.classList.add("fade-out");
  showLoadingMessage("Finding opponent...");
  gameState.opponentPokemon = await generateRandomOpponent();
  hideLoadingMessage();
  setTimeout(() => {
    dom.trainerSelection.classList.add("hidden");
    dom.battlePage.classList.remove("hidden");
    dom.battlePage.classList.add("fade-in");
    initBattle();
    audio.playBGM();
  }, 500);
}

// ===== STARTER RENDER & SELECT =====
function generateStarters() {
  dom.starterGrid.innerHTML = "";
  gameState.starterPokemonData.forEach((starter) => {
    const card = document.createElement("div");
    card.className = "starter-card";
    card.dataset.id = starter.id;
    card.innerHTML = `
            <img src="${starter.sprite}" alt="${
      starter.name
    }" class="starter-sprite-img" loading="lazy">
            <div class="starter-name">${starter.name}</div>
            <span class="starter-type type-${
              starter.type
            }">${starter.type.toUpperCase()}</span>
            <div class="starter-stats">HP: ${starter.maxHP}<br>ATK: ${
      starter.attack
    }<br>DEF: ${starter.defense}</div>
        `;
    card.addEventListener("click", () => selectStarter(starter, card));
    dom.starterGrid.appendChild(card);
  });
}
function selectStarter(starter, cardElement) {
  document
    .querySelectorAll(".starter-card")
    .forEach((c) => c.classList.remove("selected"));
  cardElement.classList.add("selected");
  // clone instance to avoid modifying cache
  gameState.playerPokemon = new Pokemon(
    starter.id,
    starter.name,
    starter.type,
    starter.level,
    starter.maxHP,
    starter.attack,
    starter.defense,
    starter.sprite,
    [...starter.moves]
  );
  dom.confirmBtn.classList.remove("hidden");
}

// ===== BATTLE CORE (unchanged, kept concise) =====
function initBattle() {
  gameState.battleActive = true;
  gameState.currentTurn = "player";
  updatePokemonDisplay("player");
  updatePokemonDisplay("opponent");
  dom.battleLog.innerHTML = "";
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
  hpBar.classList.remove("low", "critical");
  if (hpPercentage <= 20) hpBar.classList.add("critical");
  else if (hpPercentage <= 50) hpBar.classList.add("low");
}
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
    btn.innerHTML = `<span class="move-name">${
      move.name
    }</span><br><span class="move-type type-${
      move.type
    }">${move.type.toUpperCase()}</span><span class="move-power">PWR:${
      move.power
    } ACC:${move.accuracy}%</span>`;
    btn.addEventListener("click", () => handleAttack(move));
    dom.moveMenu.appendChild(btn);
  });
  const back = document.createElement("button");
  back.className = "move-btn";
  back.innerHTML = '<span class="move-name">← Back</span>';
  back.addEventListener("click", hideMoveMenu);
  dom.moveMenu.appendChild(back);
}
function hideMoveMenu() {
  dom.moveMenu.classList.add("hidden");
  dom.commandMenu.classList.remove("hidden");
}

// ===== ATTACK FLOW =====
function handleAttack(move) {
  if (!gameState.battleActive || gameState.currentTurn !== "player") return;
  hideMoveMenu();
  disableCommands();
  executeAttack(
    gameState.playerPokemon,
    gameState.opponentPokemon,
    move,
    "player"
  );
  setTimeout(() => {
    if (!gameState.opponentPokemon.isAlive()) {
      endBattle(true);
      return;
    }
    gameState.currentTurn = "opponent";
    opponentTurn();
  }, 2000);
}
function opponentTurn() {
  addBattleMessage(`${gameState.opponentPokemon.name} is attacking!`);
  setTimeout(() => {
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
      gameState.currentTurn = "player";
      enableCommands();
    }, 2000);
  }, 1000);
}
function executeAttack(attacker, defender, move, side) {
  const hitChance = Math.random() * 100;
  if (hitChance > move.accuracy) {
    addBattleMessage(`${attacker.name} used ${move.name}!`);
    addBattleMessage("But it missed!");
    return;
  }
  const damage = calculateDamage(attacker, defender, move);
  const fainted = defender.takeDamage(damage);
  playAttackAnimation(side);
  audio.playSFX("attack");
  setTimeout(() => {
    playHitAnimation(side === "player" ? "opponent" : "player");
    audio.playSFX("hit");
  }, 300);
  addBattleMessage(`${attacker.name} used ${move.name}!`);
  const effectiveness = getTypeEffectiveness(move.type, defender.type);
  if (effectiveness > 1) addBattleMessage("It's super effective!");
  else if (effectiveness < 1 && effectiveness > 0)
    addBattleMessage("It's not very effective...");
  else if (effectiveness === 0)
    addBattleMessage("It doesn't affect the opponent...");
  setTimeout(() => {
    updateHPBar(side === "player" ? "opponent" : "player");
  }, 500);
  if (fainted)
    setTimeout(() => {
      addBattleMessage(`${defender.name} fainted!`);
    }, 1000);
}
function calculateDamage(attacker, defender, move) {
  const level = attacker.level;
  const attack = attacker.attack;
  const defense = defender.defense;
  const basePower = move.power;
  let damage = ((2 * level + 10) / 250) * (attack / defense) * basePower + 2;
  damage *= getTypeEffectiveness(move.type, defender.type);
  if (move.type === attacker.type) damage *= 1.5;
  const randomFactor = 0.85 + Math.random() * 0.15;
  damage *= randomFactor;
  return Math.floor(Math.max(1, damage));
}
function getTypeEffectiveness(attackType, defenderType) {
  if (
    typeChart[attackType] &&
    typeChart[attackType][defenderType] !== undefined
  )
    return typeChart[attackType][defenderType];
  return 1;
}

// ===== ANIMATIONS =====
function playAttackAnimation(side) {
  const sprite = side === "player" ? dom.playerSprite : dom.opponentSprite;
  sprite.classList.add("attack-animation");
  setTimeout(() => sprite.classList.remove("attack-animation"), 600);
}
function playHitAnimation(side) {
  const sprite = side === "player" ? dom.playerSprite : dom.opponentSprite;
  sprite.classList.add("hit-animation");
  setTimeout(() => sprite.classList.remove("hit-animation"), 400);
}

// ===== CONTROLS =====
function disableCommands() {
  dom.attackBtn.disabled = true;
  dom.runBtn.disabled = true;
}
function enableCommands() {
  dom.attackBtn.disabled = false;
  dom.runBtn.disabled = false;
}
function handleRun() {
  if (!gameState.battleActive) return;
  const escapeChance = Math.random();
  if (escapeChance > 0.5) {
    addBattleMessage("Got away safely!");
    setTimeout(() => endBattle(null), 1500);
  } else {
    addBattleMessage("Can't escape!");
    disableCommands();
    gameState.currentTurn = "opponent";
    setTimeout(() => opponentTurn(), 1500);
  }
}

// ===== END BATTLE + SHOW MINT BUTTON =====
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
  } else addBattleMessage("Battle ended.");
  setTimeout(() => audio.stopBGM(), 2000);
  setTimeout(() => {
    const restartBtn = document.createElement("button");
    restartBtn.className = "pixel-btn";
    restartBtn.textContent = "Battle Again";
    restartBtn.style.margin = "20px auto";
    restartBtn.style.display = "block";
    restartBtn.addEventListener("click", () => location.reload());
    dom.battleLog.appendChild(restartBtn);
  }, 3000);

  // After victory, show mint button (if player won)
  if (playerWon === true) setTimeout(showMintButton, 3500);
}

// ===== MINT UI (creates button inside battle log) =====
function showMintButton() {
  // remove existing if present
  const existing = document.getElementById("mintBtn");
  if (existing) existing.remove();
  const mintBtn = document.createElement("button");
  mintBtn.id = "mintBtn";
  mintBtn.className = "pixel-btn";
  mintBtn.textContent = "Mint Pokémon as NFT";
  mintBtn.style.display = "block";
  mintBtn.style.margin = "16px auto";
  mintBtn.addEventListener("click", () =>
    mintPokemonNFT(gameState.playerPokemon)
  );
  dom.battleLog.appendChild(mintBtn);
}

// ===== BLOCKCHAIN + IPFS (nft.storage) INTEGRATION =====
// Replace these with your actual keys/address
const NFT_STORAGE_KEY = "YOUR_NFT_STORAGE_KEY"; // <- REPLACE
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS"; // <- REPLACE

// ABI: expects a function safeMint(address to, string memory uri)
const CONTRACT_ABI = [
  "function safeMint(address to, string memory uri) public",
];

// wallet object to hold connection
const wallet = { provider: null, signer: null, address: null };

// Connect wallet (MetaMask) — uses ethers.BrowserProvider (ethers v6 UMD exposes `ethers`)
async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not detected. Install MetaMask.");
    return;
  }
  try {
    wallet.provider = new ethers.BrowserProvider(window.ethereum);
    await wallet.provider.send("eth_requestAccounts", []);
    wallet.signer = await wallet.provider.getSigner();
    wallet.address = await wallet.signer.getAddress();
    alert(
      `Wallet connected: ${wallet.address.substring(
        0,
        6
      )}...${wallet.address.slice(-4)}`
    );
  } catch (err) {
    console.error("connectWallet error", err);
    alert("Failed to connect wallet.");
  }
}

// Wire connect button (DOM might already be cached - ensure exists)
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("connectWalletBtn");
  if (btn) btn.addEventListener("click", connectWallet);
});

// Utility: fetch image as blob from sprite URL
async function fetchImageBlob(url) {
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error("Image fetch failed");
    return await r.blob();
  } catch (e) {
    console.error("fetchImageBlob", e);
    return null;
  }
}

// Mint flow:
// 1) Upload image + metadata to nft.storage
// 2) call contract.safeMint(wallet.address, metadataURI)
async function mintPokemonNFT(pokemon) {
  if (!wallet.signer) {
    alert("Please connect your wallet first.");
    return;
  }
  if (!NFT_STORAGE_KEY || NFT_STORAGE_KEY === "YOUR_NFT_STORAGE_KEY") {
    alert("Set your NFT_STORAGE_KEY in game.js");
    return;
  }
  if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS === "YOUR_CONTRACT_ADDRESS") {
    alert("Set your CONTRACT_ADDRESS in game.js");
    return;
  }

  showLoadingMessage("Uploading metadata to IPFS (nft.storage)...");

  try {
    // create nft.storage client
    const client = new window.NFTStorage({ token: NFT_STORAGE_KEY });

    // fetch image blob
    const imgBlob = await fetchImageBlob(pokemon.sprite);
    const file = imgBlob
      ? new File([imgBlob], `${pokemon.name.replace(/\s+/g, "_")}.png`, {
          type: imgBlob.type,
        })
      : null;

    // prepare metadata properties
    const metadataToStore = {
      name: `${pokemon.name} (Lv.${pokemon.level})`,
      description: `${pokemon.name} — Type: ${pokemon.type} — Captured in PokéBattle Arena`,
      image: file,
      properties: {
        type: pokemon.type,
        level: pokemon.level,
        attack: pokemon.attack,
        defense: pokemon.defense,
        hp: pokemon.maxHP,
      },
    };

    // store - returns { ipnft, url, ... } where url is ipfs://{CID}/metadata.json
    const result = await client.store(metadataToStore);
    // result.url is ipfs://ipnft:CID/metadata.json
    const metadataURI = result.url; // example: ipfs://ipfs:<cid>/metadata.json or ipfs://bafy...
    hideLoadingMessage();
    addBattleMessage(`Metadata uploaded: ${metadataURI}`);

    // Now mint on-chain
    showLoadingMessage("Sending mint transaction to contract...");
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      wallet.signer
    );
    // If your contract expects simple ipfs://CID style, pass result.url (works for many)
    const tx = await contract.safeMint(wallet.address, metadataURI);
    addBattleMessage("Transaction submitted — waiting confirmation...");
    await tx.wait();
    hideLoadingMessage();
    addBattleMessage("Mint successful! Check your wallet.");
    alert(`${pokemon.name} minted!`);
  } catch (err) {
    hideLoadingMessage();
    console.error("Mint error", err);
    alert("Mint failed — check console for details.");
  }
}

// ===== START =====
document.addEventListener("DOMContentLoaded", initGame);
