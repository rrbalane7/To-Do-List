import task from "./task"
import { createDataRows, createData, editTaskWindow, removeTask } from "./z-point";


export default class Project{
    constructor(title,taskList =[]){
        this.title = title,
        this.taskList = taskList
    }

    addTask(shortDesc,dueDate, priorityClass){
        const added = task(shortDesc,dueDate,priorityClass);
        this.taskList.push(added);

    }

    taskToTable(){
        for (let x of this.taskList){
            const index = this.taskList.indexOf(x)
            const newRow = createDataRows()
            newRow.appendChild(createData(index+1))
            newRow.appendChild(createData(this.taskList[index].shortDesc))
            newRow.appendChild(createData(this.taskList[index].priorityClass))
            newRow.appendChild(createData(this.taskList[index].dueDate))
            newRow.appendChild(createData(`<input type="checkbox" name="status-complete" class="status-complete">`))
            newRow.appendChild(createData(`<img class="edit-window-btn" src="/edit-svgrepo-com.svg" alt="edit">
            <img class="remove-btn" src="/trash-svgrepo-com.svg" alt="delete">`))
            const tBody = document.querySelector("tbody");
            tBody.appendChild(newRow);

            document.querySelectorAll(".edit-window-btn").forEach( btn => btn.addEventListener("click", editTaskWindow))
            document.querySelectorAll(".remove-btn").forEach(btn => btn.addEventListener("click", removeTask))
            
        }
    }

}



