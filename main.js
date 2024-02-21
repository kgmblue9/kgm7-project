let noImage = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
const API_KEY = `40b8bde5eada4aa9a2884a3e8ba42c2b`;
let newsList = [];
const getLatestNews = async ()=>{
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    // const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`);
    const url = new URL(`https://kgm7.netlify.app/top-headlines`);    

    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    console.log(newsList);

    const render = ()=>{
        const newsHTML = newsList.map((news) => `<div class = "row news">
        <div class = "col-lg-4">
            <img class = "news-img-size" src="${news.urlToImage??noImage}">
        </div>
        <div class = "col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.description??"내용없음"}</P>
            <div>${news.source.name??"no source"} , ${moment(news.publishedAt).fromNow()}</div>
        </div>
    </div>`
    ).join('');
        document.getElementById('news-board').innerHTML = newsHTML;
    }
    render();


    moment().startOf('hour').fromNow();  


}   
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