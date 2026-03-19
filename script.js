console.log("JS carregado"); // Verifica se o script está funcionando

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

    // Torna o card arrastável (Drag and Drop API)
    card.setAttribute("draggable", "true");

    // Adiciona os eventos do card
    configurarEventosDoCard(card);

    return card;
}

// Configura todos os eventos relacionados ao card
function configurarEventosDoCard(card) {

    // Evento ao começar a arrastar
    card.addEventListener("dragstart", function () {
        card.classList.add("arrastando");
    });

    // Evento ao finalizar o arraste
    card.addEventListener("dragend", function () {
        card.classList.remove("arrastando");
    });

    // Evento de duplo clique para editar o texto
    card.addEventListener("dblclick", function () {

        // Impede edição se estiver na coluna concluído
        if (card.parentElement && card.parentElement.id === "concluido") {
            alert("Não é possível alterar uma tarefa concluída");
            return;
        }

        // Solicita novo texto ao usuário
        const novoTexto = prompt("Editar tarefa:", card.textContent);

        // Atualiza o conteúdo se válido
        if (novoTexto !== null && novoTexto.trim() !== "") {
            card.textContent = novoTexto.trim();
        }
    });
}

// Adiciona uma nova tarefa na coluna "A Fazer"
function adicionarTarefa() {
    const texto = inputTexto.value.trim();

    // Validação para evitar tarefas vazias
    if (texto === "") {
        alert("Digite uma tarefa para adicionar");
        return;
    }

    // Cria e adiciona o card
    const novoCard = criarCard(texto);
    colunaAFazer.appendChild(novoCard);

    // Limpa o input
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

// Configura o sistema de Drag and Drop entre colunas
function configurarDragAndDrop() {
    listas.forEach(function (lista) {

        // Permite soltar o elemento
        lista.addEventListener("dragover", function (evento) {
            evento.preventDefault();
        });

        // Move o card para a nova coluna
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