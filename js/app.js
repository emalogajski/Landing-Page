let collapsible;
let menu;
let sectionBig;
let menuLink;
let timer = null;



function init () {
    collapsible = document.getElementsByTagName('button');
    menu = document.getElementById('remove');
    sectionBig = document.getElementsByClassName('section');
    

    //Function for collapsing the sections
    for(let i = 0; i < collapsible.length; i++) {
        collapsible[i].addEventListener("click", function() {
            let content = this.nextElementSibling;
            if(content.style.display === "none") {
                content.style.display = "block";
                this.classList.add("sectiontitleonclick");
            } else {
                content.style.display = "none";
                this.classList.remove("sectiontitleonclick");
            }
        })
    }

    initializeMenu();
    menuLink = document.querySelectorAll('#remove li');
    window.addEventListener('scroll', onScroll); 

    //Function for showing and removing menu in reaction to user scrolling
    window.addEventListener('scroll', function() {
        if(timer !== null) {
            clearTimeout(timer);
            menu.classList.remove("hidden");
        }

        timer = setTimeout(function() {
            menu.classList.add("hidden");
        }, 2000);
    }, false);

}

window.onload = init;


//Function for showing the menu on hovering over hamburger menu as well
hamburgerMenu = document.getElementById("menuIcon");

hamburgerMenu.addEventListener('mouseover', function() {
    if(timer !== null) {
        clearTimeout(timer);
        menu.classList.remove("hidden");
    }

    timer = setTimeout(function() {
        menu.classList.add("hidden");
    }, 2000);
}, false);


//Function for the "to top" button and for adding the active state to the href attributes in the list items of the unordered list
const onScroll = function () {

    for(let i = 0; i < collapsible.length; i++) {
        currMenuLink = menuLink[i];
        sectionTitle = collapsible[i];
        sectionWhole = sectionBig[i];
        const position = sectionWhole.getBoundingClientRect();

        if(position.top <= 0 && position.bottom >= 0) {
            currMenuLink.classList.add('active');
            sectionTitle.classList.add('active');
        } else {
            currMenuLink.classList.remove('active');
            sectionTitle.classList.remove('active');
        }

    }   
};

//Function for adding the list items

function scrollToSection (collapsible) {
    collapsible.scrollIntoView();
}

function clickMenu(event) {
    console.log(event);
}

function initializeMenu() {
    for (let i = 0; i < collapsible.length; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const current = document.getElementById('remove');
        const innerText = collapsible[i].innerHTML;
        const stepOne = current.appendChild(li);
        const stepTwo = stepOne.appendChild(a);
        stepTwo.innerHTML = innerText;
        stepTwo.addEventListener('click', function (e) {
            e.preventDefault();
            collapsible[i].scrollIntoView({behavior: "smooth"});
        });
    };
}



if(matchMedia) {
    const mediaQueryOne = window.matchMedia('(max-width: 425px)');
    mediaQueryOne.addEventListener('scroll', removeMenuAppear, false);
    removeMenuAppear(mediaQueryOne);
}

function removeMenuAppear(x) {
    if(x.matches) {
        window.removeEventListener('scroll', function() {
            if(timer !== null) {
                clearTimeout(timer);
                menu.classList.remove("hidden");
            }
    
            timer = setTimeout(function() {
                menu.classList.add("hidden");
            }, 2000);
        });
    }
}