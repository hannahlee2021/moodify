let toggles =  document.getElementsByClassName('toggle');
let contentDiv = document.getElementsByClassName('content');
let icons = document.getElementsByClassName('icon');
//console.log(toggles, contentDiv, icons);

for(let i=0; i<toggles.length; i++ ) {
    toggles[i].addEventListener('click', ()=> {
        console.log(contentDiv[i].style.height, contentDiv[i].scrollHeight);
        if  (parseInt(contentDiv[i].style.height) !=  contentDiv[i].scrollHeight) {
            contentDiv[i].style.height = contentDiv[i].scrollHeight +  "px";
            toggles[i].style.color = "#1a16bf";
            icons[i].classList.remove('fa-play');
            icons[i].classList.add('fa-pause');
        }
        else{
            contentDiv[i].style.height = "0px";
            toggles[i].style.color = "#1a16bf";
            icons[i].classList.remove('fa-pause');
            icons[i].classList.add('fa-play');
        }

        for(let j=0; j<contentDiv.length; j++) {
            if(j !== i) {
            contentDiv[j].style.height = "0px";
            toggles[j].style.color = "#000000";
            icons[j].classList.remove('fa-pause');
            icons[j].classList.add('fa-play');
            }
        }
    });
}