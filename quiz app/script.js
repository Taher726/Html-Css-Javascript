const names=["web","syntax","history","general"];
const quizData={
    web:[
        {
            question: "What does HTML stand for?",
            a: "Hypertext Markup Language",
            b: "Hypertext Markdown Language",
            c: "Hyperloop Machine Language",
            d: "Helicopters Terminals Motorboats Lamborginis",
            correct: "a",
        },
        {
            question: "What does CSS stand for",
            a: "Central Style Sheets",
            b: "Cascading Style Sheets",
            c: "Cascading Simple Sheets",
            d: "Cars SUVs Sailboats",
            correct: "b",
        },
        {
            question: "Which language runs in a web browser?",
            a: "Java",
            b: "C",
            c: "Python",
            d: "JavaScript",
            correct: "d",
        },
        {
            question:"Which framework is not a Javascript framework",
            a:"Angular",
            b:"Flask",
            c:"Node",
            d:"React",
            correct:"b",
        },
    ],
    syntax:[
        {
            question:"Which of the following opreators is incorrect",
            a:"<=",
            b:"<>",
            c:"==",
            d:"!=",
            correct:"b",
        },
        {
            question:"Find the wrong command (python)",
            a:"if(num % 2 == 0) printf('EVEN')",
            b:"for(i in range(10)): printf(i)",
            c:"while(True): a=input('Give a number')",
            d:"if(a>=b): printf(a)",
            correct:"a",
        },
        {
            question:"What is || operator",
            a:"Assignment operator",
            b:"Relational operator",
            c:"Arithmetic operator",
            d:"Logical opreator",
            correct:"d",
        },
        {
            question:"Find the wrong syntax",
            a:"<h1>I</h1>",
            b:"<p>Hope</p>",
            c:"<div><h3>You like</h3><div>",
            d:"<span>The game</span>",
            correct:"c",
        },
    ],
    history:[
        {
            question:"The oldest programming language",
            a:"MATLAB",
            b:"PYTHON",
            c:"C",
            d:"JAVA",
            correct:"a",
        },
        {
            question:"First version of python released in :",
            a:"1997",
            b:"1994",
            c:"1996",
            d:"1995",
            correct:"b",
        },
        {
            question:"What year was JavaScript launched?",
            a: "1996",
            b: "1995",
            c: "1994",
            d: "none of the above",
            correct: "b",
        },
        {
            question:"C++ is :",
            a:"Machine Language",
            b:"Assembly Language",
            c:"Hardware",
            d:"High-Level language",
            correct:"d",
        },
    ],
    general:[
        {
            question:"What does the function toUpperCase() do ?",
            a:"Convert the first letter to upper case",
            b:"Convert the word to upper case",
            c:"Convert the last letter to upper case",
            d:"Convert the word to lower case",
            correct:"b",
        },
        {
            question:"Which of the following data is not a data type",
            a:"Array",
            b:"String",
            c:"Integer",
            d:"Boolean",
            correct:"a",
        },
        {
            question:"What does RAM stand for ?",
            a:"Read And Memory",
            b:"Random And Memory",
            c:"Random Access Memory",
            d:"none of the above",
            correct:"c",
        },
        {
            question:"Which of the following names is not a search algorithm ?",
            a:"Selection",
            b:"Binary",
            c:"Fibonacci",
            d:"Linear",
            correct:"a",
        },
    ]
}

const containerEl=document.querySelector(".container");
const mainContainerEl=document.querySelector(".main-container");
const closeBtn=document.querySelector(".close-icon");
const quizContainerEl=document.querySelector(".quiz-container");
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const answerEls=document.querySelectorAll(".answer");
const questionEl = document.getElementById('question');
const submitBtn=document.getElementById("submit");

let quizindx=0;
let score=0;

names.forEach((kit) => {
    const btnEl=document.createElement("button");
    btnEl.classList.add("btn");
    btnEl.innerText=kit;
    btnEl.style.backgroundImage=`url(images/${kit}.png)`;
    containerEl.appendChild(btnEl);
    btnEl.addEventListener("click",()=>{
        mainContainerEl.classList.add("active");
        quizContainerEl.classList.remove("active");
        loadQuiz(kit,quizindx);
        submitBtn.addEventListener("click",()=>{
            let answer=getSelected();
            if(answer){
                if(answer==quizData[kit][quizindx].correct){
                    score++;
                }
                quizindx++;
                if(quizindx<(quizData[kit]).length){
                    loadQuiz(kit,quizindx);
                }
                else{
                    quizContainerEl.style.top="45%";
                    quizContainerEl.innerHTML=`<h2>You answered ${score}/${(quizData[kit]).length} questions correctly</h2>
                                                <button id="submit" onclick="location.reload()">Reload</button>`;
                }
            }
        })
    })
    closeBtn.addEventListener("click",()=>{
        mainContainerEl.classList.remove("active");
        quizContainerEl.classList.add("active");
    })
});
function deselectAnswers(){
    answerEls.forEach(answerEl =>answerEl.checked=false);
}
function loadQuiz(kit,quizindx){
    deselectAnswers();
    let currentQuiz=quizData[kit][quizindx];
    questionEl.innerText=currentQuiz.question;
    a_text.innerText=currentQuiz.a;
    b_text.innerText=currentQuiz.b;
    c_text.innerText=currentQuiz.c;
    d_text.innerText=currentQuiz.d;
}
function getSelected(){
    let answer;
    answerEls.forEach(answerEl=>{
        if(answerEl.checked){
            answer=answerEl.id;
        }
    })
    return answer;
}
function back(){
    mainContainerEl.classList.remove("active");
    quizContainerEl.classList.add("active");
}
console.log(quizData.syntax);
console.log(quizData.syntax[0]);