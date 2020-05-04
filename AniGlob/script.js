let width=window.innerWidth, height=window.innerHeight,
cvs=document.getElementById("cvs"),
scene, camera, renderer, scroll, scroll_base, loader, materials;

function init() {
    scene=new THREE.Scene();
    camera=new THREE.PerspectiveCamera(40, 228/height, 0.1, 1000);
    renderer=new THREE.WebGLRenderer({ canvas: cvs, alpha: true, antialias: true });
    renderer.setSize(228, height);
    camera.position.z=100;
    const geometry=new THREE.CylinderGeometry(12,12,60, 30);
    loader=new THREE.TextureLoader();
    map=loader.load('https://shirosu.github.io/AniGlob/img/scroll12.png', animate);
    materials=[
        new THREE.MeshBasicMaterial({ map: map}),
        new THREE.MeshBasicMaterial({ map: loader.load('https://shirosu.github.io/AniGlob/img/scroll23.png')}),
        new THREE.MeshBasicMaterial({ map: loader.load('https://shirosu.github.io/AniGlob/img/scroll23.png')})
    ];
    scroll=new THREE.Mesh(geometry, materials);
    scroll.rotation.x=0.1;
    scroll.rotation.y=-1.2;
    scene.add(scroll);
    const geometry_base=new THREE.CylinderGeometry(8, 8, 65, 30, 20);
    const materials_base=[
        new THREE.MeshBasicMaterial({ map: loader.load('https://shirosu.github.io/AniGlob/img/scroll01.png')}),
        new THREE.MeshBasicMaterial({ map: loader.load('https://shirosu.github.io/AniGlob/img/scroll02.png')}),
        new THREE.MeshBasicMaterial({ map: loader.load('https://shirosu.github.io/AniGlob/img/scroll02.png')})
    ];
    scroll_base=new THREE.Mesh(geometry_base, materials_base);
    scene.add(scroll_base);
}

let scroll_page=document.querySelector(".scroll"),
scrollInner=document.querySelectorAll(".scroll-inner"),
scrollEnd=document.querySelector(".scroll-end"),
clock=0, len=scrollInner.length, counter=0, dif=0,
margin=[window.getComputedStyle(scroll_page).width.replace("px", "")];
scroll_page.style.marginLeft=-margin+"px";
for (i=0; i<len; i++) margin.unshift(0);
for (i=0; i<scrollInner.length; i++) {
    if (i==0) margin[i]=margin[len]-window.getComputedStyle(scrollInner[i]).width.replace("px", "")-130;
    else margin[i]=margin[i-1]-window.getComputedStyle(scrollInner[i]).width.replace("px", "")-10;
}
let nav=document.querySelector(".nav"), contents=[];
for (i=nav.children.length-1; i>=0; i--) contents.unshift(nav.children[i].innerText);
document.onclick=(e)=> {
    contents.forEach((item, i)=> {
        if (e.target.tagName=="A" && e.target.innerText==item) {
            dif=counter-i; counter=i;
            console.log(dif)
            scroll_page.style.marginLeft=-margin[counter]+"px";
        }
    });
};
function animate() {
    requestAnimationFrame(animate);
    scrollEnd.style.display="block";
    if (clock<=220) {
        clock++;
        if (clock>=140) {
            scroll_page.style.marginLeft=-margin[0]+"px";
            if (scroll.rotation.y>-3.5) scroll.rotation.y-=.15;
            scroll_base.rotation.y-=.07;
        }
    }
    renderer.render(scene, camera);
}
window.onload=init;
