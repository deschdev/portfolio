import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bground'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera);

const shape = new THREE.TorusGeometry( 10, 3, 16, 100);
const matter = new THREE.MeshStandardMaterial( { color: 0xDAA520 } );
const torus = new THREE.Mesh( shape, matter );

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper,);

const controls = new OrbitControls( camera, renderer.domElement );

function addingStars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {  color: 0xffffff } );
  const stars = new THREE.Mesh( geometry, material );
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));
  stars.position.set(x, y, z);
  scene.add(stars);
}

Array(600).fill().forEach(addingStars);

const bgroundTexture = new THREE.TextureLoader().load('./img/redspace.jpg');
scene.background = bgroundTexture;

const moveCamera = () => {
  const top = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  norman.rotation.y += 0.01;
  norman.rotation.z += 0.01;

  camera.position.z = top * -0.01;
  camera.position.x = top * -0.0002;
  camera.position.y = top * -0.0002;
}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame( animate );
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render( scene, camera );
}

animate();

// Avatar

const normTexture = new THREE.TextureLoader().load('./img/norman.png');
const norman = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: normTexture } )
);

scene.add(norman);

// Moon

const moonTexture = new THREE.TextureLoader().load('./img/cancermoon.jpg');
const normalTexture = new THREE.TextureLoader().load('./img/moontexture.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);