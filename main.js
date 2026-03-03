import {loadGLTF, loadAudio, loadVideo} from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  console.log('Loaded!');
  const start = async() => {
    //initiate the AR 3 object
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/targets_test.mind'
    });
    const {renderer, scene, camera} = mindarThree;

//light is needed when we use 3D objects (δεν χρειάζεται το φως)
    //const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    //scene.add(light);

     // load and create the first video plane
  const video1 = await loadVideo("./assets/videos/Video Senha.webm");
  const texture1 = new THREE.VideoTexture(video1);
  const geometry1 = new THREE.PlaneGeometry(1, 240/428);
  const material1 = new THREE.MeshBasicMaterial({map: texture1});
  const plane1 = new THREE.Mesh(geometry1, material1);

  const video2 = await loadVideo("./assets/videos/Doctor scary face.mp4");
  const texture2 = new THREE.VideoTexture(video2);
  const geometry2 = new THREE.PlaneGeometry(1, 240/428);
  const material2 = new THREE.MeshBasicMaterial({map: texture2});
  const plane2 = new THREE.Mesh(geometry2, material2);


  // add the first video plane to an anchor
  const anchor1 = mindarThree.addAnchor(0);
  anchor1.group.add(plane1);

  anchor1.onTargetFound = () => {
    //console.log('Start 1 video');
    video1.play();
  }
  anchor1.onTargetLost = () => {
    video1.pause();
  }
   
  // add the second video plane to an anchor
  const anchor2 = mindarThree.addAnchor(1);
  anchor2.group.add(plane2);

  anchor2.onTargetFound = () => {
    //console.log('Video 2 started');
    video2.play();
  }
  anchor2.onTargetLost = () => {
    video2.pause();
  }
//start the experience
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }

  start();
});
