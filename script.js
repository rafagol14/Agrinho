/**
 * TecnoAgro Sustentável - JavaScript
 * Funcionalidades interativas do site
 */

// ============================================
// Tabs Interativas
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona active ao botão clicado e seu conteúdo
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // ============================================
    // Smooth Scroll para Links de Navegação
    // ============================================

    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // Animações ao Scroll
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar cards
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    document.querySelectorAll('.bio-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    // ============================================
    // Animação de Números (Contadores)
    // ============================================

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // ============================================
    // Hover Effects em Cards
    // ============================================

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ============================================
    // Animação de Gráficos ao Scroll
    // ============================================

    const charts = document.querySelectorAll('.chart');
    const chartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateChart(entry.target);
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    charts.forEach(chart => {
        chartObserver.observe(chart);
    });

    function animateChart(chart) {
        const lines = chart.querySelectorAll('line');
        const rects = chart.querySelectorAll('rect');
        const circles = chart.querySelectorAll('circle');
        const paths = chart.querySelectorAll('path');
        
        // Animar linhas
        lines.forEach((line, index) => {
            const length = line.getTotalLength ? line.getTotalLength() : 0;
            if (length > 0) {
                line.style.strokeDasharray = length;
                line.style.strokeDashoffset = length;
                line.style.animation = `drawLine 0.6s ease-out ${index * 0.1}s forwards`;
            }
        });

        // Animar barras
        rects.forEach((rect, index) => {
            const height = rect.getAttribute('height');
            rect.setAttribute('height', '0');
            rect.style.animation = `growBar 0.6s ease-out ${index * 0.05}s forwards`;
        });

        // Animar círculos
        circles.forEach((circle, index) => {
            circle.style.animation = `popIn 0.4s ease-out ${index * 0.1}s forwards`;
        });

        // Animar paths
        paths.forEach((path, index) => {
            const length = path.getTotalLength ? path.getTotalLength() : 0;
            if (length > 0) {
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
                path.style.animation = `drawLine 0.8s ease-out ${index * 0.1}s forwards`;
            }
        });
    }

    // ============================================
    // Botões de Ação
    // ============================================

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efeito de ripple
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = ripple.style.height = '20px';
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ============================================
    // Scroll Spy para Header
    // ============================================

    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.style.color = 'var(--primary)';
            } else {
                item.style.color = 'var(--text-gray)';
            }
        });
    });

    // ============================================
    // Mobile Menu (se necessário)
    // ============================================

    // Adicionar funcionalidade de menu mobile aqui se necessário

    // ============================================
    // Lazy Loading de Imagens
    // ============================================

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // Adicionar Keyframes Dinamicamente
    // ============================================

    const style = document.createElement('style');
    style.textContent = `
        @keyframes drawLine {
            from {
                stroke-dashoffset: var(--length);
            }
            to {
                stroke-dashoffset: 0;
            }
        }

        @keyframes growBar {
            from {
                height: 0;
                opacity: 0;
            }
            to {
                height: var(--height);
                opacity: 1;
            }
        }

        @keyframes popIn {
            from {
                r: 0;
                opacity: 0;
            }
            to {
                r: 5;
                opacity: 1;
            }
        }

        @keyframes ripple {
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // Parallax Effect (opcional)
    // ============================================

    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const heroImage = hero.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
            }
        });
    }

    // ============================================
    // Performance: Debounce para Scroll Events
    // ============================================

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ============================================
    // Acessibilidade: Focus Visible
    // ============================================

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

});

// ============================================
// Funções Utilitárias
// ============================================

/**
 * Função para animar contadores de números
 */
function countUp(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Função para detectar se elemento está visível
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Função para adicionar classe quando elemento entra em viewport
 */
function observeElements(selector, className = 'in-view') {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// ============================================
// Inicializar Observadores
// ============================================

observeElements('.card');
observeElements('.bio-card');
