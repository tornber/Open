const sec3 = document.getElementById('sec3');
const mainContainer = document.getElementsByClassName('main-container')[0];

var tablet = window.matchMedia('(max-width: 768px)');
var mobile = window.matchMedia('(max-width: 375px)');

if(tablet.matches) {

    var sec3_text = document.createElement('p');
    sec3_text.style.width =  608 + 'px';
    sec3_text.style.color = '#202124';
    sec3_text.style.margin = 0 + 'px';
    sec3_text.style.fontSize = 16 + 'px';
    sec3_text.style.fontFamily = 'Helvetica';
    sec3_text.style.fontWeight = 'oblique';
    sec3_text.innerText = 'In hac habitasse platea dictumst. Sed nec venenatis odio. Nulla faucibus ipsum sed faucibus accumsan. Donec rhoncus luctus.'

    if(sec3 !== null) {
    sec3.appendChild(sec3_text);
    }
    var pageContainer = document.createElement('div');
    pageContainer.style.width = 233 + 'px';
    pageContainer.style.height = 11 + 'px';
    pageContainer.style.display = 'flex';
    pageContainer.style.justifyContent = 'space-between';
    pageContainer.style.margin = '0px 188px'
    pageContainer.style.border = '0px';
    pageContainer.style.padding = '0px'
    if(sec3 !== null) {
        mainContainer.appendChild(pageContainer);
    }


    var page1 = document.createElement('p');
    page1.style.fontSize = 11 + 'px'
    page1.style.color = '#202124'
    page1.style.fontFamily = 'Helvetica,sans-serif'
    page1.style.fontWeight = 'bold'
    page1.style.margin = 0 + 'px'
    page1.innerText = '01'
    page1.style.cursor = 'pointer'
    pageContainer.appendChild(page1)
    var page2 = document.createElement('p');
    page2.style.fontSize = 11 + 'px'
    page2.style.color = '#202124'
    page2.style.fontFamily = 'Helvetica,sans-serif'
    page2.style.fontWeight = 'bold'
    page2.style.margin = 0 + 'px'
    page2.innerText = '02'
    page2.style.cursor = 'pointer'
    pageContainer.appendChild(page2)
    var page3 = document.createElement('p');
    page3.style.fontSize = 11 + 'px'
    page3.style.color = '#202124'
    page3.style.fontFamily = 'Helvetica,sans-serif'
    page3.style.fontWeight = 'bold'
    page3.style.margin = 0 + 'px'
    page3.innerText = '03'
    page3.style.cursor = 'pointer'
    pageContainer.appendChild(page3)
    var page4 = document.createElement('p');
    page4.style.fontSize = 11 + 'px'
    page4.style.color = '#202124'
    page4.style.fontFamily = 'Helvetica,sans-serif'
    page4.style.fontWeight = 'bold'
    page4.style.margin = 0 + 'px'
    page4.innerText = '04'
    page4.style.cursor = 'pointer'
    pageContainer.appendChild(page4)
    var page5 = document.createElement('p');
    page5.style.fontSize = 11 + 'px'
    page5.style.color = '#202124'
    page5.style.fontFamily = 'Helvetica,sans-serif'
    page5.style.fontWeight = 'bold'
    page5.style.margin = 0 + 'px'
    page5.innerText = '05'
    page5.style.cursor = 'pointer'
    pageContainer.appendChild(page5)
    var page6 = document.createElement('p');
    page6.style.fontSize = 11 + 'px'
    page6.style.color = '#202124'
    page6.style.fontFamily = 'Helvetica,sans-serif'
    page6.style.fontWeight = 'bold'
    page6.style.margin = 0 + 'px'
    page6.innerText = '06';
    page6.style.cursor = 'pointer'
    pageContainer.appendChild(page6)

    var lastPageContainer = document.createElement('div');
    lastPageContainer.
    style.width = 18 + 'px';
    lastPageContainer.style.display = 'flex';
    lastPageContainer.style.justifyContent = 'space-between';
    lastPageContainer.style.alignItems = 'center';
    lastPageContainer.style.cursor = 'pointer'
    pageContainer.appendChild(lastPageContainer)

    var lastPage1 = document.createElement('div');
    lastPage1.style.width = 4 + 'px';
    lastPage1.style.height = 4 + 'px';
    lastPage1.style.backgroundColor = '#202124';
    lastPage1.style.borderRadius = 50 + '%';
    lastPage1.style.cursor = 'pointer'
    lastPageContainer.appendChild(lastPage1)
    var lastPage2 = document.createElement('div');
    lastPage2.style.width = 4 + 'px';
    lastPage2.style.height = 4 + 'px';
    lastPage2.style.backgroundColor = '#202124';
    lastPage2.style.borderRadius = 50 + '%';
    lastPage2.style.cursor = 'pointer'
    lastPageContainer.appendChild(lastPage2)
    var lastPage3 = document.createElement('div');
    lastPage3.style.width = 4 + 'px';
    lastPage3.style.height = 4 + 'px';
    lastPage3.style.backgroundColor = '#202124';
    lastPage3.style.borderRadius = 50 + '%';
    lastPage3.style.cursor = 'pointer'
    lastPageContainer.appendChild(lastPage3)



    var underline = document.createElement('div');
    underline.style.width = 12 + 'px';
    underline.style.border = '1px solid #FA6980';
    underline.style.marginLeft = '188px';
    underline.style.marginTop = '10px';
    underline.style.marginbottom = '80px';
    if(mainContainer !== null) {
    mainContainer.appendChild(underline);
    }

}

if(mobile.matches) {

    document.getElementById('image').src = './image/Arrow\ Back@2x.png'
    sec3_text.style.width =  327 + 'px';
    sec3_text.style.height = '77px';
    sec3_text.style.display = 'flex'
    sec3_text.style.alignItems = 'center'
    sec3_text.style.content = 'In hac habitasse platea dictumst. Sed nec venenatis odio. Nulla faucibus ipsum sed faucibus accumsan. Donec rhoncus luctus.'
    pageContainer.style.margin = '0px 71px 10px 71px'
    underline.style.margin = '0px 71px 30px 71px'
}