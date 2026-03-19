console.log("JS carregado");

const inputTexto = document.getElementById("textoCard");
const btnAdicionar = document.getElementById("btnAdicionar");
const colunaAFazer = document.getElementById("a-fazer");
const listas = document.querySelectorAll(".lista-cards");

// Cria um novo card com o texto informado
function criarCard(texto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = texto;
    card.setAttribute("draggable", "true");

    configurarEventosDoCard(card);

    return card;
}

// Configura os eventos do card
function configurarEventosDoCard(card) {
    card.addEventListener("dragstart", function () {
        card.classList.add("arrastando");
    });

    card.addEventListener("dragend", function () {
        card.classList.remove("arrastando");
    });

    card.addEventListener("dblclick", function () {
        if (card.parentElement && card.parentElement.id === "concluido") {
            alert("Não é possível alterar uma tarefa concluída");
            return;
        }

        const novoTexto = prompt("Editar tarefa:", card.textContent);

        if (novoTexto !== null && novoTexto.trim() !== "") {
            card.textContent = novoTexto.trim();
        }
    });
}

// Adiciona uma nova tarefa na coluna A Fazer
function adicionarTarefa() {
    const texto = inputTexto.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa para adicionar");
        return;
    }

    const novoCard = criarCard(texto);
    colunaAFazer.appendChild(novoCard);

    inputTexto.value = "";
    inputTexto.focus();
}

// Permite adicionar tarefa pressionando Enter
function configurarInputEnter() {
    inputTexto.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            adicionarTarefa();
        }
    });
}

// Configura o arrastar e soltar entre colunas
function configurarDragAndDrop() {
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
}

// Inicialização dos eventos principais
btnAdicionar.addEventListener("click", adicionarTarefa);
configurarInputEnter();
configurarDragAndDrop();