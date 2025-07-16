let nabvar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar');
let collapse = document.querySelector('#collapse');
let firstSpan = document.querySelector('#firstSpan');
let secondSpan = document.querySelector('#secondSpan');
let thirdSpan = document.querySelector('#thirdSpan');
let confirm = true;
let swiperWrapper = document.querySelector('.swiper-wrapper');
let reviews = [
    {user: "silvio", description: "ahahahahahahahah", rank: 5 },
    {user: "piero", description: "bulabula", rank: 1 },
    {user: "carlo", description: "kkk", rank: 4 },
    {user: "magnum", description: "blabla", rank: 2 },
]

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

function createInterval(n, element, time) {
    let counter = 0;
    let interval = setInterval(() => {
        if (counter < n) {
            counter++;
            element.innerHTML = counter;
        }
        else{
            clearInterval(interval);
        }
    },time);
    
    setTimeout(() => {
        confirm = true;
    },8000);
};


let observer = new IntersectionObserver( (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && confirm == true) {
            createInterval(100, firstSpan, 100);
            createInterval(100, secondSpan, 50);
            createInterval(300, thirdSpan, 20);
            confirm = false;
        }
    });
} );

observer.observe(firstSpan);
observer.observe(secondSpan);
observer.observe(thirdSpan);


reviews.forEach((review) => {
    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
                    <div class="card-review">
                        <p class="lead text-center">${review.description}</p>
                        <p class="h4 text-center">${review.user}</p>
                        <div class="d-flex justify-content-center stars">
                            
                        </div>
                    </div>`;
    swiperWrapper.appendChild(div);
});

let stars = document.querySelectorAll('.stars');

stars.forEach((star, index) => {
    for (let i = 1; i <= reviews[index].rank; i++) {
        let icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-star');
        star.appendChild(icon);
    }
    let difference = 5 - reviews[index].rank;
    
    for (let i = 1; i <= difference; i++) {
        let icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-star');
        star.appendChild(icon);
    }
});

let swiper = new Swiper('.swiper', {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

[...document.querySelectorAll('*')].forEach(el => {
  if (el.offsetWidth > document.documentElement.clientWidth) {
    console.log('Elemento troppo largo:', el);
  }
});

