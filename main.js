const API_KEY = `40b8bde5eada4aa9a2884a3e8ba42c2b`;
let newsList = [];
let noImage = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
const menus = document.querySelectorAll(".menus button");
const searchInput = document.getElementById("search-input");

menus.forEach((menu)=>menu.addEventListener("click",(event)=>getNewsByCategory(event)));
searchInput.addEventListener("keyup",enterKey);

//let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
let url = new URL(`https://kgm7.netlify.app/top-headlines`);

function enterKey(event){
    if (event.key === "Enter"){
        searchNews();
    }
}

const getNews = async ()=>{
    try {
        const response = await fetch(url);
        console.log(response)
        const data = await response.json();

        console.log(data)

        if(response.status===200){
            if(data.articles.length === 0){
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            render();
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
        <img class = "news-img-size" src="${news.urlToImage??noImage}">
    </div>
    <div class = "col-lg-8">
        <h4>${news.title}</h4>
        <p>${news.description??"내용없음"}</P>
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