/// <reference path="illustrate/main.ts" />

function onBodyLoad(){

var canvas : any = document.getElementById("c");
var gl = new Context(canvas.getContext("webgl"));

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(Attachment.Color);

var checkLog = function(log : string, prefix : string){
	if (log != ""){
		alert(prefix + "\r\n" + log);
	}
}

var compileShader = function(shaderType : ShaderType, source : string) : Shader {
	var shaderName = (shaderType == ShaderType.Vertex) ? "Vertex" : "Fragment";
	
	var shader = gl.createShader(shaderType);
	shader.source(source);
	shader.compile();	
	
	checkLog(shader.getInfoLog(), "Error with " + shaderName + " Shader:");
	return shader;
};

var makeProgram = function(shader1 : Shader, shader2 : Shader) : Program {
	var program = gl.createProgram();
	program.attach(shader1);
	program.attach(shader2);
	program.link();
	checkLog(program.getInfoLog(), "Error with Program Shader:");
	return program;
};

var vertShader = compileShader(ShaderType.Vertex, 
	"attribute vec2 in_Position;\n" +
	"void main(){\n" +
	"	gl_Position = vec4(in_Position, 0, 1);\n" +
	"}"
);

var fragShader = compileShader(ShaderType.Fragment,
	"void main() {\n" +
	"	gl_FragColor = vec4(1);\n" +
	"}"
);

var program = makeProgram(fragShader, vertShader);
program.use();

var posBuffer = gl.createBuffer(BufferType.Array);
posBuffer.upload(new Float32Array([0, 0, 0, 1, 1, 0]));

var positionAttrib = program.getAttribLocation("in_Position");
gl.vertexAttribPointer(positionAttrib, 2, WebGLRenderingContext.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionAttrib);


/* render */
gl.drawArrays(WebGLRenderingContext.TRIANGLES, 0, 3);

}