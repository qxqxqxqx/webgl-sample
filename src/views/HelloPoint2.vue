<template>
  <canvas ref="canvasRef" width="400" height="400"> Please use a browser that supports "canvas" </canvas>
</template>
<script>
import {defineComponent, onMounted, ref} from 'vue';
import {initShaders} from '../../libs/shader';

// Vertex shader program
const VSHADER_SOURCE =
  // 存储限定符 类型 变量名
  'attribute vec4 a_Position;\n' + // attribute variable
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '}\n';

// Fragment shader program
const FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
  '}\n';

export default defineComponent({
  name: 'HelloPoint2',
  setup() {
    const canvasRef = ref(null);

    const setupWebgl = () => {
      const canvas = canvasRef.value;
      const gl = canvas.getContext('webgl');
      // Initialize shaders
      if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
      }
      // Get the storage location of a_Position
      const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
      if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
      }
      // Pass vertex position to attribute variable
      gl.vertexAttrib3f(a_Position, 0.0, 1.0, 0.0);
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
