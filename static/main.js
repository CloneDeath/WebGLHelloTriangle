var canvas = document.getElementById("c");
var gl = canvas.getContext("webgl");

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

var vertPos = new Float32Array([0, 0, 0, 1, 1, 0]);
var vertPosBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertPosBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertPos, gl.STATIC_DRAW);

var program = gl.createProgram();

var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, "attribute vec2 in_Position;\n" + "void main(){\n" + "	gl_Position = vec4(in_Position, 0, 1);\n" + "}");
gl.compileShader(vertShader);
var log = gl.getShaderInfoLog(vertShader);
if (log != "") {
    alert("Error with Vertex Shader: \n" + log);
}

var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, "void main() {\n" + "	gl_FragColor = vec4(1);\n" + "}");
