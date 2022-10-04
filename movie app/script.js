const genres={
    "genres":[
       {
          "id":28,
          "name":"Action"
       },
       {
          "id":12,
          "name":"Adventure"
       },
       {
          "id":16,
          "name":"Animation"
       },
       {
          "id":35,
          "name":"Comedy"
       },
       {
          "id":80,
          "name":"Crime"
       },
       {
          "id":99,
          "name":"Documentary"
       },
       {
          "id":18,
          "name":"Drama"
       },
       {
          "id":10751,
          "name":"Family"
       },
       {
          "id":14,
          "name":"Fantasy"
       },
       {
          "id":36,
          "name":"History"
       },
       {
          "id":27,
          "name":"Horror"
       },
       {
          "id":10402,
          "name":"Music"
       },
       {
          "id":9648,
          "name":"Mystery"
       },
       {
          "id":10749,
          "name":"Romance"
       },
       {
          "id":878,
          "name":"Science Fiction"
       },
       {
          "id":10770,
          "name":"TV Movie"
       },
       {
          "id":53,
          "name":"Thriller"
       },
       {
          "id":10752,
          "name":"War"
       },
       {
          "id":37,
          "name":"Western"
       }
    ]
}
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const mainEl=document.getElementById("main");
const formEl=document.getElementById("form");
const searchEl=document.getElementById("search");
const favorsButton=document.querySelector(".favors");
const selectEl=document.querySelector("select");

getMovies(API_URL);
let favoirEl;
let favoirsList=[];

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        showMovies(data.results);
    })
}
function showMovies(movies){
    mainEl.innerHTML="";
    let currentindx=0;
    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl =document.createElement("div");
        movieEl.classList.add(`movie`);
        movieEl.classList.add(`div${currentindx}`);
        movieEl.innerHTML=`
        <i class="fa-regular fa-star favoir" id="${currentindx}"></i>
        <img src="${IMG_PATH+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${averageColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="favoirs">
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview};
                </div>
            </div>`;
        mainEl.appendChild(movieEl)
        currentindx++;
    });
    favoirEl=document.querySelectorAll(".favoir");
    favoirEl.forEach((favoir)=>{
        favoir.addEventListener("click",()=>{
            const divEL=document.querySelector(`.div${favoir.id}`);
            if(favoir.classList.contains("active")){
                favoir.classList.remove("active");
                if(favoirsList.includes(divEL)){
                    favoirsList.splice(divEL,1);
                }
            }
            else{
                favoir.classList.add("active");
                favoirsList.push(divEL);
            }
        })
    })
} 

function averageColor(vote){
    if(vote>=8){
        return "green";
    }
    else if(vote>=5){
        return "orange";
    }
    else{
        return "red";
    }
}
formEl.addEventListener("submit",(e)=>{
    e.preventDefault();
    const searchTerm=searchEl.value;
    if(searchTerm && searchTerm!==""){
        getMovies(SEARCH_API+searchTerm);
        search.value="";
    }else{
        mainEl.innerHTML="<h1>No movie founded</h1>";
        mainEl.classList.add("no-founded");
    }
})
favorsButton.addEventListener("click",(e)=>{
    e.preventDefault();
    mainEl.innerHTML="";
    if(favoirsList.length==0){
        mainEl.innerHTML="<h1>No movie founded</h1>";
        mainEl.classList.add("no-founded");
    }
    else{
        for(let i=0;i<favoirsList.length;i++){
            mainEl.appendChild(favoirsList[i]);
            console.log(mainEl);
        }
    }
})
selectEl.addEventListener("click",(e)=>{
    e.preventDefault();
    const selectValue=selectEl.value;
    if(selectValue=="")
        return
    const gendre=genres["genres"][selectValue]["id"];
    console.log(gendre);
    getMovies(API_URL+"&with_genres="+encodeURI(gendre));
})