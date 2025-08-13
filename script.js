document.addEventListener('DOMContentLoaded', function() {

    // ===================================================
    // 1. MENU HAMBURGER PER MOBILE
    // ===================================================
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

    // ===================================================
    // 2. ANIMAZIONE "REVEAL" ALLO SCORRIMENTO
    // ===================================================
    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ===================================================
    // 3. CAROSELLO PRODOTTI (COVER FLOW)
    // ===================================================
    const productImages = [
        'data/prodotti/Tavola disegno 2@3x.png', 'data/prodotti/Tavola disegno 3@3x.png', 'data/prodotti/Tavola disegno 4@3x.png', 'data/prodotti/Tavola disegno 5@3x.png', 'data/prodotti/Tavola disegno 6@3x.png', 'data/prodotti/Tavola disegno 7@3x.png', 'data/prodotti/Tavola disegno 8@3x.png', 'data/prodotti/Tavola disegno 9@3x.png', 'data/prodotti/Tavola disegno 10@3x.png', 'data/prodotti/Tavola disegno 11@3x.png', 'data/prodotti/Tavola disegno 12@3x.png', 'data/prodotti/Tavola disegno 13@3x.png', 'data/prodotti/Tavola disegno 14@3x.png', 'data/prodotti/Tavola disegno 15@3x.png', 'data/prodotti/Tavola disegno 16@3x.png', 'data/prodotti/Tavola disegno 17@3x.png', 'data/prodotti/Tavola disegno 18@3x.png', 'data/prodotti/Tavola disegno 19@3x.png', 'data/prodotti/Tavola disegno 20@3x.png', 'data/prodotti/Tavola disegno 21@3x.png', 'data/prodotti/Tavola disegno 22@3x.png', 'data/prodotti/Tavola disegno 23@3x.png', 'data/prodotti/Tavola disegno 24@3x.png', 'data/prodotti/Tavola disegno 25@3x.png', 'data/prodotti/Tavola disegno 26@3x.png', 'data/prodotti/Tavola disegno 27@3x.png', 'data/prodotti/Tavola disegno 28@3x.png', 'data/prodotti/Tavola disegno 29@3x.png', 'data/prodotti/Tavola disegno 30@3x.png', 'data/prodotti/Tavola disegno 31@3x.png', 'data/prodotti/Tavola disegno 32@3x.png'
    ];

    const carouselTrack = document.querySelector('.carousel-track');
    const carouselPrevButton = document.querySelector('.carousel-container .arrow.prev');
    const carouselNextButton = document.querySelector('.carousel-container .arrow.next');

    if (carouselTrack && carouselPrevButton && carouselNextButton) {
        let currentIndex = 0;
        
        productImages.forEach(src => {
            const listItem = document.createElement('li');
            listItem.className = 'carousel-item';
            const image = document.createElement('img');
            image.src = src;
            image.alt = 'Prodotto Giacoia';
            listItem.appendChild(image);
            carouselTrack.appendChild(listItem);
        });
        
        const items = document.querySelectorAll('.carousel-item');
        const totalItems = items.length;

        function updateCarousel() {
            items.forEach((item, i) => {
                item.classList.remove('is-active', 'is-prev', 'is-next');
                if (i === currentIndex) {
                    item.classList.add('is-active');
                } else if (i === (currentIndex - 1 + totalItems) % totalItems) {
                    item.classList.add('is-prev');
                } else if (i === (currentIndex + 1) % totalItems) {
                    item.classList.add('is-next');
                }
            });
        }

        carouselNextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        });

        carouselPrevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        });

        updateCarousel();
    }

    // ===================================================
    // 4. POPOLARE IL SELECT DEI PRODOTTI NEL FORM
    // ===================================================
        const searchInput = document.getElementById('product-search');
        const suggestionsContainer = document.getElementById('product-suggestions');

        const fullServicesList = [
            "Consulenza", "Visual Communication Design", "Brand Identity", "Business Stationery",
            "Brochure, Flyers, Pieghevoli", "Editoria e Cataloghi", "Timbri", "Custom Gadgets",
            "Etichette e Sticker adesivi", "Manifesti e Locandine", "Calendari", "Stampa Foglia Oro",
            "Stampa grandi formati", "Super Allestimenti", "Show Stand", "Roll Up", "Expo Banner",
            "Totem", "A-Stand", "Espositori", "Tele Canvas", "Abbigliamento personalizzato",
            "Abbigliamento professionale", "Allestimento Vetrine", "Insegne Luminose",
            "Vehicle Branding", "Taglio Laser", "Promo desk", "Targhe da parete",
            "Paper Shopping Bags", "Cotton Shopping Bags", "Flags", "Trofei, Targhe e Medaglie per premiazioni"
        ];

        if (searchInput && suggestionsContainer) {

            // Funzione che mostra i suggerimenti
            function showSuggestions(filteredServices) {
                suggestionsContainer.innerHTML = ''; // Svuota i suggerimenti precedenti
                if (filteredServices.length === 0) {
                    suggestionsContainer.classList.remove('active');
                    return;
                }

                filteredServices.forEach(service => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.textContent = service;
                    
                    // Quando si clicca su un suggerimento...
                    div.addEventListener('click', () => {
                        searchInput.value = service; // ...riempi il campo di testo
                        suggestionsContainer.classList.remove('active'); // ...nascondi la lista
                    });

                    suggestionsContainer.appendChild(div);
                });

                suggestionsContainer.classList.add('active');
            }

            // Evento: quando l'utente scrive nel campo di ricerca
            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                
                if (query.length === 0) {
                    suggestionsContainer.classList.remove('active');
                    return;
                }

                // Filtra la lista dei servizi
                const filtered = fullServicesList.filter(service => 
                    service.toLowerCase().includes(query)
                );
                
                showSuggestions(filtered);
            });
            
            // Evento: quando l'utente clicca fuori dal campo di ricerca, nascondi i suggerimenti
            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target)) {
                    suggestionsContainer.classList.remove('active');
                }
            });
        }

    // ===================================================
    // 5. GESTIONE FORM DI CONTATTO (MAILTO)
    // ===================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const messaggio = document.getElementById('messaggio').value.trim();
            const prodottoSelezionato = document.getElementById('prodotto').value; // Recupera il prodotto selezionato
            const formNote = document.getElementById('form-note');

            if (!nome || !email || !messaggio) {
                if(formNote) formNote.textContent = 'Per favore, compila tutti i campi obbligatori.';
                return;
            }

            // Costruisci il corpo dell'email includendo il prodotto
            const subject = encodeURIComponent(`Richiesta dal sito - ${nome}`);
            const body = encodeURIComponent(
                `Nome: ${nome}\n` +
                `Email: ${email}\n` +
                `Prodotto di interesse: ${prodottoSelezionato || 'Non specificato'}\n\n` +
                `Messaggio:\n${messaggio}`
            );

            window.location.href = `mailto:giacoia-e@libero.it?subject=${subject}&body=${body}`;
            if(formNote) formNote.textContent = 'Sto aprendo il tuo client di posta...';
        });
    }

    // ===================================================
    // 6. OVERLAY "WORK IN PROGRESS" PER SOCIAL
    // ===================================================
    const wipOverlay = document.getElementById('wip-overlay');
    const wipCloseButton = document.getElementById('wip-close');
    const wipTriggers = document.querySelectorAll('.js-wip-trigger');

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
    }

    // ===================================================
    // 7. PLACEHOLDER PERSONALIZZATO PER TEXTAREA
    // ===================================================
    const textarea = document.getElementById('messaggio');
    const placeholder = document.getElementById('textarea-placeholder');

    if (textarea && placeholder) {
        textarea.addEventListener('input', () => {
            if (textarea.value.length > 0) {
                placeholder.style.opacity = '0';
            } else {
                placeholder.style.opacity = '1';
            }
        });
    }

}); // Fine del DOMContentLoaded