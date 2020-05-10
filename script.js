let width=window.innerWidth, height=window.innerHeight,
    preload=document.querySelector(".preload"),
    preText=document.querySelector(".pre-text"),
    page=document.querySelector(".page"),
    header=document.querySelector("header"),
    sections=document.querySelectorAll("section"),
    frames=document.querySelectorAll(".frame"),
    sliders=document.querySelectorAll(".portfolio .inner input"),
    slide_value=document.querySelectorAll(".slide_value"),
    footer=document.querySelector(".footer"),
    from=undefined, scrollcheck=true, scale_x=0, scale_y=0,
    struct=[header];
//
// preload.style.display="none";
// page.style.transform="none";
// sections.forEach(item => item.style.display="block");



window.onload=init;
sliders_init();
sections.forEach((item)=> struct.push(item));
document.addEventListener("wheel", (e)=> {
    let elem=scrollPrep(e);
    if (from!=elem) scrollTo(elem);
    from=elem;
});

frames.forEach((item)=> {
    item.addEventListener("mouseover", ()=> sections[0].style.overflowY="hidden");
    item.addEventListener("mouseout", ()=> sections[0].style.overflowY="overlay");
});


sliders.forEach((item, i)=> {
    item.addEventListener("mousemove", (e)=> {
        let thumb_pos=e.clientX,
        slide_left=item.getBoundingClientRect().left,
        slide_right=item.getBoundingClientRect().right;
        if (e.which==1) {
            if (thumb_pos>=slide_left+5) {
                if (thumb_pos<=slide_right-10) {
                    slide_value[i].style.left=thumb_pos-8+"px";
                }
                else slide_value[i].style.left=slide_right-18+"px";
            }
            else slide_value[i].style.left=slide_left+"px";
        }
        slide_value[i].innerHTML=item.value;
        frames[i].children[0].style.width=item.value+"px";
        frames[i].children[0].style.transform=`scaleX(${scale_x}) scaleY(.4)`;
        frames[i].style.width=(item.value*scale_x)+"px";
    });
});

window.addEventListener("resize", ()=> {
    width=window.innerWidth;
    sliders_init();
})

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
    setTimeout(()=> { document.body.style.overflowY="overlay"; preload.style.display="none" }, 7500);
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

function sliders_init() {
    sliders.forEach((item, i)=> {
        scale_x=width*0.4/item.value;
        frames[i].children[0].style.transform=`scaleX(${scale_x}) scaleY(.4)`;
    });
    slide_value.forEach((item, i)=> {
        item.innerHTML=sliders[i].value;
        if (i%2==0)
            item.style.left=sliders[i].getBoundingClientRect().right-18+"px";
        else
            item.style.left=sliders[i].getBoundingClientRect().left+"px"
    });
}

function find_parent(e) {
    let parent=e.target;
    while (parent.offsetParent!=page) {
        parent=parent.offsetParent;
    }
    if (parent==header.firstElementChild)
    parent=header;
    return parent;
}

function scrollTo(elem) {
    window.scroll({
        left: 0,
        top: elem.offsetTop,
        behavior: "smooth"
    });
}
function scrollPrep(e) {
    let dir=Math.sign(e.deltaY), elem=find_parent(e);
    struct.forEach((item, i)=> {
        let=scroll_pos=0, scroll_height=0;
        if (elem==item) {
            if (elem==sections[0]) {
                scroll_pos=elem.scrollTop;
                scroll_height=elem.scrollHeight;
            }
            if (dir>0) {
                if (item!=sections[0]) {
                    if (i==struct.length-1) return false;
                    else elem=struct[i+1];
                }
                else {
                    if (scroll_pos+item.clientHeight>=scroll_height) elem=struct[i+1];
                    else return false;
                }
            }
            else {
                if (item!=sections[0]) {
                    if (i==0) return false;
                    else elem=struct[i-1];
                }
                else {
                    if (scroll_pos<=0) elem=struct[i-1];
                    else return false;
                }
            }
        }
    });
    return elem;
}