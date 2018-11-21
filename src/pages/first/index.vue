<template>
  <div class="div"></div>
</template>
<script>
export default {
  data (){
    return {
      scene: null, // 场景
      camera: null, // 相机
      renderer: null, // 渲染器
      cube: null // 物体
    }
  },
  methods: {
    // 初始化
    init() {
      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

      this.renderer = new THREE.WebGLRenderer();

      this.renderer.setSize(window.innerWidth, window.innerHeight);

      document.body.appendChild(this.renderer.domElement);
      let geometry = new THREE.CubeGeometry(1,1,1);
      let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
      this.cube = new THREE.Mesh(geometry, material); 
      this.scene.add(this.cube);
      this.camera.position.z = 5;
    },
    render() { 
        requestAnimationFrame(this.render);
        this.cube.rotation.x += .01;
        this.cube.rotation.y += .01;
        this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init();
    this.render()
  }
};
</script>

<style lang="scss">
  canvas { 
    width: 100%; 
    height: 100%;
  }
</style>