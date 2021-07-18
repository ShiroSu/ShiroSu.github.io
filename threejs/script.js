const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00f } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

document.addEventListener("mousemove", e => {
  // console.log(e);
  controls(e);

})

function controls (e) {
  if (e.buttons===1) {
    camera.rotation.y+=e.movementX/100;
    camera.rotation.z+=e.movementY/100;
  }
  animate();
}

animate();