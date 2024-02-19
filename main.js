const API_KEY = `40b8bde5eada4aa9a2884a3e8ba42c2b`;
let news = [];
const getLatestNews = async () => {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log(news);
}
getLatestNews()