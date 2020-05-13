let width=window.innerWidth, height=window.innerHeight,
    preload=document.querySelector(".preload"),
    preText=document.querySelector(".pre-text"),
    page=document.querySelector(".page"),
    header=page.querySelector("header"),
    sections=page.querySelectorAll("section"),
    ports=page.querySelectorAll(".portfolio"),
    wradap=page.querySelectorAll(".adaptive"),
    main_inn=page.querySelectorAll(".main"),
    hand=document.querySelectorAll(".toAdapt"),
    adapt_inn=page.querySelectorAll(".adapt"),
    mainFrames=page.querySelectorAll(".main .frame"),
    adaptFrames=page.querySelectorAll(".adapt .frame"),
    sliders=page.querySelectorAll(".adapt input"),
    slide_value=page.querySelectorAll(".slide_value"),
    footer=page.querySelector(".footer"),
    from=undefined, scrollcheck=true, scale_x=0, k=0,
    struct=[header];
//
preload.style.display="none";
page.style.transform="none";
sections.forEach(item => item.style.display="block");
// let inter=0;
// setInterval(()=> {
    // if (adapt_inn[0].getBoundingClientRect().left==0 && inter==0) {
        // console.log(adaptFrames[0].getBoundingClientRect().x);
        sliders.forEach((item, i)=> {
            item.style.width=(item.max-item.min+20)*scale_x+"px";
            item.style.right=(width-adaptFrames[i].getBoundingClientRect().right)+"px";
            slide_value[i].innerHTML=item.value+"px";
            slide_value[i].style.left=sliders[i].getBoundingClientRect().right-18+"px";
        });
        // inter=1;
    // }
// }, 100);


sections.forEach((item)=> struct.push(item));
// window.onload=init;
// sliders_init();


document.addEventListener("wheel", (e)=> {
    let elem=scrollPrep(e);
    if (from!=elem) {
        scrollTo(elem);
        appear(elem);
    }
    from=elem;
});

hand.forEach((item, i)=> {
    item.addEventListener("mouseover", ()=> {
        item.firstElementChild.classList.add("toAdapt_hover");
        item.classList.remove("animated");
    });
    item.addEventListener("mouseout", ()=> {
        item.firstElementChild.classList.remove("toAdapt_hover");
        item.classList.add("animated");
    });
    item.addEventListener("click", ()=> {
        adapt_inn[i].classList.add("appear");
        sliders_init();
        wradap[i].style.marginLeft="-100vw";
        main_inn[i].classList.remove("appear");
        setTimeout(()=> {
            mainFrames[i].classList.remove("appear");
        })
    });
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
        slide_value[i].innerHTML=item.value+"px";
        adaptFrames[i].children[0].style.width=item.value+"px";
        adaptFrames[i].children[0].style.transform=`scaleX(${scale_x}) scaleY(.85)`;
        adaptFrames[i].style.width=(item.value*scale_x)+"px";
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
    setTimeout(()=> { preload.style.display="none" }, 7500);
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
        scale_x=width*0.9/item.value;
        adaptFrames[i].children[0].style.transform=`scaleX(${scale_x}) scaleY(.85)`;
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
    while (parent.offsetParent!=page)
        parent=parent.offsetParent;
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

function appear(elem) {
    ports.forEach((item, i)=> {
        if (elem==item) {
            mainFrames[i].classList.add("appear");
            main_inn[i].classList.add("appear");
            let skeyl=mainFrames[i].offsetWidth/width;
            mainFrames[i].firstElementChild.style.transform=`scale(${skeyl})`;
            mainFrames[i].style.height=height*skeyl+"px";
        }
        else {
            main_inn[i].classList.remove("appear");
            setTimeout(()=> mainFrames[i].classList.remove("appear"), 400);
        }
    });
}

function scrollPrep(e) {
    let dir=e.deltaY, elem=find_parent(e);
    if (dir>0) {
        for (i=struct.length-2; i>=0; i--) {
            if (elem==struct[i]) {
                elem=struct[i+1];
            }
        }
    }
    else {
        for (i=1; i<struct.length; i++) {
            if (elem==struct[i]) {
                elem=struct[i-1];
            }
        } 
    }
    return elem;
}