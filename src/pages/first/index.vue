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
      cube: null // 立方体
    };
  },
  methods: {
    // // 初始化
    // initCube() {
    //   this.scene = new THREE.Scene();

    //   this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    //   this.renderer = new THREE.WebGLRenderer();

    //   this.renderer.setSize(window.innerWidth, window.innerHeight);
    //   this.renderer.setClearColor("#f2f2f2", 1.0);

    //   document.body.appendChild(this.renderer.domElement);
    //   let geometry = new THREE.CubeGeometry(1,1,1);
    //   let material = new THREE.MeshBasicMaterial({color: 0x87CEFA});
    //   this.cube = new THREE.Mesh(geometry, material);
    //   this.scene.add(this.cube);
    //   this.camera.position.z = 5;
    // },
    init() {
      this.renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("mainCanvas")
      });
      this.renderer.setClearColor(0x000000);
      this.renderer.setClearColor("#f2f2f2", 1.0);

      this.scene = new THREE.Scene();

      // camera
      this.camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
      this.camera.position.set(25, 25, 25);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.scene.add(this.camera);

      // 材质
      let material = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true
      });

      // this.drawCube(this.scene, material); //立方体
      // this.drawPlane(this.scene, material); //平面
      this.drawSphere(this.scene, material); //球体

      // render
      this.renderer.render(this.scene, this.camera);
    },
    drawCube(scene, material) {
      let cube = new THREE.Mesh(
        new THREE.CubeGeometry(1, 2, 3, 2, 2, 3),
        material
			);
      this.scene.add(cube);
    },

    drawPlane(scene, material) {
			let plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 4), material);
      this.scene.add(plane);
    },

    drawSphere(scene, material) {
      let sphere = new THREE.Mesh(
        new THREE.SphereGeometry(3, 18, 12),
        material
			);

      //          var sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 6, Math.PI / 6, Math.PI / 3), material);
      //          var sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 6, 0, Math.PI * 2, Math.PI / 6, Math.PI / 3), material);
      //            var sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 6, Math.PI / 2, Math.PI, Math.PI / 6, Math.PI / 2), material);
      this.scene.add(sphere);
    },
    render() {
      requestAnimationFrame(this.render);
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
		// this.initCube();
		this.init()
		// this.render();
		// buildAuxSystem(this.scene); // 网格和坐标
  }
};
</script>

<style lang="scss">
canvas {
  width: 100%;
  height: 100%;
}
</style>