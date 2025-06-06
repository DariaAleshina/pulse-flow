// Selecting Elements 
const btnMobileNav = document.querySelector('.btn-mobile-nav');
const header = document.querySelector('.header');
const sectionHero = document.querySelector('.section-hero');
const footer = document.querySelector('footer');
const sessionsAllLink = document.querySelector('#sessions-link');

// Changing Current Year Dynamically 
const currentYear = new Date().getFullYear();
document.querySelector('.current-year').textContent = currentYear;

// Mobile Navigation
btnMobileNav.addEventListener('click', function () {
    header.classList.toggle('nav-open');
})

// Smooth Scrolling
const scrollSmoothly = function (e) {
    e.preventDefault();
    const link = e.target.closest('a');
    if (!link) return;

    const linkRef = link.getAttribute('href');
    if (!linkRef) return;

    const classType = e.target.classList;

    // scroll to the top of the page (those with #)
    if (linkRef === '#' && classType.contains('logo')) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    // scroll to sections
    if (linkRef !== '#' && linkRef.startsWith('#')) {
        document.querySelector(`${linkRef}`).scrollIntoView({ behavior: "smooth" })

    }

    // closing mobile nav if applicable
    if (classType.contains('nav-link')) {
        header.classList.toggle('nav-open');
    }

}

header.addEventListener('click', (e) => scrollSmoothly(e));
footer.addEventListener('click', (e) => scrollSmoothly(e));
sectionHero.addEventListener('click', (e) => scrollSmoothly(e));
sessionsAllLink.addEventListener('click', (e) => scrollSmoothly(e));

// STICKY NAVIGATION
const obs = new IntersectionObserver(function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
        document.body.classList.add('sticky');
    }

    if (ent.isIntersecting) {
        document.body.classList.remove('sticky');
    }
}, {
    // appearing in the viewport
    root: null,
    threshold: 0,
    rootMargin: '-80px',
});
obs.observe(sectionHero);

// Fixing flex-box gap property missing in some Safari versions
function checkFlexGap() {
    var flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";

    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    console.log(isSupported);

    if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
