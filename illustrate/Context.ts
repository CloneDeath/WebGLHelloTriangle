/// <reference path="GraphicsBase.ts" />
/// <reference path="Program.ts" />
/// <reference path="Buffer.ts" />

enum Attachment {
	Color = WebGLRenderingContext.COLOR_BUFFER_BIT
}

class Context extends GraphicsBase {
	constructor(context : WebGLRenderingContext){
		super(context);
		
		this.gl.viewport(0, 0, 800, 600);
	}
	
	createProgram() : Program {
		return new Program(this.gl);
	}
	
	createShader(shaderType : ShaderType) : Shader {
		return new Shader(this.gl, shaderType);
	}
	
	createBuffer(bufferType : BufferType) : Buffer {
		return new Buffer(this.gl, bufferType);
	}
	
	clearColor(r : number, g : number, b : number, a : number){
		this.gl.clearColor(r, g, b, a);
	}
	
	clear(attachments : Attachment){
		this.gl.clear(attachments)
	}
	
	vertexAttribPointer(location : number, itemSize, type, normalized, stride, offset){
		this.gl.vertexAttribPointer(location, itemSize, type, normalized, stride, offset);
	}
	
	enableVertexAttribArray(location : number){
		this.gl.enableVertexAttribArray(location);
	}
	
	drawArrays(type, first, count){
		this.gl.drawArrays(type, first, count);
	}
}