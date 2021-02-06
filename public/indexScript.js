let newsItems = document.getElementById('allNews');
let mainNews = document.getElementById('mainNews');
let apiUrl = 'http://localhost:8080/api/newsletter';

function getAllPosts(){
//get stuff from database (available data params: id, title, created, content)
fetch(apiUrl).then((response) => {
    console.log('resolved', response);
    return response.json();
}).then(data => {
    console.log(data);
    let output = '';
    for(let i in data){
        output += `<tr>
            <p>${data[i].id}</p><br>
            <p>${data[i].title}</p><br>
            <p>${data[i].created}</p><br>
            </tr>`;
    }

    newsItems.innerHTML = output;
}).catch((err) => {
    console.log('rejected', err);
});

}

function getLatestPost(){
//get stuff from database (available data params: id, title, created, content)
    fetch(apiUrl).then((response) => {
        console.log('resolved', response);
        return response.json();
    }).then(data => {
        console.log(data);
        let output = '';
        for(let i in data){
            output += `<tr>
            <p>${data[i].id}</p><br>
            <p>${data[i].title}</p><br>
            <p>${data[i].created}</p><br>
            </tr>`;
        }

        mainNews.innerHTML = output;
    }).catch((err) => {
        console.log('rejected', err);
    });

}


getAllPosts();
getLatestPost();
