const apiUrl = "http://localhost:3000/lugares";

document.addEventListener("DOMContentLoaded", () => {
  listarLugares();

  const form = document.getElementById("formLugar");
  form.addEventListener("submit", salvarLugar);

  const cancelarBtn = document.getElementById("cancelarEdicao");
  cancelarBtn.addEventListener("click", () => {
    form.reset();
    document.getElementById("id").value = "";
    document.getElementById("formTitle").textContent = "Adicionar Novo Lugar";
    cancelarBtn.classList.add("d-none");
  });
});

async function listarLugares() {
  const res = await fetch(apiUrl);
  const lugares = await res.json();

  const container = document.getElementById("destinos");
  container.innerHTML = "";

  lugares.forEach(lugar => {
    const div = document.createElement("div");
    div.className = "col-md-4";
    div.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="../assets/${lugar.imagem}" class="card-img-top" alt="${lugar.nome}">
        <div class="card-body">
          <h5 class="card-title">${lugar.nome}</h5>
          <p class="card-text">${lugar.descricao}</p>
          <p><strong>País:</strong> ${lugar.pais}</p>
          <button class="btn btn-warning btn-sm me-2" onclick="editarLugar(${lugar.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="excluirLugar(${lugar.id})">Excluir</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

async function salvarLugar(e) {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const novoLugar = {
    nome: document.getElementById("nome").value,
    pais: document.getElementById("pais").value,
    descricao: document.getElementById("descricao").value,
    imagem: document.getElementById("imagem").value || "default.jpg"
  };

  if (id) {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoLugar)
    });
  } else {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoLugar)
    });
  }

  document.getElementById("formLugar").reset();
  document.getElementById("id").value = "";
  document.getElementById("formTitle").textContent = "Adicionar Novo Lugar";
  document.getElementById("cancelarEdicao").classList.add("d-none");

  listarLugares();
}

async function editarLugar(id) {
  const res = await fetch(`${apiUrl}/${id}`);
  const lugar = await res.json();

  document.getElementById("id").value = lugar.id;
  document.getElementById("nome").value = lugar.nome;
  document.getElementById("pais").value = lugar.pais;
  document.getElementById("descricao").value = lugar.descricao;
  document.getElementById("imagem").value = lugar.imagem;

  document.getElementById("formTitle").textContent = "Editar Lugar";
  document.getElementById("cancelarEdicao").classList.remove("d-none");
}

async function excluirLugar(id) {
  if (confirm("Deseja realmente excluir este lugar?")) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    listarLugares();
  }
}
