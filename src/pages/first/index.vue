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
			this.scene = new THREE.Scene();

      this.renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("mainCanvas")
      });
      this.renderer.setClearColor("#f2f2f2", 1.0);

			// this.camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100); // 正交相机
			this.camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000) // 透视投影相机
      this.camera.position.set(25, 25, 80);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.scene.add(this.camera);

      let material = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true // 线框图
      });

      this.drawCube(this.scene, material); //立方体
      this.drawPlane(this.scene, material); //平面
      this.drawSphere(this.scene, material); //球体
			
      this.renderer.render(this.scene, this.camera);
		},
		
    drawCube(scene, material) {
      this.cube = new THREE.Mesh(
        new THREE.CubeGeometry(1, 2, 3),
        material
			);
			this.cube.position.x = ( Math.random() - 0.5 ) * 10;
			this.cube.position.y = ( Math.random() - 0.5 ) * 10;
			this.cube.position.z = ( Math.random() - 0.5 ) * 10; 
      this.scene.add(this.cube);
    },

    drawPlane(scene, material) {
			this.plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 4), material);
			this.plane.position.x = ( Math.random() - 0.5 ) * 10;
			this.plane.position.y = ( Math.random() - 0.5 ) * 10;
			this.plane.position.z = ( Math.random() - 0.5 ) * 10; 
      this.scene.add(this.plane);
    },

    drawSphere(scene, material) {
      this.sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 18, 12),material);

      // this.sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 6, Math.PI / 6, Math.PI / 3), material);
      // this.sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 6, 0, Math.PI * 2, Math.PI / 6, Math.PI / 3), material);
			// this.sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 8, 6, Math.PI / 2, Math.PI, Math.PI / 6, Math.PI / 2), material);
			this.sphere.position.x = ( Math.random() - 0.5 ) * 10;
			this.sphere.position.y = ( Math.random() - 0.5 ) * 10;
			this.sphere.position.z = ( Math.random() - 0.5 ) * 10; 
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