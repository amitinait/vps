// ===== Language Toggle =====
function toggleLanguage() {
    document.body.classList.toggle('lang-hi');
    var isHindi = document.body.classList.contains('lang-hi');
    document.documentElement.lang = isHindi ? 'hi' : 'en';
    localStorage.setItem('vps-lang', isHindi ? 'hi' : 'en');
}

// Restore language on load
(function () {
    var savedLang = localStorage.getItem('vps-lang');
    if (savedLang === 'hi') {
        document.body.classList.add('lang-hi');
        document.documentElement.lang = 'hi';
    }
})();

// ===== Mobile Menu =====
function toggleMenu() {
    document.getElementById('hamburger').classList.toggle('active');
    document.getElementById('nav').classList.toggle('open');
}

function closeMenu() {
    document.getElementById('hamburger').classList.remove('active');
    document.getElementById('nav').classList.remove('open');
}

document.addEventListener('click', function (e) {
    var nav = document.getElementById('nav');
    var hamburger = document.getElementById('hamburger');
    if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
    }
});

// ===== Sticky Header Shadow =====
window.addEventListener('scroll', function () {
    var header = document.getElementById('header');
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== Scroll Reveal =====
var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
});

// ===== Gallery Filter =====
document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(function (b) {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.gallery-item').forEach(function (item) {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ===== Lightbox =====
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightboxImg');
var lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item img').forEach(function (img) {
    img.addEventListener('click', function () {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}
