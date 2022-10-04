const reglebtn=document.querySelector(".regle");
const containerEl=document.querySelector(".container");
const regleEl=document.querySelector(".regles");
const closebtn=document.querySelector(".close-icon");
const inputEl=document.querySelectorAll("#number");
const submitBtn=document.querySelector(".submit");
const tableEl=document.querySelector("table");
const bodyEl=document.querySelector("tbody");
const relodeBtn=document.querySelector(".relode");
const finishEl=document.querySelector(".finish");
const congratWord=document.querySelector(".word");

reglebtn.addEventListener("click",()=>{
    containerEl.classList.add("active");
    regleEl.classList.remove("active");
})
closebtn.addEventListener("click",()=>{
    containerEl.classList.remove("active");
    regleEl.classList.add("active");
})
const randomNumber=chooseRandomNumber();
submitBtn.addEventListener("click",()=>{
    let progres=false;
    let arr=[];
    inputEl.forEach((input)=>{
        arr.push(+input.value);
    })
    for(let input in inputEl){
        const inputValue=inputEl[input].value;
        if(inputValue==""){
            alert("Please Feel all the inputs");
            inputEl.forEach((input)=>{
                input.value="";
            })
            break
        }
        else if(inputValue>9){
            alert("Please Enter one digit");
            inputEl.forEach((input)=>{
                input.value="";
            })
            break
        }
        else if(noRepet(arr)){
            alert("Please dont duplicate digits")
            inputEl.forEach((input)=>{
                input.value="";
            })
            break
        }
        progres=true
    }
    if(progres){
        console.log(arr)
        console.log(randomNumber);
        const bull_cow=numOfVacheTaureau(arr,randomNumber)
        console.log(`${bull_cow[0]} Vache, ${bull_cow[1]} Taureau`);
        if(tableEl.classList.contains("hidden")){
            tableEl.classList.remove("hidden");
        }
        var cell=document.createElement("tr");
        var myNum=document.createElement("td");
        var guess=document.createElement("td");
        myNum.innerText=`${arr.join("")}`;
        guess.innerText=`${bull_cow[0]} V, ${bull_cow[1]} T`;
        cell.appendChild(myNum);
        cell.appendChild(guess);
        bodyEl.appendChild(cell)
        if(bull_cow[0]==4){
            congratWord.innerText=`Congrats You win !! The number was ${randomNumber.join("")}`
            finishEl.classList.remove("active");
            containerEl.classList.add("active");
            relodeBtn.addEventListener("click",()=>{
                location.reload();
            })
        }
        inputEl.forEach((input)=>{
            input.value="";
        });
    }
})
function noRepet(num){
    const setNum=new Set(num);
    if(num.length!=setNum.size){
        return true
    }
    return false
}
function chooseRandomNumber(){
    const numbers="0123456789";
    while (true){
        let numberArray=[];
        for(let i=0;i<4;i++){
            numberArray.push(Math.floor(Math.random()*numbers.length))
        }
        if(!noRepet(numberArray) && numberArray.length==4){
            return numberArray;
        }
    }
}
function numOfVacheTaureau(num,guess){
    let vache_taureau=[0,0];
    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    let i;
    let arr=zip(num,guess)
    for(i in arr){
        if(num.includes(arr[i][1])){
            if(arr[i][1]===arr[i][0]){
                vache_taureau[0]+=1;
            }
            else{
                vache_taureau[1]+=1;
            }
        }
    }
    return vache_taureau;
}
/*console.log(numOfVacheTaureau([1,4,3],[1,3,5]));*/