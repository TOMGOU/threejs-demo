import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
/*
* 创建模型
*/
const R = 250;
const geometry = new THREE.CylinderGeometry(R, R, 10, 128);

const material = new THREE.MeshLambertMaterial({
  color: 0x006600,
});
const Cylinder = new THREE.Mesh(geometry, material);
Cylinder.translateY(-5);
const CylinderPlatform = new THREE.Group();
CylinderPlatform.add(Cylinder);
const loader = new FontLoader();
loader.load('./font/helvetiker_bold.typeface.json', (font) => {
  const fontMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const Shapes = font.generateShapes('Build Your Dream', 30);
  const fontGeometry = new THREE.ShapeGeometry(Shapes);
  const textMesh = new THREE.Mesh(fontGeometry, fontMaterial);
  textMesh.position.z = R;
  textMesh.position.x = -180;
  CylinderPlatform.add(textMesh);
});

export default CylinderPlatform;
