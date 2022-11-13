const todoList = document.querySelector(".todo-list");
const todoItem = document.querySelector(".todo-item");
const todoInput = document.querySelector("#add-input")
const form = document.querySelector(".todo-form");
const sortIcon = document.querySelector("#sort-icon")
const deleteIcon = document.querySelector("#delete-all-todo-icon")

eventListener();

function eventListener(){
    form.addEventListener("submit",addTodo);
    todoList.addEventListener("click",deleteTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodos);
    sortIcon.addEventListener("click",sortTodos);
    deleteIcon.addEventListener("click",deleteAllTodos);
    todoInput.addEventListener("keyup",searchTodo);

    
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    if(newTodo === ""){
        showAlert("Xahiş edirik todo daxil edin.","danger")
    }
    else{
        addTodoToUİ(newTodo);
        addTodoToStorage(newTodo)
        showAlert("Todo əlavə olundu!","success")
    }
   
    e.preventDefault()
}
function showAlert(message,type){
    const alert = document.createElement("div");
    alert.className = `alert ${type}`;
    alert.textContent = message;
    todoList.appendChild(alert)
    
    setTimeout(()=>{
        alert.remove()
    },1000)
}

function addTodoToUİ(newTodo){
    const todo = document.createElement("div");
//       <div class="todo-item">
//     <input type="text" class="todo-input">
//     <i class="fa-solid fa-check done-icon"></i>
//     <i class="fa-solid fa-x delete-icon" ></i>
// </div>
  todo.className = "todo-item";
  todo.innerHTML = `
  <input type="text" class="todo-input" value="${newTodo}">
  <i class="fa-solid fa-check done-icon" id="done-icon"></i>
  <i class="fa-solid fa-x delete-icon" id="delete-icon"></i>
  `
  todoList.appendChild(todo);
   todoInput.value = "";
}

function deleteTodo(e){
    // Delete Todo
   if(e.target.id === "delete-icon"){
   if(confirm("Silmək istədiyinizə əminsiniz?")){
    e.target.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.firstElementChild.value)
    showAlert("Todo silindi!","success")
}
   }

//    Done Todo
    if(e.target.id === "done-icon"){
        console.log(e.target.parentElement.firstElementChild)
    e.target.parentElement.firstElementChild.classList.toggle("done");
    e.target.classList.toggle("success")
}
}

 function sortTodos(){//Sort todos-reverse
    sortIcon.classList.toggle("fa-arrow-up-wide-short")
    let todos = getTodosFromStorage();
    let sortTodos = todos.reverse();
    todoList.innerHTML = "";
    sortTodos.forEach((todo)=>{
   addTodoToUİ(todo)
})
console.log(todos,sortTodos)
localStorage.setItem("todos",JSON.stringify(sortTodos))
 }

function deleteAllTodos(){
    if(todoList.innerHTML != ""){
    if(confirm("Bütün todoları silmək istədiyinizə əminsiniz?")){
        todoList.innerHTML = "";
        let todos = [];
        localStorage.setItem("todos",JSON.stringify(todos))
    }}
 }

// STORAGE ACTIONS
function getTodosFromStorage(){//Todolari Storageden almaq
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}

function addTodoToStorage(newTodo){ //Todo'lari Storage'e elave etmek
    let todos = getTodosFromStorage();

    todos.push(newTodo);
    
    
    localStorage.setItem("todos",JSON.stringify(todos))

}

function loadAllTodos(){//Sehife yuklenende butun todolari seyfeye yuklemek
    let todos = getTodosFromStorage();

    todos.forEach(todo => {
        addTodoToUİ(todo)
    });
}

function deleteTodoFromStorage(deletetodo){
 let todos = getTodosFromStorage();

 todos.forEach((todo,index)=>{
  if(deletetodo === todo){
   todos.splice(index,1)
  }
 })
localStorage.setItem("todos",JSON.stringify(todos))

}
// Drag
const sortable = Sortable.create(todoList,{
    animation:200,
    ghostClass:"myghostclass",
    dragClass:"sortable-drag"
})

