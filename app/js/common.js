$(document).ready(function (e) {
  // GENERALS
  //scroll add .scroll to buttons for slowly move to anchor
  $('.scroll').bind('click.smoothscroll', function (e) {
    e.preventDefault();
    var target = this.hash,
      $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function () {
      window.location.hash = target;
    });
  });
  $("input[name=phone]").mask("+38(099)999-99-99");

  // Define Lang & redirect
  defineLang()
  function defineLang(){
    var LANG = window.navigator.language.slice(0,2);
    console.log(LANG)
    var to = ''
    switch(LANG) {
      case('ua'):
        to = 'ukr'
        break
      case('ru'):
      default:
        to = 'rus'
    }
    var origin = window.location.origin +'/'
    var href = window.location.href
    if( href.indexOf(to) === -1) window.location.href = origin + to
  }

  // HEADER
  function redirect(lang) {
    var isOrderPage = (location.pathname).indexOf('order.html');
    if (lang === 'ua') {
      // ua
      if (isOrderPage != -1) {
        window.location.href = '/order.html'
      } else {
        window.location.href = '/'
      }
    } else {
      // ru
      if (isOrderPage != -1) {
        window.location.href = '/ru/order.html'
      } else {
        window.location.href = '/ru/'
      }
    }
  }
  $(document).on('click', '.header__btn', function () {
    var isRu = (location.pathname).indexOf('ru');
    if (isRu != -1) location.href = location.origin + '/ru/order.html'
    else location.href = location.origin + '/order.html'
  })
  $(document).on('click', '.food__btn', function () {
    var isRu = (location.pathname).indexOf('ru');
    if (isRu != -1) location.href = location.origin + '/ru/order.html'
    else location.href = location.origin + '/order.html'
  })
  if (window.innerWidth < 992) {
    $(window).on('scroll', function () {
      if (window.pageYOffset > 100) {
        $('header').addClass('header__slick')
      } else {
        $('header').removeClass('header__slick')
      }
    })
  }
  // Lang
  // LG
  $('.header__btn-lang').on('click', function (e) {
    var lang = $(e.target).data('lang')
    redirect(lang)
  })
  // SM
  $(".header__smlang select").on('change', function (e) {
    var isRu = (location.pathname).indexOf('ru');
    var isOrderPage = (location.pathname).indexOf('order.html');
    var locale = e.target.value;
    switch (locale) {
      case 'ua':
        if (isRu != -1) {
          if (isOrderPage != -1) {
            window.location.href = '/order.html'
          } else {
            window.location.href = '/'
          }
        }
        break
      case 'ru':
        if (isRu === -1) {
          if (isOrderPage != -1) {
            window.location.href = '/ru/order.html'
          } else {
            window.location.href = '/ru/'
          }
        }
        break
    }
  })


  // MAIN PAGE
  var mainPage = document.getElementById('first')
  if (mainPage) {

    // sliders
    $('#stars__slider').owlCarousel({
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      smartSpeed: 450,
      loop: true,
      nav: false,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 3000,
      margin: 0,
      dots: true,
      responsiveClass: true,
      items: 1
    });

    $('.rev__slider').owlCarousel({
      loop: true,
      nav: false,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 3000,
      margin: 20,
      dots: true,
      responsiveClass: true,
      // items: 3,
      responsive: {
        0: {
          items: 1,
          stagePadding: 25,
          margin: 10
        },
        578: {
          items: 1,
          stagePadding: 50
        },
        768: {
          items: 2,
          stagePadding: 50
        },
        992: {
          items: 3
        }
      }
    });

    // FOOD Menu
    if (window.innerWidth > 992) {
      $('.food__set li').on('click', function (e) {
        $('.food__set li').removeClass('active')
        $(this).addClass('active')
        var item = $(this).data('item')

        $('.food__item').removeClass('active')
        $('.food__item[data-item=' + item + ']').addClass('active')
      });
    }
    // days
    $(document).on('click', '.food__item.active .food__days li', function (e) {
      $('.food__item.active .food__days li').removeClass('choosed')
      $(this).addClass('choosed')

      // %
      var percent = $(this).find('span').text()
      var per = parseInt(percent)
      per = Math.abs(per)
      var perIsNaN = isNaN(per)

      // days
      var text = $(this).text()
      var days = parseInt(text)
      // console.log(per, days, text)

      // cost
      var baseCost = parseInt( $('.food__item.active .food__price-for-one span').text() )
      // console.log(baseCost)

      // change price
      // var showCurrency = ' грн.';
      // if (window.innerWidth < 576) { showCurrency = '' }
      // var oldPrice = (days * 450) + showCurrency;
      var oldPrice = (days * baseCost) + (window.innerWidth < 576 ? '' : ' грн');
      // var oldPrice = (days * 450) + ((days * 450) >= 9000 ? '' : ' грн.');
      var currentPrice = baseCost+' <b>грн.<b>';
      switch (per) {
        case 7:
          // 1 - 0.7 (7%) = 0.93
          currentPrice = ((days * baseCost) * 0.93)
          perDay = (baseCost * 0.93)

          // correction
          // max light, light, (everyday, individ), vegan
          var p = parseInt(currentPrice)
          currentPrice = p === 2929
            ? 2940
            : p === 3189
              ? 3150
              : p === 3580
                ? 3640
                : null

          var d = parseInt(perDay)
          console.log(d)
          perDay = d === 418
            ? 420
            : d === 455
              ? 450
              : d === 511
                ? 520
                : null


          currentPrice += ' <b>грн.<b>'
          perDay += ' <i>грн.</i>'
          break
        case 13:
          currentPrice = ((days * baseCost) * 0.87)
          perDay = (baseCost * 0.87)

          // correction
          // max light, light, (everyday, individ), vegan
          var p = parseInt(currentPrice)
          currentPrice = p === 8221
            ? 8190
            : p === 8952
              ? 8820
              : p === 10048
                ? 10290
                : null

          var d = parseInt(perDay)
          perDay = d === 391
            ? 390
            : d === 426
              ? 420
              : d === 478
                ? 490
                : null


          currentPrice += ' <b>грн.<b>'
          perDay += ' <i>грн.</i>'

          break
        // case 30:
        //   currentPrice = ((days * 450) * 0.7) + ' <b>грн.<b>'
        //   perDay = (450 * 0.7) + ' <i>грн.</i>'
        //   break
      }

      if (!perIsNaN) {
        $('.food__item.active .food__2price .old, .food__item.active .food__2price .sales, .food__item.active .food__2price .current, .food__item.active .food__price-for-one').removeClass('d-none')
        $('.food__item.active .food__fullprice').removeClass('single')

        $('.food__item.active .food__2price .old').text(oldPrice)
        $('.food__item.active .food__2price .sales b').text(percent)
        $('.food__item.active .food__2price .current').html(currentPrice)
      } else {
        $('.food__item.active .food__2price .old, .food__item.active .food__2price .sales, .food__item.active .food__price-for-one').addClass('d-none')

        $('.food__item.active .food__fullprice').addClass('single')
        $('.food__item.active .food__2price .current').html(currentPrice)
      }

      // price per day
      $('.food__item.active .food__price-for-one b').html(perDay)
    });

    // make order
    $(document).on('click', '.food__item.active .food__btn-order', function () {
      // get name
      var food = $('.food__set li.active').data('name')

      var days = $('.food__item.active .food__days li.choosed').text()
      var oldPrice = $('.food__item.active .food__2price .old').text()
      var currentPrice = $('.food__item.active .food__2price .current').text()
      var pricePerItem = $('.food__item.active .food__price-for-one b').text()
      var sales = $('.food__item.active .food__2price .sales b').text()

      // console.log(food, days, oldPrice, currentPrice)
      var dataOrder = {
        food: food,
        days: days,
        oldPrice: oldPrice,
        currentPrice: currentPrice,
        pricePerItem: pricePerItem,
        sales: sales,
      }
      console.log(dataOrder)
      var isOK = setOrderInLS(dataOrder)
      if (isOK) {
        var isRu = (location.pathname).indexOf('ru');
        if (isRu != -1) {
          window.location.href = '/ru/order.html'
        } else {
          window.location.href = '/order.html'
        }
        // window.location.href = window.location.href + 'order.html'
      } else {
        alert('Something went wrong')
      }
    });

    // CLIENTS COUNTER
    // 3-5 per day
    !function () {
      var fromCount = 5567;
      var date = new Date('2020-07-02:00:00:00');
      var currentDate = new Date();
      var oneDay = 60 * 60 * 24 * 1000;
      var getDays = parseInt(((currentDate - date) / oneDay))
      var result = fromCount + getDays
      var markup = String(result).split('').map(function (item) {
        return '<span>' + item + '</span>'
      }).join('')
      $('.deliv__counter').html(markup)
    }()


    // lg >992
    if (window.innerWidth > 992) {
      // top paralax
      var scene = document.getElementById('scene');
      var parallaxInstance = new Parallax(scene);

      // food set make active tab
      $('.food__set li[data-item=1]').addClass('active');

    } else {
      $('#scene').remove()
    }


    // md <992
    if (window.innerWidth < 992) {

      // slider for food sets
      var owlSet = $('.food__set');
      var breakPion = 560;
      // in table add 2 li
      if (window.innerWidth > breakPion) {
        owlSet.append('<li></li><li></li>')
      }
      // in mobile add 1 li
      if (window.innerWidth < breakPion) {
        owlSet.append('<li></li>')
      }
      owlSet.addClass('owl-carousel')
      owlSet.owlCarousel({
        center: true,
        autoWidth: true,
        stagePadding: 0,
        items: 1,
        loop: false,
        margin: 0,
        responsive: {
          0: {
            items: 1
          }
        }
      });
      owlSet.trigger('next.owl.carousel');
      owlSet.on('dragged.owl.carousel', function (event) {
        var item = $('.food__set .owl-item.active.center li').data('item')
        $('.food__item').removeClass('active')
        $('.food__item[data-item=' + item + ']').animate({ opacity: 0 }, 300)
        $('.food__item[data-item=' + item + ']').addClass('active')
        $('.food__item[data-item=' + item + ']').animate({ opacity: 1 }, 300)
      })


      // slider of food in basket
      var owlFood = $('.food__products.mobile:not(.food__individual)');
      owlFood.addClass('owl-carousel')
      owlFood.owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 3000,
        margin: 0,
        dots: false,
        responsiveClass: true,
        // items: 3,
        responsive: {
          0: {
            items: 1,
            stagePadding: 60,
            margin: 0
          },
          556: {
            items: 2,
            stagePadding: 20
          },
          768: {
            items: 2,
            stagePadding: 40
          },
          992: {
            items: 3
          }
        }
      });



    }
    // md < 768
    if (window.innerWidth <= 768) {

      // slider
      $('.eggs__list').addClass('owl-carousel');
      $(".eggs__list").owlCarousel({
        center: true,
        autoWidth: true,
        stagePadding: 0,
        items: 1,
        loop: true,
        margin: 0,
        responsive: {
          0: {
            items: 1
          }
        }
      });

      $('.steps__step').addClass(' owl-carousel')
      $('.steps__step').owlCarousel({
        loop: false,
        nav: false,
        autoplay: false,
        autoplayTimeout: 99000,
        margin: 20,
        dots: true,
        responsiveClass: true,
        // items: 3,
        responsive: {
          0: {
            items: 1,
            stagePadding: 25,
            margin: 10
          },
          556: {
            items: 1,
            stagePadding: 50
          },
          992: {
            // items: 3
          }
        }
      });
    }

  }

  // ORDER PAGE
  var orderPage = document.getElementById('order')
  if (orderPage) {

    $(document).on('click', function (e) {
      // console.log(e.target.tagName)
      if (e.target.tagName === 'SELECT') {
        $('.order__select').toggleClass('opened')
      } else {
        $('.order__select').removeClass('opened')
      }
    });

    $('.order__select select').on('change', function (e) {
      var selected = $('option:selected', e.target)
      if (selected.val() === 'consultation') {
        $('.order__details').removeClass('opened')
      } else {
        $('.order__details').addClass('opened')
      }

      updatePrice()
    });

    // btns
    $('.order__btn-back').on('click', function () {
      window.history.back()
    })
    $('.order__form').on('submit', function (e) {
      e.preventDefault()

      var form = $(this);
      var url = form.attr('action');
      var responseText = {
        ua: {
          text1: 'Дякуюємо за заказ! ',
          text2: 'Ми з Вами звяжемося',
          text1Fail: 'Щось поламалось або попробуйте почистити кеш і спробувати знову! ',
          text2Fail: 'Вибачте за незручність'
        },
        ru: {
          text1: 'Дякуюємо за заказ!RU',
          text2: 'Ми з Вами звяжемосяRU',
          text1Fail: 'Щось поламалось або попробуйте почистити кеш і спробувати знову!RU ',
          text2Fail: 'Вибачте за незручність! RU'
        }
      }
      $.ajax({
        type: 'POST',
        url: url,
        data: form.serialize(),
        success: function (data) {

          $("#order__ok .modal-title").text(responseText.ua.text1)
          $("#order__ok .modal-text1").text(responseText.ua.text2)

          $("#order__ok").modal('show')
          setTimeout(function () {
            $("#order__ok").modal('hide')
          }, 2000)

          clearAfterSubmit()
        },
        fail: function (data) {

          $("#order__ok .modal-title").text(responseText.ua.text1Fail)
          $("#order__ok .modal-text1").text(responseText.ua.text2Fail)

          $("#order__ok").modal('show')
          setTimeout(function () {
            $("#order__ok").modal('hide')
          }, 2000)

        },
        always: function () {
          console.log('test')
        }
      })
    })

    // select order from LocalStorage
    var order = getOrderFromLS('order')
    if (order) {
      $('.order__select select option[value=' + order.food + ']').attr('selected', true)
      $('.order__details').addClass('opened')

      // set days
      var days = parseInt(order.days)
      $('.order__days li').removeClass('choosed')
      switch (days) {
        case 1:
          $('.order__days li:nth-child(1)').addClass('choosed')
          break
        case 7:
          $('.order__days li:nth-child(2)').addClass('choosed')
          break
        case 20:
        case 21:
          $('.order__days li:nth-child(3)').addClass('choosed')
          break
        case 30:
          $('.order__days li:nth-child(4)').addClass('choosed')
          break
        default:
          $('.order__days li:nth-child(1)').addClass('choosed')
      }
      // set price
      $('.order__2price .old').text(order.oldPrice)
      $('.order__2price .current').text(order.currentPrice)
      $('.order__2price .sales b').text(order.sales)
      $('.order__price-for-one b').text(order.pricePerItem)
      // set inputs
      $('.order__form input[name=price_old]').val(order.oldPrice)
      $('.order__form input[name=price_current]').val(order.currentPrice)
      $('.order__form input[name=days]').val(days)
    }

    // days
      function updatePrice(){
        var baseCost = parseInt( $('.order__select option:selected').data('price') )
        $('.order__price-for-one span').text(baseCost + ' грн')
        return baseCost
      }
    // days handler
    $(document).on('click', '.order__days li', function (e) {
      $('.order__days li').removeClass('choosed')
      $(this).addClass('choosed')

      // %
      var percent = $(this).find('span').text()
      var per = parseInt(percent)
      per = Math.abs(per)
      var perIsNaN = isNaN(per)
      // console.log( per )

      // days
      var text = $(this).text()
      var days = parseInt(text)

      // cost
      // debugger
      var baseCost = updatePrice()
      // console.log(baseCost)

      // change price
      var oldPrice = (days * baseCost) + (window.innerWidth < 576 ? '' : ' грн');
      var currentPrice = baseCost+' <b>грн.<b>';
      var perDay = baseCost+' <i>грн.</i>'
      switch (per) {
        case 7:
          // 1 - 0.7 (7%) = 0.93
          currentPrice = ((days * baseCost) * 0.93)
          perDay = (baseCost * 0.93)

          // correction
          // max light, light, (everyday, individ), vegan
          var p = parseInt(currentPrice)
          currentPrice = p === 2929
            ? 2940
            : p === 3189
              ? 3150
              : p === 3580
                ? 3640
                : null

          var d = parseInt(perDay)
          // console.log(d)
          perDay = d === 418
            ? 420
            : d === 455
              ? 450
              : d === 511
                ? 520
                : null


          currentPrice += ' <b>грн.<b>'
          perDay += ' <i>грн.</i>'
          break

        case 13:
          currentPrice = ((days * baseCost) * 0.87)
          perDay = (baseCost * 0.87)

          // correction
          // max light, light, (everyday, individ), vegan
          var p = parseInt(currentPrice)
          currentPrice = p === 8221
            ? 8190
            : p === 8952
              ? 8820
              : p === 10048
                ? 10290
                : null

          var d = parseInt(perDay)
          perDay = d === 391
            ? 390
            : d === 426
              ? 420
              : d === 478
                ? 490
                : null


          currentPrice += ' <b>грн.<b>'
          perDay += ' <i>грн.</i>'
          break
      }

      if (!perIsNaN) {
        $(' .order__2price .old,  .order__2price .sales,  .order__2price .current,  .order__price-for-one').removeClass('d-none')
        $(' .order__fullprice').removeClass('single')

        $(' .order__2price .old').text(oldPrice)
        $(' .order__2price .sales b').text(percent)
        $(' .order__2price .current').html(currentPrice)
      } else {
        $(' .order__2price .old,  .order__2price .sales,  .order__price-for-one').addClass('d-none')

        $(' .order__fullprice').addClass('single')
        $(' .order__2price .current').html(currentPrice)
      }

      // price per day
      $('.order__price-for-one b').html(perDay)
    });
  }
  //end ready
});



// FUNCTION DECLARATIONS:
function removeElements(text, tag) {
  var wrapped = $("<div>" + text + "</div>");
  wrapped.find(tag).remove();
  return wrapped.html();
}
function setOrderInLS(order) {
  if (order) {
    var jsonOrder = JSON.stringify(order)
    localStorage.setItem('order', jsonOrder);
    return true
  }
  return false
}
function getOrderFromLS(key) {
  if (key) {
    var jsonOrder = localStorage.getItem(key);
    var order = JSON.parse(jsonOrder)
    return order
  }
  return false
}
function clearAfterSubmit() {
  localStorage.removeItem('order');
  $('.order__form')[0].reset();
  $('.order__details').removeClass('opened')
  $('.order__select select').prop('selectedIndex', 0)
}
// cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return;
}

function checkCookie() {
  var user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}


/* How use class countDownTimer
	new CountdownTimer({
		".countdown",
		Date.now() + 30000,
		"time is end"
	});
 */
function CountdownTimer(elem, time, message) {
  this.initialize.apply(this, arguments);
}

CountdownTimer.prototype = {

  initialize: function (elem, time, message) {
    this.elems = document.querySelectorAll(elem);
    this.endTime = time;
    message = message || "00:00:00";
    this.message = '<span class="number-wrapper end">\
				<div class="line"></div>\
				<span class="number end">'+ message + '</span>\
			</span>';
  },

  countDown: function () {
    var today = new Date();
    var resultDate = this.endTime - today;
    var day = Math.floor(resultDate / (24 * 60 * 60 * 1000));
    var hour = Math.floor((resultDate % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    var min = Math.floor((resultDate % (24 * 60 * 60 * 1000)) / (60 * 1000)) % 60;
    var sec = Math.floor((resultDate % (24 * 60 * 60 * 1000)) / 1000) % 60 % 60;
    var timer = '';
    var self = this;

    if (resultDate > 0) {
      // if you need 'day' just copy and paste html below in variable timer
      timer = '<div class="number-wrapper">\
								<div class="line">	</div>\
								<span class="number">'+ this.addZero(hour) + '</span>\
								<div class="caption">час</div>\
							</div>';
      timer += '<div class="number-wrapper">\
								<div class="line">	</div>\
								<span class="number">'+ this.addZero(min) + '</span>\
								<div class="caption">мин</div>\
							</div>';
      timer += '<div class="number-wrapper last">\
								<div class="line">	</div>\
								<span class="number">'+ this.addZero(sec) + '</span>\
								<div class="caption">сек</div>\
							</div>';

      for (var i = 0; i < this.elems.length; i++) {
        this.elems[i].innerHTML = timer;
      }

      var id = setTimeout(function () {
        self.countDown();
      }, 10);

    } else {

      for (var i = 0; i < this.elems.length; i++) {
        this.elems[i].innerHTML = this.message;
      }

    }

  },
  addZero: function (num) {
    return ('0' + num).slice(-2);
  }
}
