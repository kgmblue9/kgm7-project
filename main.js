const API_KEY = `40b8bde5eada4aa9a2884a3e8ba42c2b`;
let news = [];
const getLatestNews = async ()=>{
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    // const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`);
    const url = new URL(`https://kgm7.netlify.app/top-headlines`);    

    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log(news);
} 
getLatestNews();