window.onload=()=> {
    let cube=document.querySelector(".cubespinner"),
    rotX=0, rotY=0, comm="", pointX=0, pointY=0, tog=0, k=0;
    let pressed=[0, 0, 0, 0];
    
    document.querySelector("button").onclick=()=> {
        document.querySelector(".instruction p").classList.toggle("active");
        document.querySelectorAll(".O").forEach((item)=> item.classList.toggle("active"));
    }
    
    document.addEventListener("keydown", (e)=> {
            if (e.keyCode==37 && pressed[2]==0) pressed[0]=1;
            if (e.keyCode==38 && pressed[3]==0) pressed[1]=1;
            if (e.keyCode==39 && pressed[0]==0) pressed[2]=1;
            if (e.keyCode==40 && pressed[1]==0) pressed[3]=1;
            if (e.keyCode==96) { rotX=0; rotY=0; }
        spin();
        console.log(e.keyCode, pressed[e.keyCode-37]);
    });
    document.addEventListener("keyup", (e)=> {
            if (e.keyCode==37) pressed[0]=0;
            if (e.keyCode==38) pressed[1]=0;
            if (e.keyCode==39) pressed[2]=0;
            if (e.keyCode==40) pressed[3]=0;
        console.log(e.keyCode, pressed[e.keyCode-37]);
    });

    cube.addEventListener("mousedown", (e)=> {
        tog=1; pointX=e.clientX; pointY=e.clientY;
        document.addEventListener("mousemove", (e)=> {
            handy(e);
        });
    });
    document.addEventListener("mouseup", (e)=> {
        tog=0; handy(e);
    });

    function spin() {
        if (pressed[0]==1) { comm="left"; rotY+=10; }
        if (pressed[1]==1) { comm="up"; rotX-=10; }
        if (pressed[2]==1) { comm="right"; rotY-=10; }
        if (pressed[3]==1) { comm="down"; rotX+=10; }
        anime({
            targets: cube,
            rotateX: rotX+0,
            rotateY: rotY+0,
            easing: "easeOutQuad",
            duration: 1000
        });
        // document.getElementsByTagName("p")[0].innerHTML="We go "+comm;
    }
    function handy(e) {
        let posX=e.movementX; posY=e.movementY;
        if (tog==1) {
            if (posX<-3) { if (posX<-6) rotY+=posX/6; else rotY+=posX/1; }
            else if (posX>3) { if (posX>6) rotY+=posX/6; else rotY+=posX/1; }
            if (posY<-3) { if (posY<-6) rotX+=-posY/6; else rotX+=-posY/1; }
            else if (posY>3) { if (posY>6) rotX+=-posY/6; else rotX+=-posY/1; }
            console.log(e.movementX, tog);
        }
        else rotX+=0; rotY+=0;
        spin();
    }
}