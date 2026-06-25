document.addEventListener('DOMContentLoaded', () => {
    openMobile();
    fixedNav();
    handleScrollLinks();
    underlineItem();
    goTop();
    loadContent();
    try {
        sliderBooks();
    } catch (error) {
        console.log(error);
    }
});


const data = document.getElementById('data');
const openMenu = document.querySelector('#open-menu');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');
const navBar = document.getElementById('nav');
const goTopBtn = document.querySelector('.go-top');
const scrollLinks = document.querySelectorAll('.scroll-links');

data.innerHTML = new Date().getFullYear();

function openMobile() {
    openMenu.addEventListener('click', () => {
        const linksContainerHeight = linksContainer.getBoundingClientRect().height;
        console.log(linksContainerHeight);
        const linksHeight = links.getBoundingClientRect().height;
        console.log(linksHeight);
        if (linksContainerHeight === 0) {
            linksContainer.style.height = `${linksHeight}px`;
        } else {
            linksContainer.style.height = 0;
        }
    });
}

function fixedNav() {
    // ======== fixed Navbar ==========
    window.addEventListener('scroll', () => {
        const scrollHeight = window.pageYOffset;
        const navBarHeight = navBar.getBoundingClientRect().height;
        if (scrollHeight > navBarHeight) {
            navBar.classList.add('fixed-nav');
        } else {
            navBar.classList.remove('fixed-nav');
        }
        if (scrollHeight > 250) {
            goTopBtn.classList.add('show-go-top-btn');
        } else {
            goTopBtn.classList.remove('show-go-top-btn');
        }
    });
}

function handleScrollLinks() {
    scrollLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const linksId = e.target.getAttribute('href');
            const element = document.querySelector(linksId);

            const navBarHeight = navBar.getBoundingClientRect().height;
            const linksContainerHeight = linksContainer.getBoundingClientRect().height;
            let position = element.offsetTop - navBarHeight;
            // const fixedNav = navBar.classList.contains('fixed-nav');
            // if (!fixedNav) {
            //     position = position - navBarHeight;
            // }
            // if (navBarHeight > 82) {
            //     position = position + linksContainerHeight;
            // }
            window.scrollTo({
                left: 0,
                top: position
            });
            linksContainer.style.height = 0;
        });
    });
}

function underlineItem() {
    const underline = document.querySelector('.underline');
    const linksDesktopContainer = document.querySelector('.links-desktop-container');
    scrollLinks.forEach((item) => {
        item.addEventListener('mouseenter', (e) => {
            let itemWidth = item.getBoundingClientRect().width;
            let linksDesktopContainerLeft = linksDesktopContainer.getBoundingClientRect().left;
            let itemLeft = item.getBoundingClientRect().left - linksDesktopContainerLeft;
            underline.style.visibility = "visible";
            underline.style.width = `${itemWidth}px`;
            underline.style.transform = `translateX(${itemLeft}px)`;
        });

        item.addEventListener('mouseleave', () => {
            underline.style.visibility = "hidden";
            underline.style.width = `0px`;
            underline.style.transform = `translateX(0px)`;
        });
    });
}

function goTop() {
    goTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const btnId = goTopBtn.getAttribute("href");
        const element = document.querySelector(btnId);
        let position = element.offsetTop;
        window.scrollTo({
            left: 0,
            top: position
        });
    });
}


//  library
function loadContent() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-back',
        once: true,        // ← این رو true کن! فقط یک‌بار اجرا بشه
        offset: 120,
        disable: function () {
            // غیرفعال کردن AOS برای اسلایدر
            const slider = document.querySelector('.mySwiperSlider');
            if (slider) {
                // اگه اسلایدر توی صفحه هست، AOS رو روش غیرفعال کن
                return window.innerWidth < 1024;
            }
            return false;
        }
    });
}

function sliderBooks() {
    const swiper = new Swiper('.mySwiperSlider', {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: false,
        loopAdditionalSlides: 1,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // تنظیمات ریسپانسیو
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 5,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 25,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
        effect: 'slide',
        speed: 600,
    });
}