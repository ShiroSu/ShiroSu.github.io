window.addEventListener("load", ()=> {
    logo_img=document.querySelector(".logo .img");
    console.log(window.getComputedStyle(logo_img).height);
    logo_img.style.width=window.getComputedStyle(logo_img).height;
});