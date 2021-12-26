//RENDERER SETUP
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector(".webGLContainer").appendChild(renderer.domElement);

//SCENE SETUP
const scene = new THREE.Scene();

//CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 30);
camera.lookAt(0, 0, 0);

let cubeMesh;
const cubeArmy = new THREE.Group();

const modelLoader = new THREE.GLTFLoader();
modelLoader.load("BlenderProjects/squareWheel.glb", (glb) => {
  console.log(glb);
  glb.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      cubeMesh = child;
      cubeMesh.material = new THREE.MeshNormalMaterial();
    }
  });
  for (let i = 0; i < 20; i++) {
    const c = cubeMesh.clone();
    c.rotation.y = Math.PI / 2;
    c.scale.set(i, i, i);
    cubeArmy.add(c);
  }

  scene.add(cubeArmy);
});

//RENDER LOOP
function update() {
  cubeArmy.rotation.y += 0.01;
  cubeArmy.rotation.x += 0.01;

  let i = 0;
  while (i < cubeArmy.children.length) {
    cubeArmy.children[i].rotation.x += 0.01 + i * 0.001;
    cubeArmy.children[i].rotation.y += 0.01 + i * 0.001;
    i++;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

update();
