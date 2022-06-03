document.addEventListener('DOMContentLoaded', () => {
    const swiperBlockchains = new Swiper('.blockchains-swiper', {
        // autoHeight: true,
        slidesPerView: 1,
        loop: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.blockchains-swiper__right',
            prevEl: '.blockchains-swiper__left',
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

    const swiperFeedback = new Swiper('.feedback-swiper', {
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        watchSlidesProgress: true,
        breakpoints: {
            768: {
                slidesPerView: 'auto',
                spaceBetween: 20,
            }
        }
    });

    const headerManager = () => {
        const headerLinks = document.querySelector('.header__links');
        headerLinks.addEventListener('click', e => {
            let target = e.target;
            if(target.closest('.header-dropdown')){
                return;
            }
            target = target.closest('.header__drop');
            if(!target.classList.contains('header__drop_active')){
                const curActive = headerLinks.querySelector('.header__drop_active');
                if(curActive)
                    curActive.classList.remove('header__drop_active');
            }
            target.classList.toggle('header__drop_active');
        });
    }

    const insertNews = async () => {
        let newsData = await fetch('../assets/first_news.json');
        const newsContainer = document.querySelector('.news-swiper__container');
        newsData = await newsData.json();
        newsData.forEach(item => {
            newsContainer.insertAdjacentHTML('beforeend', 
            `
            <div class="swiper-slide news-swiper__slide">
                <div class="news__img">
                    <img src="./img/news/${item.imgPreview}" alt="News!">
                </div>
                <span class="news__date">
                    ${item.date}
                </span>
                <p class="news__lable">
                    ${item.title}
                </p>
                <a class="news-link link__learn" href="https://mywish.io/news/${item.id}" target="_blank">
                    Learn more  →
                </a>
            </div>`
            )
        });
        const swiperNews = new Swiper('.news-swiper', {
            // autoHeight: true,
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            watchSlidesProgress: true,
            navigation: {
                nextEl: '.news-swiper__right',
                prevEl: '.news-swiper__left',
            },
            breakpoints: {
                600: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                }
            }
        });
    }

    const tabsManager = () => {
        const switchers = document.querySelector('.solution__swithers');
        const tabs = document.querySelector('.solution__tabs');
        switchers.addEventListener('click', (e) => {
            const elem = e.target.closest('.solution-switcher');
            if(elem){
                switchers.querySelector('.solution-switcher_active').classList.remove('solution-switcher_active');
                const id = elem.id.split('-')[1];
                elem.classList.add('solution-switcher_active');
                tabs.querySelector('.solution-tab_active').classList.remove('solution-tab_active');
                tabs.querySelector(`#solution-tab_${id}`).classList.add('solution-tab_active');
            }
        });
    }

    const signManager = () => {
        const form = document.getElementById('sign-form');
        const input = form.querySelector('.sign__input');
        const inputContainer = form.querySelector('.sign__wrap');
        const btn = form.querySelector('.sign__submit');
        const modalSuccess = document.getElementById('modal-success');
        input.addEventListener('blur', (e) => {
            if(!e.target.checkValidity()){
                inputContainer.classList.add('sign__input_error');
                btn.disabled = true;
            } else {
                inputContainer.classList.remove('sign__input_error');
                btn.disabled = false;
            }
        });
        form.addEventListener('submit', e => {
            e.preventDefault();
            if(input.value){
                modalSuccess.classList.remove('modal__overlay_inactive');
                input.value = '';
            } else{
                inputContainer.classList.add('sign__input_error');
                btn.disabled = true;
            }
            
        });
        modalSuccess.addEventListener('click', e => {
            if(e.target.matches('.modal__btn') || e.target.matches('.modal__overlay') || e.target.matches('.modal__close'));
            modalSuccess.classList.add('modal__overlay_inactive');
        })
    }
    headerManager();
    signManager();
    insertNews();
    tabsManager();
});