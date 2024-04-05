jQuery(document).ready();

$(".navi > li").click(function () {
  $(this).siblings(".hover").find(".sub-menu").slideUp(300);
  $(this).siblings(".hover").removeClass("hover");

  if ($(this).hasClass("hover")) {
    $(this).find(".sub-menu").slideUp(300);
    $(this).removeClass("hover");
  } else {
    $(this).find(".sub-menu").slideDown(300);
    $(this).addClass("hover");
  }
});

$(".sub-menu").click(function () {
  return false;
});

$(".collection-menu > ul > li").click(function () {
  $(this).siblings().find(".sub-menu-2").fadeOut(300);
  $(this).find(".sub-menu-2").fadeIn(300);
  $(this).addClass("active").siblings().removeClass("active");

  return false;
});

/슬라이드/;

$(document).ready(function () {
  $(".slider").each(function () {
    var $this = $(this);
    var $group = $this.find(".slide-group");
    var $slides = $this.find(".slide");
    var buttonArray = [];
    var currentIndex = 0;
    var timeout;

    var $nav = $(".slide-nav").find("div");

    $nav.on("click", function (event) {
      event.preventDefault();
      console.log($(this));
      if ($(this).hasClass("next")) {
        if (currentIndex === $slides.length - 1) {
          move(0);
        }
        move(currentIndex + 1);
      } else {
        if (currentIndex === 0) {
          move($slides.length - 1);
        }
        move(currentIndex - 1);
      }
    });

    function move(newIndex) {
      var animateLeft, slideLeft;

      advance();

      if ($group.is(":animated") || currentIndex === newIndex) {
        return;
      }

      buttonArray[currentIndex].removeClass("active");
      buttonArray[newIndex].addClass("active");

      if (newIndex > currentIndex) {
        slideLeft = "100%";
        animateLeft = "-100%";
      } else {
        slideLeft = "-100%";
        animateLeft = "100%";
      }

      $slides.eq(newIndex).css({
        left: slideLeft,
        display: "block",
      });

      $group.animate({ left: animateLeft }, function () {
        $slides.eq(currentIndex).css({ display: "none" });
        $slides.eq(newIndex).css({ left: 0 });
        $group.css({ left: 0 });
        currentIndex = newIndex;
      });
    }

    function advance() {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        if (currentIndex < $slides.length - 1) {
          move(currentIndex + 1);
        } else {
          move(0);
        }
      }, 4000);
    }

    $.each($slides, function (index) {
      var $button = $(
        '<button type="button" class="slide-btn">&bull;</button>'
      );
      if (index === currentIndex) {
        $button.addClass("active");
      }
      $button
        .on("click", function () {
          move(index);
        })
        .appendTo(".slide-buttons");
      buttonArray.push($button);
    });

    advance();
  });
});

var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

// 오리스 컬렉션
document.addEventListener("DOMContentLoaded", function () {
  const menus = document.querySelectorAll(".clock-menu .clock");

  menus.forEach((menu) => {
    menu.addEventListener("click", function () {
      setActiveMenu(menu);
      handleMenuImages(menu);
    });
  });

  // 페이지가 로드될 때 첫 번째 메뉴를 활성화
  setActiveMenu(menus[0]);
  handleMenuImages(menus[0]);
});

function setActiveMenu(activeMenu) {
  const menus = document.querySelectorAll(".clock-menu .clock");

  menus.forEach((menu) => {
    menu.classList.remove("active");
    // menu.querySelector(".clock").style.display = "none";
  });

  activeMenu.classList.add("active");
  activeMenu.querySelector(".clock img").style.display = "flex";
}

function handleMenuImages(menu) {
  const previewImage = document.getElementById("previewImage");
  const images = menu.querySelectorAll(".clock img");

  images.forEach((img) => {
    img.addEventListener("mouseenter", function () {
      previewImage.src = this.src;
      fadeIn(previewImage);
      zoom(previewImage);
    });
    img.addEventListener("mouseleave", function () {
      fadeIn(previewImage);
      zoom(previewImage);
      previewImage.src = "https://i.imgur.com/vhuHB73.jpg";
    });
  });
}

// 페이드 인 함수
function fadeIn(element) {
  let opacity = 0;
  element.style.opacity = opacity;
  const interval = setInterval(function () {
    if (opacity < 1) {
      opacity += 0.1;
      element.style.opacity = opacity;
    } else {
      clearInterval(interval);
    }
  }, 50);
}
// 줌 함수
function zoom(element) {
  let scale = 1;
  element.style.scale = scale;
  const interval = setInterval(function () {
    if (scale < 1.6) {
      scale += 0.1;
      element.style.scale = scale;
    } else {
      clearInterval(interval);
    }
  }, 25);
}

// 페이드 아웃 함수
// function fadeOut(element) {
//   let opacity = 1;
//   element.style.opacity = opacity;
//   const interval = setInterval(function() {
//     if (opacity > 0) {
//       opacity -= 0.1;
//       element.style.opacity = opacity;
//     } else {
//       clearInterval(interval);
//     }
//   }, 50);
// }

// 모바일 반응형
function s() {
  $(".top-menu").toggleClass("active");
}

var menu_click_act = function () {
  var $clicked = $(this);
  if ($clicked.hasClass("active")) {
    $clicked.removeClass("active");
  } else {
    $clicked.addClass("active");
  }
};

var $li = $(".mobile-top-bar .top-menu li ");
$li.click(menu_click_act);

// var 장바구니 = window.$('.mobile-top-bar .top-menu li ');
// $장바구니.click(메뉴아이템이_클릭되면_할일);
