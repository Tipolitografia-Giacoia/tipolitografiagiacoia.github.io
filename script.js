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
    const carouselProductsData = [
        { imageSrc: 'data/prodotti/Tavola disegno 2@3x.png', labelText: 'Consulenza e Design' },
        { imageSrc: 'data/prodotti/Tavola disegno 3@3x.png', labelText: 'Business Stationery' },
        { imageSrc: 'data/prodotti/Tavola disegno 4@3x.png', labelText: 'Brochure, Flyers, Pieghevoli' },
        { imageSrc: 'data/prodotti/Tavola disegno 5@3x.png', labelText: 'Editoria e Cataloghi' },
        { imageSrc: 'data/prodotti/Tavola disegno 6@3x.png', labelText: 'Timbri' },
        { imageSrc: 'data/prodotti/Tavola disegno 7@3x.png', labelText: 'Custom Gadgets' },
        { imageSrc: 'data/prodotti/Tavola disegno 8@3x.png', labelText: 'Stampa Offset, Digitale e Serigrafica' },
        { imageSrc: 'data/prodotti/Tavola disegno 9@3x.png', labelText: 'Etichette e Sticker adesivi' },
        { imageSrc: 'data/prodotti/Tavola disegno 10@3x.png', labelText: 'Manifesti e Locandine' },
        { imageSrc: 'data/prodotti/Tavola disegno 11@3x.png', labelText: 'Calendari' },
        { imageSrc: 'data/prodotti/Tavola disegno 12@3x.png', labelText: 'Stampa Foglia Oro' },
        { imageSrc: 'data/prodotti/Tavola disegno 13@3x.png', labelText: 'Stampa grandi formati' },
        { imageSrc: 'data/prodotti/Tavola disegno 14@3x.png', labelText: 'Show Stand' },
        { imageSrc: 'data/prodotti/Tavola disegno 15@3x.png', labelText: 'Roll Up' },
        { imageSrc: 'data/prodotti/Tavola disegno 16@3x.png', labelText: 'Expo Banner' },
        { imageSrc: 'data/prodotti/Tavola disegno 17@3x.png', labelText: 'Totem' },
        { imageSrc: 'data/prodotti/Tavola disegno 18@3x.png', labelText: 'A-Stand' },
        { imageSrc: 'data/prodotti/Tavola disegno 19@3x.png', labelText: 'Espositori' },
        { imageSrc: 'data/prodotti/Tavola disegno 20@3x.png', labelText: 'Tele Canvas' },
        { imageSrc: 'data/prodotti/Tavola disegno 21@3x.png', labelText: 'Abbigliamento personalizzato' },
        { imageSrc: 'data/prodotti/Tavola disegno 22@3x.png', labelText: 'Abbigliamento professionale' },
        { imageSrc: 'data/prodotti/Tavola disegno 23@3x.png', labelText: 'Allestimento Vetrine' },
        { imageSrc: 'data/prodotti/Tavola disegno 24@3x.png', labelText: 'Insegne Luminose' },
        { imageSrc: 'data/prodotti/Tavola disegno 25@3x.png', labelText: 'Vehicle Branding' },
        { imageSrc: 'data/prodotti/Tavola disegno 26@3x.png', labelText: 'Taglio Laser' },
        { imageSrc: 'data/prodotti/Tavola disegno 27@3x.png', labelText: 'Promo desk' },
        { imageSrc: 'data/prodotti/Tavola disegno 28@3x.png', labelText: 'Targhe da parete' },
        { imageSrc: 'data/prodotti/Tavola disegno 29@3x.png', labelText: 'Paper Shopping Bags' },
        { imageSrc: 'data/prodotti/Tavola disegno 30@3x.png', labelText: 'Cotton Shopping Bags' },
        { imageSrc: 'data/prodotti/Tavola disegno 31@3x.png', labelText: 'Flags' },
        { imageSrc: 'data/prodotti/Tavola disegno 32@3x.png', labelText: 'Trofei, Targhe e Medaglie' }
    ];

    const carouselTrack = document.querySelector('.carousel-track');
    const carouselPrevButton = document.querySelector('.carousel-container .arrow.prev');
    const carouselNextButton = document.querySelector('.carousel-container .arrow.next');
    const requestInfoButton = document.getElementById('request-info-btn');

    if (carouselTrack && carouselPrevButton && carouselNextButton && requestInfoButton) {
        let currentIndex = 0;

        // Funzione riutilizzabile per andare al form di contatto
        const goToContactFormWithProduct = (productName) => {
            const searchInput = document.getElementById('product-search');
            if (searchInput) {
                searchInput.value = productName;
            }
            const contactSection = document.getElementById('contattaci');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        };

        // Genera dinamicamente gli elementi del carosello
        carouselProductsData.forEach((product, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'carousel-item';
            const image = document.createElement('img');
            image.src = product.imageSrc;
            image.alt = product.labelText;
            image.loading = 'lazy';
            listItem.appendChild(image);
            
            // Aggiungi l'evento click all'immagine (listItem)
            listItem.addEventListener('click', () => {
                if (index === currentIndex) {
                    goToContactFormWithProduct(product.labelText);
                }
            });

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

        // Aggiungi gli eventi alle frecce
        carouselNextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        });

        carouselPrevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        });
        
        // Aggiungi l'evento al pulsante "RICHIEDI INFO"
        requestInfoButton.addEventListener('click', () => {
            const currentProduct = carouselProductsData[currentIndex];
            goToContactFormWithProduct(currentProduct.labelText);
        });


        // ===============================================
        // LOGICA PER SWIPE/DRAG SUL CAROSELLO
        // ===============================================
        let isDown = false;
        let startX;
        let isDragging = false;

        const startDrag = (e) => {
            isDown = true;
            carouselTrack.style.cursor = 'grabbing';
            startX = (e.pageX || e.touches[0].pageX) - carouselTrack.offsetLeft;
            isDragging = false;
        };

        const endDrag = (e) => {
            carouselTrack.style.cursor = 'grab';
            if (!isDown || !isDragging) {
                isDown = false;
                return;
            }
            isDown = false;
            
            // Calcoliamo lo spostamento finale
            const endX = e.pageX || e.changedTouches[0].pageX;
            const walk = endX - (e.touches ? 0 : carouselTrack.offsetLeft) - startX;
            const swipeThreshold = 50; // Soglia minima in pixel per considerare lo swipe

            // Se lo swipe è abbastanza ampio...
            if (walk < -swipeThreshold) {
                // ...vai avanti (swipe a sinistra)
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
            } else if (walk > swipeThreshold) {
                // ...vai indietro (swipe a destra)
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                updateCarousel();
            }
        };

        const onDrag = (e) => {
            if (!isDown) return;
            isDragging = true;
        };

        // Eventi del Mouse
        carouselTrack.addEventListener('mousedown', startDrag);
        carouselTrack.addEventListener('mouseup', endDrag);
        carouselTrack.addEventListener('mouseleave', endDrag);
        carouselTrack.addEventListener('mousemove', onDrag);

        // Eventi Touch
        carouselTrack.addEventListener('touchstart', startDrag, { passive: true });
        carouselTrack.addEventListener('touchend', endDrag);
        carouselTrack.addEventListener('touchmove', onDrag);

        // Inizializza il carosello
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

            // 1. Recupera i valori dai campi del form
            const nome = document.getElementById('nome').value.trim();
            const emailMittente = document.getElementById('email').value.trim();
            const prodottoSelezionato = document.getElementById('product-search').value.trim();
            const messaggio = document.getElementById('messaggio').value.trim();
            const formNote = document.getElementById('form-note');

            // 2. Validazione semplice
            if (!nome || !emailMittente || !messaggio) {
                if (formNote) formNote.textContent = 'Per favore, compila tutti i campi obbligatori.';
                return;
            }

            // 3. Costruisci il nuovo oggetto dell'email
            const oggettoMail = `Richiesta Informazioni da sito web - ${prodottoSelezionato || 'Generica'}`;

            // 4. Costruisci il nuovo corpo del messaggio, includendo tutti i campi
            const corpoMail = `Nome: ${nome}\n\n` +
                              `Email: ${emailMittente}\n\n` +
                              `Messaggio:\n${messaggio}`;

            // 5. Codifica i testi per l'URL e crea il link mailto
            const subject = encodeURIComponent(oggettoMail);
            const body = encodeURIComponent(corpoMail);
            
            window.location.href = `mailto:giacoia-e@libero.it?subject=${subject}&body=${body}`;
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

    // ========= 8. GESTIONE BANNER COOKIE =========
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesButton = document.getElementById('accept-cookies');
    const rejectCookies = document.getElementById('reject-cookies');

    if (cookieBanner) {
        // Controlla se l'utente ha già dato il consenso
        if (!localStorage.getItem('cookieConsent')) { // Modificato da 'cookie_consent' a 'cookieConsent' per coerenza
            // Se non c'è il consenso, mostra il banner dopo un breve ritardo
            setTimeout(() => {
                cookieBanner.classList.add('active');
            }, 1000);
        }
    }

    // Gestione del pulsante ACCETTA
    if (acceptCookiesButton) {
        acceptCookiesButton.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            if (cookieBanner) cookieBanner.classList.remove('active');
        });
    }


    // NUOVA GESTIONE per il pulsante RIFIUTA
    if (rejectCookies) {
        rejectCookies.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'rejected');
            if (cookieBanner) cookieBanner.classList.remove('active');
        });
    }
    
    // ===================================================
    // 9. ANIMAZIONE PAROLE DINAMICHE (EFFETTO TYPEWRITER ASINCRONO)
    // ===================================================

    const dynamicWord1 = document.getElementById('dynamic-word-1');
    const dynamicWord2 = document.getElementById('dynamic-word-2');

    if (dynamicWord1 && dynamicWord2) {

        const wordsForInspire = ["Guida", "Comunica", "Evoca", "Definisce", "Accende", "Valorizza", "Racconta", "Orienta", "Modella", "Ispira"];
        const wordsForSeduce = ["Affascina", "Attrae", "Cattura", "Conquista", "Incanta", "Avvince", "Ammalia", "Invoglia", "Coinvolge", "Seduce"];

        // Funzione generica per l'effetto typewriter
        function typeWriter(element, words, initialDelay) {
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function type() {
                const currentWord = words[wordIndex].toUpperCase() + '.';
                const currentText = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
                
                element.textContent = currentText;

                let typeSpeed = isDeleting ? 75 : 150; // Velocità di scrittura/cancellazione

                if (!isDeleting && currentText === currentWord) {
                    // Pausa alla fine della parola
                    isDeleting = true;
                    typeSpeed = 1500; // Pausa prima di cancellare
                } else if (isDeleting && currentText === '') {
                    // Passa alla parola successiva
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    typeSpeed = 500; // Pausa prima di scrivere la nuova parola
                }

                charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
                setTimeout(type, typeSpeed);
            }
            
            // Avvia l'animazione dopo un ritardo iniziale
            setTimeout(type, initialDelay);
        }

        // Avvia le due animazioni in modo asincrono
        typeWriter(dynamicWord1, wordsForInspire, 1000); // La prima parte dopo 1 secondo
        typeWriter(dynamicWord2, wordsForSeduce, 1800);  // La seconda parte dopo 1.8 secondi, per un effetto sfalsato
    }

    function scalePage() {
      const wrapper = document.querySelector('.page-wrapper');
      const minWidth = 1024;   // soglia minima da  cui applicare scaling verso l'alto
      const maxWidth = 1320;   // larghezza base "design"
      const vw = window.innerWidth;
      let scale = 1;

      if (vw <= minWidth) {
        // Per larghezze sotto o uguali a 1024, nessuno scaling: le regole specifiche sotto 1024 si attivano
        scale = 1;
      } else if (vw > minWidth && vw < maxWidth) {
        // Scala da 1 (a 1024) a 1 (a 1320): scalatura lineare da 1024 a 1320
        scale = vw / maxWidth;
      } else if (vw >= maxWidth) {
        // A partire da 1320, scala proporzionalmente oltre 1320
        scale = vw / maxWidth;
      }

      wrapper.style.transform = `scale(${scale})`;
      wrapper.style.transformOrigin = 'top center';
    }

    window.addEventListener('resize', scalePage);
    window.addEventListener('load', scalePage);

    window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      if (!header) return;

      if (window.scrollY > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    document.querySelectorAll('.nav-link, .footer a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });

          // Chiudi menu hamburger se attivo (opzionale)
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    });
}); // Fine del DOMContentLoaded