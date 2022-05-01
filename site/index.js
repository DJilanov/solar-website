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
			cancelButtonText: 'Откажи',
			reverseButtons: true,
      html: `
        <h2>Връзка с нас</h2>
        <label class="has-float-label">
          <input onClick="this.select();" id="name" placeholder=" " type="text" required="required" value="">
          <span class="label">Име *</span>
        </label>
        <label class="has-float-label">
          <input onClick="this.select();" id="phone" placeholder=" " type="text" required="required">
          <span class="label">Телефон *</span>
        </label>
        <label class="has-float-label">
          <input onClick="this.select();" id="email" placeholder=" " type="text" required="required">
          <span class="label">Емайл *</span>
        </label>
        <label class="has-float-label">
          <textarea onClick="this.select();" id="message" placeholder="Съобщение"required="required"></textarea>
        </label>

      `,
			focusConfirm: false,
			confirmButtonText: 'Изпрати',
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
						`Вашето име е задължително поле`
					);
					let element = document.getElementById('name');
					element.style='border-color: red;';
					return false;
				}
				if(!data[1].length) {
					Swal.showValidationMessage(
						`Вашият телефонен номер е задължително поле`
					);
					let element = document.getElementById('phone');
					element.style='border-color: red;';
					return false;
				}
				if(!data[2].length) {
					Swal.showValidationMessage(
						`Вашият емайл е задължително поле`
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
              message: 'ПАНЕЛИ: ' + data[3],
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
          title: 'Изпратено успешно!',
          text: 'Ще се свържем с вас',
          showConfirmButton: false,
          timer: 2500
        });
      }
    })
  }

  $(document).on("click", ".chat", handler);
  $(document).on("click", ".connect", handler);

});

function testWebP() {
  return new Promise(res => {
      const webP = new Image();
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
      webP.onload = webP.onerror = () => {
          res(webP.height === 2);
      };        
  })
};

testWebP().then(hasWebP => {
  if(hasWebP) {
    document.body.className = 'hasWEBP';
  }
});