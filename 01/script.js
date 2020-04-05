window.onload=function() {
  var ico=document.querySelector(".ico");
  var icoInner=document.querySelector(".ico-inner");
  var leftMenu=document.querySelector(".left_menu");
  var sectionLeft=document.querySelector(".news")
  var toggle=false;
  ico.addEventListener("click", (e)=> {
      console.log(e);
      ico.classList.toggle("ico_active");
      ico.classList.toggle("animate_ico");
      icoInner.classList.toggle("ico-inner_active");
      leftMenu.classList.toggle("left_menu_active");
      icoInner.classList.toggle("inner-left");
      sectionLeft.classList.toggle("news_active");
    if (!toggle) {
      leftMenu.style.animation="none";
    }
    else {
      leftMenu.style.animation="menu_drag 1.5s infinite forwards";
    }
    toggle=!toggle;
  });
}