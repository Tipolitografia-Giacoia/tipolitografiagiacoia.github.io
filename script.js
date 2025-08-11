// Questo è l'unico blocco di codice che deve essere in script.js
document.addEventListener('DOMContentLoaded', function() {

    console.log("Script caricato e DOM pronto.");

    // 1. MENU HAMBURGER
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    // 2. ANIMAZIONE REVEAL
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));

    // 3. CAROSELLO PRODOTTI
    const productImages = [
    'data/prodotti/Tavola disegno 2@3x.png',
    'data/prodotti/Tavola disegno 3@3x.png',
    'data/prodotti/Tavola disegno 4@3x.png',
    'data/prodotti/Tavola disegno 5@3x.png',
    'data/prodotti/Tavola disegno 6@3x.png',
    'data/prodotti/Tavola disegno 7@3x.png',
    'data/prodotti/Tavola disegno 8@3x.png',
    'data/prodotti/Tavola disegno 9@3x.png',
    'data/prodotti/Tavola disegno 10@3x.png',
    'data/prodotti/Tavola disegno 11@3x.png',
    'data/prodotti/Tavola disegno 12@3x.png',
    'data/prodotti/Tavola disegno 13@3x.png',
    'data/prodotti/Tavola disegno 14@3x.png',
    'data/prodotti/Tavola disegno 15@3x.png',
    'data/prodotti/Tavola disegno 16@3x.png',
    'data/prodotti/Tavola disegno 17@3x.png',
    'data/prodotti/Tavola disegno 18@3x.png',
    'data/prodotti/Tavola disegno 19@3x.png',
    'data/prodotti/Tavola disegno 20@3x.png',
    'data/prodotti/Tavola disegno 21@3x.png',
    'data/prodotti/Tavola disegno 22@3x.png',
    'data/prodotti/Tavola disegno 23@3x.png',
    'data/prodotti/Tavola disegno 24@3x.png',
    'data/prodotti/Tavola disegno 25@3x.png',
    'data/prodotti/Tavola disegno 26@3x.png',
    'data/prodotti/Tavola disegno 27@3x.png',
    'data/prodotti/Tavola disegno 28@3x.png',
    'data/prodotti/Tavola disegno 29@3x.png',
    'data/prodotti/Tavola disegno 30@3x.png',
    'data/prodotti/Tavola disegno 31@3x.png',
    'data/prodotti/Tavola disegno 32@3x.png'
    ];

    let currentProductIndex = 0;
    const productImageEl = document.getElementById('product-image');
    const prevButton = document.querySelector('.arrow.prev');
    const nextButton = document.querySelector('.arrow.next');

    function showProduct(index) {
        if (!productImageEl) return;
        productImageEl.style.opacity = '0';
        setTimeout(() => {
            productImageEl.src = productImages[index];
            productImageEl.alt = `Prodotto ${index + 1}`; // Alt text per accessibilità
            productImageEl.style.opacity = '1';
        }, 400);
    }

    if (productImageEl && prevButton && nextButton) {
        showProduct(currentProductIndex);
        nextButton.addEventListener('click', () => { 
            currentProductIndex = (currentProductIndex + 1) % productImages.length; 
            showProduct(currentProductIndex); 
        });
        prevButton.addEventListener('click', () => { 
            currentProductIndex = (currentProductIndex - 1 + productImages.length) % productImages.length; 
            showProduct(currentProductIndex); 
        });
    }

    // 4. FORM DI CONTATTO
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const messaggio = document.getElementById('messaggio').value.trim();
            const formNote = document.getElementById('form-note');
            if (!nome || !email || !messaggio) {
                if(formNote) formNote.textContent = 'Per favore, compila tutti i campi obbligatori.';
                return;
            }
            const subject = encodeURIComponent(`Richiesta dal sito - ${nome}`);
            const body = encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\n\nMessaggio:\n${messaggio}`);
            window.location.href = `mailto:giacoia-e@libero.it?subject=${subject}&body=${body}`;
            if(formNote) formNote.textContent = 'Sto aprendo il tuo client di posta...';
        });
    }

    // 5. OVERLAY WORK IN PROGRESS
    const wipOverlay = document.getElementById('wip-overlay');
    const wipCloseButton = document.getElementById('wip-close');
    const wipTriggers = document.querySelectorAll('.js-wip-trigger');
    
    // Log di Debug
    console.log("Overlay WIP trovato:", wipOverlay);
    console.log("Pulsanti Social trovati:", wipTriggers.length);

    if (wipTriggers.length > 0 && wipOverlay) {
        const openOverlay = (event) => {
            event.preventDefault();
            wipOverlay.classList.add('active');
        };
        const closeOverlay = () => {
            wipOverlay.classList.remove('active');
        };
        wipTriggers.forEach(trigger => {
            trigger.addEventListener('click', openOverlay);
        });
        if (wipCloseButton) {
            wipCloseButton.addEventListener('click', closeOverlay);
        }
    } else {
        console.error("Errore: Elementi per l'overlay WIP non trovati.");
    }
});