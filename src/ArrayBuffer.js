export default class ArrayBuffer {
  constructor ( context, data, usage, divisor ) {
    this.gl = context
    this.buffer = this.gl.createBuffer()
    this.usage = usage || this.gl.STATIC_DRAW
    this.divisor = divisor
    if(this.divisor) {
      this.instanced = true
    }

    this.length = -1
    this.data(data)
  }
  bind () {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
  }
  data (data) {
    this.bind()
    this.gl.bufferData(this.gl.ARRAY_BUFFER , new Float32Array(data), this.usage)
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER , null)
    this._data = data
  }

  initBuffer (shape) {
    // Créer un tampon des positions pour le carré.
    this.positionBuffer = this.gl.createBuffer()

    // Définir le positionBuffer comme étant celui auquel appliquer les opérations
    // de tampon à partir d'ici.
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer)

    // Créer maintenant un tableau des positions pour le carré.
    this.positions = shape.positions

    this.gl.bufferData(this.gl.ARRAY_BUFFER,
                  new Float32Array(this.positions),
                  this.gl.STATIC_DRAW)

    this.c = [
      1.0, 1.0, 0.0, 1.0,    // blanc
      1.0, 0.0, 0.0, 1.0,    // rouge
      0.0, 1.0, 0.0, 1.0,    // vert
      0.0, 0.0, 1.0, 0.0    // bleu
    ]

    var colors = []
    for (var j = 0; j < 6; j++) {
      colors = colors.concat(this.c)
    }
    this.colorBuffer = this.gl.createBuffer()

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW)
    // Build the element array buffer; this specifies the indices
    // into the vertex arrays for each face's vertices.

    this.indexBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)

    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.

    const indices = [
      0, 1, 2, 0, 2, 3,   // front
      4, 5, 6, 4, 6, 7,   // back
      8, 9, 10, 8, 10, 11,  // top
      12, 13, 14, 12, 14, 15,  // bottom
      16, 17, 18, 16, 18, 19,  // right
      20, 21, 22, 20, 22, 23 // left
    ]

    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), this.gl.STATIC_DRAW)

    return {
      position: this.positionBuffer,
      color: this.colorBuffer,
      indices: this.indexBuffer,
      rotation: 0
    }
  }
}
