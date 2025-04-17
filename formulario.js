const swiper = new Swiper('.swiper', {
  
  // If we need pagination
  pagination: {
    clickable:true,
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  
  breakpoints: {
    '@0.75': {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    '@1.00': {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    '@1.25': {
      slidesPerView: 3,
      spaceBetween: 5,
    },
    '@1.80': {
      slidesPerView: 4,
      spaceBetween: 5,
    },
  }


});