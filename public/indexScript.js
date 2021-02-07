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
            <h2 class="posted-title">${data.title}</h2>
            <button type="button" class="collapsible">Show More</button>
            <div class="seeMore" data-id=${data.id}>
                <p class="posted-news">${data.content}</p>
                <p>${data.created}</p>
            </div>
            `;
    });
    newsItems.innerHTML = output;
};

function collapsible () {
    let coll = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let seeMore = this.nextElementSibling;
            if (seeMore.style.display === "block") {
                seeMore.style.display = "none";
            } else {
                seeMore.style.display = "block";
            }
        });
    }
}

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
    collapsible();
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

