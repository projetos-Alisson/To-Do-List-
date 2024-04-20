// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

//Funções
const saveTodo = (text) => {

    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text //texto que a funcao saveTodo pegou
    todo.appendChild(todoTitle)
  // console.log(todo);

  const doneBtn = document.createElement("button")
  doneBtn.classList.add("finish-todo")
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
  todo.appendChild(doneBtn)
   
  //Botões
  const editBtn = document.createElement("button")
  editBtn.classList.add("edit-todo")
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
  todo.appendChild(editBtn)

  const deleteBtn = document.createElement("button")
  deleteBtn.classList.add("remove-todo")
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
  todo.appendChild(deleteBtn)

  todoList.appendChild(todo)
  
  todoInput.value= ""; //O TEXTO DA TAREFA SOME AO ADICIONAR A TAREFA
  todoInput.focus(); //O FOCO DO CAMPO DE TEXTO PERMANECE NO MESMO LUGAR SEM TER A NECESSIDADE DE CLICLAR DE NOVO PARA ADD UMA NOVA TAREFA
}

const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {

    let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerHTML = text
        }
})

}

//Eventos 

todoForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    //console.log("Enviou form")
    const inputValue = todoInput.value

    if(inputValue){ //A funcao savetodo pega o valor do input
        saveTodo(inputValue)
    }
})

//Finalizar tarefa
document.addEventListener("click", (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let todoTitle
    
    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done") 
    }
//Excluir tarefa
    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove()
    }
//Editar tarefa   
    if (targetEl.classList.contains("edit-todo")) {
        toggleForms()

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
})

//Cancelar Edição 
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault()

    toggleForms()
})


//Atualizar Edição
editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue)
    }

    toggleForms()
})