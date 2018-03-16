'use strict'

import Shader from './Shader'

class ClededouzeGl {
  constructor () {
    this.canvas = document.querySelector("#app > canvas")
    // Initialisation du contexte WebGL
    this.gl = this.canvas.getContext("webgl")

    // Continuer seulement si WebGL est disponible et fonctionnel
    if (!this.gl) {
      alert("Impossible d'initialiser WebGL. Votre navigateur ou votre machine peut ne pas le supporter.")
      return
    }

    // Définir la couleur d'effacement comme étant le noir, complètement opaque
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
    // Effacer le tampon de couleur avec la couleur d'effacement spécifiée
    this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)

    const shaders = new Shader(this.gl, './shaders/index.vert', './shaders/index.frag')
  }
}

document.addEventListener("DOMContentLoaded", event => {
  console.log("DOM entièrement chargé et analysé")
  let cdd = new ClededouzeGl()
})
