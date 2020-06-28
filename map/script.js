let mapal=document.querySelector("svg"),
azz_paths=Array.from(mapal.querySelectorAll("path")),
azz_polys=mapal.querySelectorAll("polygon"),
occup=mapal.getElementById("NKR_Borders"),
dots=mapal.querySelectorAll("circle"),
popap = document.querySelector('.pop'),
ontop=2514, onbot=2304, onleft=2686, onright=3033,
vall=ontop-onbot, hall=onright-onleft, vcorar, hcorar, vcor, hcor;

let azz=azz_paths, octer=[],
doub=[], trip=[],
pairs={
    first: [],
    second: []
},
trios={
    first: [],
    second: [],
    third: []
};
azz_polys.forEach(item=> {
    azz.push(item);
});
azz.forEach((item, key)=> {
    if (item==occup) azz.splice(key, 1);
    else if (item.id.includes("_")) {
        if (item.id.includes("__")) trip.push(item);
        else doub.push(item);
    }
    if (item.getAttribute("data-occ")==1) {
        item.style.fill="#a2a2a2"
    }
});
// console.log(doub);
for (i=doub.length-1; i>=0; i--) {
    if (doub[i].id.includes("_1"))
    pairs.first.push(doub[i]);
}
for (i=doub.length-1; i>=0; i--) {
    if (doub[i].id.includes("_2")) {
        pairs.first.forEach((item, key)=> {
            if (item.id.includes(doub[i].id.replace("_2", ""))) pairs.second[key]=doub[i];
        });
    }
}
for (i=trip.length-1; i>=0; i--) {
    if (trip[i].id.includes("_1"))
    trios.first.push(trip[i]);
}
for (i=trip.length-1; i>=0; i--) {
    if (trip[i].id.includes("_2")) {
        trios.first.forEach((item, key)=> {
            if (item.id.includes(trip[i].id.replace("_2", ""))) trios.second[key]=trip[i];
        });
    }
}
for (i=trip.length-1; i>=0; i--) {
    if (trip[i].id.includes("_3")) {
        trios.first.forEach((item, key)=> {
            if (item.id.includes(trip[i].id.replace("_3", ""))) trios.third[key]=trip[i];
        });
    }
}
// console.log(azz_paths);
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
dist(azz);
let zoom=document.querySelector(".zoom"), mw,
zoom_pl=document.querySelector(".enlarge"),
zoom_mi=document.querySelector(".diminish");
mw=Number(mapal.width.animVal.valueAsString.replace("%", ""));
zoom.addEventListener("click", e=>{
    switch (e.target.id) {
        case "+": if (mw<100) mw+=5; break;
        case "-": if (mw>40.1) mw-=5; break;
    }
    if (mw>=100) zoom_pl.style.cursor="default";
    else zoom_pl.style.cursor="pointer";
    if (mw<=40.1) zoom_mi.style.cursor="default";
    else zoom_mi.style.cursor="pointer";
    console.log(mw);
    mapal.setAttribute("width", `${mw}%`);
});
function dist(arr) {
    arr.forEach(item=> {
        let pind1=pairs.first.indexOf(item),
        pind2=pairs.second.indexOf(item),
        tind1=trios.first.indexOf(item),
        tind2=trios.second.indexOf(item),
        tind3=trios.third.indexOf(item);
        item.addEventListener("mouseenter", e=> {
            item.style.fill="#fdc75d";
            if (pind1!=-1) pairs.second[pind1].style.fill="#fdc75d";
            else if (pind2!=-1) pairs.first[pind2].style.fill="#fdc75d";
            else if (tind1!=-1) {
                trios.second[tind1].style.fill="#fdc75d";
                trios.third[tind1].style.fill="#fdc75d";
            }
            else if (tind2!=-1) {
                trios.first[tind2].style.fill="#fdc75d";
                trios.third[tind2].style.fill="#fdc75d";
            }
            else if (tind3!=-1) {
                trios.second[tind3].style.fill="#fdc75d";
                trios.first[tind3].style.fill="#fdc75d";
            }
            // console.log(pairs.first.indexOf(item));
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
        item.addEventListener("mouseout", e=> {
            if (e.toElement!=occup) {
                popap.style.opacity="0";
                popap.style.marginLeft=`${0}px`;
                popap.style.marginTop=`${0}px`;
                if (item.getAttribute("data-occ")) {
                    item.style.fill="#a2a2a2";
                    if (pind1!=-1) {
                        pairs.first[pind1].style.fill="#a2a2a2";
                        pairs.second[pind1].style.fill="#d0cfcf";
                    }
                    else if (pind2!=-1) {
                        pairs.first[pind2].style.fill="#a2a2a2";
                        pairs.second[pind2].style.fill="#d0cfcf";
                    }
                }
                else {
                    item.style.fill="#d0cfcf";
                    if (pind1!=-1) pairs.second[pind1].style.fill="#d0cfcf";
                    else if (pind2!=-1) pairs.first[pind2].style.fill="#d0cfcf";
                }
                if (tind1!=-1) {
                    trios.second[tind1].style.fill="#d0cfcf";
                    trios.third[tind1].style.fill="#d0cfcf";
                }
                else if (tind2!=-1) {
                    trios.first[tind2].style.fill="#d0cfcf";
                    trios.third[tind2].style.fill="#d0cfcf";
                }
                else if (tind3!=-1) {
                    trios.second[tind3].style.fill="#d0cfcf";
                    trios.first[tind3].style.fill="#d0cfcf";
                }
            }
            else {
                occup.addEventListener("mouseout", (event)=> {
                    popap.style.opacity="0";
                    popap.style.marginLeft=`${0}px`;
                    popap.style.marginTop=`${0}px`;
                    if (item.getAttribute("data-occ")) {
                        item.style.fill="#a2a2a2";
                        if (pind1!=-1) {
                            pairs.first[pind1].style.fill="#a2a2a2";
                            pairs.second[pind1].style.fill="#d0cfcf";
                        }
                        else if (pind2!=-1) {
                            pairs.first[pind2].style.fill="#a2a2a2";
                            pairs.second[pind2].style.fill="#d0cfcf";
                        }
                    }
                    else {
                        item.style.fill="#d0cfcf";
                        if (pind1!=-1) pairs.second[pind1].style.fill="#d0cfcf";
                        else if (pind2!=-1) pairs.first[pind2].style.fill="#d0cfcf";
                    }
                    // console.log(item);
                });
            }
        });
        // console.log(mapal);
    });
}
// occup.addEventListener("mousemove", e=> {
//     azz_paths.forEach(item=> {
//         if (e.pageX>=item.getBoundingClientRect().left && e.pageX<=item.getBoundingClientRect().right && e.pageY>=item.getBoundingClientRect().top && e.pageY<=item.getBoundingClientRect().bottom) {
//             item.style.fill="#ffe140";
//             popap.innerHTML = item.getAttribute("name");
//             popap.style.opacity="1";
//             popap.style.marginLeft=`${e.pageX+10}px`;
//             popap.style.marginTop=`${e.pageY+10}px`;
//         }
//         else {
//             // popap.style.opacity="0";
//             // popap.style.marginLeft=`${0}px`;
//             // popap.style.marginTop=`${0}px`;
//             item.style.fill="#bcbcbc";
//         }
//     });
//     if (e.which) {
//         if (!e.altKey) {
//             occup.style.top=e.pageY-occup.getBoundingClientRect().height/2+"px";
//             occup.style.left=e.pageX-occup.getBoundingClientRect().width/2+"px";
//             if (e.shiftKey) {
//                 occup.style.width=Number(occup.style.width.replace("%", ""))-(-0.1)+"%";
//                 occup.style.height=Number(occup.style.height.replace("%", ""))-(-0.1)+"%";
//             }
//             if (e.ctrlKey) {
//                 occup.style.width=Number(occup.style.width.replace("%", ""))-(0.1)+"%";
//                 occup.style.height=Number(occup.style.height.replace("%", ""))-(0.1)+"%";
//             }
//         }
//         // console.log(Number(occup.style.left.replace("px", ""))*100/e.target.getBoundingClientRect().width)
//         console.log(Number(occup.style.left.replace("px", "")), occup.getBoundingClientRect().left)
//         // console.log(e.target.offsetParent.getBoundingClientRect().height)
//     }
// })
// occup.style.bottom=mapal.getElementById("AZE1740").bottom+"px";
// occup.style.left=mapal.getElementById("AZE1682").left+"px";
// occup.style.wi