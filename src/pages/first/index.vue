<template>
   <canvas id="mainCanvas" width="400px" height="300px" ></canvas>
</template>
<script>
import { buildAuxSystem } from "@/utils";

export default {
  data() {
    return {
      scene: null, // 场景
      camera: null, // 相机
      renderer: null, // 渲染器
      cube: null, // 立方体
      plane: null, // 平面
      sphere: null // 球体
    };
  },
  methods: {
    // 相机 区别
    cameraDiff() {
      this.scene = new THREE.Scene();

      this.renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("mainCanvas")
      });
      this.renderer.setSize(800,600);
      this.renderer.setClearColor("#f2f2f2", 1.0);

      this.camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10)
      // ** 正交相机的（right-left）/(top-bottom)比例要保持与canvas面板的长宽比一致 

      // 透视投影，根据近大远小，靠近相机的一端的投影面积小于远离相机一端的投影面积。
      // this.camera = new THREE.PerspectiveCamera(45, 4/3, 1, 10000)
      // 改变视角大小
      // this.camera = new THREE.PerspectiveCamera(60, 4/3, 1, 10000)

      // this.camera.position.set( 0, 0, 5);
      this.camera.position.set( 1, 2, 5);
      
      this.camera.lookAt(0,0,0); // 镜头默认的方向是朝着z轴的负方向

      let geometry = new THREE.CubeGeometry(1, 1, 1);
      let material = new THREE.MeshBasicMaterial({
        color: 0xCC99FF,
        wireframe: true
      });

      this.cube = new THREE.Mesh(geometry, material);
      this.scene.add(this.cube);
      this.renderer.render(this.scene, this.camera);
    },

    init() {
      this.scene = new THREE.Scene();

      this.renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("mainCanvas")
      });
      this.renderer.setClearColor("#f2f2f2", 1.0);

      // this.camera = new THREE.OrthographicCamera(-30, 30, 20, -20, 0.1, 1000); // 正交相机
      this.camera = new THREE.PerspectiveCamera(5,window.innerWidth / window.innerHeight,0.1,1000); // 透视投影相机
      this.camera.position.set(25, 25, 80);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.scene.add(this.camera);

      let material = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true // 线框图
      });

      this.drawCube(this.scene, material); //立方体
      // this.drawPlane(this.scene, material); //平面
      // this.drawSphere(this.scene, material); //球体

      this.renderer.render(this.scene, this.camera);
    },

    drawCube(scene, material) {
      this.cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3), material);
      // this.cube.position.x = (Math.random() - 0.5) * 10;
      // this.cube.position.y = (Math.random() - 0.5) * 10;
      // this.cube.position.z = (Math.random() - 0.5) * 10;
      this.scene.add(this.cube);
    },

    drawPlane(scene, material) {
      this.plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 4), material);
      // this.plane.position.x = (Math.random() - 0.5) * 10;
      // this.plane.position.y = (Math.random() - 0.5) * 10;
      // this.plane.position.z = (Math.random() - 0.5) * 10;
      this.scene.add(this.plane);
    },

    drawSphere(scene, material) {
      this.sphere = new THREE.Mesh(
        new THREE.SphereGeometry(3, 18, 12),
        material
      );

      // this.sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 6, Math.PI / 6, Math.PI / 3), material);
      // this.sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 6, 0, Math.PI * 2, Math.PI / 6, Math.PI / 3), material);
      // this.sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 6, Math.PI / 2, Math.PI, Math.PI / 6, Math.PI / 2), material);

      // this.sphere.position.x = (Math.random() - 0.5) * 10;
      // this.sphere.position.y = (Math.random() - 0.5) * 10;
      // this.sphere.position.z = (Math.random() - 0.5) * 10;
      this.scene.add(this.sphere);
    },
    render() {
      requestAnimationFrame(this.render);
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.cameraDiff();
    // this.init()
    // this.render();
  }
};
</script>

<style lang="scss">
canvas {
  width: 100%;
  height: 100%;
}
</style>