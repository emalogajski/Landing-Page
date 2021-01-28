let collapsibles;
let menu;
let sections;
let menuLink;
let text;
let mediaQueryOne;
let timer = null;

function showHideMenu () {
    if(timer !== null) {
        clearTimeout(timer);
        menu.classList.remove('hidden');
    }

    timer = setTimeout(function() {
        menu.classList.add('hidden');
    }, 2000);
    console.log('Hello');
};

function init () {
    collapsibles = document.getElementsByTagName('button');
    menu = document.getElementsByClassName('menu')[0];
    sections = document.getElementsByClassName('section');

    //Function for collapsing the sections
    for(let i = 0; i < collapsibles.length; i++) {
        collapsibles[i].addEventListener('click', function() {
            this.classList.toggle('sectiontitleonclick');
            this.nextElementSibling.classList.toggle('collapsetext');
        })
    }

    initializeMenu();
    menuLink = document.querySelectorAll('.menu li');
    window.addEventListener('scroll', onScroll); 

    //Function for showing and removing menu in reaction to user scrolling
    window.addEventListener('scroll', showHideMenu);

}

window.onload = init;


//Function for showing the menu on hovering over hamburger menu as well
hamburgerMenu = document.getElementById('menu-icon');

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

function createMenuItem(menuItemText){
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.innerHTML = menuItemText;
    li.appendChild(a);
    return li;
}

function addScrollToSectionClickListener(menuItem, collapsibleSection){
    menuItem.querySelector('a').addEventListener('click', function (e) {
        e.preventDefault();
        collapsibleSection.scrollIntoView({behavior: 'smooth'});
    });
}

function initializeMenu() {
    for (let i = 0; i < collapsibles.length; i++) {
        const collapsibleSection = collapsibles[i];
        const collapsibleSectionName = collapsibleSection.innerHTML;
        const menuItem = createMenuItem(collapsibleSectionName);
        addScrollToSectionClickListener(menuItem, collapsibleSection)
        menu.appendChild(menuItem);
    }
}

window.addEventListener('resize', mediaQueries);

function mediaQueries () {
    if(window.innerWidth <= 425) {
        window.removeEventListener('scroll', showHideMenu);
        window.listenerAdded === false;
    } else if(window.innerWidth > 425) {
        window.addEventListener('scroll', showHideMenu);
        window.listenerAdded === true;
    }
}

