if ($('.cards').length) {
  let totalDots = 3;
  if ($(window).width() < 481) {
    totalDots = 6;
  }

  // functions
  function dotsOnInit(slickDots, totalDots) {
    slickDots.each((i, dot) => {
      if (i < totalDots) {
        $(dot).addClass('slick-dots--show');
      }
    });
  };

  function dotsOnChange(slickDots, totalDots) {
    slickDots.each((i, dot) => {
      if ($(dot).hasClass('slick-active')) {
        if (totalDots === 3) {
          $(dot).prev().addClass('slick-dots--show');
          $(dot).addClass('slick-dots--show');
          $(dot).next().addClass('slick-dots--show');
        }

        if (totalDots === 6) {
          $(dot).prev().prev().addClass('slick-dots--show');
          $(dot).prev().addClass('slick-dots--show');
          $(dot).addClass('slick-dots--show');
          $(dot).next().addClass('slick-dots--show');
          $(dot).next().next().addClass('slick-dots--show');
          $(dot).next().next().next().addClass('slick-dots--show');
        }
      }
    });
  };

  function dotsOnEnd(slickDots, totalDots) {
    slickDots.each((i, dot) => {
      if (i > slickDots.length - totalDots) {
        $(dot).addClass('slick-dots--show');
      }
    });
  };
  // --- --- ---

  // on init
  $('.cards .row').on('init', function () {
    const _this = $(this);
    const slickDots = _this.find('.slick-dots li');

    // change slick-dots width for 6 dots
    if (totalDots === 6) {
      _this.find('.slick-dots').css({"width": "96px"});
    }

    dotsOnInit(slickDots, totalDots);
  });
  // --- --- ---

  // slick init
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
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          arrows: false
        }
      }
    ]
  });
  // --- --- ---

  // on after change
  $('.cards .row').on('afterChange', function (e, slick, currentSlide) {
    const _this = $(this);
    const slickDots = _this.find('.slick-dots li');

    _this.find('.slick-dots li').removeClass('slick-dots--show');

    if (currentSlide < totalDots - 1) {
      dotsOnInit(slickDots, totalDots);
    } else if (currentSlide + 1 === slick.slideCount) {
      dotsOnEnd(slickDots, totalDots);
    } else {
      dotsOnChange(slickDots, totalDots);
    }
  });
}
// --- --- ---

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
// --- --- ---