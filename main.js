import {loadGLTF, loadAudio, loadVideo} from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;
document.addEventListener('DOMContentLoaded', () => {
  console.log('Loaded!');
  const start = async() => {
    //initiate the AR 3 object
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/targets_3_photos.mind'
    });
    const {renderer, scene, camera} = mindarThree;
 
    // load and create the first video plane
    const video1 = await loadVideo("./assets/videos/Mapa_Olavo_Menor_sem_audio.mp4");
    video1.muted = true;
    const texture1 = new THREE.VideoTexture(video1);
    const geometry1 = new THREE.PlaneGeometry(1, 1);
    const material1 = new THREE.MeshBasicMaterial({map: texture1});
    const plane1 = new THREE.Mesh(geometry1, material1);
    plane1.scale.set(1, 9/16, 1);
 
    const video2 = await loadVideo("./assets/videos/Video Cena Lazer.mp4");
    const texture2 = new THREE.VideoTexture(video2);
    const geometry2 = new THREE.PlaneGeometry(1, 1);
    const material2 = new THREE.MeshBasicMaterial({map: texture2});
    const plane2 = new THREE.Mesh(geometry2, material2);
    plane2.scale.set(1, 3/4, 1);
 
    const video3 = await loadVideo("./assets/videos/Video Cena Frontal - Compress.mp4");
    const texture3 = new THREE.VideoTexture(video3);
    const geometry3 = new THREE.PlaneGeometry(1, 1);
    const material3 = new THREE.MeshBasicMaterial({map: texture3});
    const plane3 = new THREE.Mesh(geometry3, material3);
    plane3.scale.set(1, 3/4, 1);
 
    // add the first video plane to an anchor
    const anchor1 = mindarThree.addAnchor(0);
    anchor1.group.add(plane1);
    anchor1.onTargetFound = () => {
      video1.play();
    }
    anchor1.onTargetLost = () => {
      video1.pause();
    }
 
    // add the second video plane to an anchor
    const anchor2 = mindarThree.addAnchor(1);
    anchor2.group.add(plane2);
    anchor2.onTargetFound = () => {
      video2.play();
    }
    anchor2.onTargetLost = () => {
      video2.pause();
    }
 
    // add the third video plane to an anchor
    const anchor3 = mindarThree.addAnchor(2);
    anchor3.group.add(plane3);
    anchor3.onTargetFound = () => {
      video3.play();
    }
    anchor3.onTargetLost = () => {
      video3.pause();
    }
 
    // start the experience
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
