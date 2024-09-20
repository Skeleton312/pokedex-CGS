const pokemonContainer = document.getElementById('pokemonContainer');
const pageNumberSpan = document.getElementById('pageNumber');
const detailPokemon = document.getElementById('detailContainer');
const searchInput = document.getElementById('searchInput');
let resultsPokemon = []
let currentPage = 1;
let limit = 20;

// Fungsi untuk mendapatkan data dari API
async function fetchPokemonData() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000`);
    const data = await response.json();
    console.log(data)
    resultsPokemon = data.results;
    displayPokemon(resultsPokemon.slice(0, limit));
}

// Fungsi untuk menampilkan Pokemon dalam bentuk card
function displayPokemon(pokemons) {
    pokemonContainer.innerHTML = '';
    pokemons.forEach(async (pokemon) => {
        const pokemonData = await fetch(pokemon.url).then(res => res.json());
        const card = document.createElement('a');
        card.classList.add('pokemon-card');
        card.innerHTML = `
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            <h3>${pokemonData.name}</h3>
        `;
        card.addEventListener('click', function() {
            localStorage.setItem('pokemonDetails', JSON.stringify(pokemonData));
            window.location.href = 'detail.html';     
        });
        pokemonContainer.appendChild(card);
    });
}

// Fungsi pagination
function nextPage() {
    currentPage++;
    const offset = (currentPage - 1) * limit;
    pageNumberSpan.textContent = currentPage;
    displayPokemon(resultsPokemon.slice(offset, offset+limit))
    document.getElementById('prevBtn').disabled = currentPage === 1;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        const offset = (currentPage - 1) * limit;
        pageNumberSpan.innerText = currentPage;
        displayPokemon(resultsPokemon.slice(offset, offset+limit))
    }
    document.getElementById('prevBtn').disabled = currentPage === 1;
}

//Fungsi search
function searchPokemon() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPokemon = resultsPokemon.filter(pokemon => pokemon.name.toLowerCase().
    startsWith(searchTerm));
    
    displayPokemon(filteredPokemon.slice(0, limit)); 
}


searchInput.addEventListener('input', searchPokemon);

fetchPokemonData();
