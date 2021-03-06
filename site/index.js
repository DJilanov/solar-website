$(document).ready(function() {
  var pages = $(".page").length,
      scrolling = false,
      curPage = 1;
  
  function pagination(page, movingUp) {
    scrolling = true;
    var diff = curPage - page,
        oldPage = curPage;
    curPage = page;
    $(".page").removeClass("active small previous");
    $(".page-" + page).addClass("active");
    $(".nav-btn").removeClass("active");
    $(".nav-page" + page).addClass("active");
    if (page > 1) {
      $(".page-" + (page - 1)).addClass("previous");
      if (movingUp) {
        $(".page-" + (page - 1)).hide();
        var hackPage = page;
        setTimeout(function() {
          $(".page-" + (hackPage - 1)).show();
        }, 600);
      }
      while (--page) {
        $(".page-" + page).addClass("small");
      }
    }
    console.log(diff)
    if (diff > 1) {
      for (var j = page + 1; j < oldPage; j++) {
        $(".page-" + j + " .half").css("transition", "transform .7s ease-out");
      }
    }
    setTimeout(function() {
      scrolling = false;
      $(".page .half").attr("style", "");
      $(".page")
    }, 700);
  }
  
  function navigateUp() {
    if (curPage > 1) {
      curPage--;
      pagination(curPage, true);
    }
  }

  function navigateDown() {
    if (curPage < pages) {
      curPage++;
      pagination(curPage);
    }
  }
  if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
    $(document).on("mousewheel DOMMouseScroll", function(e) {
      if (!scrolling) {
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
          navigateUp();
        } else { 
          navigateDown();
        }
      }
    });
  }
  
  $(document).on("click", ".scroll-btn", function() {
    if (scrolling) return;
    if ($(this).hasClass("up")) {
      navigateUp();
    } else {
      navigateDown();
    }
  });
  
  $(document).on("keydown", function(e) {
    if (scrolling) return;
    if (e.which === 38) {
      navigateUp();
    } else if (e.which === 40) {
      navigateDown();
    }
  });
  
  $(document).on("click", ".nav-btn:not(.active)", function() {
    if (scrolling) return;
    pagination(+$(this).attr("data-target"));
  });

  var handler = function() {
    Swal.fire({
			title: '',
			allowOutsideClick: false,
			showCancelButton: true,
			cancelButtonColor: '#d33',
			cancelButtonText: '????????????',
			reverseButtons: true,
      html: `
        <h2>???????????? ?? ??????</h2>
        <label class="has-float-label">
          <input onClick="this.select();" id="name" placeholder=" " type="text" required="required" value="">
          <span class="label">?????? *</span>
        </label>
        <label class="has-float-label">
          <input onClick="this.select();" id="phone" placeholder=" " type="text" required="required">
          <span class="label">?????????????? *</span>
        </label>
        <label class="has-float-label">
          <input onClick="this.select();" id="email" placeholder=" " type="text" required="required">
          <span class="label">?????????? *</span>
        </label>
        <label class="has-float-label">
          <textarea onClick="this.select();" id="message" placeholder="??????????????????"required="required"></textarea>
        </label>

      `,
			focusConfirm: false,
			confirmButtonText: '??????????????',
			confirmButtonColor: '#28a745',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
				const data = [
					document.getElementById('name').value,
					document.getElementById('phone').value,
					document.getElementById('email').value,
					document.getElementById('message').value
				];
        data[0].style='';
        data[1].style='';
        data[2].style='';
				if(!data[0].length) {
					Swal.showValidationMessage(
						`???????????? ?????? ?? ???????????????????????? ????????`
					);
					let element = document.getElementById('name');
					element.style='border-color: red;';
					return false;
				}
				if(!data[1].length) {
					Swal.showValidationMessage(
						`???????????? ?????????????????? ?????????? ?? ???????????????????????? ????????`
					);
					let element = document.getElementById('phone');
					element.style='border-color: red;';
					return false;
				}
				if(!data[2].length) {
					Swal.showValidationMessage(
						`???????????? ?????????? ?? ???????????????????????? ????????`
					);
					let element = document.getElementById('email');
					element.style='border-color: red;';
					return false;
				}
        return fetch(
          `https://www.jilanov.com/api/message`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: data[0],
              phone: data[1],
              email: data[2],
              message: '????????????: ' + data[3],
            })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '?????????????????? ??????????????!',
          text: '???? ???? ?????????????? ?? ??????',
          showConfirmButton: false,
          timer: 2500
        });
      }
    })
  }

  $(document).on("click", ".chat", handler);
  $(document).on("click", ".connect", handler);

});

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages;    

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
})