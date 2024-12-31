let toggles =  document.getElementsByClassName('toggle');
let contentDiv = document.getElementsByClassName('content');
let icons = document.getElementsByClassName('icon');
//console.log(toggles, contentDiv, icons);

for(let i=0; i<toggles.length; i++ ) {
    toggles[i].addEventListener('click', ()=> {
        console.log(contentDiv[i].style.height, contentDiv[i].scrollHeight);
        if  (parseInt(contentDiv[i].style.height) !=  contentDiv[i].scrollHeight) {
            contentDiv[i].style.height = contentDiv[i].scrollHeight +  "px";
        }
    });
}
//.height = contentDiv[i].scrollHeight + "px"