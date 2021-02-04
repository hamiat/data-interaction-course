let mainForm = document.getElementById('postNews');
let newsItems = document.getElementById('allNews');


//post new news item to database
mainForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let title = document.getElementById('news-title').value
    let newsContent = document.getElementById('news-content').value

    fetch('http://localhost:8080/api/news', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UFT-8'
        },
        body: JSON.stringify({
            title: title,
            content: newsContent
        })
    })
        .then(response => {
            if (!response.ok) {
                throw Error("Promise rejected");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })


});

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





