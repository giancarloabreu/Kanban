console.log("JS carregado");

// Seleção dos elementos da página
const inputTexto = document.getElementById("textoCard");
const btnAdicionar = document.getElementById("btnAdicionar");
const colunaAFazer = document.getElementById("a-fazer");
const listas = document.querySelectorAll(".lista-cards");

// Cria um novo card com o texto informado
function criarCard(texto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = texto;

    // Torna o card arrastável no desktop
    card.setAttribute("draggable", "true");

    // Adiciona os eventos do card
    configurarEventosDoCard(card);

    return card;
}

// Edita o texto do card
function editarCard(card) {
    if (card.parentElement && card.parentElement.id === "concluido") {
        alert("Não é possível alterar uma tarefa concluída");
        return;
    }

    const novoTexto = prompt("Editar tarefa:", card.textContent);

    if (novoTexto !== null && novoTexto.trim() !== "") {
        card.textContent = novoTexto.trim();
    }
}

// Move o card para a coluna escolhida
function moverCard(card, destino) {
    const colunaDestino = document.getElementById(destino);

    if (colunaDestino) {
        colunaDestino.appendChild(card);
    }
}

// Abre menu de ações no mobile
function abrirMenuMobile(card) {
    const opcao = prompt(
        "Escolha uma opção:\n" +
        "1 - Mover para A Fazer\n" +
        "2 - Mover para Fazendo\n" +
        "3 - Mover para Concluído\n" +
        "4 - Editar tarefa"
    );

    if (opcao === "1") {
        moverCard(card, "a-fazer");
    } else if (opcao === "2") {
        moverCard(card, "fazendo");
    } else if (opcao === "3") {
        moverCard(card, "concluido");
    } else if (opcao === "4") {
        editarCard(card);
    }
}

// Configura todos os eventos relacionados ao card
function configurarEventosDoCard(card) {
    let tempoToque;

    // Evento ao começar a arrastar no desktop
    card.addEventListener("dragstart", function () {
        card.classList.add("arrastando");
    });

    // Evento ao finalizar o arraste no desktop
    card.addEventListener("dragend", function () {
        card.classList.remove("arrastando");
    });

    // Duplo clique para editar no desktop
    card.addEventListener("dblclick", function () {
        editarCard(card);
    });

    // Toque longo no mobile
    card.addEventListener("touchstart", function () {
        tempoToque = setTimeout(function () {
            abrirMenuMobile(card);
        }, 700);
    });

    // Cancela o toque longo se o usuário soltar antes
    card.addEventListener("touchend", function () {
        clearTimeout(tempoToque);
    });

    // Cancela se mover o dedo
    card.addEventListener("touchmove", function () {
        clearTimeout(tempoToque);
    });
}

// Adiciona uma nova tarefa na coluna "A Fazer"
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

// Configura o sistema de Drag and Drop entre colunas no desktop
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

// Inicialização do sistema
btnAdicionar.addEventListener("click", adicionarTarefa);
configurarInputEnter();
configurarDragAndDrop();