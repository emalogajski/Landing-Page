let collapsibles;
let menu;
let sections;
let menuLink;
let timer = null;

function showHideMenu () {
    if(timer !== null) {
        clearTimeout(timer);
        menu.classList.remove("hidden");
    }

    timer = setTimeout(function() {
        menu.classList.add("hidden");
    }, 2000);
    console.log("Hello");
};

function init () {
    collapsibles = document.getElementsByTagName('button');
    menu = document.getElementById('remove');
    sections = document.getElementsByClassName('section');
    

    //Function for collapsing the sections
    for(let i = 0; i < collapsibles.length; i++) {
        collapsibles[i].addEventListener("click", function() {
            this.classList.toggle('sectiontitleonclick');
        })
    }

    initializeMenu();
    menuLink = document.querySelectorAll('#remove li');
    window.addEventListener('scroll', onScroll); 

    //Function for showing and removing menu in reaction to user scrolling
    window.addEventListener('scroll', showHideMenu);

}

window.onload = init;


//Function for showing the menu on hovering over hamburger menu as well
hamburgerMenu = document.getElementById("menu-icon");

hamburgerMenu.addEventListener('mouseover', showHideMenu);


//Function for the "to top" button and for adding the active state to the href attributes in the list items of the unordered list
const onScroll = function () {

    for(let i = 0; i < collapsibles.length; i++) {
        currentMenuLink = menuLink[i];
        sectionTitle = collapsibles[i];
        sectionWhole = sections[i];
        const position = sectionWhole.getBoundingClientRect();

        if(position.top <= 0 && position.bottom >= 0) {
            currentMenuLink.classList.add('active');
            sectionTitle.classList.add('active');
        } else {
            currentMenuLink.classList.remove('active');
            sectionTitle.classList.remove('active');
        }

    }   
};

//Function for adding the list items

function scrollToSection (collapsibles) {
    collapsibles.scrollIntoView();
}

function clickMenu(event) {
    console.log(event);
}

function initializeMenu() {
    for (let i = 0; i < collapsibles.length; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const current = document.getElementById('remove');
        const innerText = collapsibles[i].innerHTML;
        const stepOne = current.appendChild(li);
        const stepTwo = stepOne.appendChild(a);
        stepTwo.innerHTML = innerText;
        stepTwo.addEventListener('click', function (e) {
            e.preventDefault();
            collapsibles[i].scrollIntoView({behavior: "smooth"});
        });
    };
}



if(matchMedia) {
    const mediaQueryOne = window.matchMedia('(max-width: 425px)');
    removeMenuAppear(mediaQueryOne);
}

function removeMenuAppear(x) {
    console.log(x);
    if(x.matches) {
        window.removeEventListener('scroll', showHideMenu);
    }
}