let words = [
    {
        word: "addition",
        hint: "The process of adding numbers"
    },
    {
        word: "meeting",
        hint: "Event in which people come together"
    },
    {
        word: "number",
        hint: "Math symbol used for counting"
    },
    {
        word: "exchange",
        hint: "The act of trading"
    },
    {
        word: "canvas",
        hint: "Piece of fabric for oil painting"
    },
    {
        word: "garden",
        hint: "Space for planting flower and plant"
    },
    {
        word: "position",
        hint: "Location of someone or something"
    },
    {
        word: "feather",
        hint: "Hair like outer covering of bird"
    },
    {
        word: "comfort",
        hint: "A pleasant feeling of relaxation"
    },
    {
        word: "tongue",
        hint: "The muscular organ of mouth"
    },
    {
        word: "expansion",
        hint: "The process of increase or grow"
    },
    {
        word: "country",
        hint: "A politically identified region"
    },
    {
        word: "group",
        hint: "A number of objects or persons"
    },
    {
        word: "taste",
        hint: "Ability of tongue to detect flavour"
    },
    {
        word: "store",
        hint: "Large shop where goods are traded"
    },
    {
        word: "field",
        hint: "Area of land for farming activities"
    },
    {
        word: "friend",
        hint: "Person other than a family member"
    },
    {
        word: "pocket",
        hint: "A bag for carrying small items"
    },
    {
        word: "needle",
        hint: "A thin and sharp metal pin"
    },
    {
        word: "expert",
        hint: "Person with extensive knowledge"
    },
    {
        word: "statement",
        hint: "A declaration of something"
    },
    {
        word: "second",
        hint: "One-sixtieth of a minute"
    },
    {
        word: "library",
        hint: "Place containing collection of books"
    },
]
const wordEl=document.querySelector(".word-random");
const hintEl=document.querySelector(".hint");
const timeEl=document.querySelector(".time");
const inputEl=document.querySelector("#word");
const refreshbtn=document.querySelector(".refresh");
const checkbtn=document.querySelector(".check");

let correctWord, timer;

/*const initTimer = maxTime =>{
    clearInterval(timer);
    timer=setInterval(()=>{
        if(maxTime>0){
            maxTime--;
            return timeEl.innerText=maxTime;
        }
        alert(`Time Off! ${correctWord.toUpperCase()} was the correct word`);
        chooseword();
    },1000);
}*/

function chooseword(){
    initTimer(30);
    const randomObj=words[Math.floor(Math.random()*words.length)];
    let wordArray=randomObj.word.split("");
    for(let i=words.length-1;i>0;i--){
        let j=Math.floor(Math.random()*(i+1));
        [wordArray[i], wordArray[j]]=[wordArray[j], wordArray[i]];
    }
    wordEl.innerText=wordArray.join("");
    hintEl.innerText=randomObj.hint;
    correctWord=randomObj.word.toLowerCase();
    inputEl.value="";
    inputEl.setAttribute("maxlength",correctWord.length);
}
refreshbtn.addEventListener("click",chooseword);
checkbtn.addEventListener("click",()=>{
    let value=inputEl.value.toLowerCase();
    if(!value){
        return alert("Please Enter a word");
    }
    if(value!==correctWord){
        alert(`Oops! ${value} is not the correct word`);
    }
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    chooseword();
});