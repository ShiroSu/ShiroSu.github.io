let width=window.innerWidth, height=window.innerHeight,
    preload=document.querySelector(".preload");
    preText=document.querySelector(".pre-text");

function init() {
    anime({
        targets: preText,
        rotate: { 
            value: 90,
            easing: "easeOutElastic",
            delay: 1000,
            duration: 1500,
        },
        translateX: {
            value: 2*height/3,
            delay: 2700,
            duration: 1200
        }
    });
    setTimeout(()=> preText.style.display="none", 3000);
    anime({
        targets: preload,
        rotateX: 102,
        easing: "easeOutBounce",
        delay: 4000,
        duration: 2200
    });
    setTimeout(()=> preload.style.display="none", 6500);
    anime({
        targets: ".page",
        translateZ: [-580,0],
        easing: "easeInOutQuad",
        delay: 6800,
        duration: 1000
    });
}

window.onload=init;