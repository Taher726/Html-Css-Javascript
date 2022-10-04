const hourArrow=document.querySelector(".hours");
const minuteArrow=document.querySelector(".minutes");
const secondArrow=document.querySelector(".seconds");
const timeEl=document.querySelector("h1");
const AmPmEl=document.querySelector("span");
const alarmTimesEl=document.querySelector(".alarm-times");
const selectMenu=document.querySelectorAll("select");
const alarmBtn=document.querySelector("button");

let alarmTime,isAlarmSet;
let sonnerie=new Audio("ringtone.mp3");

function updateClock(){
    const currentDate=new Date();
    setTimeout(updateClock, 1000);
    let hour=currentDate.getHours();
    let minute=currentDate.getMinutes();
    let second=currentDate.getSeconds();
    const hourDeg=(hour/12)*360;
    const minuteDeg=(minute/60)*360;
    const secondDeg=(second/60)*360;
    hourArrow.style.transform=`rotate(${hourDeg}deg)`;
    minuteArrow.style.transform=`rotate(${minuteDeg}deg)`;
    secondArrow.style.transform=`rotate(${secondDeg}deg)`;
    hour = (hour < 10) ? "0"+hour : hour;
    minute = (minute < 10) ? "0"+minute : minute;
    second = (second < 10) ? "0"+second : second;
    if(hour>=12){
        AmPmEl.value="PM";
    }
    else{
        AmPmEl.value="AM";
    }
    timeEl.innerText=`${hour}:${minute}:${second} ${AmPmEl.value}`;
    if(alarmTime== `${hour}:${minute} ${AmPmEl.value}`){
        sonnerie.play();
        sonnerie.loop=true;
    }
}

function options(){
    selectMenu[0].innerHTML=selectMenu[1].innerHTML=selectMenu[2].innerHTML="";
    selectMenu[0].innerHTML=`<option value="Hour" selected disabled hidden>Hour</option>`;
    for(let i=23;i>=0;i--){
        i=i<10?"0"+i:i;
        let option=`<option value="${i}">${i}</option>`;
        selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
    }
    selectMenu[1].innerHTML=`<option value="Minutes" selected disabled hidden>Minutes</option>`;
    for(let i=59;i>=0;i--){
        i=i<10?"0"+i:i;
        let option=`<option value="${i}">${i}</option>`;
        selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
    }
    selectMenu[2].innerHTML=`<option value="AM/PM" selected disabled hidden>AM/PM</option>`
    for(let i=2;i>0;i--){
        let ampm=i==1?"AM":"PM";
        let option=`<option value="${ampm}">${ampm}</option>`;
        selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option); 
    }
}

function setAlarm(){
    if(isAlarmSet){
        alarmTime="";
        sonnerie.pause();
        alarmTimesEl.classList.remove("disable");
        alarmBtn.innerHTML="Set Alarm";
        isAlarmSet=false;
        return options();
    }
    let time=`${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if(time.includes("Hour") || time.includes("Minutes") || time.includes("AM/PM")){
        return alert("Please, select a valid time to set alarm");
    }
    alarmTime=time;
    isAlarmSet=true;
    alarmTimesEl.classList.add("disable");
    alarmBtn.innerHTML="Clear Alarm";
}

options();
updateClock();
alarmBtn.addEventListener("click",setAlarm);