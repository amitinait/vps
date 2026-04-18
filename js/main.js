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

// ===== Results Year Tabs =====
document.querySelectorAll('.results-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.results-tab').forEach(function (t) {
            t.classList.remove('active');
        });
        tab.classList.add('active');

        var year = tab.getAttribute('data-year');
        document.querySelectorAll('.results-tab-content').forEach(function (content) {
            if (content.getAttribute('data-year') === year) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    });
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

        // Reset carousel position on filter
        gallerySlideIndex = 0;
        updateGalleryCarousel();
    });
});

// ===== Gallery Carousel =====
var gallerySlideIndex = 0;

function getVisibleItems() {
    return Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
}

function getItemsPerView() {
    if (window.innerWidth < 480) return 1;
    if (window.innerWidth < 768) return 2;
    return 3;
}

function getMaxSlideIndex() {
    var visibleItems = getVisibleItems();
    var perView = getItemsPerView();
    return Math.max(0, visibleItems.length - perView);
}

function updateGalleryCarousel() {
    var grid = document.querySelector('.gallery-grid');
    var visibleItems = getVisibleItems();
    var perView = getItemsPerView();

    if (visibleItems.length === 0) {
        grid.style.transform = 'translateX(0)';
        updateGalleryDots();
        return;
    }

    var maxIndex = getMaxSlideIndex();
    if (gallerySlideIndex > maxIndex) gallerySlideIndex = maxIndex;
    if (gallerySlideIndex < 0) gallerySlideIndex = 0;

    // Calculate offset based on item widths
    var itemWidth = visibleItems[0].offsetWidth + 12; // width + margin
    var offset = gallerySlideIndex * itemWidth;
    grid.style.transform = 'translateX(-' + offset + 'px)';

    updateGalleryDots();
}

function updateGalleryDots() {
    var dotsContainer = document.getElementById('galleryDots');
    var visibleItems = getVisibleItems();
    var perView = getItemsPerView();
    var totalDots = Math.ceil(visibleItems.length / perView);

    dotsContainer.innerHTML = '';
    for (var i = 0; i < totalDots; i++) {
        var dot = document.createElement('button');
        dot.className = 'gallery-dot' + (Math.floor(gallerySlideIndex / perView) === i ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.setAttribute('data-index', i * perView);
        dot.addEventListener('click', function () {
            gallerySlideIndex = parseInt(this.getAttribute('data-index'));
            updateGalleryCarousel();
        });
        dotsContainer.appendChild(dot);
    }
}

document.getElementById('galleryPrev').addEventListener('click', function () {
    gallerySlideIndex = Math.max(0, gallerySlideIndex - getItemsPerView());
    updateGalleryCarousel();
});

document.getElementById('galleryNext').addEventListener('click', function () {
    gallerySlideIndex = Math.min(getMaxSlideIndex(), gallerySlideIndex + getItemsPerView());
    updateGalleryCarousel();
});

// Initialize carousel when gallery becomes visible
var gallerySection = document.querySelector('#gallery .container');
var galleryObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            setTimeout(updateGalleryCarousel, 100);
            galleryObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 });
galleryObserver.observe(gallerySection);

// Recalculate on resize
window.addEventListener('resize', function () {
    updateGalleryCarousel();
});

// ===== Celebration Photos Carousel =====
var celebSlideIndex = 0;

function getCelebItems() {
    return Array.from(document.querySelectorAll('.celebration-photo'));
}

function getCelebPerView() {
    if (window.innerWidth < 480) return 1;
    if (window.innerWidth < 768) return 2;
    return 3;
}

function getCelebMaxIndex() {
    var items = getCelebItems();
    var perView = getCelebPerView();
    return Math.max(0, items.length - perView);
}

function updateCelebCarousel() {
    var track = document.querySelector('.results-celebration-strip');
    if (!track) return;
    var items = getCelebItems();
    if (items.length === 0) return;

    var maxIndex = getCelebMaxIndex();
    if (celebSlideIndex > maxIndex) celebSlideIndex = maxIndex;
    if (celebSlideIndex < 0) celebSlideIndex = 0;

    var itemWidth = items[0].offsetWidth + 16; // width + gap
    var offset = celebSlideIndex * itemWidth;
    track.style.transform = 'translateX(-' + offset + 'px)';

    updateCelebDots();
}

function updateCelebDots() {
    var dotsContainer = document.getElementById('celebDots');
    if (!dotsContainer) return;
    var items = getCelebItems();
    var perView = getCelebPerView();
    var totalDots = Math.ceil(items.length / perView);

    dotsContainer.innerHTML = '';
    for (var i = 0; i < totalDots; i++) {
        var dot = document.createElement('button');
        dot.className = 'celeb-dot' + (Math.floor(celebSlideIndex / perView) === i ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to celebration slide ' + (i + 1));
        dot.setAttribute('data-index', i * perView);
        dot.addEventListener('click', function () {
            celebSlideIndex = parseInt(this.getAttribute('data-index'));
            updateCelebCarousel();
        });
        dotsContainer.appendChild(dot);
    }
}

var celebPrev = document.getElementById('celebPrev');
var celebNext = document.getElementById('celebNext');
if (celebPrev) {
    celebPrev.addEventListener('click', function () {
        celebSlideIndex = Math.max(0, celebSlideIndex - getCelebPerView());
        updateCelebCarousel();
    });
}
if (celebNext) {
    celebNext.addEventListener('click', function () {
        celebSlideIndex = Math.min(getCelebMaxIndex(), celebSlideIndex + getCelebPerView());
        updateCelebCarousel();
    });
}

// Initialize celebration carousel: seed dots on load + recalc when visible
var celebSection = document.querySelector('.celebration-carousel-wrapper');
if (celebSection) {
    // Seed dots immediately so they're visible without scrolling
    setTimeout(updateCelebCarousel, 50);
    // Also recalc when section becomes visible (handles width-from-zero case)
    var celebObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                setTimeout(updateCelebCarousel, 100);
                celebObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    celebObserver.observe(celebSection);
}

// Recalculate celebration carousel on resize
window.addEventListener('resize', function () {
    updateCelebCarousel();
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
