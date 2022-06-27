window.onload=function() {
    let toggle=true;
    let input=document.querySelector(".input");
    let message = { height: document.body.scrollHeight, width: document.body.scrollWidth }
    let cur=["usd", "eur", "gbp", "rub"];
    let coid=[]; let bid=[]; let sid=[];
    let buy=[], sell=[], convb=[], convs=[];
    let ace=[
        document.getElementById("place"),
        document.getElementById("pace"),
        document.getElementById("ace")
    ];
    let navi=[
        document.getElementById("h"),
        document.getElementById("t"),
        document.getElementById("b")
    ];
    let img=[
        document.querySelector(".house"),
        document.querySelector(".travel"),
        document.querySelector(".business")
    ];

    // console.log(document.querySelector(".house").nextSibling.previousSibling.clientWidth)

    let lec=cur.length; let len=navi.length;
    
    window.top.postMessage(message, "*")
    
    for (i=lec-1; i>=0; i--) {
        coid[i]=document.getElementById("co"+cur[i]);
        bid[i]=document.getElementById("b"+cur[i]);
        sid[i]=document.getElementById("s"+cur[i]);
    }

    for (let i=len-1; i>=0; i--) {
        navi[i].addEventListener("click", ()=> {
            ace[i].classList.add("fitem_active");
            ace[i].classList.remove("fitem_out");
            ace[i].classList.remove("unselectable");

            for (let j=len-1; j>=0; j--) {
                if (j!=i && ace[j].classList.contains("fitem_active")) {
                    ace[j].classList.add("fitem_out", "unselectable");
                    img[j].classList.add("img_out");
                    ace[j].classList.remove("fitem_active");
                    console.log(img[i].getAttribute("src").replace(/\.\w\w\w/, ""));
                }
                let width=window.innerWidth;
                if (width>830) all_out(700);
                else all_out(500);
                function all_out(sec) {
                    setTimeout(()=> {
                        ace[j].classList.remove("fitem_out");
                        img[j].classList.remove("img_out");
                    }, sec);
                }
                navi[j].classList.remove("navi_active");
                img[j].classList.remove("img_active");
            }
            navi[i].classList.add("navi_active");
            img[i].classList.add("img_active");
        });
    }

    buy[0]=1.7; sell[0]=1.7025;
    buy[1]=1.824; sell[1]=1.859;
    buy[2]=2.091; sell[2]=2.134;
    buy[3]=0.0209; sell[3]=0.0224;
    for (i=lec-1; i>=0; i--) {
        bid[i].innerHTML=buy[i].toFixed(4);
        sid[i].innerHTML=sell[i].toFixed(4);
    }
    document.querySelector(".btn").addEventListener("click", ()=> { toggle=!toggle; print(); });
    input.addEventListener("keyup", ()=> {
        val=parseFloat(input.value);
        for (let i=0; i<4; i++) {
            convb[i]=(val/buy[i]).toFixed(2);
            convs[i]=(val/sell[i]).toFixed(2);
        }
        print();
    });
    function print() {
        if (toggle) {
            for (i=lec-1; i>=0; i--) { coid[i].innerHTML=convb[i]; }
            document.querySelector(".btn").innerHTML="I buy";
        }
        else {
            for (i=lec-1; i>=0; i--) { coid[i].innerHTML=convs[i]; }
            document.querySelector(".btn").innerHTML="I sell";
        }
    }
    for (let i=lec-1; i>=0; i--) {
        coid[i].addEventListener("mousemove", ()=> con(coid[i], cur[i]));
        coid[i].addEventListener("mouseout", ()=> cout(coid[i], cur[i]));
    }
    function con(tr, id="") {
        _con=document.getElementById(id);
        if (tr.innerHTML.length>11.5) 
            _con.classList.add("cur_hover");
        else _con.classList.remove("cur_hover");
    }
    function cout(tr, id="") {
        document.getElementById(id).classList.remove("cur_hover");
    }
}
