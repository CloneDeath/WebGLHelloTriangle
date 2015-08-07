/// <reference path="GraphicsBase.ts" />

enum BufferType {
	Array = WebGLRenderingContext.ARRAY_BUFFER
}

class Buffer extends GraphicsBase {
	bufferType : BufferType;
	buffer : WebGLBuffer;
	
	constructor(context : WebGLRenderingContext, bufferType : BufferType ){
		super(context);
		
		this.bufferType = bufferType;
		this.buffer = this.gl.createBuffer();
	}
	
	upload(data : Float32Array){
		this.gl.bindBuffer(this.bufferType, this.buffer);
		this.gl.bufferData(this.bufferType, data, WebGLRenderingContext.STATIC_DRAW)
	}
}