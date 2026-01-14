document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loader Removal
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 800);
    });

    // 2. Navbar Scroll Effect & Reading Progress
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        const progress = document.getElementById('progressBar');
        
        // Navbar
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');

        // Progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progress.style.width = scrolled + "%";
    });

    // 3. AOS Animations Init
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // 4. Counter Animation (Bajer)
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger counters when section is in view
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) startCounters();
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-grid');
    if(statsSection) observer.observe(statsSection);

    // 5. SimpleLightbox - Gallery Bajer
    let gallery = new SimpleLightbox('.gallery-grid a', {
        overlayOpacity: 0.9,
        navText: ['<i class="fas fa-chevron-left"></i>','<i class="fas fa-chevron-right"></i>']
    });

});