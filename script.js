
window.onload=function() {
  var ico=document.querySelector(".ico");
  var icoInner=document.querySelector(".ico-inner");
  var leftMenu=document.querySelector(".left_menu");
  var icoInner_after=document.querySelector(".ico-inner:after")
  var sectionLeft=document.querySelector(".news")
  var toggle=false;
  ico.addEventListener("click", (e)=> {
    if (!toggle) {
      console.log(e);
      toggle=true;
      ico.classList.add("ico_active");
      icoInner.classList.add("ico-inner_active");
      leftMenu.classList.add("left_menu_active");
      icoInner.classList.add("inner-left");
      sectionLeft.classList.add("news_active");
      icoInner_after.style.width="44px";
    }
    else {
      toggle=false;
      sectionLeft.classList.remove("news_active");
      icoInner.classList.remove("inner-left");
      leftMenu.classList.remove("left_menu_active");
      icoInner.classList.remove("ico-inner_active");
      ico.classList.remove("ico_active");
      icoInner_after.style.width="0px";
    }
  });
}