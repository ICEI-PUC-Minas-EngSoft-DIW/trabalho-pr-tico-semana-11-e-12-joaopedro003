document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (window.location.pathname.includes("detalhes.html") && id) {
    const response = await fetch(`http://localhost:3000/lugares/${id}`);
    const lugar = await response.json();
    renderDetalhes(lugar);
  } else {
    const response = await fetch("http://localhost:3000/lugares");
    const lugares = await response.json();
    renderCards(lugares);
  }
});

function renderCards(lugares) {
  const container = document.getElementById("cards-container");
  container.innerHTML = lugares
    .map(
      (lugar) => `
      <div class="card">
        <img src="${lugar.imagem_principal}" alt="${lugar.nome}">
        <div class="card-content">
          <h3>${lugar.nome}</h3>
          <p>${lugar.descricao}</p>
          <a href="detalhes.html?id=${lugar.id}" class="btn">Ver mais</a>
        </div>
      </div>`
    )
    .join("");
}

function renderDetalhes(lugar) {
  const container = document.getElementById("detalhes-container");
  container.innerHTML = `
    <div class="detalhe">
      <img src="${lugar.imagem_principal}" alt="${lugar.nome}" class="img-detalhe">
      <h2>${lugar.nome}</h2>
      <p>${lugar.conteudo}</p>
      <h3>Atrações:</h3>
      <ul>
        ${lugar.atracoes
          .map(
            (a) => `<li><strong>${a.nome}:</strong> ${a.descricao}</li>`
          )
          .join("")}
      </ul>
    </div>`;
}
