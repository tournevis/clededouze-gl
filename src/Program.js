export default class Program {
  constructor(context, shaderProgram) {
    this.gl = context
    this.shaderProgram = shaderProgram
    this.info = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition'),
        vertexColor: this.gl.getAttribLocation(this.shaderProgram, 'aVertexColor'),
      },
      uniformLocations: {
        projectionMatrix: this.gl.getUniformLocation(this.shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: this.gl.getUniformLocation(this.shaderProgram, 'uModelViewMatrix'),
      }
    }
  }
  getProgramInfo () {
    return this.info
  }
}
