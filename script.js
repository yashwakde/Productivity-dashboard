function openfeatures() {
  var all = document.querySelectorAll(".elem");
  var fullall = document.querySelectorAll(".fullelem");
  var fullallbtn = document.querySelectorAll(".fullelem .back");

  all.forEach((elem) => {
    elem.addEventListener("click", () => {
      // console.log(elem)

      fullall[elem.id].style.display = "block";
    });
  });

  fullallbtn.forEach((back) => {
    back.addEventListener("click", function () {
      fullall[back.id].style.display = "none";
    });
  });
}

openfeatures();

function todolist() {
  let form = document.querySelector(".addtask form");
  let taskInput = document.querySelector(".addtask form #task-input");
  let textareaInput = document.querySelector(".addtask form textarea");
  let taskcheckbox = document.querySelector(".addtask form #check");

  var currenttask = [];

  if (localStorage.getItem("currentTask")) {
    currenttask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("task is empty");
  }

  function rendertask() {
    let alltask = document.querySelector(".alltask");
    let sum = "";
    currenttask.forEach((elem, idx) => {
      sum += `<div class="task">
              <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
              <button id=${idx}>Mark as Completed !</button>
            
            </div>`;
    });

    alltask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currenttask));
    document.querySelectorAll(".task button").forEach((btn) => {
      btn.addEventListener("click", () => {
        currenttask.splice(btn.id, 1);
        rendertask();
      });
    });
  }
  rendertask();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // console.log(taskInput.value);
    // console.log(textareaInput.value);
    // console.log(taskcheckbox.checked);

    currenttask.push({
      task: taskInput.value,
      detail: textareaInput.value,
      imp: taskcheckbox.checked,
    });

    rendertask();
    taskInput.value = "";
    textareaInput.value = "";
    taskcheckbox.checked = false;
  });
}
  todolist();

function dailplanner() {
  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  var dayplanner = document.querySelector(".day-planner");

  var hours = Array.from({ length: 18 }, (_, idx) => {
    return `${6 + idx}:00 - ${7 + idx}:00`;
  });

  var wholedaysum = "";
  hours.forEach((elem, idx) => {
    var saveddata = dayPlanData[idx] || "";
    wholedaysum += `<div class="day-planner-timer">

            <p>${elem}</p>
             <h5>Day-${idx + 1}</h5>
            <input id=${idx} type="text" placeholder=".." value=${saveddata}>
          </div>`;
  });

  dayplanner.innerHTML = wholedaysum;
  var dailyplannerInput = document.querySelectorAll(".day-planner input");

  dailyplannerInput.forEach((elem) => {
    elem.addEventListener("input", () => {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailplanner();

function motivation() {
  let motivationwarpper = document.querySelector(".motivation-wrapper");

  let response = fetch("https://thequoteshub.com/api/").then((data) =>
    data.json()
  );
  response.then((res) => showdta(res));

  function showdta(data) {
  
    motivationwarpper.innerHTML = ` 
                 <img src="./icons8-quotes-50.png" alt="">
              <div class="motivation1">
                <h2>Quotes of the day</h2>
              </div>
               <div class="motivation2">
                <p>${data.text}</p>
              </div>

              <div class="motivation3">
                <h2>${data.author}</h2>
              </div>`;
  }
}

motivation();

function pomodoro(){
  let breakSession = document.querySelector(".pomodorofullpage .session");

let start = document.querySelector(".start-timer");
let pause = document.querySelector(".pause-timer");
let reset = document.querySelector(".reset-timer");
let timer = document.querySelector(".pomo-timer h3");
let totalseconds = 25*60;
let timeInterval = null;
let isworksession = true;
function updatetime() {
  let min = Math.floor(totalseconds / 60);
  let second = totalseconds % 60;
  timer.innerHTML = `${String(min).padStart("2", "0")}:${String(
    second
  ).padStart("2", "0")}`;
}

function starttimer() {
  clearInterval(timeInterval);

  if (isworksession) {
  
    timeInterval = setInterval(() => {
      if (totalseconds > 0) {
        totalseconds--;
          updatetime();
      } else {
        isworksession = false;
        clearInterval(timeInterval);
      timer.innerHTML ="05:00"
      breakSession.innerHTML="break Session";
         breakSession.style.backgroundColor="red";
         totalseconds = 5 * 60;
      }
     
    }, 1000);
  } else {
        breakSession.innerHTML="Break Session";

    
    timeInterval = setInterval(() => {
      if (totalseconds > 0) {
        totalseconds--;
        updatetime();
      } else {
        isworksession = true;
        clearInterval(timeInterval);
       timer.innerHTML = "25:00"
         breakSession.innerHTML="Work Session";
         breakSession.style.backgroundColor="green"
         
         totalseconds = 25 * 60;
      }
      
    }, 1000);
  }
}

function pausetimer() {
  clearInterval(timeInterval);
}

function resettimer() {
  clearInterval(timeInterval);
  totalseconds = 25*60;
  updatetime();
}

start.addEventListener("click", function () {
  starttimer();
});

pause.addEventListener("click", pausetimer);
reset.addEventListener("click", resettimer);

}

pomodoro();

function goal(){
  const form = document.getElementById("goal-form");
const input = document.getElementById("goal-input");
const goalsList = document.getElementById("goals-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const goalText = input.value.trim();
  if (goalText !== "") {
    addGoal(goalText);
    input.value = "";
  }
});

function addGoal(text) {
  const goalItem = document.createElement("div");
  goalItem.className = "goal-item";

  goalItem.innerHTML = `
    <div class="goal-left">
      <input type="checkbox" class="goal-check">
      <span>${text}</span>
    </div>
    <button class="delete-btn"><i class="ri-delete-bin-6-line"></i></button>
  `;

  // Checkbox functionality
  goalItem.querySelector(".goal-check").addEventListener("change", (e) => {
    goalItem.classList.toggle("completed");
  });

  // Delete functionality
  goalItem.querySelector(".delete-btn").addEventListener("click", () => {
    goalItem.remove();
  });

  goalsList.appendChild(goalItem);
}


}

goal();

function weathertheme(){
  
function weatherfunctionality(){
  
var header1h1 = document.querySelector(".header1 h1")
var header1h2 = document.querySelector(".header1 h2");
var header2temp = document.querySelector(".header2 h2");

var header2humidi = document.querySelector(".humidity");
var header2press = document.querySelector(".wind");

var header2weather = document.querySelector(".weather");

 let apikey ='149cae0ec186da5ae86778db62d67a32';
 let city="bhopal";


 var  data = null;

async function weathercall(){
  let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
  data = await response.json();

 header2temp.innerHTML=`${data.main.temp}°C`

  header2humidi.innerHTML=`humidity: ${data.main.humidity}`
   header2press.innerHTML=`wind: ${data.wind.speed}km/h`;
   header2weather.innerHTML=`weather:${data.weather[0].main}`
}
weathercall();

var date = null;

function timeDate(){
  const totaldaysofweek =['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const totalMonthsofYear = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

  const
  date= new Date();
    var daysofweek= totaldaysofweek[date.getDay()];
    var  yearofmonth = totalMonthsofYear[date.getMonth()];
    var hour = date.getHours();
     var min = date.getMinutes();
     var noon = hour>=12?"PM":"AM";
     var second = date.getSeconds();
   
 header1h1.innerHTML=`${daysofweek} ${String(hour).padStart("2","0")}:${String(min).padStart("2","0")}:${String(second).padStart("2","0")} ${noon}`
 header1h2.innerHTML=`${date.getDate()} ${yearofmonth} ${date.getFullYear()}`
}



setInterval(()=>{timeDate()},1000);




}

weatherfunctionality();
let flag=0;
var theme = document.querySelector(".theme");
var root = document.documentElement;
theme.addEventListener("click",()=>{
 if(flag ==0){
root.style.setProperty('--one','#F8F4E1');
root.style.setProperty('--two','#222831');
root.style.setProperty('--three','#948979');
root.style.setProperty('--four',"#CEEC97");
flag=1;
 }else if(flag==1){
root.style.setProperty('--one','#F8F4E1');
root.style.setProperty('--two','#222831');
root.style.setProperty('--three','#948979');
root.style.setProperty('--four',"#B3001B");
flag=2;
 }else if(flag==2){
root.style.setProperty('--one','#F8F4E1');
root.style.setProperty('--two','#222831');
root.style.setProperty('--three','#948979');
root.style.setProperty('--four',"#0CCA4A");
flag=0;
 }


  
})
}


weathertheme();