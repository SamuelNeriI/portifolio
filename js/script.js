document.addEventListener("DOMContentLoaded", function() {
    // Função para adicionar animação de fade-in aos elementos
    function addFadeInAnimation() {
        const fadeInElements = document.querySelectorAll('.fade-in');
        const fadeInObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -100px 0px' });

        fadeInElements.forEach(element => {
            element.style.opacity = 0;
            element.style.transition = 'opacity 0.5s ease';
            fadeInObserver.observe(element);
        });
    }

    // Função para configurar o menu de navegação
    function setupNavigationMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('nav ul');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('open');
            });

            const navLinks = document.querySelectorAll('nav ul li a');
            navLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth' // Animação de rolagem suave
                        });
                    }
                    navMenu.classList.remove('open');
                });
            });
        }
    }

    // Função para destacar o link do menu de navegação conforme a seção visível
    function highlightNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Chamada das funções ao carregar a página
    addFadeInAnimation();
    setupNavigationMenu();
    window.addEventListener('scroll', highlightNav);
});
