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
        popap.style.marginLeft=`${e.clientX+10}px`;
        popap.style.marginTop=`${e.clientY+10}px`;
    });
    item.addEventListener("mouseout", ()=> {
        item.setAttribute("r", "5");
        popap.style.opacity=0;
    });
});
azz.forEach(item=> {
    item.addEventListener("mouseenter", (e)=> {
        item.style.fill="green";
        popap.innerHTML = item.getAttribute("name");
        popap.style.opacity="1";
        popap.style.marginLeft=`${e.clientX+10}px`;
        popap.style.marginTop=`${e.clientY+10}px`;
        // console.log(`${e.clientX}`);
    });
    item.addEventListener("mousemove", e=> {
        popap.style.marginLeft=`${e.clientX+10}px`;
        popap.style.marginTop=`${e.clientY+10}px`;
    });
    item.addEventListener("mouseout", ()=> {
        popap.style.opacity="0";
        item.style.fill="#7c7c7c";
        // console.clear();
    });
});
mapal.addEventListener("click", e=> {

    console.log(e.clientY+"с.ш. "+e.clientX+"в.д.");
})