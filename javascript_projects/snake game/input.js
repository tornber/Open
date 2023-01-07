let inputDirection = {x:0,y:0}
let lastInputDirection = {x:0,y:0}
document.addEventListener('keydown', e=> {
    switch(e.key) {
        case 'ArrowLeft': 
        if(lastInputDirection.x !== 0) return
        inputDirection = {x:-1,y:0}
        break;
        case 'ArrowRight': 
        if(lastInputDirection.x !== 0) return
        inputDirection = {x:1,y:0}
        break;
        case 'ArrowUp': 
        if(lastInputDirection.y !== 0) return
        inputDirection = {x:0,y:-1}
        break;
        case 'ArrowDown': 
        if(lastInputDirection.y !== 0) return
        inputDirection = {x:0,y:1}
        break;
    }
})

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}