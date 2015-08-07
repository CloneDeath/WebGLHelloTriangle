/// <reference path="GraphicsBase.ts" />
/// <reference path="ShaderType.ts" />

class Shader extends GraphicsBase {
	shader : WebGLShader;
	
	constructor(context : WebGLRenderingContext, shaderType : ShaderType){
		super(context);
		
		this.shader = this.gl.createShader(shaderType);
	}
	
	source(code : string) {
		this.gl.shaderSource(this.shader, code);
	}
	
	compile(){
		this.gl.compileShader(this.shader);
	}
	
	getInfoLog() : string {
		return this.gl.getShaderInfoLog(this.shader);
	}
}