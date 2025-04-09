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



fetch('./annunci.json')
.then((response) => response.json())
.then((data) => {
    data.sort((a, b) => a.price - b.price);
    let radioWrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');
    let priceValue = document.querySelector('#priceValue');
    let wordInput = document.querySelector('#wordInput');
    let priceInput = document.querySelector('#priceInput');
    
    function radioCreate() {
        let categories = data.map((annuncio) => annuncio.category);
        //let uniqueCategories = [];
        
        //categories.array.forEach(category => {
            //    if (!uniqueCategories.includes(category)) {
        //        uniqueCategories.push(category)
        //    }
        //});
        
        let uniqueCategories = Array.from(new Set(categories));
        
        uniqueCategories.forEach((category) => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `<input class="form-check-input" type="radio" name="categories" id="${category}">
                             <label class="form-check-label" for="${category}">
                                 ${category}
                             </label>
                            `;
            radioWrapper.appendChild(div)
        });
    }
    
    radioCreate();
    
    function showCards(array) {
        cardWrapper.innerHTML = ' ';
        array.forEach((annuncio,) => {
            let div = document.createElement('div');
            div.classList.add('card-custom');
            div.innerHTML = `<p class="h2" title=${annuncio.name}">${truncateWord(annuncio.name)}</p>
                             <p class="h4">${annuncio.category}</p>
                             <p class="lead">${annuncio.price}</p>
                            `;
            cardWrapper.appendChild(div);
        });
    }
    
    function truncateWord(string) {
        if (string.length > 15) {
            return string.split(' ')[0] + '...';
        }
        else {
            return string;
        }
    }
    
    showCards(data)
    
    let radioButtons = document.querySelectorAll('.form-check-input');
    function filterByCategory(array) {
        let category = Array.from(radioButtons).find((radioButton) => radioButton.checked).id;
        if (category != 'allCategories') {
            let filtered = array.filter((annuncio) => annuncio.category == category);
            return filtered;
        }
        else{
            return array;
        }
    }
    
    
    radioButtons.forEach((radioButton) => {
        radioButton.addEventListener('click', () => {
            globalFilter();
            setPriceInput();
        });
    });
    
    function setPriceInput() {
        let prices = filterByCategory(data).map((annuncio) => +annuncio.price);
        prices.sort((a, b) => a - b);
        let maxPrice = Math.ceil(prices.pop());
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice;
    }
    
    setPriceInput()
    
    function filterByPrice(array) {
        let filtered = array.filter((annuncio) => +annuncio.price <= priceInput.value);
        return filtered;
    }
    
    priceInput.addEventListener('input', () => {
        priceValue.innerHTML = priceInput.value;
        globalFilter();
    });
    
    function filterByWord(array) {
        let filtered = array.filter((annuncio) => annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()));
        return filtered;
    }
    
    wordInput.addEventListener('input', () => {
        globalFilter();
    });
    
    function globalFilter() {
        let filteredByCategory = filterByCategory(data);
        let filteredByPrice = filterByPrice(filteredByCategory);
        let filteredByWord = filterByWord(filteredByPrice);
        showCards(filteredByWord);
    }
});
