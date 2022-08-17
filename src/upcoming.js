import { createData, createDataRows, projects } from "./z-point"
import { startOfTomorrow, isThisISOWeek, getDay, parseISO } from "date-fns";



export function createBoard(){
    const list = document.createElement("ul");
    if (dueWhen("TODAY") !== undefined){
        list.appendChild(createTable("TODAY!!","TODAY"));
    } 
    if (dueWhen("TOMORROW") !== undefined){
        list.appendChild(createTable("Tomorrow","TOMORROW"));
    }
    if (dueWhen("THIS WEEK") !== undefined){
        list.appendChild(createTable("This Week","THIS WEEK"));
    }
    
    return list;

}

function createTable(title,when){
    const listItem = document.createElement("li");
    const div = document.createElement("div");
    const titleCont = document.createElement("h3");
    titleCont.textContent = title 
    titleCont.classList.add("title-cont");


    div.appendChild(titleCont);
    if (dueWhen(when) !== undefined){
        div.appendChild(dueWhen(when));
        listItem.appendChild(div);  
        return listItem;

    } else{
        return
    }

}

export function formatDigit(num){
    if (num < 10){
      return `0${num}`
    } else return num
}


function dueWhen(Due){
    const today = new Date()
    const tomorrow = startOfTomorrow();
    const formattedToday = `${today.getFullYear()}-${formatDigit(today.getMonth()+1)}-${formatDigit(today.getDate())}`
    const formattedTmrw = `${tomorrow.getFullYear()}-${formatDigit(tomorrow.getMonth()+1)}-${formatDigit(tomorrow.getDate())}`
    const dues = projects.map(proj => proj.taskList).flat();
    let dueDates;
    switch (Due) {
        case "TODAY":
            const dueToday = dues.filter(dates => dates.dueDate === formattedToday);
            dueDates = dueToday         
            break;
        case "TOMORROW":
            const dueTomorrow = dues.filter(dates => dates.dueDate === formattedTmrw);
            dueDates = dueTomorrow  
            break;

        case "THIS WEEK":
            const dueThisWeek = dues.filter( (dates) => { return isThisISOWeek(parseISO(dates.dueDate)) === true && getDay(parseISO(dates.dueDate)) > getDay(tomorrow) });
            dueDates = dueThisWeek
    }
    const table = document.createElement("table");
    if (dueDates.length === 0){
        return undefined
    } else {
        for (let x in dueDates) {    
            const newRow = createDataRows()
            newRow.appendChild(createData(dueDates[x].shortDesc)) //task name
            newRow.appendChild(createData(dueDates[x].priorityClass)) //priorityClass    
            newRow.classList.add("due-data-rows")    
            table.appendChild(newRow);
        }

        table.classList.add("due-table")
        return table;
    }
}





