let newsItems = document.getElementById('newsItemsContainer');
let addNewsForm = document.getElementById('postNewsItem');
let title = document.getElementById('news-title');
let news = document.getElementById('news-content');
let submitBtn = document.getElementById('submit-btn');
let contactBtn = document.getElementById('contact-btn');
let apiUrlAdmin = 'http://localhost:8080/api/adminposts';
let labelNewsTitle = document.getElementById('newsTitle')


let apiUrl = 'http://localhost:8080/api/newsletter';
let output = '';

contactBtn.addEventListener('click', changeToContact);

let renderNewsItems = function (data){
    data.forEach(data => {
        output += `
            <div>
                <p id="first-title" class="posted-title">${data.title}</p>
                <p>${data.created}</p>
                <p class="collapsible" id="collapseBtn">Show More</p>
                <div class="seeMore" data-id=${data.id}>
                    <p id="second-title" class="posted-title">${data.title}</p>
                    <p class="posted-news">${data.content}</p>
                    <button id="deleteNewsItem">Delete</button>
                    <button id="editNewsItem">Edit</button>
                </div>
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
    collapsible ();
}).catch((err) => {
    console.log('rejected', err);
});


//see more
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



//deleting, editing and updating news items from/to database
newsItems.addEventListener('click', function (e) {
    e.preventDefault();

    let deleteBtnIsPressed = e.target.id == 'deleteNewsItem';
    let editBtnIsPressed = e.target.id == 'editNewsItem';
    let id = (e.target.parentElement.dataset.id);


    //deleting
    if (deleteBtnIsPressed) {
        fetch(`${apiUrl}/${id}`, { //id from data-id
            method: 'DELETE',
        }).then((response) => {
            console.log('resolved', response);
        }).then(() => {
            location.reload();
        })
    }

    //editing
    if (editBtnIsPressed) {
        const parent = e.target.parentElement;
        let titleContent = parent.querySelector('.posted-title').textContent;
        let newsContent = parent.querySelector('.posted-news').textContent;

        title.value = titleContent;
        news.value = newsContent;
    }

    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UFT-8'
            },
            body: JSON.stringify({
                title: title.value,
                content: news.value
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw Error("Promise rejected");
                }
                return response.json();
            })
            .then(() => {
                location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    })
})



//post new news items to database via url
addNewsForm.addEventListener('submit', function(e) {
    e.preventDefault();

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UFT-8'
        },
        body: JSON.stringify({
            title: title.value,
            content: news.value
        })
    })
        .then(response => {
            if (!response.ok) {
                throw Error("Promise rejected");
            }
            return response.json();
        })
        .then(data => {
            const dataArr = []; //posted news item is now an array
            dataArr.push(data);
            renderNewsItems(dataArr);
            location.reload();
            console.log(dataArr);
        })
        .catch(err => {
            console.log(err);
        })

});


//change url path to "contact" without changing the page
function changeToContact (){
    history.pushState(null, null, "admins-posts");
    newsItems.innerHTML = "";
    addNewsForm.innerHTML = `
    <form class="test-form" >
            <label for="firstName" class="contact-label">First Name</label>
            <input type="text" name="firstName" id=firstName">
            <label for="lastName" class="contact-label">Last name</label>
            <input type="text" name="lastName" id=lastName">
            <label for="contactNumber" class="contact-label">Telephone number</label>
            <input type="number" name="contactNumber" id="contactNumber">
            <label for="contactComment">Comment</label>
            <textarea id="contactComment" ></textarea>
            <button type="submit" id="submit-btn">Save Post</button>
        </form>
    `

    //display all admin posts
    const adminPosts = function (data){
        data.forEach(data => {
            outputAdmin = `
            <div data-id=${data.id}>
                <p class="posted-title">${data.firstName}</p>
                <p class="posted-title">${data.lastName}</p>
                <p class="posted-title">${data.telephoneNumber}</p>
                <p class="posted-title">${data.comment}</p>
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





