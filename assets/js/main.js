window.onload = function () {
    createInput();
}

//Creamos el input para las tareas
function createInput() {
    var sectionNewList = document.getElementById("newList");
    var divNewList = document.createElement("div");
    divNewList.classList.add("divNewList");
    var inputNewList = document.createElement("input");
    inputNewList.setAttribute("placeholder", "Añadir una lista...");
    inputNewList.setAttribute("id", "inputNewList");
    inputNewList.classList.add("inputNewList");
    inputNewList.onclick = function () {
        showOptionsList(this);
    }
    divNewList.appendChild(inputNewList);
    sectionNewList.appendChild(divNewList);
}
//Función que muestra las opciones de guardar y cancelar
function showOptionsList(e) {
    //Cambiamos la clase
    e.classList.remove("inputNewList:hover");
    e.classList.add("inputEditList");
    var divNewList = e.parentNode;
    divNewList.classList.add("editList");
    //Creamos un div para los botones
    var divBtnsList = document.createElement("div");
    //Creamos los botones
    if (document.getElementById("btnGuardar") == undefined) {
        var btnGuardar = document.createElement("button");
        var btnGuardarText = document.createTextNode("Guardar");
        btnGuardar.setAttribute("id", "btnGuardar");
        btnGuardar.appendChild(btnGuardarText);
        btnGuardar.classList.add("btnGreen");
        divBtnsList.appendChild(btnGuardar);
        btnGuardar.onclick = function () {
            guardarList();
        }
    }
    if (document.getElementById("btnCancelar") == undefined) {
        var btnCancelar = document.createElement("button");
        var btnCancelarText = document.createTextNode("X");
        btnCancelar.setAttribute("id", "btnCancelar");
        btnCancelar.appendChild(btnCancelarText);
        btnCancelar.classList.add("btnGray");
        divBtnsList.appendChild(btnCancelar);
        btnCancelar.onclick = function () {
            cancelar(this);
            limpiarInput();
        }
        divNewList.appendChild(divBtnsList);
    }
}

function guardarList() {
    //Traemos la sección
    var sectionList = document.getElementById("list");
    //Creamos un div para cada tarea
    var divList = document.createElement("div");
    divList.classList.add("list");
    //Nombre de la lista
    var input = document.getElementById("inputNewList");
    var text = input.value;
    if(text != ""){
        var nameList = document.createElement("h3");
        var nameListText = document.createTextNode(text);
        nameList.appendChild(nameListText);
        nameList.classList.add("titleList");
        nameList.setAttribute("contentEditable", "true");
        //Input para otra agregar tarjetas
        var task = document.createElement("input");
        task.setAttribute("placeholder", "Añadir una tarjeta...");
        task.setAttribute("id", "task");
        task.classList.add("inputTask");
        task.onclick = function () {
            showOptionsTask(this);
        }
        task.onfocus = function () {
            task.removeAttribute("placeholder");
            task.classList.add("taskWrite");
        }
        //Anidamos
        divList.appendChild(nameList);
        divList.appendChild(task);
        sectionList.appendChild(divList);
    } 
    //Para igualar a las funcionalidades de Trello
    var nextInput = document.getElementById("inputNewList");
    nextInput.click();
    nextInput.value = "";
    nextInput.focus();
}

//Función para poder limpiar el input y quede la tarea libre
function limpiarInput() {
    var input = document.getElementById("inputNewList");
    input.classList.remove("inputEditList");
    input.parentNode.classList.remove("editList");
    input.value = "";
}
//Función cancelar 
function cancelar(e) {
    var divBtnsList = e.parentNode.remove(e);
}

//Función para añadir botones 
function showOptionsTask(e) {
    var divList = e.parentNode; 
    //Creamos un div para los botones
    var divBtnsTask = document.createElement("div");
    divBtnsTask.setAttribute("id", "divBtnsTask");
    //Creamos los botones
    if (document.getElementById("btnAddTask") == undefined) {
        var btnAddTask = document.createElement("button");
        var btnAddTaskText = document.createTextNode("Añadir");
        btnAddTask.appendChild(btnAddTaskText);
        btnAddTask.setAttribute("id", "btnAddTask");
        btnAddTask.classList.add("btnGreen");
        divBtnsTask.appendChild(btnAddTask);
        btnAddTask.onclick = function () {
            addTask(this);
        }
    }
    if (document.getElementById("btnCancelAdd") == undefined) {
        var btnCancelAdd = document.createElement("button");
        var btnCancelAddText = document.createTextNode("X");
        btnCancelAdd.appendChild(btnCancelAddText);
        btnCancelAdd.setAttribute("id", "btnCancelAdd");
        btnCancelAdd.classList.add("btnGray");
        divBtnsTask.appendChild(btnCancelAdd);
        btnCancelAdd.onclick = function () {
            cancelAddTask(this);
        }
        divList.appendChild(divBtnsTask);
    }
}

function addTask(e) {
    var divAbuelo = e.parentNode.parentNode;
    //Traemos el input actual
    var task = divAbuelo.lastElementChild.previousElementSibling;
    //Creamos los divs para las tareas
    var divTask = document.createElement("div");
    divTask.classList.add("divTask");
    divTask.setAttribute("contenteditable", "true");
    var nameTask = task.value;
    if (nameTask != "") {
        var divTaskText = document.createTextNode(nameTask);
        divTask.appendChild(divTaskText);
        divAbuelo.insertBefore(divTask, task);
        //Limpiamos
        task.value = "";
    }
    task.focus();
}

function cancelAddTask(e) {
    //Traemos los divs necesarios, tanto de los botones como donde los contienen
    var divList = e.parentNode.parentNode;
    var divBtnsTask = e.parentNode;
    var task = divList.lastElementChild.previousElementSibling;
    task.classList.remove("taskWrite");
    task.setAttribute("placeholder", "Añadir una tarjeta...");
    task.value = "";
    //Eliminamos el hijo 
    divList.removeChild(divBtnsTask);
}