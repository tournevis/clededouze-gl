//
// Initialiser un programme shader, de façon à ce que WebGL sache comment dessiner nos données
//
const glslify = require('glslify')

export default class Shaders {
  constructor (gl, vsSource, fsSource) {
    this.gl = gl
    this.vsSource = glslify('./shaders/index.vert')
    this.fsSource = glslify('./shaders/index.frag')
    this.initShaderProgram()
  }

  initShaderProgram () {
    const vertexShader = this.loadShader(this.gl, this.gl.VERTEX_SHADER, this.vsSource);
    const fragmentShader = this.loadShader(this.gl, this.gl.FRAGMENT_SHADER, this.fsSource);

    // Créer le programme shader

    this.shaderProgram = this.gl.createProgram()
    this.gl.attachShader(this.shaderProgram, vertexShader)
    this.gl.attachShader(this.shaderProgram, fragmentShader)
    this.gl.linkProgram(this.shaderProgram)

    // Si la création du programme shader a échoué, alerte
    if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
      console.log('Impossible d\'initialiser le programme shader : ' + this.gl.getProgramInfoLog(this.shaderProgram))
      return null
    }
    return this.shaderProgram
  }

  loadShader(gl, type, source) {
    this.shader = gl.createShader(type)
    gl.shaderSource(this.shader, source)
    gl.compileShader(this.shader)
    if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)) {
      console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(this.shader));
      gl.deleteShader(this.shader)
      return null
    }
    return this.shader
  }
}
