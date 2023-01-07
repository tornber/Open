var block = document.getElementById('block');
var hole = document.getElementById('hole');
var character = document.getElementById('character');
var jumping = 0;
var counter = -1;

hole.addEventListener('animationiteration',() => {
    var random = Math.random() * 3;
    var top = (random * 100) + 150;
    hole.style.top = -(top) + 'px';
    counter++;
})

setInterval(function() {
    var characterTop = parseInt(window.getComputedStyle(character).
    getPropertyValue('top'));
    if(jumping === 0) {
        character.style.top = (characterTop + 3) + 'px';
    }
    var blockLeft = parseInt(window.getComputedStyle(block).
    getPropertyValue('left'));
    var holeTop = parseInt(window.getComputedStyle(hole).
    getPropertyValue('top'));
    var characterTop = parseInt(window.getComputedStyle(character).
    getPropertyValue('top'));
    var ctop = -(500 - characterTop);
    if((characterTop > 480) || ((blockLeft < 20) && (blockLeft > -50) &&
    ((ctop < holeTop) || (ctop > holeTop + 130)))) {
        alert('your score:' + counter);
        character.style.top = 100 + 'px';
        counter = -1;

    }
},10)

document.addEventListener('keydown',jump);

function jump() {
    jumping = 1;
    let jumpCount = 0;
    var jumpingInterval = setInterval(() => {
        var characterTop = parseInt(window.getComputedStyle(character).
        getPropertyValue('top'));
        if(characterTop > 6 && jumpCount < 15) {
            character.style.top = (characterTop - 5) + 'px';
        }
        if(jumpCount > 20) {
            clearInterval(jumpingInterval);
            jumping = 0
        }
        jumpCount++;
    },10)
}