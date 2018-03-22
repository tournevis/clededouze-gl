export default class Cube {
  constructor () {
    this.positions = [
      // Face avant
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,

      // Face arrière
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,

      // Face supérieure
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,

      // Face inférieure
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,

      // Face droite
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,

      // Face gauche
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0
    ]
    this.numComponents = 3
  }
  init (gl) {
    // Créer un tampon des positions pour le carré.
    const positionBuffer = gl.createBuffer();

    // Définir le positionBuffer comme étant celui auquel appliquer les opérations
    // de tampon à partir d'ici.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array(this.positions),
      gl.STATIC_DRAW);

    const c = [
      1.0,  1.0,  0.0,  1.0,    // blanc
      1.0,  0.0,  0.0,  1.0,    // rouge
      0.0,  1.0,  0.0,  1.0,    // vert
      0.0,  0.0,  1.0,  1.0,    // bleu
    ];

    var colors = []
    for (j=0; j< 6; j++) {
      colors = colors.concat(c)
    }

    const colorBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // Ce tableau définit chaque face comme deux triangles, en utilisant les
  // indices dans le tableau des sommets pour spécifier la position de chaque
  // triangle.

    const indices = [
      0,  1,  2,      0,  2,  3,    // avant
      4,  5,  6,      4,  6,  7,    // arrière
      8,  9,  10,     8,  10, 11,   // haut
      12, 13, 14,     12, 14, 15,   // bas
      16, 17, 18,     16, 18, 19,   // droite
      20, 21, 22,     20, 22, 23,   // gauche
    ];

    // Envoyer maintenant le tableau des éléments à GL

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), gl.STATIC_DRAW);

    return {
      position: positionBuffer,
      color: colorBuffer,
      indices: indexBuffer,
      rotation: 0
    }
  }
}
