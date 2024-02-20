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

    const rendor = ()=>{
        const newsHTML = ``;

        newsHTML = newsList.map((news) => `<div class = "row news">
        <div class = "col-lg-4">
            <img class = "news-img-size" src="https://image.kmib.co.kr/online_image/2023/0825/2023082419270444135_1692872824_0924317896.jpg">
        </div>
        <div class = "col-lg-8 text-all">
            <h2>염정아 “가장 크게 얻은 건 사람… 행복하게 작품 찍어”</h2>
            <p>이번 영화를 통해 가장 크게 얻은 건 사람이다. 염정아는 “보통은 촬영 끝나고 집에 가기 바쁜데 ‘밀수’ 현장에선 사람들이 집에 가질 않았다. 30분이라도 더 남아서 같이 밥차에 남은 밥을 먹거나 분장실에서 이야기를 나눴다”면서 “연기도 연기지만 역시 사람이란 생각이 들었다. 이렇게 행복하게 작품을 찍은 내가 복이 많은 사람이라고 느꼈다”고 전했다.
            배우 생활을 이어나가는 힘은 일상에서 나온다고 그는 말했다. 염정아는 “단순한 편이라 심각한 고민을 잘 하지 않는다. 빨리 좋은 작품이 들어오기만을 기다린다”며 “엄마이자 아내로 살면서 연기하는 에너지를 얻는다”고 말했다.</P>
            <div>국민일보 임세정 기자 fish813@kmib.co.kr 2023-08-25 04:02</div>
        </div>
    </div>`
    );

        document.getElementById('news-board').innerHTML = newsHTML;
    }
} 
getLatestNews();