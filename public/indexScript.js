let newsItems = document.getElementById('recentNewsContainer');
let tester = document.getElementById('titles-space');
let addNewsForm = document.getElementById('postNewsItem');
let title = document.getElementById('news-title');
let news = document.getElementById('news-content');
let aboutBtn = document.getElementById('about-btn');

let apiUrl = 'http://localhost:8080/api/newsletter';
let output = '';

let renderNewsItems = function (data){
    data.forEach(data => {
        output += `
            <div data-id=${data.id}>
                <p class="posted-title">${data.title}</p>
                <p class="posted-news">${data.content}</p>
                <p>${data.created}</p>
            </div>
            `;
    });
    newsItems.innerHTML = output;
};

let renderNewsTitle = function (data){
    data.forEach(data => {
        output += `
            <div data-id=${data.id}>
                <p class="posted-title">${data.title}</p>
            </div>
            `;
    });
    tester.innerHTML = output;
};

//get news items from database via url (available data params: id, title, created, content)
fetch(apiUrl).then((response) => {
    console.log('resolved', response);
    return response.json();
}).then(data => {
    renderNewsItems(data);
}).catch((err) => {
    console.log('rejected', err);
});


let newsTitle = function (){
    fetch(apiUrl).then((response) => {
        console.log('resolved', response);
        return response.json();
    }).then(data => {
        renderNewsTitle(data);
    }).catch((err) => {
        console.log('rejected', err);
    });
}



aboutBtn.addEventListener('click', changeToAbout);

function changeToAbout (){
    //newsItems.classList.add("hidden");
    history.replaceState(newsTitle(), null, "about");

}

