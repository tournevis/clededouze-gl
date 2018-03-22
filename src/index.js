'use strict'
import { mat4 } from 'gl-matrix'
import Shader from './Shader'
import Render from './Render'
import Cube from './Cube'
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
    this.square =  this.initBuffers(this.gl)
    this.renderer =  new Render()
    this.programInfo = {
      program:  shaders.shaderProgram,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation( shaders.shaderProgram, 'aVertexPosition'),
        vertexColor: this.gl.getAttribLocation( shaders.shaderProgram, 'aVertexColor'),
      },
      uniformLocations: {
        projectionMatrix: this.gl.getUniformLocation( shaders.shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: this.gl.getUniformLocation( shaders.shaderProgram, 'uModelViewMatrix'),
      },
    };

    // Draw the scene

    this.then = 0;
    // Dessiner la scène répétitivement
    requestAnimationFrame(this.render.bind(this));
  }
  render(now) {
    now *= 0.001;  // conversion en secondes
    const deltaTime = now - this.then;
    this.then = now;

    this.renderer.draw(this.gl, this.programInfo, this.square, deltaTime);
    requestAnimationFrame(this.render.bind(this));
  }
  initBuffers(gl) {
    let cube = new Cube()
    // Créer un tampon des positions pour le carré.
    const positionBuffer = gl.createBuffer();

    // Définir le positionBuffer comme étant celui auquel appliquer les opérations
    // de tampon à partir d'ici.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);



    // Créer maintenant un tableau des positions pour le carré.
    const positions = cube.positions

    gl.bufferData(gl.ARRAY_BUFFER,
                  new Float32Array(positions),
                  gl.STATIC_DRAW);

    const c = [
      1.0,  1.0,  0.0,  1.0,    // blanc
      1.0,  0.0,  0.0,  1.0,    // rouge
      0.0,  1.0,  0.0,  1.0,    // vert
      0.0,  0.0,  1.0,  1.0,    // bleu
    ];

    var colors = []
    for (var j=0; j< 6; j++) {
      colors = colors.concat(c)
    }
    const colorBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    // Build the element array buffer; this specifies the indices
    // into the vertex arrays for each face's vertices.

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.

    const indices = [
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23,   // left
    ];
    
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), gl.STATIC_DRAW)

    return {
      position: positionBuffer,
      color: colorBuffer,
      indices: indexBuffer,
      rotation: 0
    }
  }
}

document.addEventListener("DOMContentLoaded", event => {
  console.log("DOM entièrement chargé et analysé")
  let cdd = new ClededouzeGl()
})
