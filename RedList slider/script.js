function init() {

    // console.log(document.documentElement.scrollHeight, window.innerHeight, window.pageYOffset);
    // document.addEventListener("click", )

    // let pos=window.pageYOffset, height=window.innerHeight;
    let carousel = document.querySelector(".carousel"),
    cont=document.querySelector(".carousel-control"),
    menuInner=document.querySelectorAll(".menu-inner"),
    cubes=document.querySelectorAll(".cube"),
    arrowrap=document.querySelectorAll(".arrowrap"),
    panelCount = carousel.children.length,
    theta = 0, inn=0, it=0, rotX=0, rotY=0, rotZ=0,
    x=[1, 7, -4, -4, 7], z=[0, -23, -3, 3, 23],
    transforms=[
        "translateZ(150px)",
        "rotateY(90deg) translateZ(150px)",
        "rotateX(90deg) translateZ(150px)",
        "rotateY(180deg) translateZ(150px)",
        "rotateY(-90deg) translateZ(150px)",
        "rotateX(-90deg) translateZ(150px)"
    ];
    let info=document.querySelector(".info");
    
    menuInner[inn].classList.add("active");
    info.children[inn*6+it].classList.add("info_active");
    carousel_sort(inn);
    cont.children[0].addEventListener("click", ()=> round("forward"));
    cont.children[1].addEventListener("click", ()=>round("back"));

    console.log("index: "+(inn*6+it));
    
    document.addEventListener("keydown", (e)=> {
        if (e.ctrlKey) {
        info.children[inn*6+it].classList.remove("info_active");
            switch (e.keyCode) {
                case 37: if (rotX%2==0 || rotX%2==-0) rotY++; else rotZ++; break;
                case 38 && 87: rotX--; break;
                case 39: if (rotX%2==0 || rotX%2==-0) rotY--; else rotZ--; break;
                case 40: rotX++; break;
            }
            console.log("first:\nrotX: "+rotX, "\nrotY: "+rotY, "\nrotZ: "+rotZ, "\nit: "+it);
            cube_spin(rotX, rotY, rotZ);
            info.children[inn*6+it].classList.add("info_active");
            console.log("index: "+(inn*6+it));
        }
        else {
            switch (e.keyCode) {
                case 37: round("back"); break;
                case 39: round("forward"); break;
                case 96: round("reset"); break;
            }
        }
    });

    arrowrap.forEach((item)=> {
        item.addEventListener("click", ()=> {
            info.children[inn*6+it].classList.remove("info_active");
            if (item.getAttribute("id").includes("bottom")) rotX++;
            else if (item.getAttribute("id").includes("top")) rotX--;
            else if (item.getAttribute("id").includes("left")) { if (rotX%2==0 || rotX%2==-0) rotY++; else rotZ++; }
            else if (item.getAttribute("id").includes("right")) { if (rotX%2==0 || rotX%2==-0) rotY--; else rotZ--; }
            console.log("first:\nrotX: "+rotX, "\nrotY: "+rotY, "\nrotZ: "+rotZ, "\nit: "+it);
            cube_spin(rotX, rotY, rotZ);
            info.children[inn*6+it].classList.add("info_active");
            console.log("index: "+(inn*6+it));
        });
    });

    
    
    function round(eve="") {
        menuInner[inn].classList.remove("active");
        info.children[inn*6+it].classList.remove("info_active");
        cubes[inn].style.transform="none";
        rotX=0; rotY=0; rotZ=0; it=0;
        switch (eve) {
            case "forward": theta-=72; inn=(inn+1)%panelCount; break;
            case "back": theta+=72; inn=(inn>0)?(inn-1):panelCount-1; break;
            case "reset": theta=0; inn=0; break;
        }
        anime({
                targets: carousel,
                rotateY: theta,
                duration: 1500,
                easing: "easeInOutQuad"
            });
        menuInner[inn].classList.add("active");
        info.children[inn*6+it].classList.add("info_active");
        carousel_sort(inn);
        console.log("index: "+(inn*6+it));
    }

    function carousel_sort(inn) {
        for (i=0; i<menuInner.length; i++) {
            menuInner[i].style.transform=`rotate3D(${x[i]}, 0, ${z[i]}, -3deg) rotateY(${i*72}deg) translateZ(498px)`;
            if (i==inn) menuInner[i].style.transform=`rotate3D(${x[i]}, 0, ${z[i]}, -3deg) rotateY(${i*72}deg) scale(1.5) translateZ(498px)`;
        }
    }

    function cube_spin(rotX, rotY, rotZ) {
        let tran;
        for (i=0; i<6; i++) {
            cubes[inn].children[i].style.transform=transforms[i];
        }
        if (rotX%4==0 || rotX%4==-0) {
            if (rotY%4==0 || rotY%4==-0) {
                if (rotZ%4==0 || rotZ%4==-0) it=0;
                else if (rotZ%4==1 || rotZ%4==-3) tran=item(0, 270);
                else if (rotZ%4==3 || rotZ%4==-1) tran=item(0, 90);
            }
            else if (rotY%4==1 || rotY%4==-3) {
                if (rotZ%4==0 || rotZ%4==-0) it=4;
            }
            else if (rotY%4==2 || rotY%4==-2) {
                if (rotZ%4==0 || rotZ%4==-0) it=3;
            }
            else if (rotY%4==3 || rotY%4==-1) {
                if (rotZ%4==0 || rotZ%4==-0) it=1;
            }
        }
        else if (rotX%4==1 || rotX%4==-3) {
            if (it==1 || it==2 || it==4 || it==5) rotZ*=-1; //rotY*=-1; 
            if (rotY%4==0 || rotY%4==-0) {
                if (rotZ%4==0 || rotZ%4==-0) it=5;
                else if (rotZ%4==1 || rotZ%4==-3) tran=item(1, 270);
                else if (rotZ%4==2 || rotZ%4==-2) tran=item(2, 180);
                else if (rotZ%4==3 || rotZ%4==-1) tran=item(4, 90);
            }
            else if (rotY%4==1 || rotY%4==-3) {
                if (rotZ%4==0 || rotZ%4==-0) tran=item(5, 270);
            }
            else if (rotY%4==3 || rotY%4==-1) {
                if (rotZ%4==0 || rotZ%4==-0) tran=item(5, 90);
            }
        }
        else if (rotX%4==2 || rotX%4==-2) {
            if (it==0 || it==1 || it==3 || it==4) rotY*=-1;
            if (rotY%4==0 || rotY%4==-0) {
                if (rotZ%4==0 || rotZ%4==-0) tran=item(3, 180);
                else if (rotZ%4==2 || rotZ%4==-2) it=3;
                else if (rotZ%4==3 || rotZ%4==-1) tran=item(3, 90);
            }
            else if (rotY%4==1 || rotY%4==-3) {
                if (rotZ%4==0 || rotZ%4==-0) tran=item(1, 180);
                else if (rotZ%4==2 || rotZ%4==-2) it=4;
                else if (rotZ%4==3 || rotZ%4==-1) tran=item(5, 270);
            }
            else if (rotY%4==2 || rotY%4==-2) {
                if (rotZ%4==0 || rotZ%4==-0) tran=item(0, 180);
                else if (rotZ%4==2 || rotZ%4==-2) it=0;
            }
            else if (rotY%4==3 || rotY%4==-1) {
                if (rotZ%4==0 || rotZ%4==-0) tran=item(4, 180);
                else if (rotZ%4==2 || rotZ%4==-2) it=1;
            }
        }
        else if (rotX%4==3 || rotX%4==-1) {
            if (rotY%4==0 || rotY%4==-0) {
                if (rotZ%4==0 || rotZ%4==-0) it=2;
                else if (rotZ%4==1 || rotZ%4==-3) tran=item(4, 270);
                else if (rotZ%4==2 || rotZ%4==-2) tran=item(5, 180);
                else if (rotZ%4==3 || rotZ%4==-1) tran=item(1, 90);
            }
            else if (rotY%4==1 || rotY%4==-3) {
                if (rotZ%4==0 || rotZ%4==-0) tran=item(2, 90);
            }
            else if (rotY%4==3 || rotY%4==-1) {
                if (rotZ%4==0 || rotZ%4==-0) tran=item(2, 270);
            }
        }
        cubes[inn].style.transform=`rotateX(${rotX*90}deg) rotateY(${rotY*90}deg) rotateZ(${rotZ*90}deg)`;
        cubes[inn].children[it].style.transform=tran;
            console.log("second:\nrotX: "+rotX, "\nrotY: "+rotY, "\nrotZ: "+rotZ, "\nit: "+it);
    }
    
    function item(num, deg=0) {
        it=num;
        return transforms[it]+`rotate(${deg}deg)`;
    }
}
window.onload=init;


//7,0,-23  -4,0,-3   -4,0,3   7,0,23