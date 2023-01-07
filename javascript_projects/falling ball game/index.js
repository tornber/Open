var character = document.getElementById('character');
var game = document.getElementById('game');
var interval;
var both = 0;
var counter = 0;
var currentBlocks = []
var holeLefts = []

function moveLeft() {
    var left = parseInt(window.getComputedStyle(character). 
    getPropertyValue('left'));
    if(left > 0){
    character.style.left = left - 2 + 'px';
    }
}

function moveRight() {
    var left = parseInt(window.getComputedStyle(character). 
    getPropertyValue('left'));
    if(left < 380){
    character.style.left = left + 2 + 'px';
    }
}

document.addEventListener('keydown',e => {
    
    if(both === 0) {
        both++;
        if(e.key === 'ArrowLeft') {
            interval = setInterval(moveLeft,1);
        }
        if(e.key === 'ArrowRight') {
            interval = setInterval(moveRight,1);
        }
    }
})

document.addEventListener('keyup', e => {
    clearInterval(interval);
    both = 0;
})

var blocks = setInterval(function() {

    blockLast = document.getElementById('block' + (counter - 1));
    holeLast = document.getElementById('hole' + (counter - 1));
    if(counter > 0) {
    var blockLastTop = parseInt(window.getComputedStyle(blockLast). 
    getPropertyValue('top'));
    var holeLastTop = parseInt(window.getComputedStyle(holeLast). 
    getPropertyValue('top'));
    }
    if(counter === 0 || blockLastTop < 400) {
    const block = document.createElement('div');
    const hole = document.createElement('div');
    block.setAttribute('class','block')
    block.setAttribute('id','block' + counter)
    hole.setAttribute('class','hole')
    hole.setAttribute('id','hole' + counter)
    block.style.top = blockLastTop + 100 + 'px';
    hole.style.top = holeLastTop + 100 + 'px';
    var random = Math.floor(Math.random() * 360);
    var holeLeft = random;
    hole.style.left =  holeLeft + 'px';
    holeLefts.push(holeLeft);
    game.appendChild(block);
    game.appendChild(hole);
    currentBlocks.push(counter);
    counter++;
    }

    var characterTop = parseFloat(window.getComputedStyle(character). 
    getPropertyValue('top'));
    var characterLeft = parseFloat(window.getComputedStyle(character). 
    getPropertyValue('left'));
    var drop = 0;
    if(characterTop <= 0) {
        alert('nice game. Score: ' + (counter-9))
        clearInterval(blocks);
        location.reload
    for( var i = 0;i < currentBlocks.length;i++) {
        var current = currentBlocks[i];
        var iblock = document.getElementById('block' + current);
        var ihole = document.getElementById('hole' + current);
        var iblockTop = parseFloat(window.getComputedStyle(iblock). 
        getPropertyValue('top'));
        var iholeTop = parseFloat(window.getComputedStyle(ihole). 
        getPropertyValue('top'));
        iblock.style.top = iblockTop - 0.5 + 'px';
        ihole.style.top = iholeTop - 0.5 + 'px';

        if(iblockTop < - 20) {
            currentBlocks.shift();
            iblock.remove();
            ihole.remove
        }
        if(iblockTop - 20 < characterTop && iblockTop > characterTop) {
            drop++;
            var iholeLeft = holeLefts[i];
            if(iholeLeft <= characterLeft && iholeLeft + 20 > characterLeft) {
                drop = 0;
            }
        }
        if(drop === 0) {
            if(characterTop < 480) {
            character.style.top = characterTop + 2 + 'px';
        } else {
            character.style.top = characterTop - 0.5 + 'px'
        }
        }
    }

},1)
