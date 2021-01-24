let collapsible;
let menu;
let buttons;
let section; 
let sectionBig;
let menuLink;
let timer = null;



function init () {
    console.log('init')
    collapsible = document.getElementsByClassName('coll');
    menu = document.getElementById('remove');
    buttons = document.querySelectorAll('.coll');
    section = document.getElementById('parts').getElementsByClassName('coll');
    sectionBig = document.getElementsByClassName('part');
    

    //Function for collapsing the sections
    for(let i = 0; i < collapsible.length; i++) {
        collapsible[i].addEventListener("click", function() {
            let content = this.nextElementSibling;
            if(content.style.display === "none") {
                content.style.display = "block";
            } else {
                content.style.display = "none";
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


//Function for the "to top" button and for adding the active state to the href attributes in the list items of the unordered list
const onScroll = function () {

    for(let i = 0; i < section.length; i++) {
        currMenuLink = menuLink[i];
        sectionTitle = section[i];
        sectionBigg = sectionBig[i];
        const position = sectionBigg.getBoundingClientRect();

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

function scrollToSection (section) {
    section.scrollIntoView();
}

function clickMenu(event) {
    console.log(event);
}

function initializeMenu() {
    for (let i = 0; i < buttons.length; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const current = document.getElementById('remove');
        const innerText = buttons[i].innerHTML;
        const stepOne = current.appendChild(li);
        const stepTwo = stepOne.appendChild(a);
        stepTwo.innerHTML = innerText;
        stepTwo.addEventListener('click', function (e) {
            e.preventDefault();
            collapsible[i].scrollIntoView({behavior: "smooth"});
        });
    };
}

