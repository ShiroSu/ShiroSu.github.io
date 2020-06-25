let mapal=document.querySelector("svg"),
azz=mapal.querySelectorAll("path"),
dots=mapal.querySelectorAll("circle"),
popap = document.querySelector('.pop'),
ontop=2514, onbot=2304, onleft=2686, onright=3033,
vall=ontop-onbot, hall=onright-onleft, vcorar, hcorar, vcor, hcor;

console.log(mapal.getBoundingClientRect());
dots.forEach(item=> {
    vcorar=item.getAttribute("data-x").split(",");
    hcorar=item.getAttribute("data-y").split(",");
    // console.log((ontop-(vcorar[0]*60-(-vcorar[1])))*100/vall);
    vcor=(ontop-(vcorar[0]*60-(-vcorar[1])))*100/vall;
    hcor=((hcorar[0]*60-(-hcorar[1]))-onleft)*100/hall;
    item.setAttribute("cx", `${hcor}%`);
    item.setAttribute("cy", `${vcor}%`);
    item.addEventListener("mouseenter", e=> {
        item.setAttribute("r", "7");
        item.style.transitionDuration="0.3s";
        popap.innerHTML=item.getAttribute("id")+": "+item.getAttribute("data-x")+";   "+item.getAttribute("data-y");
        popap.style.opacity=1;
        popap.style.marginLeft=`${e.pageX+10}px`;
        popap.style.marginTop=`${e.pageY+10}px`;
    });
    item.addEventListener("mouseout", ()=> {
        item.setAttribute("r", "5");
        popap.style.opacity=0;
    });
});
azz.forEach(item=> {
    item.addEventListener("mouseenter", (e)=> {
        item.style.fill="#ffe140";
        popap.innerHTML = item.getAttribute("name");
        popap.style.opacity="1";
        popap.style.marginLeft=`${e.pageX+10}px`;
        popap.style.marginTop=`${e.pageY+10}px`;
        // console.log(`${e.pageX}`);
    });
    item.addEventListener("mousemove", e=> {
        popap.style.marginLeft=`${e.pageX+10}px`;
        popap.style.marginTop=`${e.pageY+10}px`;
    });
    item.addEventListener("mouseout", ()=> {
        popap.style.opacity="0";
        popap.style.marginLeft=`${0}px`;
        popap.style.marginTop=`${0}px`;
        item.style.fill="#bcbcbc";
        // console.clear();
    });
});
let zoom=document.querySelector(".zoom"), mw,
zoom_pl=document.querySelector(".enlarge"),
zoom_mi=document.querySelector(".diminish");
mw=Number(mapal.width.animVal.valueAsString.replace("%", ""));
zoom.addEventListener("click", e=>{
    switch (e.target.id) {
        case "+": if (mw<100) mw+=5; break;
        case "-": if (mw>40.1) mw-=5; break;
    }
    if (mw>=100) {
        zoom_pl.style.cursor="default";
    }
    else {
        zoom_pl.style.cursor="pointer";
    }
    if (mw<=40.1) {
        zoom_mi.style.cursor="default";
    }
    else {
        zoom_mi.style.cursor="pointer";
    }
    console.log(mw);
    mapal.setAttribute("width", `${mw}%`);
});