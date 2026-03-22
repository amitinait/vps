// ===== LANGUAGE TOGGLE =====
function toggleLanguage() {
    document.body.classList.toggle('lang-hi');
    const isHindi = document.body.classList.contains('lang-hi');
    document.documentElement.lang = isHindi ? 'hi' : 'en';
    localStorage.setItem('vps-lang', isHindi ? 'hi' : 'en');
}

// Restore language preference on load
(function () {
    var savedLang = localStorage.getItem('vps-lang');
    if (savedLang === 'hi') {
        document.body.classList.add('lang-hi');
        document.documentElement.lang = 'hi';
    }
})();

// ===== MOBILE MENU =====
function toggleMenu() {
    var nav = document.getElementById('nav');
    var hamburger = document.getElementById('hamburger');
    nav.classList.toggle('open');
    hamburger.classList.toggle('active');
}

function closeMenu() {
    var nav = document.getElementById('nav');
    var hamburger = document.getElementById('hamburger');
    nav.classList.remove('open');
    hamburger.classList.remove('active');
}

// Close menu on outside click
document.addEventListener('click', function (e) {
    var nav = document.getElementById('nav');
    var hamburger = document.getElementById('hamburger');
    if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
    }
});

// ===== STICKY HEADER SHADOW =====
window.addEventListener('scroll', function () {
    var header = document.getElementById('header');
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.12)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }
});
