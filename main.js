let nabvar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar');

window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;
    if (scrolled > 0) {
        nabvar.classList.remove('bg-black');
        nabvar.classList.add('bg-yellow');
        nabvar.style.height = '140px';
        links.forEach((link) => {
            link.style.color = `var(--black)`
        })
        logoNavbar.src = ''
    } else {
        nabvar.classList.add('bg-black');
        nabvar.classList.remove('bg-yellow');
        nabvar.style.height = '70px';
        links.forEach((link) => {
            link.style.color = `var(--yellow)`
        })
        logoNavbar.src = ''
    }
});