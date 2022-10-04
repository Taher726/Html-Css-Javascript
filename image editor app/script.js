const previewImg=document.querySelector(".preview-img");
const inputImg=document.querySelector(".file-input");
const uploadedImg=document.querySelector(".uploadedImg");
const btn=document.querySelectorAll("button");
const sliderEl=document.querySelector(".slider");
const cheverEl=document.querySelector(".chevron");
const cheverBtnEl=document.querySelectorAll(".chevronbtn");
const rotateBtn=document.querySelectorAll(".rotate");
const filterName=document.querySelector(".filter-info .name");
const filterValue=document.querySelector(".filter-info .value");
const filterSlider=document.querySelector(".slider input");
const changesEl=document.querySelector(".changes");
const cheverToolEl=document.querySelector(".chevron-tools");
const toolsEl=document.querySelector(".tools");

/*console.log(filterValue)*/

let brightness="100", saturation="100",inversion="0",grayscale="0"; 
let rotate=0, flipHorizontal = 1, flipVertical=1;

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}
previewImg.addEventListener("click",()=>{
    inputImg.click();
})
let file
const loadImg=()=>{
    file=new FileReader();
    file.readAsDataURL(inputImg.files[0]);
    file.onload=function(){
        uploadedImg.src=file.result;
    }
    changesEl.classList.remove("disabled");
    toolsEl.classList.remove("disabled");
    /*console.log(inputImg.files[0])*/
}
inputImg.addEventListener("change",loadImg)

cheverBtnEl.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        if (sliderEl.style.maxHeight){
            sliderEl.style.maxHeight = null;
            sliderEl.style.padding=null;
        } else {
            sliderEl.style.maxHeight = 90 + "px";
            sliderEl.style.padding=10+"px";
        }
        document.querySelector(".active").classList.remove("active");
        btn.classList.add("active");
        if(btn.id === "brightness") {
            filterName.innerText="brightness";
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if(btn.id === "saturation") {
            filterName.innerText="saturation";
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        } else if(btn.id === "inversion") {
            filterName.innerText="inversion";
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else {
            filterName.innerText="grayscale";
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    })
})
cheverEl.addEventListener("click",()=>{
    if (sliderEl.style.maxHeight){
        sliderEl.style.maxHeight = null;
        sliderEl.style.padding=null;
    } else {
        sliderEl.style.maxHeight = 90 + "px";
        sliderEl.style.padding=10+"px";
    }
})
rotateBtn.forEach((rotateEl)=>{
    /*rotate.addEventListener("click",()=>{
        if(rotate.classList.contains("left")){
            rotate-=90;
        }
        else if(rotate.classList.contains("right")){
            rotate+=90
        }
        else if(rotate.classList.contains("horizontal")){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }
        else{
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
    })*/
    rotateEl.addEventListener("click",()=>{
        if(rotateEl.id === "left") {
            rotate -= 90;
        } else if(rotateEl.id === "right") {
            rotate += 90;
        } else if(rotateEl.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    })
})
const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".options .active");
    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilter();
}
const resetFilters=()=>{
    brightness="100", saturation="100",inversion="0",grayscale="0",rotate=0, flipHorizontal = 1, flipVertical=1;
    cheverBtnEl[0].click();
    applyFilter();
}
/*const saveImg=()=>{
    
}*/
filterSlider.addEventListener("input",updateFilter);
cheverToolEl.addEventListener("click",()=>{
    if (toolsEl.style.height){
        toolsEl.style.height = null;
        toolsEl.style.padding=null;
        toolsEl.style.width=null;
        toolsEl.innerHTML="";
        cheverToolEl.style.transform="rotate(90deg)";
    } else {
        toolsEl.style.height = 250+"px";
        toolsEl.style.padding="30px 35px 35px";
        toolsEl.style.width="250px";
        toolsEl.innerHTML=`<button class="choose">Choose Img</button>
        <input type="text" placeholder="Enter image name" id="name" required>
        <button class="save">Save</button>
        <button class="reset">Reset Changes</button>`;
        cheverToolEl.style.transform="rotate(270deg)";
        const chooseBtn=document.querySelector(".choose");
        const resetBtn=document.querySelector(".reset");
        const saveBtn=document.querySelector(".save");
        const inputEl=document.querySelector(".tools input");
        console.log(inputEl);
        chooseBtn.addEventListener("click",()=>{
            inputImg.click();
        })
        resetBtn.addEventListener("click",resetFilters)
        const saveImage = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = uploadedImg.naturalWidth;
            canvas.height = uploadedImg.naturalHeight;
            
            ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
            ctx.translate(canvas.width / 2, canvas.height / 2);
            if(rotate !== 0) {
                ctx.rotate(rotate * Math.PI / 180);
            }
            ctx.scale(flipHorizontal, flipVertical);
            ctx.drawImage(uploadedImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
            
            const link = document.createElement("a");
            link.setAttribute("download",inputEl.value);
            link.href = canvas.toDataURL();
            link.click();
        }
        saveBtn.addEventListener("click",saveImage);
    }
})