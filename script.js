console.log("JS carregado");

const inputTexto = document.getElementById("textoCard");
const btnAdicionar = document.getElementById("btnAdicionar");
const colunaAFazer = document.getElementById("a-fazer");
const listas = document.querySelectorAll(".lista-cards");

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

    // Evento de duplo clique para editar
    card.addEventListener("dblclick", function () {
        // Verifica se a tarefa foi concluida e impede edicao
        if (card.parentElement && card.parentElement.id === "concluido") {
            alert("Não é possível alterar uma tarefa concluída");
            return;
        }

        const novoTexto = prompt("Editar tarefa:", card.textContent);

        if (novoTexto !== null && novoTexto.trim() !== "") {
            card.textContent = novoTexto.trim();
        }
    });

    return card;
}

// Botao de adicionar nova tarefa
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

inputTexto.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btnAdicionar.click();
    }
});

listas.forEach(function (lista) {
    lista.addEventListener("dragover", function (evento) {
        evento.preventDefault();
    });

    lista.addEventListener("drop", function () {
        const cardArrastando = document.querySelector(".arrastando");

        if (cardArrastando) {
            lista.appendChild(cardArrastando);
        }
    });
});