let nabvar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar');
let collapse = document.querySelector('#collapse');

window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;
    if (scrolled > 0) {
        nabvar.classList.remove('bg-black');
        nabvar.style.backgroundColor = `var(--yellow)`;
        collapse.classList.remove('bg-black');
        collapse.style.backgroundColor = `var(--yellow)`;
        nabvar.style.height = '140px';
        links.forEach((link) => {
            link.style.color = "var(--black)";
        });
        logoNavbar.src = './media/immagine.jpeg';
    } else {
        nabvar.classList.add('bg-black');
        nabvar.classList.remove('bg-yellow');
        collapse.classList.add('bg-black');
        collapse.classList.remove('bg-yellow');
        nabvar.style.height = '70px';
        links.forEach((link) => {
            link.style.color = `var(--yellow)`;
        });
        logoNavbar.src = './media/immagine.jpeg';
    }
});

let opener = document.querySelector('.opener');
let teachers = [
    {name: 'matteo', description: 'docente di html', url: './media/profilo.jpg' },
    {name: 'giulia', description: 'docente di javascript', url: './media/profilo.jpg' },
    {name: 'alessandro', description: 'docente di css', url: './media/profilo.jpg' },
    {name: 'francesco', description: 'docente di react', url: './media/profilo.jpg' },
];
let check = false;
let circle = document.querySelector('.circle');
let innerFace = document.querySelector('.inner-face');
let cardName = document.querySelector('#cardName');
let cardDescription = document.querySelector('#cardDescription');
let flipCard = document.querySelector('.flip-card');

opener.addEventListener('click', () => {
    if (check == false) {
        opener.style.transform = 'rotate(45deg)';
        movedDivs.forEach((movedDiv, i) => {
            let angle = (360 * i) / movedDivs.length;
            movedDiv.style.transform = `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`;
        });
        check = true;
    } else {
        check = false;
        opener.style.transform = 'rotate(0deg)';
        movedDivs.forEach((movedDiv, i) => {
            movedDiv.style.transform = `rotate(0deg) translate(0px) rotate(0deg)`;
        });
        flipCard.classList.add('d-none');
    }
});

teachers.forEach((teacher) => {
    let div = document.createElement('div');
    div.classList.add('moved');
    div.style.backgroundImage = `url(${teacher.url})`; 
    circle.appendChild(div);
});

let movedDivs = document.querySelectorAll('.moved');

movedDivs.forEach((movedDiv, i) => {
    movedDiv.addEventListener('click', ()=> {
        flipCard.classList.remove('d-none'); 
        let docente = teachers[i];
        innerFace.style.backgroundImage = `url(${docente.url})`;
        cardName.innerHTML = docente.name;
        cardDescription.innerHTML = docente.description;
    })
});
