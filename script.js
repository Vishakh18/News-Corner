
const API_KEY = '22cd500498534126a2cc56c3d2e65df1';
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let SelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    SelectedNav?.classList.remove("active");
    SelectedNav = navItem;
    SelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    SelectedNav?.classList.remove("active");
    SelectedNav = null;
});
window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {

        const query = searchText.value;
        if (!query) return;
        fetchNews(query);
        SelectedNav?.classList.remove("active");
        SelectedNav = null;

    }
})
const nav = document.getElementById('nav')
const tham = document.getElementById('tham')

tham.addEventListener('click', () => {
    if (nav.classList.contains('hidden')) {
        nav.classList.remove('hidden')
    }
    else {
        nav.classList.add('hidden')
    }
})
const val = document.getElementById('tp')
window.addEventListener('scroll', function () {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        val.classList.remove("hidden")
    }
    else {
        val.classList.add("hidden")
    }
});

