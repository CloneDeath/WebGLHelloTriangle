/// <reference path="GraphicsBase.ts" />
/// <reference path="Shader.ts" />

class Program extends GraphicsBase {
	program : WebGLProgram;
	
	constructor(context : WebGLRenderingContext) {
		super(context);
		
		this.program = this.gl.createProgram();
	}
	
	attach(shader : Shader){
		this.gl.attachShader(this.program, shader.shader);
	}
	
	link(){
		this.gl.linkProgram(this.program);
	}
	
	getInfoLog(){
		return this.gl.getProgramInfoLog(this.program);
	}
	
	use(){
		this.gl.useProgram(this.program);
	}
	
	getAttribLocation(name : string) : number {
		return this.gl.getAttribLocation(this.program, name);
	}
}