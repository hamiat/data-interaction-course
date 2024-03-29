let newsItems = document.getElementById('allNewsContainer');
let recentItems = document.getElementById('recentNewsContainer');
let contactBtn = document.getElementById('contact-btn');
let mainTitle = document.getElementById('mainTitle')
let testBtn = document.getElementById('test-btn');
let apiUrl = 'http://localhost:8080/api/newsletter';
let apiUrl2 = 'http://localhost:8080/api/recent';
let apiUrlAdmin = 'http://localhost:8080/api/adminposts';
let output = '';
let outputTwo = '';
let outputAdmin = '';

contactBtn.addEventListener('click', changeToContact);
testBtn.addEventListener('click', changeToTest);

//display most recent news
const renderRecentNews = function (data){
    data.forEach(data => {
        outputTwo = `
            <div data-id=${data.id}>
                <p class="recent-title">${data.title}</p>
                <p class="news-date">${data.created}</p>
                <p class="posted-title">${data.content}</p>
            </div>
            `;
    });

    newsItems.innerHTML = outputTwo;
};

// get most recent news from database via url (available data params: id, title, created, content)
fetch(apiUrl2).then((response) => {
    console.log(' resolved', response);
    return response.json();
}).then(data => {
    renderRecentNews(data);
}).catch((err) => {
    console.log('rejected', err);
});

//display all news
let renderNewsItems = function (data) {
    data.forEach(data => {
        output += `
            <h2 class="posted-title collapsible">${data.title}<span id="news-date">${data.created}</span></h2>
            <div class="seeMore" data-id=${data.id}>
                <p class="posted-news">${data.content}</p>
            </div>
            `;
    });
    recentItems.innerHTML = output;
};

//get all news items from database via url (available data params: id, title, created, content)
fetch(apiUrl).then((response) => {
    console.log('resolved', response);
    return response.json();
}).then(data => {
    renderNewsItems(data);
    collapsible();
}).catch((err) => {
    console.log('rejected', err);
});

//see more
function collapsible() {
    let coll = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            let seeMore = this.nextElementSibling;
            if (seeMore.style.display === "block") {
                seeMore.style.display = "none";
            } else {
                seeMore.style.display = "block";
            }
        });
    }
}

//change url path to "contact" without changing the page
function changeToTest (){
    history.pushState(null, null, "all-news");
    newsItems.innerHTML = "";
    renderNewsItems(data);
}

function changeToContact () {
    //change url path to "about" without changing the page
    history.pushState(null, null, "contact");
    newsItems.innerHTML = "Test test";
    recentItems.innerHTML = "";


    //display all admin posts
    const adminPosts = function (data){
        data.forEach(data => {
            outputAdmin += `
            <div data-id=${data.id}>
                <table>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Phone</th>
                    <th>Comment</th>
                </tr><br>
                <tr>
                    <td class="posted-title">${data.firstName}</td>
                    <td class="posted-title">${data.lastName}</td>
                    <td class="posted-title">${data.telephoneNumber}</td>
                    <td class="posted-title">${data.comment}</td>
                </tr>
                <table>
            </div>
            `;
        });

        newsItems.innerHTML = outputAdmin;
    };

// get admin's posts from database via url
    fetch(apiUrlAdmin).then((response) => {
        console.log(' resolved', response);
        return response.json();
    }).then(data => {
        adminPosts(data);
    }).catch((err) => {
        console.log('rejected', err);
    });


}









/*
let renderRecentNews = function (data){
    data.forEach(data => {
        output += `
            <div data-id=${data.id}>
                <p class="posted-title">${data.title}</p>
            </div>
            `;
    });
    tester.innerHTML = output;
};




let newsTitle = function (){
    fetch(apiUrl).then((response) => {
        console.log('resolved', response);
        return response.json();
    }).then(data => {
        renderRecentNews(data);
    }).catch((err) => {
        console.log('rejected', err);
    });
}
*/




