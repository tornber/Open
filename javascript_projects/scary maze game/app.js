const levelOne = document.querySelector('.level-one');
const levelTwo = document.querySelector('.level-two');
const nextButton = document.querySelector('.next-button');
const level = document.querySelector('.ui-level')
const message = document.querySelector('.ui-message')
const voice = document.querySelector('.voice');
const picture = document.querySelector('.picture');

const collisionCheck = (check) => {
    if(check === 'border') {
        alert('nice game')
    }
    if(check === 'finish') {
        levelOne.style.pointerEvents = "none"
        nextButton.style.opacity = 1;
        nextButton.style.pointerEvents = 'all'
    }
    if(check === 'end-game') {
        voice.play();
        picture.style.display = 'block';
        document.body.background = 'black';
        document.body.display = 'block';
    }

}

window.addEventListener("mousemove",(e) => {
    let check = e.target.classList.value
    collisionCheck(check);
})

nextButton.addEventListener('click',() => {
    levelOne.style.display = 'none';
    levelTwo.style.display = 'block';
    nextButton.style.opacity = 0;
    nextButton.style.pointerEvents = 'none';
    level.textContent = 'Level 2';
    message.textContent = 'one more to go...';
})