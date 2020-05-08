let width=window.innerWidth, height=window.innerHeight,
    preload=document.querySelector(".preload"),
    preText=document.querySelector(".pre-text"),
    sections=document.querySelectorAll("section"),
    frames=document.querySelectorAll(".frame"),
    sliders=document.querySelectorAll(".portfolio .item input"),
    slide_value=document.querySelectorAll(".slide_value"),
    footer=document.querySelector("footer"),
    scrollcheck=true;
let frameobj={
    width,
    height
};
//
window.onload=init;
// preload.style.display="none";
// document.querySelector("body").style.overflowY="overlay";
// document.querySelector(".page").style.transform="none";
// sections.forEach(item => item.style.display="block"); footer.style.display="block";
// console.log(footer.getBoundingClientRect());



frames.forEach((item)=> {
    item.addEventListener("mouseover", ()=> { document.querySelector("body").style.overflowY="hidden"; });//
    item.addEventListener("mouseout", ()=> { document.querySelector("body").style.overflowY="overlay"; });//
});

sliders.forEach((item)=> {
    item.setAttribute("max", `${width}`);
    item.setAttribute("value", `${width}`);
});
// slide_value.forEach((item, i)=> {
//     item.style.left=`${sliders[i].getBoundingClientRect().right-18}px`;
//     item.innerHTML=sliders[i].value;
// });
sliders.forEach((item, i)=> {
    item.addEventListener("mousemove", (e)=> {
        let thumb_pos=e.clientX,
        slide_left=item.getBoundingClientRect().left,
        slide_right=item.getBoundingClientRect().right;
        if (e.which==1) {
            if (thumb_pos>=slide_left+5) {
                if (thumb_pos<=slide_right-10) {
                    slide_value[i].style.left=`${thumb_pos-8}px`;
                }
                else slide_value[i].style.left=`${slide_right-18}px`;
            }
            else slide_value[i].style.left=`${slide_left}px`;
        }
        slide_value[i].innerHTML=item.value;
        frames[i].children[0].style.width=item.value+"px";
        frames[i].children[0].style.transform=`scaleX(${width*0.4/item.value}) scaleY(.4)`;
    });
});



function init() {
    document.querySelectorAll(".pre").forEach((item)=> item.style.opacity="1");
    anime({
        targets: preText,
        rotate: { 
            value: -90,
            easing: "easeOutElastic",
            delay: 2000,
            duration: 1500,
        },
        translateX: {
            value: -2*height/3,
            easing: "easeOutQuad",
            delay: 3700,
            duration: 600
        },
        rotateY: {
            value: 25,
            easing: "easeOutQuad",
            delay:3700,
            duration: 700
        }
    });
    anime({
        targets: preload,
        rotateX: 102,
        easing: "easeOutBounce",
        delay: 5200,
        duration: 2200
    });
    setTimeout(()=> { document.querySelector("body").style.overflowY="overlay"; preload.style.display="none" }, 7500);
    anime({
        targets: ".page",
        translateZ: [-880,0],
        easing: "easeInOutQuad",
        delay: 7800,
        duration: 1000
    });
    setTimeout(()=> {
        sections.forEach(item => item.style.display="block");
        footer.style.display="block";
        slide_value.forEach((item, i)=> {
            item.style.left=`${sliders[i].getBoundingClientRect().right-18}px`;
            item.innerHTML=sliders[i].value;
        });
    }, 8800);
}