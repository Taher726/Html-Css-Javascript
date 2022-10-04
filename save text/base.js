const textEl=document.querySelector("textarea");
const nameEl=document.querySelector(".file-name input");
const typeEl=document.querySelector(".save-as select");
const btnEl=document.querySelector(".save-as-btn");
const fileInput=document.querySelector(".file-input");
const chooseBtn=document.querySelector(".choose");
const resetBtn=document.querySelector(".reset");

typeEl.addEventListener("change",()=>{
    const selectedOption=typeEl.options[typeEl.selectedIndex].text;
    btnEl.innerHTML=`Save As ${selectedOption.split(" ")[0]} File`;
})

btnEl.addEventListener("click",()=>{
    var textBlob =new Blob([textEl.value], {type:typeEl.value});
    const fileURL=URL.createObjectURL(textBlob);
    const element=document.createElement("a");
    element.setAttribute("href",fileURL);
    element.setAttribute("download",nameEl.value);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
})

chooseBtn.addEventListener("click",()=>{
    fileInput.click()
});

let file;
const loadText=()=>{
    file=new FileReader();
    file.readAsText(fileInput.files[0]);
    file.onload=function(){
        textEl.value=file.result;
        localStorage.setItem("text",JSON.stringify(file.result));
    }
}
fileInput.addEventListener("change",loadText);
resetBtn.addEventListener("click",()=>{
    textEl.value=JSON.parse(localStorage.getItem("text"));
})

window.addEventListener("load",()=>{
    localStorage.clear();
})