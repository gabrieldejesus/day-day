// cria os botões para excluir um item da lista de tarefas ( que já foram criadas via html)
const myNodeList = document.querySelectorAll("li");
myNodeList.forEach((_, index) => {
    let span = document.createElement("span");
    let iconDelete = document.createTextNode("X");
    span.className = "close";
    span.appendChild(iconDelete);
    myNodeList[index].appendChild(span);
});

// clicando no botão para excluir a tarefa da lista
const closesButton = document.querySelectorAll(".close");

closesButton.forEach((_, index) => {
    closesButton[index].onclick = function () {
        const div = this.parentElement;
        div.style.display = "none";
    };
});

// marca/desmarca a tarefa com feita quando clicar em algum item da lista
const todoList = document.querySelector("ul");
todoList.addEventListener(
    "click",
    function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
        }
    },
    false
);

// cria uma nova tarefa na lista de tarefas quando clicar no botão Adicionar ou pressionar ENTER no teclado
function addNewTodo(event) {
    if(event && event.keyCode !== 13) return;

    const li = document.createElement("li");
    const inputTodo = document.getElementById("inputTodo").value;
    let t = document.createTextNode(inputTodo);
    li.appendChild(t);

    if(inputTodo === "") {
        document.getElementById("alert").style.display = 'flex';
    } else {
        document.getElementById("alert").style.display = 'none';
        document.getElementById("ulTodo").appendChild(li);
    }

    document.getElementById("inputTodo").value = "";

    const span = document.createElement("span");
    const iconDelete = document.createTextNode("X");
    span.className = "close";
    span.appendChild(iconDelete);
    li.appendChild(span);

    span.onclick = function () {
        const div = this.parentElement;
        div.style.display = "none";
    };
}