'use strict'

import Shader from './Shader'
import Render from './Render'
import Cube from './Cube'
import Program from './Program'
import ArrayBuffer from './ArrayBuffer'
class ClededouzeGl {
  constructor () {
    this.canvas = document.querySelector('#app > canvas')
    if (this.canvas) {
      this.gl = this.canvas.getContext('webgl')
    } else {
      this.canvas = document.createElement('canvas')
      this.body = document.querySelector('body')
      this.canvas.style.width = '80vw'
      this.canvas.style.height = '80vh'
      this.body.appendChild(this.canvas)
      this.gl = this.canvas.getContext('webgl')
    }
    // Initialisation du contexte WebGL
    // Continuer seulement si WebGL est disponible et fonctionnel
    if (!this.gl) {
      alert("Impossible d'initialiser WebGL. Votre navigateur ou votre machine peut ne pas le supporter.")
      return
    }

    // Définir la couleur d'effacement comme étant le noir, complètement opaque
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
    // Effacer le tampon de couleur avec la couleur d'effacement spécifiée
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)

    const shaders = new Shader(this.gl, './shaders/index.vert', './shaders/index.frag')
    let cube = new Cube()
    let buffer = new ArrayBuffer(this.gl)
    this.buffers = buffer.initBuffer(cube)
    this.renderer = new Render()
    this.program = new Program(this.gl, shaders.shaderProgram)

    // Draw the scene

    this.then = 0
    // Dessiner la scène répétitivement
    requestAnimationFrame(this.render.bind(this))
  }
  render (now) {
    now *= 0.001  // conversion en secondes
    const deltaTime = now - this.then
    this.then = now

    this.renderer.draw(this.gl, this.program.info, this.buffers, deltaTime)
    requestAnimationFrame(this.render.bind(this))
  }

}

document.addEventListener('DOMContentLoaded', event => {
  console.log('DOM entièrement chargé et analysé')
  let cdd = new ClededouzeGl()
  console.log(cdd)
})
