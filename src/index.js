'use strict'

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
  }
}
