function startApp() {
  // селект с языками и сервисами, для языков использовал скрипты и стили этого селекта: https://itchief.ru/javascript/custom-select
  const select1 = new ItcCustomSelect('#select-1')
  const service = document.querySelector('.service__select')

  const handlerServiceClick = () => {
    if (service.classList.contains('service__select--show')) {
      service.classList.remove('service__select--show')
    } else {
      service.classList.add('service__select--show')
    }
  }

  service.addEventListener('touchstart', handlerServiceClick, { passive: true })


  // burger menu
  const body = document.querySelector('.body')
  const buttonServices = document.querySelector(`[data-menu-link="services"]`)
  const buttonOpenMenu = document.querySelector(`[data-menu="open"]`)
  const buttonCloseMenu = document.querySelector(`[data-menu="close"]`)
  // const menuLinks = document.querySelectorAll(`[data-menu-link]`)
  const navMenu = document.querySelector(`[data-menu="menu"]`)

  const openMenu = () => {
    navMenu.classList.add('header__nav--active')
    window.innerWidth < 820 ? body.classList.add('body--lock') : ''
  }
  const closeMenu = () => {
    navMenu.classList.remove('header__nav--active')
    window.innerWidth < 820 ? body.classList.remove('body--lock') : ''
  }

  if (window.innerWidth > 819 && buttonServices) buttonServices.addEventListener('click', () => window.open('services.html', '_top'))
  buttonOpenMenu.addEventListener('click', openMenu)
  buttonCloseMenu.addEventListener('click', closeMenu)
  // menuLinks.forEach(link => link.addEventListener('click', closeMenu))

  // анимация счётчика
  // counterup.min.js я взял из папки dist отсюда https://github.com/inorganik/CountUp.js#including-countup Библиотека подразумевает установку через npm/yarn и использование экспортов и импортов
  // такой вариант тут не подходит, поэтому я скопировал файл и убрал в конце export{i as CountUp}; Это ломает скрипт, поэтому использую изначальное название i, чтобы всё работало, 
  // иначе нужно использовать gulp/webpack/vite и т.д., чтобы использовать импорты и потом сбилдить проект
  // функции для смягчения анимации https://spicyyoghurt.com/tools/easing-functions
  function easeInQuad (t, b, c, d) {
    return c * (t /= d) * t + b;
}
  // Квадратичное ослабление при входе и выходе
  function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  }
  //Кубическое ослабление ввода и вывода
  function easeInOutCubic(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
}
  // Квинтичное ослабление вдоха и выдоха
  function easeInOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  }
  // const optionsCounterAnimation = {
  //   duration: 5,
  //   separator: '.',
  //   easingFn: easeInOutQuad,
  //   enableScrollSpy: true,
  // }
  // const optionsCounterAnimation2 = {
  //   useEasing: false,
  //   startVal: 35,
  //   duration: 2.4,
  //   separator: '.',
  //   enableScrollSpy: true,
  // }
  // const optionsCounterAnimation1 = {
  //   duration: 2,
  //   separator: '.',
  //   easingFn: easeInQuad,
  //   enableScrollSpy: true,
  //   onCompleteCallback: () => new i('out1', 1500000000, optionsCounterAnimation2)
  // }

  // const counter1 = document.querySelector('#out1')
  // const counter2 = document.querySelector('#out2')
  // const counter3 = document.querySelector('#out3')
  // if (counter1 && counter2 && counter3) {
  //   const countUp1 = new i('out1', 35, optionsCounterAnimation1);
  //   const countUp2 = new i('out2', 100, optionsCounterAnimation);
  //   const countUp3 = new i('out3', 20, optionsCounterAnimation);
  // }



  // функция, которая добавляет класс с анимацей, когда элемент пересекается с экраном просмотра
  function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
        // анимация fadeIn
        change.target.classList.add('animate-fade-show')
      }
    });
  }

  const options = {
    threshold: [0.1]
  }
  const observer = new IntersectionObserver(onEntry, options)
  const elements = document.querySelectorAll('[data-animate]')

  for (let elm of elements) {
    observer.observe(elm)
  }


  // accordeon
  // для того, чтобы срабатывал клик именно по faq__item в css на внутренних элментах faq__item должен быть pointer-events: none
  const accordeonItems = document.querySelectorAll(`[data-accordeon]`)
  const accordeons = document.querySelectorAll('.faq__list')

  function handlerAccordeonClick(e) {
    if (e.target.classList.contains('faq__item')) {
      if (e.target.classList.contains('faq__item--active')) {
        e.target.classList.remove('faq__item--active')
        const content = e.target.querySelector('.faq__item-content')
        content.style.maxHeight = '0'
      } else {
        accordeonItems.forEach(item => {
          item.classList.remove('faq__item--active')
          const content = item.querySelector('.faq__item-content')
          content.style.maxHeight = '0'
        })
        e.target.classList.add('faq__item--active')
        const content = e.target.querySelector('.faq__item-content')
        content.style.maxHeight = content.scrollHeight + "px"
      }
    }
  }

  if (accordeons) accordeons.forEach(accordeon => accordeon.addEventListener('click', handlerAccordeonClick))

  // появление/скрытие хедера при скролле 
  // const onScrollHeader = () => { // объявляем основную функцию onScrollHeader

  //   const header = document.querySelector('.header') // находим header и записываем в константу

  //   let prevScroll = window.scrollY // узнаем на сколько была прокручена страница ранее
  //   let currentScroll // на сколько прокручена страница сейчас (пока нет значения)

  //   const scrollHandler = () => { // при прокрутке страницы

  //     currentScroll = window.scrollY // узнаем на сколько прокрутили страницу

  //     const headerHidden = () => header.classList.contains('header--hidden') // узнаем скрыт header или нет

  //     if (currentScroll > prevScroll && !headerHidden()) { // если прокручиваем страницу вниз и header не скрыт
  //       header.classList.add('header--hidden') // то скрываем header
  //     }
  //     if (currentScroll < prevScroll && headerHidden()) { // если прокручиваем страницу вверх и header скрыт
  //       header.classList.remove('header--hidden') // то отображаем header
  //     }

  //     prevScroll = currentScroll // записываем на сколько прокручена страница на данный момент

  //   }

  //   window.addEventListener('scroll', scrollHandler)
  // }
  // onScrollHeader() // вызываем основную функцию onScrollHeader
  //  появление/скрытие хедера при скролле 
}

window.addEventListener('DOMContentLoaded', startApp)