const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const pokemonStats = document.querySelectorAll("#stats > p");

const searchToUrl = input => {
  // check if user entered a pokemon id
  const isNumber = !isNaN(input) && isFinite(input);
  if (isNumber) {
    return input.trim();
  }
  return input.toLowerCase().trim();
};

const showSprite = url => {
  // check if image is already present
  const sprite = document.getElementById("sprite");
  if (sprite) {
    sprite.remove();
  }

  pokemonId.insertAdjacentHTML("afterend", `<img id="sprite" src="${url}">`);
};

const showTypes = types => {
  Array.from(pokemonTypes.children).forEach(type => type.remove()); // reset first

  const fragment = document.createDocumentFragment();

  types.forEach(type => {
    console.log(type);
    const span = document.createElement("span");
    span.className = `type ${type.type.name}`;
    span.textContent = type.type.name;
    fragment.appendChild(span);
  })

  pokemonTypes.appendChild(fragment);
};

const showPokemon = pokemon => {
  const {name, height, weight, id, types, stats, sprites} = pokemon;
  pokemonName.textContent = name.toUpperCase();
  pokemonId.textContent = `#${id}`;
  pokemonWeight.textContent = `Weight: ${weight}`;
  pokemonHeight.textContent = `Height: ${height}`;

  // go over the stats array and display them all
  pokemonStats.forEach((p, index) => p.textContent = stats[index].base_stat)

  showSprite(sprites.front_default);
  showTypes(types);
};

const fetchData = async () => {
  try {
    const allPokemon = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
    const pokemon = `${allPokemon}/${searchToUrl(searchInput.value)}`;
    const res = await fetch(pokemon);
    const data = await res.json();

    showPokemon(data);
  } catch (err) {
    alert("Pokémon not found");
  }
};

searchBtn.addEventListener("click", fetchData);