if ($('.cards').length) {
  function dotsOnInit (_this) {
    _this.find('.slick-dots .slick-active').addClass('slick-dots--show');
    _this.find('.slick-dots .slick-active').next().addClass('slick-dots--show');
    _this.find('.slick-dots .slick-active').next().next().addClass('slick-dots--show');
  }

  function dotsOnChange (_this) {
    _this.find('.slick-dots .slick-active').prev().addClass('slick-dots--show');
    _this.find('.slick-dots .slick-active').addClass('slick-dots--show');
    _this.find('.slick-dots .slick-active').next().addClass('slick-dots--show');
  }

  function dotsOnEnd (_this) {
    _this.find('.slick-dots .slick-active').addClass('slick-dots--show');
    _this.find('.slick-dots .slick-active').prev().addClass('slick-dots--show');
    _this.find('.slick-dots .slick-active').prev().prev().addClass('slick-dots--show');
  }

  $('.cards .row').on('init', function () {
    const _this = $(this);
    dotsOnInit(_this);
  })

  $('.cards .row').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 2,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    dots: true,
    infinite: false,
    speed: 400,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        }
      }
    ]
  });

  $('.cards .row').on('afterChange', function (e, slick, currentSlide) {
    const _this = $(this);

    _this.find('.slick-dots li').removeClass('slick-dots--show');
    dotsOnChange(_this);

    if (currentSlide === 0) {
      dotsOnInit(_this);
    }

    if (currentSlide + 1 === slick.slideCount) {
      dotsOnEnd(_this);
    }
  });
}

// trigger href on card click
function targetHref(selector) {
  const item = $(selector);
  let href;

  item.click(function () {
    if ($(this).find('h3 a').attr('href') !== 'undefined') {
      href = $(this).find('h3 a').attr('href');
    }

    window.location.href = href;
  });
}

targetHref('.card');