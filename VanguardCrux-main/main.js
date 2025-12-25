/* =========================================================
   BASIC / FALLBACK ANIMATIONS
   ========================================================= */

function initAnimations() {
    if (typeof gsap !== 'undefined') {
        console.log('Premium GSAP animations loaded');
        return;
    }

    const elements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity .8s ease, transform .8s ease';
        observer.observe(el);
    });
}

/* =========================================================
   PROJECT SWIPER (SIMPLE, STABLE)
   ========================================================= */

function initProjectSwiper() {
    const swiper = document.querySelector('.project-swiper');
    if (!swiper) return;

    const wrapper = swiper.querySelector('.swiper-wrapper');
    const slides = wrapper.querySelectorAll('.swiper-slide');
    const pagination = swiper.querySelector('.swiper-pagination');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'swiper-button-prev';
    prevBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
    prevBtn.setAttribute('aria-label', 'Previous slide');
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'swiper-button-next';
    nextBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
    nextBtn.setAttribute('aria-label', 'Next slide');
    
    swiper.appendChild(prevBtn);
    swiper.appendChild(nextBtn);

    // Create bullets
    slides.forEach((_, i) => {
        const bullet = document.createElement('span');
        bullet.className = 'swiper-pagination-bullet';
        if (i === 0) bullet.classList.add('swiper-pagination-bullet-active');
        bullet.addEventListener('click', () => goToSlide(i));
        pagination.appendChild(bullet);
    });

    function updatePagination() {
        pagination.querySelectorAll('.swiper-pagination-bullet').forEach((b, i) => {
            b.classList.toggle('swiper-pagination-bullet-active', i === currentSlide);
        });
    }

    function updateButtons() {
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        prevBtn.style.cursor = currentSlide === 0 ? 'not-allowed' : 'pointer';
        nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
        nextBtn.style.cursor = currentSlide === totalSlides - 1 ? 'not-allowed' : 'pointer';
    }

    function goToSlide(index) {
        currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        updatePagination();
        updateButtons();
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    }

    // Add click handlers
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
    });

    // Initialize button states
    updateButtons();

    // Auto-slide SOLO mobile, UNA SOLA VEZ
    if (window.innerWidth < 768) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }, 5000);
    }
}

/* =========================================================
   UI EFFECTS
   ========================================================= */

function initRippleEffects() {
    document.querySelectorAll('.language-btn').forEach(btn => {
    btn.classList.toggle(
        'active',
        btn.dataset.lang === lang
    );
});
}

/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuBtn = document.getElementById('menu-btn');
const menuOverlay = document.getElementById('menu-overlay');
const menuContent = document.getElementById('menu-content');
const menuLinks = document.querySelectorAll('.menu-link');

function toggleMenu() {
    const isOpen = !menuOverlay.classList.contains('hidden');

    if (isOpen) {
        // Close menu
        menuBtn.classList.remove('active');
        menuOverlay.classList.add('hidden');
        menuOverlay.classList.add('opacity-0');
        menuContent.classList.add('translate-x-full');
        document.body.style.overflow = '';
    } else {
        // Open menu
        menuBtn.classList.add('active');
        menuOverlay.classList.remove('hidden');
        menuOverlay.classList.remove('opacity-0');
        menuContent.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    }
}

if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on overlay (outside menu content)
    menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay) {
            toggleMenu();
        }
    });
    
    // Close menu when clicking menu links
    menuLinks.forEach(l => l.addEventListener('click', toggleMenu));
}

/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {
    en: {
        metaTitle: "Vanguard Crux | AI & Automation Marketing Agency in Porto",
        metaDescription: "Vanguard Crux is a digital growth agency in Porto, Portugal, specializing in AI marketing, business process automation, and performance strategies to scale your revenue.",
        metaKeywords: "digital agency porto, ai marketing, business automation, performance marketing, growth agency portugal, marketing automation, digital strategy, seo agency",
        navSolutions: "Services",
        navPhilosophy: "Our Approach",
        navTeam: "The Team",
        navCaseStudies: "Projects",
        navContact: "Contact",
        navAbout: "About Us",
        heroTitle: 'The <span class="text-accent" data-pulse="true">Global Agency</span> that Turns <span class="text-accent" data-pulse="true">Data</span> into Growth.',
        heroSlogan: "Unlock Your Unfair Advantage.",
        heroTagline: "AI Architecture. Creative Minds Solving the Impossible.",
        heroSubtitle: "We are Vanguard Crux, a global performance marketing agency. We implement AI and automation strategies to give your business a real competitive edge in Portugal and beyond.",
        heroCTA: "Claim My Free Audit",
        philosophyTag: "Our Growth Approach",
        philosophyTitle: "We don't just sell services. We build growth partnerships.",
        philosophyDesc: "Our success is measured by your increased revenue. We focus on implementing performance marketing and automation that delivers a clear ROI, ensuring our collaboration is a profitable long-term investment.",
        solutionsTitle: "Digital Growth Services",
        sol1Title: "Performance Marketing & SEO",
        sol1Desc: "We attract and convert high-value customers with data-driven SEO and paid media campaigns on Meta & Google, focused on maximizing your ROI.",
        sol2Title: "AI & Business Automation",
        sol2Desc: "We optimize your operations with custom AI assistants and process automation (Make/N8N) to increase efficiency and reduce costs.",
        sol3Title: "Branding & Content Strategy",
        sol3Desc: "We build memorable brands that connect with their audience. Includes visual identity design and high-performance content marketing strategies.",
        caseStudiesTitle: "Proven Results, Not Promises.",
        case1Title: "Kultur Atelier, Hamburg",
        case1Desc: "Developed a cohesive graphic identity to boost the visibility of their cultural events, increasing community engagement through strategic branding.",
        case2Title: "Tasca do Infante, Porto",
        case2Desc: "A local performance marketing strategy that increased online bookings by 40% in 3 months through targeted social media ads.",
        aboutTitle: "We think outside the box. We act inside your goals.",
        aboutSubtitle: "Our story is one without borders. Born from the collaboration of digital experts across Argentina, from Paraná to Mendoza, our journey has taken us to develop projects in Hamburg and Dubai, and has led us to establish our European hub in Porto.",
        aboutPillar1Title: "Global Perspective, Local Execution",
        aboutPillar1Desc: "Our team across continents allows us to apply the best global strategies with a deep understanding of the local market.",
        aboutPillar2Title: "AI at the Core",
        aboutPillar2Desc: "We use AI and automation not as an add-on, but as the central engine to optimize every marketing process and decision.",
        teamTitle: "Meet the Vanguard Crux Team",
        teamSubtitle: "Experience our team in 360° - Interactive Innovation",
        jonName: "Jon Flores",
        jonRole: "AI Strategist",
        jonLocation: "Porto, Portugal",
        jonSkill1: "AI Strategy",
        jonSkill2: "Automation",
        jonSkill3: "Data Analytics",
        joseName: "José Aluz",
        joseRole: "Content Strategist",
        joseLocation: "Mendoza, Argentina",
        joseSkill1: "Content Strategy",
        joseSkill2: "Brand Narrative",
        joseSkill3: "Creative Direction",
        contactTitle: "Ready to scale your business?",
        contactSubtitle: 'Get a <strong class="text-accent">FREE AI-powered analysis</strong> of your business. Just share your website and email - we\'ll identify your top 3 growth opportunities and send a personalized report in 48 hours.',
        contactButton: "Get My Free Business Analysis",
        contactEmailPlaceholder: "Your Business Email",
        contactUrlPlaceholder: "Your Website URL",
        footerCompany: "Company",
        footerSolutions: "Solutions",
        footerLegal: "Legal",
        footerContact: "Get in Touch",
        footerPrivacy: "Privacy Policy",
        footerTerms: "Terms & Conditions",
        footerCookies: "Cookies Policy",
        sol1TitleFoot: "Performance & Growth",
        sol2TitleFoot: "Tech & Automation"
    },
    es: {
        metaTitle: "Vanguard Crux | Agencia de Marketing AI y Automatización en Porto",
        metaDescription: "Vanguard Crux es una agencia de crecimiento digital en Porto, Portugal, especializada en marketing con IA, automatización de procesos empresariales y estrategias de rendimiento para escalar tus ingresos.",
        metaKeywords: "agencia digital porto, marketing ia, automatización empresarial, marketing de rendimiento, agencia de crecimiento portugal, automatización de marketing, estrategia digital, agencia seo",
        navSolutions: "Servicios",
        navPhilosophy: "Nuestro Enfoque",
        navTeam: "El Equipo",
        navCaseStudies: "Proyectos",
        navContact: "Contacto",
        navAbout: "Sobre Nosotros",
        heroTitle: 'La <span class="text-accent" data-pulse="true">Agencia Global</span> que Convierte <span class="text-accent" data-pulse="true">Datos</span> en Crecimiento.',
        heroSlogan: "Desbloquea tu Ventaja Injusta.",
        heroTagline: "Arquitectura IA. Mentes Creativas Resolviendo lo Imposible.",
        heroSubtitle: "Somos Vanguard Crux, una agencia global de marketing de rendimiento. Implementamos estrategias de IA y automatización para darle a tu negocio una verdadera ventaja competitiva en Portugal y más allá.",
        heroCTA: "Reclama Mi Auditoría Gratuita",
        philosophyTag: "Nuestro Enfoque de Crecimiento",
        philosophyTitle: "No solo vendemos servicios. Construimos alianzas de crecimiento.",
        philosophyDesc: "Nuestro éxito se mide por el aumento de tus ingresos. Nos enfocamos en implementar marketing de rendimiento y automatización que entrega un ROI claro, asegurando que nuestra colaboración sea una inversión rentable a largo plazo.",
        solutionsTitle: "Servicios de Crecimiento Digital",
        sol1Title: "Marketing de Rendimiento y SEO",
        sol1Desc: "Atraemos y convertimos clientes de alto valor con SEO basado en datos y campañas de medios pagados en Meta y Google, enfocados en maximizar tu ROI.",
        sol2Title: "IA y Automatización Empresarial",
        sol2Desc: "Optimizamos tus operaciones con asistentes de IA personalizados y automatización de procesos (Make/N8N) para aumentar la eficiencia y reducir costos.",
        sol3Title: "Branding y Estrategia de Contenido",
        sol3Desc: "Construimos marcas memorables que conectan con su audiencia. Incluye diseño de identidad visual y estrategias de marketing de contenido de alto rendimiento.",
        caseStudiesTitle: "Resultados Comprobados, No Promesas.",
        case1Title: "Kultur Atelier, Hamburgo",
        case1Desc: "Desarrollamos una identidad gráfica cohesiva para impulsar la visibilidad de sus eventos culturales, aumentando el compromiso de la comunidad a través de branding estratégico.",
        case2Title: "Tasca do Infante, Porto",
        case2Desc: "Una estrategia de marketing de rendimiento local que aumentó las reservas online en un 40% en 3 meses a través de anuncios dirigidos en redes sociales.",
        aboutTitle: "Pensamos fuera de la caja. Actuamos dentro de tus objetivos.",
        aboutSubtitle: "Nuestra historia es una sin fronteras. Nacida de la colaboración de expertos digitales en Argentina, desde Paraná hasta Mendoza, nuestro viaje nos ha llevado a desarrollar proyectos en Hamburgo y Dubai, y nos ha conducido a establecer nuestro centro europeo en Porto.",
        aboutPillar1Title: "Perspectiva Global, Ejecución Local",
        aboutPillar1Desc: "Nuestro equipo en varios continentes nos permite aplicar las mejores estrategias globales con un profundo conocimiento del mercado local.",
        aboutPillar2Title: "IA en el Núcleo",
        aboutPillar2Desc: "Usamos la IA y automatización no como un complemento, sino como el motor central para optimizar cada proceso y decisión de marketing.",
        teamTitle: "Conoce al Equipo de Vanguard Crux",
        teamSubtitle: "Experimenta nuestro equipo en 360° - Innovación Interactiva",
        jonName: "Jon Flores",
        jonRole: "Estratega de IA",
        jonLocation: "Porto, Portugal",
        jonSkill1: "Estrategia IA",
        jonSkill2: "Automatización",
        jonSkill3: "Análisis de Datos",
        joseName: "José Aluz",
        joseRole: "Estratega de Contenido",
        joseLocation: "Mendoza, Argentina",
        joseSkill1: "Estrategia de Contenido",
        joseSkill2: "Narrativa de Marca",
        joseSkill3: "Dirección Creativa",
        contactTitle: "¿Listo para escalar tu negocio?",
        contactSubtitle: 'Obtén un <strong class="text-accent">análisis GRATUITO impulsado por IA</strong> de tu negocio. Solo comparte tu sitio web y correo electrónico - identificaremos tus 3 principales oportunidades de crecimiento y enviaremos un informe personalizado en 48 horas.',
        contactButton: "Obtener Mi Análisis Gratuito",
        contactEmailPlaceholder: "Tu Correo Empresarial",
        contactUrlPlaceholder: "URL de Tu Sitio Web",
        footerCompany: "Empresa",
        footerSolutions: "Soluciones",
        footerLegal: "Legal",
        footerContact: "Contacto",
        footerPrivacy: "Política de Privacidad",
        footerTerms: "Términos y Condiciones",
        footerCookies: "Política de Cookies",
        sol1TitleFoot: "Rendimiento y Crecimiento",
        sol2TitleFoot: "Tecnología y Automatización"
    },
    pt: {
        metaTitle: "Vanguard Crux | Agência de Marketing AI e Automação no Porto",
        metaDescription: "Vanguard Crux é uma agência de crescimento digital no Porto, Portugal, especializada em marketing com IA, automação de processos empresariais e estratégias de desempenho para escalar a sua receita.",
        metaKeywords: "agência digital porto, marketing ia, automação empresarial, marketing de desempenho, agência de crescimento portugal, automação de marketing, estratégia digital, agência seo",
        navSolutions: "Serviços",
        navPhilosophy: "A Nossa Abordagem",
        navTeam: "A Equipa",
        navCaseStudies: "Projetos",
        navContact: "Contacto",
        navAbout: "Sobre Nós",
        heroTitle: 'A <span class="text-accent" data-pulse="true">Agência Global</span> que Transforma <span class="text-accent" data-pulse="true">Dados</span> em Crescimento.',
        heroSlogan: "Desbloqueie a Sua Vantagem Injusta.",
        heroTagline: "Arquitetura IA. Mentes Criativas Resolvendo o Impossível.",
        heroSubtitle: "Somos a Vanguard Crux, uma agência global de marketing de desempenho. Implementamos estratégias de IA e automação para dar ao seu negócio uma verdadeira vantagem competitiva em Portugal e além.",
        heroCTA: "Reivindicar Minha Auditoria Gratuita",
        philosophyTag: "A Nossa Abordagem de Crescimento",
        philosophyTitle: "Não vendemos apenas serviços. Construímos parcerias de crescimento.",
        philosophyDesc: "O nosso sucesso é medido pelo aumento da sua receita. Focamo-nos em implementar marketing de desempenho e automação que entrega um ROI claro, garantindo que a nossa colaboração seja um investimento lucrativo a longo prazo.",
        solutionsTitle: "Serviços de Crescimento Digital",
        sol1Title: "Marketing de Desempenho e SEO",
        sol1Desc: "Atraímos e convertemos clientes de alto valor com SEO baseado em dados e campanhas de media pagos no Meta & Google, focados em maximizar o seu ROI.",
        sol2Title: "IA e Automação Empresarial",
        sol2Desc: "Otimizamos as suas operações com assistentes de IA personalizados e automação de processos (Make/N8N) para aumentar a eficiência e reduzir custos.",
        sol3Title: "Branding e Estratégia de Conteúdo",
        sol3Desc: "Construímos marcas memoráveis que se conectam com o seu público. Inclui design de identidade visual e estratégias de marketing de conteúdo de alto desempenho.",
        caseStudiesTitle: "Resultados Comprovados, Não Promessas.",
        case1Title: "Kultur Atelier, Hamburgo",
        case1Desc: "Desenvolvemos uma identidade gráfica coesa para aumentar a visibilidade dos seus eventos culturais, aumentando o envolvimento da comunidade através de branding estratégico.",
        case2Title: "Tasca do Infante, Porto",
        case2Desc: "Uma estratégia de marketing de desempenho local que aumentou as reservas online em 40% em 3 meses através de anúncios direcionados nas redes sociais.",
        aboutTitle: "Pensamos fora da caixa. Agimos dentro dos seus objetivos.",
        aboutSubtitle: "A nossa história é uma sem fronteiras. Nascida da colaboração de especialistas digitais na Argentina, de Paraná a Mendoza, a nossa jornada levou-nos a desenvolver projetos em Hamburgo e Dubai, e levou-nos a estabelecer o nosso centro europeu no Porto.",
        aboutPillar1Title: "Perspetiva Global, Execução Local",
        aboutPillar1Desc: "A nossa equipa em vários continentes permite-nos aplicar as melhores estratégias globais com um profundo conhecimento do mercado local.",
        aboutPillar2Title: "IA no Núcleo",
        aboutPillar2Desc: "Usamos a IA e automação não como um complemento, mas como o motor central para otimizar cada processo e decisão de marketing.",
        teamTitle: "Conheça a Equipa da Vanguard Crux",
        teamSubtitle: "Experimente a nossa equipa em 360° - Inovação Interativa",
        jonName: "Jon Flores",
        jonRole: "Estratega de IA",
        jonLocation: "Porto, Portugal",
        jonSkill1: "Estratégia IA",
        jonSkill2: "Automação",
        jonSkill3: "Análise de Dados",
        joseName: "José Aluz",
        joseRole: "Estratega de Conteúdo",
        joseLocation: "Mendoza, Argentina",
        joseSkill1: "Estratégia de Conteúdo",
        joseSkill2: "Narrativa de Marca",
        joseSkill3: "Direção Criativa",
        contactTitle: "Pronto para escalar o seu negócio?",
        contactSubtitle: 'Obtenha uma <strong class="text-accent">análise GRATUITA impulsionada por IA</strong> do seu negócio. Basta partilhar o seu website e email - identificaremos as suas 3 principais oportunidades de crescimento e enviaremos um relatório personalizado em 48 horas.',
        contactButton: "Obter Minha Análise Gratuita",
        contactEmailPlaceholder: "Seu Email Empresarial",
        contactUrlPlaceholder: "URL do Seu Website",
        footerCompany: "Empresa",
        footerSolutions: "Soluções",
        footerLegal: "Legal",
        footerContact: "Entre em Contacto",
        footerPrivacy: "Política de Privacidade",
        footerTerms: "Termos e Condições",
        footerCookies: "Política de Cookies",
        sol1TitleFoot: "Desempenho e Crescimento",
        sol2TitleFoot: "Tecnologia e Automação"
    }
};

function detectBrowserLanguage() {
    const saved = localStorage.getItem('userLanguage');
    if (saved) return saved;

    const lang = navigator.language.split('-')[0];
    return ['es', 'pt'].includes(lang) ? lang : 'en';
}

function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('userLanguage', lang);

    // Update all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.dataset.lang;
        if (translations[lang]?.[key]) {
            // For meta tags, update content attribute
            if (el.tagName === 'META') {
                el.setAttribute('content', translations[lang][key]);
            } else if (el.tagName === 'TITLE') {
                el.textContent = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });

    // Update placeholder attributes
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.dataset.langPlaceholder;
        if (translations[lang]?.[key]) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
    });

    // Update language button active states
    document.querySelectorAll('.language-btn').forEach(btn => {
        const btnText = btn.querySelector('span');
        if (btnText) {
            const btnLang = btnText.textContent.toLowerCase();
            btn.classList.toggle('active', btnLang === lang);
        }
    });
}

/* =========================================================
   LEGAL LINKS
   ========================================================= */

function initLegalLinks() {
    document.querySelectorAll('.legal-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const page = link.dataset.page;
            const lang = localStorage.getItem('userLanguage') || 'en';
            const suffix = lang === 'en' ? '' : `-${lang}`;
            window.location.href = `${page}${suffix}.html`;
        });
    });
}

/* =========================================================
   INIT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initProjectSwiper();
    initLegalLinks();

    const detectedLang = detectBrowserLanguage();

    // Espera a que TODO el DOM esté realmente pintado
    requestAnimationFrame(() => {
        setLanguage(detectedLang);
        console.log('Language applied to full DOM:', detectedLang);
    });
});

