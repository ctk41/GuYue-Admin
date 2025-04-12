<template>
  <div class="particle-clock-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts" name="ParticleClock">
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import { useGlobalStore } from '@/stores/modules/global';

  const globalStore = useGlobalStore();
  const primary = computed(() => globalStore.primary);

  onMounted(() => {
    ctx = canvas.value.getContext('2d', {
      willReadFrequently: true,
    });

    initCanvasSize();
    draw();
  });

  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId);
  });

  const canvas = ref();
  let ctx: any;
  let animationFrameId: any;

  const initCanvasSize = () => {
    canvas.value.width = window.innerWidth * devicePixelRatio;
    canvas.value.height = window.innerHeight * devicePixelRatio;
  };

  const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  class Particle {
    x: number;
    y: number;
    size: number;

    constructor() {
      const r = Math.min(canvas.value.width, canvas.value.height) / 2;
      const cx = canvas.value.width / 2;
      const cy = canvas.value.height / 2;
      const rad = (getRandom(0, 360) * Math.PI) / 180;
      this.x = cx + r * Math.cos(rad);
      this.y = cy + r * Math.sin(rad);
      this.size = 12;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = primary.value;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
    }

    moveTo(tx: number, ty: number) {
      const duration = 500;
      const sx = this.x,
        sy = this.y;
      const xSpeed = (tx - sx) / duration;
      const ySpeed = (ty - sy) / duration;
      const startTime = Date.now();

      const _move = () => {
        const t = Date.now() - startTime;
        const x = sx + xSpeed * t;
        const y = sy + ySpeed * t;
        this.x = x;
        this.y = y;

        if (t >= duration) {
          this.x = tx;
          this.y = ty;
          return;
        }

        requestAnimationFrame(_move);
      };

      _move();
    }
  }

  const partciles: any[] = [];
  let text: any = null;

  const clear = () => {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  };

  const draw = () => {
    clear();
    update();
    partciles.forEach(p => p.draw());
    animationFrameId = requestAnimationFrame(draw);
  };

  const getText = () => {
    return new Date().toTimeString().substring(0, 8);
  };

  const update = () => {
    const newText = getText();
    if (newText === text) {
      return;
    }

    clear();
    text = newText;

    const { width, height } = canvas.value;
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'middle';
    ctx.font = `${240 * devicePixelRatio}px 'DS-Digital', sans-serif`;
    ctx.fillText(text, (width - ctx.measureText(text).width) / 2, height / 2);

    const points = getPoints();
    clear();

    for (let i = 0; i < points.length; i++) {
      let p = partciles[i];
      if (!p) {
        p = new Particle();
        partciles.push(p);
      }
      const [x, y] = points[i];
      p.moveTo(x, y);
    }

    if (points.length < partciles.length) {
      partciles.splice(points.length);
    }
  };

  const getPoints = () => {
    const { width, height, data } = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);

    const points = [];
    const gap = 6;

    for (let i = 0; i < width; i += gap) {
      for (let j = 0; j < height; j += gap) {
        const index = (i + j * width) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];

        if (r === 0 && g === 0 && b === 0 && a === 255) {
          points.push([i, j]);
        }
      }
    }

    return points;
  };
</script>

<style scoped lang="less">
  .particle-clock-container {
    width: 120px;
    height: 50px;
    margin-top: 4px;
    margin-right: 6px;

    canvas {
      display: block;
      width: 100%;
      height: 100%;
      background: #ffffff;
    }
  }
</style>
