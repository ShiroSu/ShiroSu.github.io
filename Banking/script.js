window.onload=function() {
    let buy=[], sell=[], convb=[], convs=[]; let val; let toggle=true;
    let place=document.getElementById("place");
    let pace=document.getElementById("pace");
    let ace=document.getElementById("ace");
    let navih=document.getElementById("h");
    let navit=document.getElementById("t");
    let navib=document.getElementById("b");
    let busd=document.getElementById("busd");
    let beur=document.getElementById("beur");
    let bgbp=document.getElementById("bgbp");
    let brub=document.getElementById("brub");
    let susd=document.getElementById("susd");
    let seur=document.getElementById("seur");
    let sgbp=document.getElementById("sgbp");
    let srub=document.getElementById("srub");
    let cousd=document.getElementById("cousd");
    let coeur=document.getElementById("coeur");
    let cogbp=document.getElementById("cogbp");
    let corub=document.getElementById("corub");
    let header=document.querySelector(".header");
    let house=document.querySelector(".house");
    let travel=document.querySelector(".travel");
    let business=document.querySelector(".business");
    let input=document.querySelector(".input");

    navih.addEventListener("click", ()=> {
        place.classList.add("fitem_active");
        place.classList.remove("fitem_out");
        place.classList.remove("unselectable");

        if (pace.className.split(" ")[1]=="fitem_active") {
            pace.classList.add("fitem_out");
            pace.classList.remove("fitem_active");
            pace.classList.add("unselectable");
        }
        else if (ace.className.split(" ")[1]=="fitem_active") {
            ace.classList.add("fitem_out");
            ace.classList.remove("fitem_active");
            ace.classList.add("unselectable");
        }
        setTimeout(()=> {
            pace.classList.remove("fitem_out");
            ace.classList.remove("fitem_out");
        }, 800);

        navih.classList.add("navi_active");
        navit.classList.remove("navi_active");
        navib.classList.remove("navi_active");
        house.classList.add("img_active");
        travel.classList.remove("img_active");
        business.classList.remove("img_active");
    });
    navit.addEventListener("click", ()=> {
        pace.classList.remove("fitem_out");
        pace.classList.add("fitem_active");
        pace.classList.remove("unselectable");


        if (place.className.split(" ")[1]=="fitem_active") {
            place.classList.add("fitem_out");
            place.classList.remove("fitem_active");
            place.classList.add("unselectable");
        }
        else if (ace.className.split(" ")[1]=="fitem_active") {
            ace.classList.add("fitem_out");
            ace.classList.remove("fitem_active");
            ace.classList.add("unselectable");
        }
        setTimeout(()=> {
            place.classList.remove("fitem_out");
            ace.classList.remove("fitem_out");
        }, 800);
        
        navit.classList.add("navi_active");
        navih.classList.remove("navi_active");
        navib.classList.remove("navi_active");
        travel.classList.add("img_active");
        house.classList.remove("img_active");
        business.classList.remove("img_active");
        console.log("t");
    });
    navib.addEventListener("click", ()=> {
        ace.classList.add("fitem_active");
        ace.classList.remove("unselectable");
        ace.classList.remove("fitem_out");

        if (pace.className.split(" ")[1]=="fitem_active") {
            pace.classList.add("fitem_out");
            pace.classList.remove("fitem_active");
            pace.classList.add("unselectable");
        }
        else if (place.className.split(" ")[1]=="fitem_active") {
            place.classList.add("fitem_out");
            place.classList.remove("fitem_active");
            place.classList.add("unselectable");
        }
        setTimeout(()=> {
            place.classList.remove("fitem_out");
            pace.classList.remove("fitem_out");
        }, 800);

        navib.classList.add("navi_active");
        navit.classList.remove("navi_active");
        navih.classList.remove("navi_active");
        business.classList.add("img_active");
        travel.classList.remove("img_active");
        house.classList.remove("img_active");
        console.log("b");
    });
    buy[0]=1.7000; sell[0]=1.7025;
    buy[1]=1.8240; sell[1]=1.8590;
    buy[2]=2.0910; sell[2]=2.1340;
    buy[3]=0.0209; sell[3]=0.0224;
    busd.innerHTML=buy[0].toFixed(4);
    beur.innerHTML=buy[1].toFixed(4);
    bgbp.innerHTML=buy[2].toFixed(4);
    brub.innerHTML=buy[3].toFixed(4);
    susd.innerHTML=sell[0].toFixed(4);
    seur.innerHTML=sell[1].toFixed(4);
    sgbp.innerHTML=sell[2].toFixed(4);
    srub.innerHTML=sell[3].toFixed(4);
    // input.onchange=function converty() {  }
        document.querySelector(".mess").addEventListener("click", ()=> { toggle=!toggle; print(); });
    input.addEventListener("keyup", ()=> {
        val=parseFloat(input.value);
        console.log(val);
        for (let i=0; i<4; i++) {
            convb[i]=val/buy[i];
            convb[i]=convb[i].toFixed(2);
            convs[i]=val/sell[i];
            convs[i]=convs[i].toFixed(2);
            // console.log(conv[i].toFixed(2));
        }
        print();
    });
    function print() {
        if (toggle) {
            cousd.innerHTML=convb[0];
            coeur.innerHTML=convb[1];
            cogbp.innerHTML=convb[2];
            corub.innerHTML=convb[3];
            document.querySelector(".mess").innerHTML="I buy";
        }
        else {
            cousd.innerHTML=convs[0];
            coeur.innerHTML=convs[1];
            cogbp.innerHTML=convs[2];
            corub.innerHTML=convs[3];
            document.querySelector(".mess").innerHTML="I sell";
        }
    }
    cousd.addEventListener("mouseover", ()=> document.getElementById("usd").classList.add("cur_hover"));
    coeur.addEventListener("mouseover", ()=> document.getElementById("eur").classList.add("cur_hover"));
    cogbp.addEventListener("mouseover", ()=> document.getElementById("gbp").classList.add("cur_hover"));
    corub.addEventListener("mouseover", ()=> document.getElementById("rub").classList.add("cur_hover"));
    cousd.addEventListener("mouseout", ()=> document.getElementById("usd").classList.remove("cur_hover"));
    coeur.addEventListener("mouseout", ()=> document.getElementById("eur").classList.remove("cur_hover"));
    cogbp.addEventListener("mouseout", ()=> document.getElementById("gbp").classList.remove("cur_hover"));
    corub.addEventListener("mouseout", ()=> document.getElementById("rub").classList.remove("cur_hover"));
}