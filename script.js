console.log("JS carregado");

const inputTexto = document.getElementById("textoCard");
const btnAdicionar = document.getElementById("btnAdicionar");
const colunaAFazer = document.getElementById("a-fazer");


// Criar card
function criarCard(texto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = texto;

    

    return card;
}

btnAdicionar.addEventListener("click", function () {
    const texto = inputTexto.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa para adicionar");
        return;
    }

    const novoCard = criarCard(texto);
    colunaAFazer.appendChild(novoCard);

    inputTexto.value = "";
    inputTexto.focus();
});

