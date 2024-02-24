const API_KEY = `40b8bde5eada4aa9a2884a3e8ba42c2b`;
let newsList = [];
let noImage = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
const menus = document.querySelectorAll(".menus button");
const searchInput = document.getElementById("search-input");

menus.forEach((menu)=>menu.addEventListener("click",(event)=>getNewsByCategory(event)));
searchInput.addEventListener("keyup",enterKey);

//let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
let url = new URL(`https://kgm7.netlify.app/top-headlines`);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

function enterKey(event){
    if (event.key === "Enter"){
        searchNews();
    }
}

const getNews = async ()=>{
    try {
        url.searchParams.set("page",page); //&page = page
        url.searchParams.set("pageSize",pageSize);

        const response = await fetch(url);          
        const data = await response.json();

        if(response.status===200){
            if(data.articles.length === 0){
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            totalResults = data.totalResults;
            render();
            paginationRender();

        } else {
            throw new Error(data.message);
        }
    } catch (error){
         errorRender(error.message)
    }
}

const getLatestNews = async ()=>{
    //url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    //url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`);
    url = new URL(`https://kgm7.netlify.app/top-headlines`);    
    getNews();

};

const getNewsByCategory = async (event)=>{
    category = event.target.textContent.toLowerCase();
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
    url = new URL(`https://kgm7.netlify.app/top-headlines?country=us&category=${category}`);    
    getNews();
    closeNav();
};

const searchNews = async ()=>{
    query = searchInput.value.toLowerCase();
    //url = new URL(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);   
    url = new URL(`https://kgm7.netlify.app/top-headlines?q=${query}`);    
    getNews();
};

const render = ()=>{
    const newsHTML = newsList.map((news) => `<div class = "row news">
    <div class = "col-lg-4">
        <a href="${news.url}" target = "black"><img class = "news-img-size" src="${news.urlToImage??noImage}"></a>
    </div>
    <div class = "col-lg-8">
        <h3><a href="${news.url}" target = "black">${news.title}</a></h3>
        <p><a href="${news.url}" target = "black">${news.description??"내용없음"}</a></P>
        <div>${news.source.name??"no source"} , ${moment(news.publishedAt).fromNow()}</div>
    </div>
</div>`
).join('');
    document.getElementById('news-board').innerHTML = newsHTML;
};

const errorRender = (errorMessage)=>{
    const errorHTML = `<div class="alert alert-danger" role="alert">
        ${errorMessage}
    </div>`;
    document.getElementById('news-board').innerHTML = errorHTML;
};

moment().startOf('hour').fromNow();  
  
getLatestNews();

const openNav = () =>{
    document.getElementById("sideNav").style.width = "250px"
    };

const closeNav = () => {
    document.getElementById("sideNav").style.width = "0px"
}

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };

const paginationRender = () => {
    const totalPages = Math.ceil(totalResults/pageSize);
    const pageGroup = Math.ceil(page/groupSize);
    let   lastPage = pageGroup * groupSize;
      if (lastPage>totalPages){
        lastPage = totalPages;
      }
    const firstPage = lastPage - (groupSize-1)<=0?1:lastPage - (groupSize-1);

let paginationHTML = ``

for (i=firstPage;i<=lastPage;i++){
    paginationHTML+= `<li class="page-item ${i===page?"active":""}" onclick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`
}

document.querySelector(".pagination").innerHTML = paginationHTML;

}

const moveToPage = (pageNum) => {
    page = pageNum;
    getNews();
}