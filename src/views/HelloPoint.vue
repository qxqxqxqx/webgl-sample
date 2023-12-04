<template>
  <canvas ref="canvasRef" width="400" height="400"> Please use a browser that supports "canvas" </canvas>
</template>
<script>
import {defineComponent, onMounted, ref} from 'vue';
import {initShaders} from '../../libs/shader';

// Vertex shader program
const VSHADER_SOURCE =
  'void main() {\n' +
  '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // Set the vertex coordinates of the point
  '  gl_PointSize = 10.0;\n' + // Set the point size
  '}\n';

// Fragment shader program
const FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
  '}\n';

export default defineComponent({
  name: 'HelloPoint',
  setup() {
    const canvasRef = ref(null);

    const setupWebgl = () => {
      // 加载着色器程序
      fetch('../../libs/shader/point/point.vert')
        .then((res) => res.text())
        .then((text) => {
          console.log(text);
        });
      const canvas = canvasRef.value;
      console.log(canvas);
      const gl = canvas.getContext('webgl');
      console.log('gl:', gl);
      // Initialize shaders
      if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
      }
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, 1);
    };

    onMounted(() => {
      setupWebgl();
    });

    return {
      canvasRef,
    };
  },
});
</script>
<style lang="css">
#webgl {
  background-color: blue;
}
</style>
