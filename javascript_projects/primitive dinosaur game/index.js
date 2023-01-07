const character = document.getElementById('character');
const block = document.getElementById('block');

function jump() {
    if(character.classList != 'animate') {
    character.classList.add('animate');
    }
    setTimeout(function() {
        character.classList.remove('animate')
    },500)
}


document.addEventListener('keydown', jump);


var checkDead = setInterval(() => {
    var characterTop =
     parseInt(window.getComputedStyle(character). 
    getPropertyValue("top"));
    blockLeft = parseInt(window.getComputedStyle(block)
    .getPropertyValue('left'));

    if(blockLeft < 50 && blockLeft > 30 && characterTop > 165) {
        block.style.animation = 'none';
        block.style.display = 'none';
        alert('nice game');
    }
},10)
