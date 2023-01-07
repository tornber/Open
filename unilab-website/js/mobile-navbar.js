var mobile = window.matchMedia('(max-width: 375px)');
var navbar
if(mobile.matches) {
    
    var hamburger = document.getElementById('hamburger');
    navbar = document.getElementById('navbar');
    let isOpened = false;

    hamburger.addEventListener('click', (e) => {
        isOpened = true
        navbar.classList.toggle('active');
        // document.getElementById('main').style.cssText += 
        document.getElementById('main').classList.add('blur')
    })

    // document.addEventListener('click',(event) => {
    //     let elementObject = {
    //         ind: 0,
    //         element: event.target
    //     }
    //     let contains = event.target.classList.contains('active') || parentContains(elementObject)
    //     if(contains) {
    //         console.log('it contains')
    //     } else {
    //         if(isOpened) {
    //             navbar.classList.toggle('active')
    //             isOpened = false
    //         } 
    //     }
    // })

    document.getElementsByTagName('main')[0].addEventListener('click',() => {
        if(isOpened) {
        navbar.classList.toggle('active')
        document.getElementById('main').classList.remove('blur')
        isOpened = false
        } else return 
    })

}

// function parentContains(elementObject) {
//     let element = elementObject.element
//     if(elementObject.ind === 7 || element.parentElement.classList.length === 0){
//          return false
//     }
//     if(element.parentElement.classList.value === 'mobile-navbar active'){  
//         return true
//     }
//     else {
//         let ind = elementObject.ind + 1
//         let parentElement = {
//             ind: ind,
//             element: element.parentElement
//         }
//         parentContains(parentElement)
//     }
// }