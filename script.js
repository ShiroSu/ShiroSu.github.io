let width=window.innerWidth, height=window.innerHeight;

function init() {
    let preload=document.querySelector(".preload"),
    preText=document.querySelector(".pre-text"),
    sections=document.querySelectorAll("section"),
    footer=document.querySelector("footer");
    
    window.scrollTo(0,0);
    anime({
        targets: preText,
        rotate: { 
            value: -90,
            easing: "easeOutElastic",
            delay: 1000,
            duration: 1500,
        },
        translateX: {
            value: -2*height/3,
            easing: "easeOutQuad",
            delay: 2700,
            duration: 600
        },
        rotateY: {
            value: 25,
            easing: "easeOutQuad",
            delay:2700,
            duration: 700
        }
    });
    anime({
        targets: preload,
        rotateX: 102,
        easing: "easeOutBounce",
        delay: 4200,
        duration: 2200
    });
    setTimeout(()=> { document.querySelector("body").style.overflowY="overlay"; preload.style.display="none" }, 6500);
    anime({
        targets: ".page",
        translateZ: [-580,0],
        easing: "easeInOutQuad",
        delay: 6800,
        duration: 1000
    });
    setTimeout(()=> { sections.forEach(item => item.style.display="block"); footer.style.display="block"; }, 7800);
}

window.onload=init;
// preload.style.display="none";
// document.querySelector("body").style.overflowY="auto";
// document.querySelector(".page").style.transform="none";