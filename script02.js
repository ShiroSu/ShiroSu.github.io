window.onload=function() {
  let arrow=document.querySelector(".arrow");
  let arrow_wrapper=document.querySelector(".arrow-wrapper");
  let menu=document.querySelector(".menu");
  let toggle=true;
  arrow.addEventListener("click", ()=> {
      toggle=!toggle;
    if (toggle) {
      arrow.classList.add("arrow_flip");
      arrow.classList.remove("tip");
      arrow_wrapper.classList.add("wrapper_move");
      menu.classList.add("menu_active");
    }
    else {
      arrow.classList.remove("arrow_flip");
      arrow_wrapper.classList.remove("wrapper_move");
      //arrow.classList.add("tip");
      menu.classList.remove("menu_active");
    }
  });
}