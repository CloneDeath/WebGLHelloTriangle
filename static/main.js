var GraphicsBase = (function () {
    function GraphicsBase(context) {
        this.gl = context;
    }
    return GraphicsBase;
})();
var ShaderType;
(function (ShaderType) {
    ShaderType[ShaderType["Vertex"] = WebGLRenderingContext.VERTEX_SHADER] = "Vertex";
    ShaderType[ShaderType["Fragment"] = WebGLRenderingContext.FRAGMENT_SHADER] = "Fragment";
})(ShaderType || (ShaderType = {}));
/// <reference path="GraphicsBase.ts" />
/// <reference path="ShaderType.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Shader = (function (_super) {
    __extends(Shader, _super);
    function Shader(context, shaderType) {
        _super.call(this, context);

        this.shader = this.gl.createShader(shaderType);
    }
    Shader.prototype.source = function (code) {
        this.gl.shaderSource(this.shader, code);
    };

    Shader.prototype.compile = function () {
        this.gl.compileShader(this.shader);
    };

    Shader.prototype.getInfoLog = function () {
        return this.gl.getShaderInfoLog(this.shader);
    };
    return Shader;
})(GraphicsBase);
/// <reference path="GraphicsBase.ts" />
/// <reference path="Shader.ts" />
var Program = (function (_super) {
    __extends(Program, _super);
    function Program(context) {
        _super.call(this, context);

        this.program = this.gl.createProgram();
    }
    Program.prototype.attach = function (shader) {
        this.gl.attachShader(this.program, shader.shader);
    };

    Program.prototype.link = function () {
        this.gl.linkProgram(this.program);
    };

    Program.prototype.getInfoLog = function () {
        return this.gl.getProgramInfoLog(this.program);
    };

    Program.prototype.use = function () {
        this.gl.useProgram(this.program);
    };

    Program.prototype.getAttribLocation = function (name) {
        return this.gl.getAttribLocation(this.program, name);
    };
    return Program;
})(GraphicsBase);
/// <reference path="GraphicsBase.ts" />
var BufferType;
(function (BufferType) {
    BufferType[BufferType["Array"] = WebGLRenderingContext.ARRAY_BUFFER] = "Array";
})(BufferType || (BufferType = {}));

var Buffer = (function (_super) {
    __extends(Buffer, _super);
    function Buffer(context, bufferType) {
        _super.call(this, context);

        this.bufferType = bufferType;
        this.buffer = this.gl.createBuffer();
    }
    Buffer.prototype.upload = function (data) {
        this.gl.bindBuffer(this.bufferType, this.buffer);
        this.gl.bufferData(this.bufferType, data, WebGLRenderingContext.STATIC_DRAW);
    };
    return Buffer;
})(GraphicsBase);
/// <reference path="GraphicsBase.ts" />
/// <reference path="Program.ts" />
/// <reference path="Buffer.ts" />
var Attachment;
(function (Attachment) {
    Attachment[Attachment["Color"] = WebGLRenderingContext.COLOR_BUFFER_BIT] = "Color";
})(Attachment || (Attachment = {}));

var Context = (function (_super) {
    __extends(Context, _super);
    function Context(context) {
        _super.call(this, context);

        this.gl.viewport(0, 0, 800, 600);
    }
    Context.prototype.createProgram = function () {
        return new Program(this.gl);
    };

    Context.prototype.createShader = function (shaderType) {
        return new Shader(this.gl, shaderType);
    };

    Context.prototype.createBuffer = function (bufferType) {
        return new Buffer(this.gl, bufferType);
    };

    Context.prototype.clearColor = function (r, g, b, a) {
        this.gl.clearColor(r, g, b, a);
    };

    Context.prototype.clear = function (attachments) {
        this.gl.clear(attachments);
    };

    Context.prototype.vertexAttribPointer = function (location, itemSize, type, normalized, stride, offset) {
        this.gl.vertexAttribPointer(location, itemSize, type, normalized, stride, offset);
    };

    Context.prototype.enableVertexAttribArray = function (location) {
        this.gl.enableVertexAttribArray(location);
    };

    Context.prototype.drawArrays = function (type, first, count) {
        this.gl.drawArrays(type, first, count);
    };
    return Context;
})(GraphicsBase);
/// <reference path="Context.ts" />
/// <reference path="illustrate/main.ts" />
function onBodyLoad() {
    var canvas = document.getElementById("c");
    var gl = new Context(canvas.getContext("webgl"));

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(Attachment.Color);

    var checkLog = function (log, prefix) {
        if (log != "") {
            alert(prefix + "\r\n" + log);
        }
    };

    var compileShader = function (shaderType, source) {
        var shaderName = (shaderType == ShaderType.Vertex) ? "Vertex" : "Fragment";

        var shader = gl.createShader(shaderType);
        shader.source(source);
        shader.compile();

        checkLog(shader.getInfoLog(), "Error with " + shaderName + " Shader:");
        return shader;
    };

    var makeProgram = function (shader1, shader2) {
        var program = gl.createProgram();
        program.attach(shader1);
        program.attach(shader2);
        program.link();
        checkLog(program.getInfoLog(), "Error with Program Shader:");
        return program;
    };

    var vertShader = compileShader(ShaderType.Vertex, "attribute vec2 in_Position;\n" + "void main(){\n" + "	gl_Position = vec4(in_Position, 0, 1);\n" + "}");

    var fragShader = compileShader(ShaderType.Fragment, "void main() {\n" + "	gl_FragColor = vec4(1);\n" + "}");

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
