<template>
  <canvas ref="canvasRef" width="400" height="400" @mousedown="handleMouseDown"> Please use a browser that supports "canvas" </canvas>
</template>
<script>
import {defineComponent, onMounted, ref} from 'vue';
import {initShaders} from '../../libs/shader';

// Vertex shader program
const VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' + // attribute variable
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '}\n';

// Fragment shader program
const FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' + // uniform变量
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';

export default defineComponent({
  name: 'ColoredPoints',
  setup() {
    const canvasRef = ref(null);
    let gl = null;
    let a_Position = null;
    let u_FragColor = null;

    const setupWebgl = () => {
      const canvas = canvasRef.value;
      gl = canvas.getContext('webgl');
      // Initialize shaders
      if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
      }
      // Get the storage location of a_Position
      a_Position = gl.getAttribLocation(gl.program, 'a_Position');
      if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
      }

      // Get the storage location of u_FragColor
      u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
      if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      // gl.drawArrays(gl.POINTS, 0, 1);
    };

    const gPoints = []; // The array for the position of a mouse press
    const gColors = []; // The array to store the color of a point

    const handleMouseDown = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const rect = e.target.getBoundingClientRect();

      const xInCanvas = (x - rect.left - canvasRef.value.width / 2) / (canvasRef.value.width / 2);
      const yInCanvas = (canvasRef.value.height / 2 - (y - rect.top)) / (canvasRef.value.height / 2);
      if (xInCanvas >= 0.0 && yInCanvas >= 0.0) {
        // First quadrant
        gColors.push([1.0, 0.0, 0.0, 1.0]); // Red
      } else if (xInCanvas < 0.0 && yInCanvas < 0.0) {
        // Third quadrant
        gColors.push([0.0, 1.0, 0.0, 1.0]); // Green
      } else {
        gColors.push([1.0, 1.0, 1.0, 1.0]); // White
      }

      gPoints.push([xInCanvas, yInCanvas]);

      gl.clear(gl.COLOR_BUFFER_BIT);

      gPoints.forEach((point, index) => {
        gl.vertexAttrib3f(a_Position, point[0], point[1], 0.0);
        gl.uniform4f(u_FragColor, gColors[index][0], gColors[index][1], gColors[index][2], gColors[index][3]);
        gl.drawArrays(gl.POINTS, 0, 1);
      });
    };

    onMounted(() => {
      setupWebgl();
    });

    return {
      canvasRef,
      handleMouseDown,
    };
  },
});
</script>
<style lang="css">
#webgl {
  background-color: blue;
}
</style>
