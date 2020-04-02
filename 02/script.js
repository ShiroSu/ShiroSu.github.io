window.onload=function() {
  let arrow=document.querySelector(".arrow");
  let arroWrapper=document.querySelector(".arrow-wrapper");
  let menu=document.querySelector(".menu");
  let toggle=true;
  let width=document.body.clientWidth;
  let max_width=window.screen.width;
  alert(width+"\n"+max_width);
  let contact=document.querySelector(".contact");
  if (width<320) {
    contact.innerHTML="Contacts";
  }
  arroWrapper.addEventListener("click", ()=> {
    toggle=!toggle;
    if (toggle) {
      arrow.classList.add("arrow_flip");
      arrow.classList.remove("tip");
      arroWrapper.classList.add("wrapper-move");
      menu.classList.add("menu_active");
    }
    else {
      arrow.classList.remove("arrow_flip");
      //arrow.classList.add("tip");
      menu.classList.remove("menu_active");
    }
  });
}
