let newsItems = document.getElementById('recentNewsContainer');
let aboutBtn = document.getElementById('about-btn');
let contactBtn = document.getElementById('contact-btn');
let apiUrl = 'http://localhost:8080/api/newsletter';
let output = '';

aboutBtn.addEventListener('click', changeToAbout);
contactBtn.addEventListener('click', changeToContact);

function changeToAbout (){
    //change url path to "about" without changing the page
    history.pushState(null, null, "about");
    newsItems.innerHTML = "";

    if(newsItems.innerHTML === "") {

    const renderNewsTitle = function (data){
        data.forEach(data => {
            output = `
            <div data-id=${data.id}>
                <p class="posted-title">${data.title}</p>
                <p class="posted-title">${data.created}</p>
                <p class="posted-title">${data.content}</p>
            </div>
            `;
        });
        newsItems.innerHTML = output;
    };


        fetch(apiUrl).then((response) => {
            console.log(' resolved', response);
            return response.json();
        }).then(data => {
            renderNewsTitle(data);
        }).catch((err) => {
            console.log('rejected', err);
        });
    }

}

function changeToContact (){
    //change url path to "contact" without changing the page
    history.pushState(null, null, "contact");
    newsItems.innerHTML = "Hej då";
}


let renderNewsItems = function (data){
    data.forEach(data => {
        output += `
            <h2 class="posted-title collapsible">${data.title}<span id="news-date">${data.created}</span></h2>
            <div class="seeMore" data-id=${data.id}>
                <p class="posted-news">${data.content}</p>
            </div>
            `;
    });
    newsItems.innerHTML = output;
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


//see more
function collapsible () {
    let coll = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            let seeMore = this.nextElementSibling;
            if (seeMore.style.display === "block") {
                seeMore.style.display = "none";
            } else {
                seeMore.style.display = "block";
            }
        });
    }
}


/*
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
*/




