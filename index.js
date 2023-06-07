const typeColor = {
  bug: "#26de81",
  dragon: "ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

const url = "https://pokeapi.co/api/v2/pokemon/";
const cardContainer = document.querySelector(".container");

let page = 1;
const limit = 20;
let isLoading = false;


// Fetch and display Pokemon cards
const getPokemonCards = () => {
  isLoading = true;
  const offset = (page - 1) * limit;
  const finalUrl = `${url}?offset=${offset}&limit=${limit}`;

  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      const pokemonList = data.results;
      pokemonList.forEach((pokemon) => {
        fetchPokemonData(pokemon);
      });
      isLoading = false;
      
    });
};

// Fetch Pokemon data
const fetchPokemonData = (pokemon) => {
  fetch(pokemon.url)
    .then((response) => response.json())
    .then((data) => {
      generateCard(data, typeColor);
    });
};

// Generate card
const generateCard = (data, typeColor) => {
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokeName = data.name;
  const statAttack = data.stats[2].base_stat;
  const statDefence = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;
  const themeColor = typeColor[data.types[0].type.name];

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <p class="hp">
      <span>HP</span>
      ${hp}
    </p>
    <img src="${imgSrc}" alt="">
    <h2 class="poke-name">${pokeName}</h2>
    <div class="types"></div>
    <div class="stats">
      <div>
        <h3>${statAttack}</h3>
        <p>Attack</p>
      </div>
      <div>
        <h3>${statDefence}</h3>
        <p>Defence</p>
      </div>
      <div>
        <h3>${statSpeed}</h3>
        <p>Speed</p>
      </div>
    </div>
  `;
  appendTypes(card, data.types);
  styleCard(card, themeColor);
  cardContainer.appendChild(card);
};

const appendTypes = (card, types) => {
  const typesContainer = card.querySelector(".types");
  types.forEach((item) => {
    let span = document.createElement("span");
    span.textContent = item.type.name;
    typesContainer.appendChild(span);
  });
};

const styleCard = (card, color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
};

// Check if user has scrolled to the bottom of the page
const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  const isScrollingDown = scrollTop + clientHeight >= scrollHeight - 50;

  if (isScrollingDown && !isLoading) {
    page++;
    getPokemonCards();
  }
};


// Add scroll event listener
window.addEventListener("scroll", handleScroll);

// Initial load of Pokemon cards
getPokemonCards();

// Seacrh input


