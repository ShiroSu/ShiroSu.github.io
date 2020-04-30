    window.onload=()=> {
    let height=window.innerHeight,
    cvs=document.getElementById("cvs"),
    scene, camera, renderer, scroll, scroll_base;
    function init() {
        scene=new THREE.Scene();
        camera=new THREE.PerspectiveCamera(40, 228/height, 0.1, 1000);
        renderer=new THREE.WebGLRenderer({ canvas: cvs, alpha: true, antialias: true });
        renderer.setSize(228, height);
        camera.position.z=100;
        const geometry=new THREE.CylinderGeometry(12,12,60, 30);
        const loader=new THREE.TextureLoader();
        const materials=[
            new THREE.MeshBasicMaterial({ map: loader.load('https://shirosu.github.io/AniGlob/img/scroll12.png')}),
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
    let clock=0;
    function animate() {
        requestAnimationFrame(animate);
        clock++;
        if (scroll.rotation.y>-3.5 && clock>=80) {
            scroll.rotation.y-=.15;
            scroll_base.rotation.y-=.15;
            scroll.scale.x-=.0001;
            scroll.scale.z-=.0001
        }
        renderer.render(scene, camera);
    }
    init();
    animate();
    }