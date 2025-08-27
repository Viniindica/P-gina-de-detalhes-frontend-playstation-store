function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

async function fetchGameDetail() {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get("id");

  if (!gameId) {
    document.getElementById("gameDetail").innerHTML = "<p>Jogo não encontrado.</p>";
    return;
  }

  try {
    const url = `https://store.playstation.com/store/api/chihiro/00_09_000/container/br/pt/999/${gameId}`;
    const response = await axios.get(url);
    const game = response.data;

    renderGameDetail(game);
  } catch (error) {
    console.error("Erro ao buscar detalhes:", error);
    document.getElementById("gameDetail").innerHTML = "<p>Erro ao carregar detalhes do jogo.</p>";
  }
}

function renderGameDetail(game) {
  const detail = document.getElementById("gameDetail");
  detail.innerHTML = `
    <img src="${game.images[0]?.url}" alt="${game.name}">
    <h1>${game.name}</h1>
    <p><strong>Lançamento:</strong> ${formatDate(game.release_date)}</p>
    <p><strong>Plataformas:</strong> ${(game.playable_platform || []).join(", ")}</p>
    <p><strong>Publicadora:</strong> ${game.publisher_name || "N/A"}</p>
    <p><strong>Preço:</strong> ${game.default_sku?.display_price || "Indisponível"}</p>
    <p><strong>Descrição:</strong><br>${game.long_desc || "Sem descrição"}</p>
    <a href="https://store.playstation.com/pt-br/product/${game.id}" target="_blank" class="store-link">🔗 Ver na PlayStation Store</a>
  `;
}

fetchGameDetail();
