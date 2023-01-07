const postsUrl = 'https://jsonplaceholder.typicode.com/posts'
let pagination = false
var pages = document.getElementsByTagName('li')

renderPosts()



async function getData(url) {
    try {
        let res = await fetch(url)
        return res.json()
    } catch(error) {
        console.log(error)
    }
}

async function renderPosts(postStart = 0,postEnd = 10,firstly = true) {
    let posts = await getData(postsUrl)
    let postsHtml = ''
    if(pagination) {
        pagination = false
    } else {
    pagination = posts.length > 10 ? true : false; 
    }

    for(let i = postStart;i < postEnd;i++) {
        let post = posts[i]
        let html = `<div class="post" id="post${post.id}">
                        <h3 class="post--title">${post.title}</h3>
                        <p class="post--text">${post.body}</p>
                        <p class="post--author">Author: user${post.userId}</p>
                        <a href='${window.location.href}' class="read--more">Read more</a>
                    </div>`
        postsHtml += html
    }

    let container = document.querySelector('#container')
    let postsDiv = document.querySelector('.posts')
    // it is risky
    postsDiv.innerHTML = postsHtml

    if(pagination && firstly) {
        let navigator = `<ul class="navigator" id="navigator"></ul>`
        container.innerHTML += navigator
        let pageCount = Math.ceil(posts.length / 10)
        for(let i = 0;i < pageCount;i++) {
            // let listItem = `<li><a href="">page ${i+1}</a></li>`
            let listItem = document.createElement('li')
            listItem.innerText = `${i+1}`
            document.getElementById('navigator').appendChild(listItem)
        }
    }

    for(let i = 0;i<pages.length;i++) {
        pages[i].addEventListener('click',handleClick)
    }

}

function handleClick() {
    pageNumber = parseInt(event.target.innerText)
    let postStart = (pageNumber - 1) * 10
    let postEnd = (pageNumber * 10)
    pages[pageNumber-1].removeEventListener('click',handleClick)
    renderPosts(postStart,postEnd,false)
} 