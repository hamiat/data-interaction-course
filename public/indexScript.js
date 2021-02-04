let newsItems = document.getElementById('allNews');

//get stuff from database (available data params: id, title, created, content)
fetch('http://localhost:8080/api/news').then((response) => {
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

