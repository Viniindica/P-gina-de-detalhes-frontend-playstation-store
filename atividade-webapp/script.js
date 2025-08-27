const apiUrl = "https://store.playstation.com/store/api/chihiro/00_09_000/container/br/pt/999/STORE-MSF77008-ALLGAMES?size=20&start=0&sort=release_date";
const gameList = document.getElementById("gameList");
const searchInput = document.getElementById("searchInput");

function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

async function fetchGames() {
  try {
    const response = await axios.get(apiUrl);
    renderGames(response.data.links);
  } catch (error) {
    console.error("Erro ao buscar jogos", error);
  }
}

function renderGames(games) {
  gameList.innerHTML = "";

  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "card";
    card.addEventListener("click", () => {
      window.location.href = `details.html?id=${game.id}`;
    });

    const img = document.createElement("img");
    img.src = game.images[0].url;

    const content = document.createElement("div");
    content.className = "card-content";

    const title = document.createElement("h3");
    title.textContent = game.name;

    const release = document.createElement("p");
    release.textContent = "Lançamento: " + formatDate(game.release_date);

    content.appendChild(title);
    content.appendChild(release);

    card.appendChild(img);
    card.appendChild(content);

    gameList.appendChild(card);
  });
}

// filtro busca
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = title.includes(query) ? "block" : "none";
  });
});

fetchGames();
