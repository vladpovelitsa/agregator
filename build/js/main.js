var sections = document.querySelectorAll('.section');
var offset = innerHeight * 0.9;
function setAnimation() {
  sections.forEach(function(item) {
    if (item.getBoundingClientRect().top < offset) {
      item.classList.add('animated')
      var timeout = setTimeout(function(){
        item.classList.add('animation_ends')
      },7000)
    }
  })
}

document.addEventListener('scroll', setAnimation)
setAnimation()

function modalControls(e){
  var body = document.querySelector('body');
  if (e.target.classList.contains('modal_btn')) {
    event.preventDefault()
    var modal = document.getElementById(e.target.getAttribute('data-target'));
    modal.classList.add('active');
    body.classList.add('overlay');
  }
  if (e.target.classList.contains('overlay') || e.target.classList.contains('close')) {
    var modal = document.querySelector('.modal.active');
    modal.classList.remove('active');
    body.classList.remove('overlay');
  }
}

document.addEventListener('click', modalControls)

function navControls() {
    var elem = event.target
    var nav = document.querySelector('nav')
    if (elem.classList.contains('show_menu')) {
        elem.classList.toggle('active')
        nav.classList.toggle('active')
    }

    if (document.querySelector('.search_toggler')) {
      if (elem.classList.contains('search_toggler')) {
        document.querySelector('.search_form').classList.toggle('active');
      }
      else {
        var notHide = false;
        event.path.forEach((item)=>{
            if(item == document.querySelector('.search_form')) {
              notHide = true
              return notHide
            }
        })
        if (notHide) {
          return
        }
        else {
          document.querySelector('.search_form').classList.remove('active');

        }
      }
    }
}
document.addEventListener('click', navControls)


function tabs(e){
  e = event.target
  var currentTabs = e.parentNode.parentNode;
  if (e.classList.contains('tab_toggler')) {
    currentTabs.querySelectorAll('.tab_content').forEach((item) => {
      item.classList.remove('active');
    })
    currentTabs.querySelectorAll('.tab_toggler').forEach((item) => {
      item.classList.remove('active');
    })
    e.classList.add('active')
    console.log(currentTabs.querySelector(e.getAttribute('data-target')));
    currentTabs.querySelector(e.getAttribute('data-target')).classList.add('active')
  }
}

document.addEventListener('click', tabs);


var newsSlider = new Swiper('.premium_studios-slider', {
  // Optional parameters
  slidesPerView: "auto",
  spaceBetween: 30,
  loop: true,

  // Navigation arrows
  pagination: {
    clickable: true,
    el: '.swiper-pagination',
  },

})

if (document.querySelector('.bg_change-toggler')) {
  document.querySelector('.bg_change-toggler').onclick = function(){
    document.querySelector('.bg_change').classList.toggle('active')
  }
}
var newsSlider = new Swiper('.account_reviews-slider', {
  // Optional parameters
  slidesPerView: 'auto',
  spaceBetween: 30,
  loop: true,

  // Navigation arrows
  navigation: {
      nextEl: '.account_reviews-next',
      prevEl: '.account_reviews-prev',
    },
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
  },
})

function accountNav() {
  var e = event.target
  if (e.classList.contains('account_avatar')) {
    document.querySelector('.loggined_menu').classList.toggle('active')
  }
  else {
    document.querySelector('.loggined_menu').classList.remove('active')
  }
}

if (document.querySelector('.header_account')) {
  document.addEventListener('click', accountNav)
}

function accountSidebarToggler() {
  var e = event.target;
  if (e.classList.contains('sidebar_mobile_toggler')) {
    document.querySelector('.account_content-sidebar').classList.toggle('active');
    document.querySelector('body').classList.toggle('overflow-non');
    e.classList.toggle('active')
  }
}

document.addEventListener('click', accountSidebarToggler)


function Quiz(wrap, settings){
  if (document.querySelector(wrap)) {
    var settings = settings;
    var wrap = document.querySelector(wrap);
    var steps = wrap.querySelectorAll(settings.stepClass);
    var btn = wrap.querySelector('.next_step');
    var counter = 0;
    var indicators = addIndicators(settings, wrap);

    btn.onclick = function(){
      if (counter == steps.length - 1) {
        btn.setAttribute('type', 'submite')
        return
      }
      counter++
      steps.forEach(function(item){
        item.classList.remove('active');
      })
      steps[counter].classList.add('active')
      if (indicators) {
        indicators.querySelectorAll('li').forEach(function(item){
          item.classList.remove('active');
        })
        indicators.querySelectorAll('li')[counter].classList.add('active')
      }
    }

    return settings
  }
}

var test = new Quiz('.quiz', {
  indicators: 1,
  stepClass: '.quiz_step',
})


function addIndicators(settings, wrap){
  if (settings.indicators == true) {
    var indicators = document.createElement('ul')
    indicators.classList.add('quiz_indicators');
    wrap.appendChild(indicators);
    for (var i = 0; i <= wrap.querySelectorAll(settings.stepClass).length - 1; i++) {
      var li = document.createElement('li')
      indicators.appendChild(li);
    }
    indicators.querySelector('li').classList.add('active')
    return indicators

  }
}

var selectedTypes = []

function typesSelect() {
  var e = event.target;
  if (e.classList.contains('type_btn')) {
    var selectedNode = e.cloneNode();
    selectedNode.innerText = e.innerText
    if (e.parentNode.classList.contains('all_types')) {
      document.querySelector('.selected_types').appendChild(selectedNode)
      selectedTypes.push(e.getAttribute('data-id'))
    }
    else if (e.parentNode.classList.contains('selected_types')) {
      document.querySelector('.all_types').appendChild(selectedNode)
      removeType(selectedTypes, e)
    }
    // console.log(selectedTypes)
    e.remove()
    document.querySelector('.types_input').value = selectedTypes
    console.log(document.querySelector('.types_input').value)
    return selectedTypes
  }
}

function removeType(arr,target){
  arr.forEach(function(type){
    if (type == target.getAttribute('data-id')) {
      arr.splice(arr.indexOf(type),arr.indexOf(type)+1)
    }
    return arr
  })
}


document.addEventListener('click', typesSelect)

if (document.querySelector('.mode_switcher')) {
  document.querySelector('.mode_switcher').onclick = function(){
    document.querySelector('.wrapper').classList.toggle('dark_mode')
  }
}

function resultAnimation(){
  var circle = document.querySelectorAll('.circle_progress');
  circle.forEach(function(item){
    var radius = item.r.baseVal.value; 
    var circumference = 2 * Math.PI * radius;

    item.style.strokeDasharray = `${circumference} ${circumference}`;
    item.style.strokeDashoffset = circumference;
    function setProgress(percent) {
      var offset = circumference - percent / 100 * circumference;
      item.style.strokeDashoffset = offset;
    }

    var result = item.parentNode.parentNode.querySelector('.result_value').value;
    var n = 0;
    var animation = setInterval(function() {
      if(n >= result) {
        clearInterval(animation)
      }
      else {
        n++
        setProgress(n)
      }
    },50)
  })
}
resultAnimation()


function portfolioControls() {
  var e = event.target;
  if (e.classList.contains('account_portfolio-toggler')) {
    e.classList.toggle('active');
    e.parentNode.querySelector('.account_portfolio-controls').classList.toggle('active')
  }
}

document.addEventListener('click', portfolioControls)

var newsSlider = new Swiper('.account_portfolio-slider', {
  // Optional parameters
  slidesPerView: 'auto',
  spaceBetween: 30,
  loop: true,

  // Navigation arrows
  navigation: {
      nextEl: '.account_portfolio-next',
      prevEl: '.account_portfolio-prev',
    },

})


// function handleFileSelect(evt) {
//   if (evt.target.classList.contains('fileMulti')) {

//   }
//   var files = []
//     var file = evt.target.files; // FileList object
//     // Loop through the FileList and render image files as thumbnails.
//     for (var i = 0, f; f = file[i]; i++) {
//         // Only process image files.
//         if (!f.type.match('image.*')) {
//             alert("Image only please....");
//         }
//         var reader = new FileReader();
//         // Closure to capture the file information.
//         reader.onload = (function (theFile) {
//             return function (e) {
//                 // Render thumbnail.
//                 var div = document.createElement('div');
//                 div.classList.add('image_wrap')
//                 div.innerHTML = ['<img class="img" title="', escape(theFile.name), '" src="', e.target.result, '" /> <button type="button" class="image_wrap-delete"></button>'].join('');
//                 document.querySelector('.uploaded_images').appendChild(div, null);

//             };
//         })(f);
//         // Read in the image file as a data URL.
//         reader.readAsDataURL(f);
//     }
// }

// document.addEventListener('change', handleFileSelect, false);

window.onscroll = function (){
  if(pageYOffset > 730) {
    document.querySelector('.header').classList.add('header-fixed')
  }
  else {
    document.querySelector('.header').classList.remove('header-fixed')
  }
}

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.classList.add("input");

  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);


function Filtring(settings){
  var settings = settings;
  var filterToggler = document.querySelectorAll(settings.selector);
  var wrap = document.querySelector(settings.wrap);
  // console.log(wrap.children)

  filterToggler.forEach(function(item){
    item.addEventListener('change', function(){
      if(this.value == 'all') {
        for (var i = 0; i <= wrap.children.length - 1; i++){
          wrap.children[i].classList.remove('hidden')
        }
      }
      else {
        for (var i = 0; i <= wrap.children.length - 1; i++){
          wrap.children[i].classList.add('hidden')
          if (wrap.children[i].getAttribute('data-type') == item.value) {
            wrap.children[i].classList.remove('hidden')
          }
        }
      }
    })
  })
}

var portfolioFilter = new Filtring({
  selector: '.portfolio_filters',
  wrap: '.portfolio_wrap'
})

var pricingFilter = new Filtring({
  selector: '.pricing_filters',
  wrap: '.pricing_content'
})

var accountPortfolio = new Filtring({
  selector: '.account_portfolio-toggler',
  wrap: '.account_portfolio-content'
})


// document.querySelector('.show_more').onclick = function(){
//   this.previousElementSibling.classList.toggle('active')
// }


var newsSlider = new Swiper('.portfolio_slider', {
  // Optional parameters
  slidesPerView: "auto",
  spaceBetween: 15,
  loop: true,
})

function briefToggler() {
  var e = event.target;
  if (e.checked) {
    document.querySelector('.brief').classList.remove('hidden');
  }
  else {
    document.querySelector('.brief').classList.add('hidden');    
  }
}

addEventListener('change', briefToggler)

function userToggler(e) {
  var e = event.target;
  if (e.classList.contains('user_toggler')) {
    document.querySelector('.loginned_nav').classList.toggle('active')
  }
  else if (document.querySelector('.loginned_nav')){
    document.querySelector('.loginned_nav').classList.remove('active')
  }
}

document.addEventListener('click', userToggler)


function detailsToggler(){
  if (window.innerWidth < 767) {
    document.querySelectorAll('.search_result-dropdown').forEach(function (item) {
      item.removeAttribute('open')
    })
  }
  else {
   document.querySelectorAll('.search_result-dropdown').forEach(function (item) {
     item.setAttribute('open', '')
   }) 
  }
}

if (document.querySelector('.search_result-dropdown')) {
  window.addEventListener('resize', detailsToggler)
}


function chatSelection(){
  var e = event.target;
  if (e.classList.contains('chat_link')) {
    event.preventDefault();
    document.querySelector('.messages_content').classList.add('active')
    document.querySelector('.messages_nav').classList.add('hidden')
  }
  if (e.classList.contains('chat_back')) {
    event.preventDefault();
    document.querySelector('.messages_content').classList.remove('active')
    document.querySelector('.messages_nav').classList.remove('hidden')
  }
}

document.addEventListener('click', chatSelection)
