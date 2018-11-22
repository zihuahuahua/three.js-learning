<template>
  <div class="div"></div>
</template>

<script>
var canvas;
export default {
  data(){
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      texture: null,
      geometry:'',
      material: '',
      canvas: null
    }
  },
  methods: {
    init() {
      // 渲染器
			this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setClearColor("#f2f2f2", 1.0);
      
      document.body.appendChild(this.renderer.domElement);
      
			// 相机
			this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
			this.camera.position.z = 400;
      this.scene = new THREE.Scene(); // 场景
      
      //将 canvas 作为纹理加载
      console.log(this.canvas)
			this.texture = new THREE.Texture(this.canvas);
			this.geometry = new THREE.CubeGeometry(150, 150, 150);
			this.material = new THREE.MeshBasicMaterial({ map: this.texture });
			this.texture.needsUpdate = true; // 更新
			this.mesh = new THREE.Mesh(this.geometry, this.material);
			this.scene.add(this.mesh);

			// 监听浏览器窗口大小改变事件
			window.addEventListener('resize', this.onWindowResize, false);
		},
		 onWindowResize() { // 窗口自适应
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix(); // 更新相机
			this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    clock() {
      canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      let ctx = canvas.getContext('2d');
      if(ctx){
        let timerId;
        let frameRate = 60;
        function canvObject(){
          this.x = 0;
          this.y = 0;
          this.rotation = 0;
          this.borderWidth = 2;
          this.borderColor = '#000000';
          this.fill = false;
          this.fillColor = '#ff0000';
          this.update = function(){
          if(!this.ctx)throw new Error('你没有指定ctx对象。');
          let ctx = this.ctx
          ctx.save();
          ctx.lineWidth = this.borderWidth;
          ctx.strokeStyle = this.borderColor;
          ctx.fillStyle = this.fillColor;
          ctx.translate(this.x, this.y);
          if(this.rotation)ctx.rotate(this.rotation * Math.PI/180);
          if(this.draw)this.draw(ctx);
          if(this.fill)ctx.fill();
          ctx.stroke();
          ctx.restore();
          }
        };
        function Line(){};
          Line.prototype = new canvObject();
          Line.prototype.fill = false;
          Line.prototype.start = [0,0];
          Line.prototype.end = [5,5];
          Line.prototype.draw = function(ctx){
          ctx.beginPath();
          ctx.moveTo.apply(ctx,this.start);
          ctx.lineTo.apply(ctx,this.end);
          ctx.closePath();
        };

        function Circle(){};
          Circle.prototype = new canvObject();
          Circle.prototype.draw = function(ctx){
          ctx.beginPath();
          ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
          ctx.closePath();
        };

        let circle = new Circle();
        circle.ctx = ctx;
        circle.x = 100;
        circle.y = 100;
        circle.radius = 90;
        circle.fill = true;
        circle.borderWidth = 6;
        circle.fillColor = '#ffffff';

        let hour = new Line();
        hour.ctx = ctx;
        hour.x = 100;
        hour.y = 100;
        hour.borderColor = "#000000";
        hour.borderWidth = 10;
        hour.rotation = 0;
        hour.start = [0,20];
        hour.end = [0,-50];

        let minute = new Line();
        minute.ctx = ctx;
        minute.x = 100;
        minute.y = 100;
        minute.borderColor = "#333333";
        minute.borderWidth = 7;
        minute.rotation = 0;
        minute.start = [0,20];
        minute.end = [0,-70];

        let seconds = new Line();
        seconds.ctx = ctx;
        seconds.x = 100;
        seconds.y = 100;
        seconds.borderColor = "#ff0000";
        seconds.borderWidth = 4;
        seconds.rotation = 0;
        seconds.start = [0,20];
        seconds.end = [0,-80];

        let center = new Circle();
        center.ctx = ctx;
        center.x = 100;
        center.y = 100;
        center.radius = 5;
        center.fill = true;
        center.borderColor = 'orange';
        let ls=[],cache
        for(let i=0;i<12;i++){
          cache = ls[i] = new Line();
          cache.ctx = ctx;
          cache.x = 100;
          cache.y = 100;
          cache.borderColor = "orange";
          cache.borderWidth = 2;
          cache.rotation = i * 30;
          cache.start = [0,-70];
          cache.end = [0,-80];
        }

        timerId = setInterval(function(){
          // 清除画布
          ctx.clearRect(0,0,200,200);
          // 填充背景色
          ctx.fillStyle = 'orange';
          ctx.fillRect(0,0,200,200);
          // 表盘
          circle.update();
          // 刻度
          for(let i=0;cache=ls[i++];)cache.update();
          // 时针
          hour.rotation = (new Date()).getHours() * 30;
          hour.update();
          // 分针
          minute.rotation = (new Date()).getMinutes() * 6;
          minute.update();
          // 秒针
          seconds.rotation = (new Date()).getSeconds() * 6;
          seconds.update();
          // 中心圆
          center.update();
        },(1000/frameRate)|0);
        this.canvas = canvas
        // document.body.appendChild(canvas) // 
      }else{
      alert('您的浏览器不支持Canvas无法预览.\n跟我一起说："Fuck Internet Exploer!"');
      }
    },
    animate() { // 动画
			this.texture.needsUpdate = true;
			this.mesh.rotation.y -= 0.01;
			this.mesh.rotation.x -= 0.01;
			requestAnimationFrame(this.animate);
			this.renderer.render(this.scene, this.camera);
		}
  },
  mounted (){
    this.clock()
    this.init()
    this.animate()
  }
}
</script>
