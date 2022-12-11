import DoTask from "./DoTask.js";
import Services from "./Services.js";

let services = new Services();
let doTask = [];
let doneTask = [];


let addTask = () => {
    let task = document.getElementById("newTask").value;
    if(task === ""){
        alert("Vui lòng nhập task");
    }
    else{
        let doTask = new DoTask(task);
        services.luuCongViec(doTask)
        .then(()=>{
            getTask();
            document.getElementById("newTask").value = '';
        });
    }
}

let getTask = () => {
    services.loadCongViec()
    .then((result)=>{
        chiaTask(result.data);
        hienThiAll();
    })
}
getTask();

let hienThiAll = () => {
    hienThiTasks(doTask, "do");
    hienThiTasks(doneTask, "done");
}

let chiaTask = (data) => {
    doTask = [];
    doneTask = [];
    for (const task of data) {
        if(task.status === "do"){
            doTask.push(task)
        }
        else{
            doneTask.push(task);
        }
    }
}
let hienThiTasks = (arr, type) => {
    let content = '';
    for (const task of arr) {
        content += `
        <li>
            <span>${task.description}</span>   
            <span>
                <a class="buttons" onclick="xoaTask('${task.id}')"><span class="remove"><i class="fa-solid fa-trash-can"></i></span></a> 
                <a class="buttons" onclick="moveDoneTask('${task.id}')"><span class="complete">${task.status == 'do' ? '<i class="fa-regular fa-circle-check"></i>' : '<i class="fa-solid fa-circle-check"></i>'}</span></a>
            </span>
        </li>
        `
    }
    if(type === "do"){
        document.querySelector("#todo").innerHTML = content;
    }
    else{
        document.querySelector("#completed").innerHTML = content;
    }
};

let moveDoneTask = (id) => {
    let task = doTask.findIndex((element)=>{
        return element.id === id;
    })

    doTask[task].status = "done";
    services.suaCongViec(doTask[task])
    .then(()=>{
        getTask();
    })
}

let xoaTask = (id) =>{
    services.xoaCongViec(id)
    .then(() => {
        getTask();
    })
}

let sortAtoZ = (tasks) => {
        tasks.sort((a, b) => {
            let x = a.description.toLowerCase();
            let y = b.description.toLowerCase();
            if(x<y) {return -1;}
            if(x>y) {return 1;}
        });
        hienThiTasks(doTask, "do");
}

let sortZtoA = (tasks) => {
    tasks.sort((a, b) => {
        let x = a.description.toLowerCase();
        let y = b.description.toLowerCase();
        if(x<y) {return 1;}
        if(x>y) {return -1;}
    });
    hienThiTasks(doTask, "do");
}

document.getElementById("three").onclick = function(){
    sortZtoA(doTask);
}

document.getElementById("two").onclick = function(){
    sortAtoZ(doTask);
}
document.getElementById("addItem").onclick = addTask;

window.xoaTask = xoaTask;
window.moveDoneTask = moveDoneTask;