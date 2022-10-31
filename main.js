let currentDate = new Date();
let date = currentDate.getDate();
let month = currentDate.getMonth()+1;
let year = currentDate.getFullYear();
document.querySelector("#time").innerHTML =`${date}/${month}/${year}`
const tasks = document.querySelectorAll(".task");
const allStatus = document.querySelectorAll(".status");
const backlog = document.querySelector("#backlog")
let draggableTask = null;
tasks.forEach(task => {
    task.addEventListener("dragstart", dragStart);
    task.addEventListener("dragend", dragEnd);
})

function dragStart() {
    draggableTask = this;
    setTimeout(() => {
        this.style.display = "none"
    },0)
}

function dragEnd() {
    draggableTask = null;
    setTimeout(() => {
        this.style.display = "flex"
    },0)
}

allStatus.forEach(status => {
    status.addEventListener("dragover", dragOver);
    status.addEventListener("drop", dragDrop);
})

function dragOver(e) {
    e.preventDefault()
}
function dragDrop() {
    this.appendChild(draggableTask)
}


// modal
const btn = document.querySelectorAll("[data-target-modal]");
const closeModal = document.querySelectorAll(".close-modal");
const overlay = document.querySelector("#overlay");

btn.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector(btn.dataset.targetModal).classList.add("active");
        overlay.classList.add("active")
    })
})

closeModal.forEach(btnClose => {
    btnClose.addEventListener('click', () => {
        const modal = btnClose.closest(".modal");
        modal.classList.remove("active");
        overlay.classList.remove("active")
    })
})

window.addEventListener('click', (event) => {
    if(event.target == overlay) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach(modal => {
            modal.classList.remove("active")
        })
        overlay.classList.remove("active")
    }
})

// add new task
const btn_addNewTask = document.querySelector("#task_submit");
const inputNewTask = document.querySelector("#task_input");
inputNewTask.addEventListener('input', () => {
    let value = inputNewTask.value.trim();
    if(value !== "" && value.length > 0) {
        btn_addNewTask.removeAttribute("disabled");
        btn_addNewTask.addEventListener('click', addNewTask);
    }
})
function addNewTask() {
    const task_div = document.createElement("div");
    task_div.classList.add("task");
    task_div.setAttribute("draggable","true")
    let task = inputNewTask.value.trim();
    if(task.length >= 20) {
        task = task.slice(0,17) +"..."
    }
    const nameTask = document.createElement("span")
    nameTask.classList.add("nameTask");
    nameTask.textContent = task;
    const btnClose = document.createElement("span");
    btnClose.classList.add("close");
    const span_txt = document.createTextNode("\u00D7");
    btnClose.appendChild(span_txt);
    task_div.appendChild(nameTask);
    task_div.appendChild(btnClose);
    backlog.appendChild(task_div);
    inputNewTask.value =""
    btnClose.addEventListener('click', () => {
        btnClose.parentNode.style.display = "none"
    })
    btn_addNewTask.closest(".modal").classList.remove("active");
    overlay.classList.remove("active");
    btn_addNewTask.setAttribute("disabled","");
    task_div.addEventListener("dragstart", dragStart);
    task_div.addEventListener("dragend", dragEnd);

}