import * as THREE from 'three';

const SetCarMaterial = (carModel) => {
  const textureCube = new THREE.CubeTextureLoader()
    .setPath('./skybox/')
    .load(['li.jpg', 'xin.jpg', 'chu.jpg', 'xing.jpg', 'top.jpg', 'bottom.jpg']);
  textureCube.encoding = THREE.sRGBEncoding;
  carModel.traverse((object) => {
    if (object.type === 'Mesh') {
      if (object.name.slice(0, 4) === '高光金属') {
        object.material = new THREE.MeshStandardMaterial({
          color: object.material.color,
          metalness: 1.0,
          roughness: 0.2,
          envMapIntensity: 1.0,
        });
      } else if (object.name.slice(0, 2) === '外壳') {
        object.material = new THREE.MeshPhysicalMaterial({
          color: object.material.color,
          clearcoat: 1,
          clearcoatRoughness: 0.01,
          metalness: 1.0,
          roughness: 0.5,
          envMapIntensity: 1.0,
        });
      } else if (object.name.slice(0, 2) === '玻璃') {
        object.material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.0,
          roughness: 0,
          transparent: true,
          transmission: 0.99,
          envMapIntensity: 1.0,
        });
      } else if (object.name.slice(0, 3) === '后视镜') {
        object.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 1.0,
          roughness: 0.0,
          envMapIntensity: 1.0,
        });
      } else if (object.name.slice(0, 2) === '轮胎') {
        object.material.color.set(0x000000);
        object.material.normalScale.set(2, 2);
        object.material.metalness = 0.0;
        object.material.roughness = 0.6;
      } else if (object.name.slice(0, 3) === '前灯罩') {
        object.material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.0,
          roughness: 0,
          transmission: 0.9,
          transparent: true,
        });
      } else if (object.name.slice(0, 4) === '尾灯灯罩') {
        object.material = new THREE.MeshPhysicalMaterial({
          color: 0xff0000,
          metalness: 0.0,
          roughness: 0,
          transmission: 0.5,
          transparent: true,
        });
      } else if (object.name.slice(0, 5) === '尾灯第二层') {
        object.material = new THREE.MeshPhysicalMaterial({
          color: 0x440000,
          metalness: 0.0,
          roughness: 0,
          transmission: 0.5,
          transparent: true,
        });
      } else if (object.name.slice(0, 4) === '尾灯发光') {
        object.material = new THREE.MeshLambertMaterial({
          color: 0x660000,
        });
      } else if (object.name.slice(0, 5) === '尾灯第三层') {
        object.material = new THREE.MeshLambertMaterial({
          color: 0x19190000,
        });
      } else if (object.name.slice(0, 2) === '塑料') {
        object.material = new THREE.MeshPhysicalMaterial({
          color: 0x010101,
          metalness: 0.0,
          roughness: 0.8,
        });
      }
      carModel.getObjectByName('天窗黑玻璃').material = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        metalness: 0.0,
        roughness: 0,
        envMapIntensity: 1.0,
        transmission: 0.5,
        transparent: true,
      });
      carModel.getObjectByName('车座').material = new THREE.MeshPhysicalMaterial({
        color: 0x020202,
        metalness: 0.0,
        roughness: 0.6,
      });
      object.material.envMap = textureCube;
    }
  });
};

export default SetCarMaterial;
