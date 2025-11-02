const apiUrl = "http://localhost:3000/lugares";

async function carregarLugares() {
  const res = await fetch(apiUrl);
  const lugares = await res.json();
  const container = document.getElementById("cards-container");
  container.innerHTML = "";

  lugares.forEach(lugar => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${lugar.imagem}" alt="${lugar.nome}">
      <div class="card-content">
        <h3>${lugar.nome}</h3>
        <p><strong>${lugar.pais}</strong></p>
        <p>${lugar.descricao}</p>
        <div class="btn-group">
          <button onclick="editarLugar(${lugar.id})">Editar</button>
          <button onclick="excluirLugar(${lugar.id})" style="background-color:#e53935;">Excluir</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

document.getElementById("add-form").addEventListener("submit", async e => {
  e.preventDefault();

  const novoLugar = {
    nome: document.getElementById("nome").value,
    pais: document.getElementById("pais").value,
    imagem: document.getElementById("imagem").value || "https://via.placeholder.com/400",
    descricao: document.getElementById("descricao").value
  };

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoLugar)
  });

  e.target.reset();
  carregarLugares();
});

async function excluirLugar(id) {
  if (confirm("Deseja excluir este destino?")) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    carregarLugares();
  }
}

async function editarLugar(id) {
  const novoNome = prompt("Novo nome do lugar:");
  if (!novoNome) return;

  await fetch(`${apiUrl}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: novoNome })
  });

  carregarLugares();
}

carregarLugares();
