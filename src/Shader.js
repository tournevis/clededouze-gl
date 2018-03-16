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

    const shaderProgram = this.gl.createProgram()
    this.gl.attachShader(shaderProgram, vertexShader)
    this.gl.attachShader(shaderProgram, fragmentShader)
    this.gl.linkProgram(shaderProgram)
    
    // Si la création du programme shader a échoué, alerte
    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
      console.log('Impossible d\'initialiser le programme shader : ' + this.gl.getProgramInfoLog(shaderProgram))
      return null
    }
    return shaderProgram
  }

  loadShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader)
      return null
    }
    return shader
  }
}
