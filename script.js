const dateEle = document.getElementById("date");
const timeEle = document.getElementById("time");
const droppableElements = document.querySelectorAll("main>div>div");
const dragElement = document.getElementById("123");
const modal = document.getElementById("modal");
const form = document.querySelector("#modal>form");
// this parent variable is initialised to know whose the parent of new task
// it can be to-do,in-progress,finished
let parent;
// id parameter is to set unique id for each new task
let id = 0;




window.onload = renderDateAndTime();

// adding drop event to to-do,in-progress,finished
droppableElements.forEach((element)=>{
    //this step is important
    //without this drop event listener wont work
    element.addEventListener("dragover",(event)=>{
        event.preventDefault();
    });
    element.addEventListener("drop",(event)=>{
       //we set dataTransfer id to each dragged element on their drag start
       // this makes it possible to uniquely recognise them during drop
        const droppedElementId = event.dataTransfer.getData("id");
        const droppedElement = document.getElementById(droppedElementId);
        if(element.id==="to-do-div")droppedElement.style.backgroundImage='linear-gradient(0deg, rgba(92,233,165,1) 26%, rgba(96,197,232,1) 100%)';
        if(element.id==="in-progress-div")droppedElement.style.backgroundImage='linear-gradient(0deg, rgba(240,255,2,1) 30%, rgba(231,232,96,1) 57%)';
        if(element.id==="finished-div")droppedElement.style.backgroundImage='linear-gradient(0deg, rgba(23,255,2,1) 15%, rgba(10,170,20,1) 100%)';
        
        element.prepend(droppedElement);
    })

});

// logic to add new task
// parent will be to-do/in-progress/finished
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    
    let newTask = document.createElement("div");
    newTask.classList.add("centered-text", "d-flex", "justify-content-around", "align-items-center", "flex-wrap");
    newTask.draggable=true;
    //setting unique id
    newTask.id=id;
    id++;
    newTask.innerHTML=` <div>${form["new-task"].value}</div>
    <img src="./assets/delete.png" alt="" onclick="deleteTask(this)" draggable="false">`;
    form["new-task"].value = '';
    
    newTask.addEventListener("dragstart",(event)=>{

         // this step is important for drop event to perform correctly
        const elementId = event.target.id;
        event.dataTransfer.setData("id",elementId);
        
    
    });
  
   if(parent.id==="to-do-div")newTask.style.backgroundImage=`linear-gradient(0deg, rgba(92,233,165,1) 26%, rgba(96,197,232,1) 100%)`;
    else if(parent.id==="in-progress-div")newTask.style.backgroundImage=`linear-gradient(0deg, rgba(240,255,2,1) 30%, rgba(231,232,96,1) 57%)`;
    else newTask.style.backgroundImage=`linear-gradient(0deg, rgba(23,255,2,1) 15%, rgba(10,170,20,1) 100%)`;
    // appending the child
   parent.prepend(newTask);
    
});





function deleteTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
}





function renderDateAndTime(){
    let currDate = new Date();
    dateEle.innerHTML=currDate.toDateString().toUpperCase();
    timeEle.innerHTML=currDate.toLocaleTimeString().toLocaleUpperCase();

    setTimeout(()=>{
        renderDateAndTime();
    },500);
}

//we set parent here so that the new task is added to the right box
function addNewTask(element){
     parent = element.parentNode.parentNode;
    modal.style.top="15%";
   
}

function closeModal(){
    modal.style.top="-170px";
}

