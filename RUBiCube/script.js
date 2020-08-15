let width=window.innerWidth, height=window.innerHeight,
cvs=document.getElementById("cvs"),
scene, camera, renderer, scroll_base, loader, materials;

// window.onbeforeunload=()=> { return closing(); }
function init() {
    scene=new THREE.Scene();
    camera=new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
    renderer=new THREE.WebGLRenderer({ canvas: cvs, alpha: true, antialias: true });
    renderer.setSize(width, height);
    camera.position.z=30;
    const geometry=new THREE.BoxGeometry(5,5,5);
    // loader=new THREE.TextureLoader();
    // map=loader.load('https://shirosu.github.io/AniGlob/img/scroll12.png', animate);
    materials=[
        new THREE.MeshBasicMaterial({ color: 0x118724 }), //console
        new THREE.MeshBasicMaterial({ color: 0x248673 }), //draft
        new THREE.MeshBasicMaterial({ color: 0x833205 }), //about
        new THREE.MeshBasicMaterial({ color: 0x380752 }), //pc
        new THREE.MeshBasicMaterial({ color: 0xffffff }), //main
        new THREE.MeshBasicMaterial({ color: 0x077229 })
    ];
    let cubes=[], groups=[], rubik=new THREE.Group();
    for (i=0; i<9; i++) {
        groups[i]= new THREE.Group();
        groups[i].name="group"+i;
        rubik.add(groups[i]);
    }
    for (i=0; i<81; i++) {
        if (i%27==13) delete cubes[i];
        else {
            cubes[i]=new THREE.Mesh(geometry, materials);
            cubes[i].name="cube"+i;
            cubes[i].position.set((i%3-1)*5.1, (Math.floor(i/9)-Math.floor(i/27)*3-1)*5.1, (Math.floor(i/3)-Math.floor(i/9)*3-1)*5.1)
            cubes[i].prop_pos={}
            set_props(i, "x"); set_props(i, "y"); set_props(i, "z");
            place(i);
        }
    }
    console.log(cubes[63].rotation[String.fromCharCode(0+120)])
    // }
    // groups[6].rotation.x=Math.PI/2;
    // groups[1].rotation.y=Math.PI/2;
    // groups[1].position.y=-5.1
    rubik.rotation.y=1;

    function place(i) {
        let ind=0;
        if (i<27) { ind=Math.floor(i/9); groups[ind].add(cubes[i]); }
        else if (i<54) { ind=i%3+3; groups[ind].add(cubes[i]); }
        else { ind=Math.floor(i/3)-Math.floor(i/9)*3+6; groups[ind].add(cubes[i]); }
    }

    function set_props(i, axis="") {
        if (cubes[i].position[axis]==-5.1) Object.assign(cubes[i].prop_pos, { [axis]: "min" });
        else if (cubes[i].position[axis]==0) Object.assign(cubes[i].prop_pos, { [axis]: "mid" });
        else if (cubes[i].position[axis]==5.1) Object.assign(cubes[i].prop_pos, { [axis]: "max" });
    }

    function rotata(i, side) {
        let Mfl=Math.floor(i/3);
        // requestAnimationFrame(rotata);
        visibility(Mfl);
        // groups.forEach(item=> { console.log(item); item.visible=false; });
        switch (Mfl) {
            case 0: groups[i].rotation.y+=side*Math.PI/2; break;
            case 1: groups[i].rotation.x+=side*Math.PI/2; break;
            case 2: groups[i].rotation.z+=side*Math.PI/2; break;
        }
        // cubes.forEach((item, key)=> {
            for (j=0; j<9; j++) {
                if (j!=i) {
                    for (k=0; k<9; k++) {
                        for (l=0; l<9; l++) {
                            if (groups[i].children[l]!=null && groups[j].children[k]!=null) {
                                let coef=0;
                                for (p=0; p<3; p++) {
                                    if (groups[j].children[k].prop_pos[p]==groups[i].children[l].prop_pos[p]) coef++;
                                }
                                if (coef==3) {
                                    for (p=0; p<3; p++)
                                    groups[j].children[k].rotation[String.fromCharCode(p+120)]=groups[i].rotation[String.fromCharCode(p+120)];
                                }
                                // console.log("spin me please");
                            }
                        }
                    }
                }
            }
        // });
        renderer.render(scene, camera);
    }

    function visibility(Mfl) {
        groups.forEach(item=> item.visible=false);
        switch (Mfl) {
            case 0: for (i=0; i<3; i++) groups[i].visible=true; break;
            case 1: for (i=3; i<6; i++) groups[i].visible=true; break;
            case 2: for (i=6; i<9; i++) groups[i].visible=true; break;
        }
    }

    document.addEventListener("keypress", e=> {
        for (i=1; i<10; i++) {
            if (e.key==i) {
                // console.log(groups[i-1])
                if (e.shiftKey) rotata(i-1, 1);
                else rotata(i-1, -1);
                break;
            }
            else continue;
        }
    });

    scene.add(rubik);
    renderer.render(scene, camera);
}
init();