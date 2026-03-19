console.log("JS carregado");

const inputTexto = document.getElementById("textoCard");
const btnAdicionar = document.getElementById("btnAdicionar");
const colunaAFazer = document.getElementById("a-fazer");


// Criar card
function criarCard(texto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = texto;
// Tornando o card arrastável
    card.setAttribute("draggable", "true");

// Evento ao começar a arrastar
card.addEventListener("dragstart", function () {
    card.classList.add("arrastando");
});

// Evento ao terminar de arrastar
card.addEventListener("dragend", function () {
    card.classList.remove("arrastando");
});
    

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

