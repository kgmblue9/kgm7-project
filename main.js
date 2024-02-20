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
            <img class = "news-img-size" src="${news.urlToImage}">
        </div>
        <div class = "col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.description}</P>
            <div>${news.source.name}, ${news.publishedAt}</div>
        </div>
    </div>`
    ).join('');
        document.getElementById('news-board').innerHTML = newsHTML;
    }
    render();
}   
getLatestNews();