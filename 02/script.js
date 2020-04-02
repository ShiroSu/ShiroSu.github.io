window.onload=function() {
  let arrow=document.querySelector(".arrow");
  let arroWrapper=document.querySelector(".arrow-wrapper");
  let menu=document.querySelector(".menu");
  let toggle=true;
  let width=document.body.clientWidth;
  let max_width=window.screen.width;
  let contact=document.querySelector(".contact");
  console.log(width+"\n"+max_width);
  if (width<320) {
    contact.innerHTML="Contacts";
  }
  arroWrapper.addEventListener("click", ()=> {
    toggle=!toggle;
    if (toggle) {
      arrow.classList.add("arrow_flip");
      menu.classList.add("menu_active");
    }
    else {
      arrow.classList.remove("arrow_flip");
      menu.classList.remove("menu_active");
    }
  });
}