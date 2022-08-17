import Project from "./projects";
import { createBoard, formatDigit} from "./upcoming";

window.onload = () => {
    editUserWindow();
    const qTask = document.querySelector(".default-proj");
    qTask.classList.add("selected-proj");

}

let selectedProject;
const DEFAULT_PROJECT = new Project("Quick Tasks") ;
export const projects = [DEFAULT_PROJECT];
selectedProject = DEFAULT_PROJECT;
let sideMenuOpen = false;

document.querySelector("#add-proj").addEventListener("click", addProjWindow)
document.querySelector("#add-task").addEventListener("click", addTaskWindow)
document.querySelector(".user-name").addEventListener("click", editUserWindow)
document.querySelector(".default-proj").addEventListener("click", selectProject)
document.querySelector("#delete-proj").addEventListener("click",deleteProjWIndow)
document.querySelector(".hamburger-cont").addEventListener("click", openSideMenu)


function openSideMenu(){
    const sideNav = document.querySelector(".project-dashb");
    if (!sideMenuOpen){
        document.querySelector(".hamburger-cont").classList.add("open");
        sideMenuOpen = true;
        sideNav.classList.add("open")
    } else {
        document.querySelector(".hamburger-cont").classList.remove("open");
        sideMenuOpen = false;
        sideNav.classList.remove("open")
    }
}


function showUpcoming(){
    const upComing = document.querySelector(".upcoming-dues");
    const navRightTitle = document.querySelector(".navright-title-cont")
    if (upComing.children.length > 1){       
        upComing.removeChild(navRightTitle.nextElementSibling);
    }
    upComing.appendChild(createBoard());

}

function addProjWindow(){
    const projWindow = document.createElement("div")
    projWindow.innerHTML = `
    <input id="project-name" placeholder="Project Name" type="text">
    <div>
        <button class="create-btn">Create </button>
        <button class="cancel-btn">Cancel</button>
    </div>
    `

    projWindow.classList.add("proj-window")

    const mainCont = document.querySelector(".main-cont");
    mainCont.appendChild(projWindow);
    const overlay = document.querySelector("#overlay");
    overlay.classList.add("active");

    document.querySelector(".create-btn").addEventListener("click", createProject);
    document.querySelector(".cancel-btn").addEventListener("click", closeProjWindow);

}

function createProject(){
    const projectName = document.querySelector("#project-name")
    if (projectName.value === "") return; 
    else{
        const newProject = new Project(projectName.value)
        projects.push(newProject);
    
        const projItem = document.createElement("li")
        projItem.classList.add("proj-item")
        projItem.textContent = newProject.title
    
        const projList = document.querySelector(".project-list");
        projList.appendChild(projItem); 
        closeProjWindow()


        document.querySelectorAll(".proj-item").forEach(item => item.addEventListener("click", selectProject))
    }
    showUpcoming();
    
}

function closeProjWindow(){
    const projWindow = document.querySelector(".proj-window")
    const overlay = document.querySelector("#overlay");
    projWindow.remove();
    overlay.classList.remove("active");


}

function selectProject(e){
    if (e.target.innerText !== "Quick Tasks"){
        const ulProject = e.path[1].children;
        const indexSelect = Array.from(ulProject).indexOf(e.target);
        selectedProject = projects[indexSelect+1];
        const titleHeader = document.querySelector(".title-header");
        titleHeader.innerText = `${e.target.innerText.toUpperCase()} Tasks`;
    } else { 
        selectedProject = DEFAULT_PROJECT;
        const titleHeader = document.querySelector(".title-header");
        titleHeader.innerText = `My Tasks`;
    
    }
    const projList = document.querySelector(".project-list");
    const qTask = document.querySelector(".default-proj");
    qTask.classList.remove("selected-proj");
    Array.from(projList.children).forEach( li => li.classList.remove("selected-proj"));

    e.target.classList.add("selected-proj");
    document.querySelector("tbody").innerHTML= "";
    selectedProject.taskToTable();   
    showUpcoming(); 
}


function addTaskWindow(){
    const taskWindow = document.createElement("div")
    taskWindow.innerHTML = `
    <input id="task-name" placeholder="Short task description here" type="text">
    <div class="wind-cont">
        <label for="priority-class">Priority Class</label>
        <label for="due-date">Due Date</label>
        <select name="priority-class" id="priority-class">
            <option value="Low">Low</option>
            <option value="Medium" selected>Medium</option>
            <option value="High">High</option>
        </select>
        <input id="due-date" type="date">
    </div>
    <div class="buttons-cont">
        <button class="create-btn">Add Task</button>
        <button class="cancel-btn">Cancel</button>
    </div>
    `

    taskWindow.classList.add("task-window")

    const mainCont = document.querySelector(".main-cont");
    mainCont.appendChild(taskWindow);
    const overlay = document.querySelector("#overlay");
    overlay.classList.add("active");
    const dateInput = document.querySelector("#due-date");
    const today = new Date()
    dateInput.value = `${today.getFullYear()}-${formatDigit(today.getMonth()+1)}-${formatDigit(today.getDate())}`

    document.querySelector(".create-btn").addEventListener("click", createTask);
    document.querySelector(".cancel-btn").addEventListener("click", closeTaskWindow);


}

function closeTaskWindow(){
    const taskWindow = document.querySelector(".task-window")
    const overlay = document.querySelector("#overlay");
    taskWindow.remove();
    overlay.classList.remove("active");

}

function createTask(){
    const taskName = document.querySelector("#task-name")
    const dueDate = document.querySelector("#due-date")
    const prioClass = document.querySelector("#priority-class")
    if (taskName.value === "" || dueDate.value === "" ) return; 
    else{
        selectedProject.addTask(taskName.value,dueDate.value,prioClass.value);
        document.querySelector("tbody").innerHTML = "";
        selectedProject.taskToTable();
        closeTaskWindow()
    }
    showUpcoming();


}

export function createDataRows(){
    const tRows = document.createElement("tr");
    return tRows
}

export function createData(data){
    const tData = document.createElement("td");
    tData.innerHTML = data;

    return tData
}

export function editTaskWindow(e){
    const taskItemNo = e.path[2].children[0].innerText
    const description = e.path[2].children[1].innerText
    const editTaskWindow = document.createElement("div")
    editTaskWindow.innerHTML = `
    <h2 class="item-no-title" data-value="${taskItemNo}">Task # ${taskItemNo}</h2>
    <input id="edit-task-name" value="${description}" type="text">
    <div class="wind-cont">
        <label for="edit-priority-class">Priority Class</label>
        <label for="edit-due-date">Due Date</label>
        <select name="edit-priority-class" id="edit-priority-class">
            <option value="Low">Low</option>
            <option value="Medium" selected>Medium</option>
            <option value="High">High</option>
        </select>
        <input id="edit-due-date" type="date">
    </div>
    <div class="buttons-cont">
        <button class="edit-btn">Save Edit</button>
        <button class="cancel-btn">Cancel</button>
    </div>
    `

    editTaskWindow.classList.add("task-window")

    const mainCont = document.querySelector(".main-cont");
    mainCont.appendChild(editTaskWindow);
    const overlay = document.querySelector("#overlay");
    overlay.classList.add("active");

    const editDueDate = document.querySelector("#edit-due-date")
    editDueDate.value = e.path[2].children[3].innerText

    document.querySelector(".edit-btn").addEventListener("click", editTask);
    document.querySelector(".cancel-btn").addEventListener("click", closeTaskWindow);


}

function editTask(e){
    const taskItemNo = document.querySelector(".item-no-title").getAttribute("data-value");
    const taskName = document.querySelector("#edit-task-name")
    const dueDate = document.querySelector("#edit-due-date")
    const prioClass = document.querySelector("#edit-priority-class")
    if (taskName.value === "" || dueDate.value === "" ) return; 
    else{
        const taskItem = e.path[3].children[1].children[1].children[1].children[taskItemNo-1].children;
        taskItem[1].innerHTML = taskName.value;
        taskItem[2].innerHTML = prioClass.value;
        taskItem[3].innerHTML = dueDate.value;

        selectedProject.taskList[taskItemNo-1].shortDesc = taskName.value;
        selectedProject.taskList[taskItemNo-1].dueDate = dueDate.value;
        selectedProject.taskList[taskItemNo-1].priorityClass = prioClass.value;
        
        showUpcoming();
        closeTaskWindow();        
    }
}   

export function removeTask(e){
    const taskItemNo = e.path[2].children[0].innerText;
    const taskItem = e.path[2];
    taskItem.remove();
    selectedProject.taskList.splice(taskItemNo-1,1);

    //Fixes the number Task Number in order after deleting items or task.
    const tableList = e.path[3].children
    for (let x of tableList ){
        x.children[0].innerText = Array.from(tableList).indexOf(x)+1;         
    }
    showUpcoming();
}

function editUserWindow(){
    const projWindow = document.createElement("div")
    projWindow.innerHTML = `
    <input id="edit-user-name" placeholder="Enter your name" type="text">
    <div>
        <button class="change-user-btn">Update</button>
        <button class="cancel-btn">Cancel</button>
    </div>
    `

    projWindow.classList.add("proj-window")

    const mainCont = document.querySelector(".main-cont");
    mainCont.appendChild(projWindow);
    const overlay = document.querySelector("#overlay");
    overlay.classList.add("active");

    document.querySelector(".change-user-btn").addEventListener("click", editUser);
    document.querySelector(".cancel-btn").addEventListener("click", closeProjWindow);


}

function editUser(){
    const userName = document.querySelector("#edit-user-name");
    if (userName.value === ""){
        return
    }else {
        const nameHolder = document.querySelector("#user");
        nameHolder.innerText = userName.value;
        showUpcoming();
        closeProjWindow();
    }

}

function deleteProjWIndow(){
    if (selectedProject !== DEFAULT_PROJECT  ) {
        const Window = document.createElement("div")
        Window.innerHTML = `
        <h3>Do you want to delete this Project?</h3>
        <div>
            <button class="delete-btn">Delete </button>
            <button class="cancel-btn">Cancel</button>
        </div>
        `
    
        Window.classList.add("proj-window")
    
        const mainCont = document.querySelector(".main-cont");
        mainCont.appendChild(Window);
        const overlay = document.querySelector("#overlay");
        overlay.classList.add("active");
    
        document.querySelector(".delete-btn").addEventListener("click", deleteProj);
        document.querySelector(".cancel-btn").addEventListener("click", closeProjWindow);

    } else return

}


function deleteProj(e){
    const pathToProjList = e.path[3].children[0].children[2].children 
    const indexToDelete = projects.indexOf(selectedProject);
    const toDeleteProjItem = pathToProjList[indexToDelete-1];
    toDeleteProjItem.remove();
    projects.splice(indexToDelete,1);
    
    closeProjWindow();


    //Select Default Project
    selectedProject = DEFAULT_PROJECT;
    const titleHeader = document.querySelector(".title-header");
    titleHeader.innerText = `My Tasks`;
    const qTask = document.querySelector(".default-proj");
    qTask.classList.add("selected-proj");
    document.querySelector("tbody").innerHTML= "";
    selectedProject.taskToTable();   
    showUpcoming(); 
}

