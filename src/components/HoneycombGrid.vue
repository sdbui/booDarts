<template>
  <div class="honeycomb">
    <div class="container">
    </div>
  </div>
</template>

<script>
import * as Honeycomb from 'honeycomb-grid';
import SVG from 'svg.js'

export default {
  name: 'HoneycombGrid',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    const draw = SVG(document.querySelector('.container'))
    const Hex = Honeycomb.extendHex({ size: 50 })
    const Grid = Honeycomb.defineGrid(Hex)
    // get the corners of a hex (they're the same for all hexes created with the same Hex factory)
    const corners = Hex().corners()
    // an SVG symbol can be reused
    const hexSymbol = draw.symbol()
        // map the corners' positions to a string and create a polygon
        .polygon(corners.map(({ x, y }) => `${x},${y}`))
        .fill('none')
        .stroke({ width: 1, color: '#999' })
        .toggleClass('blah')

    // render 10,000 hexes
    Grid.rectangle({ width: 5, height: 4 }).forEach(hex => {
        const { x, y } = hex.toPoint()
        // use hexSymbol and set its position for each hex
        draw.use(hexSymbol).translate(x, y)
    })

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.honeycomb {
  height: 100vh;
  width: 100vw;
}

.container {
  width: 500px;
  height: 400px;
}

.blah {
  fill: yellow;
  stroke: black;
}
</style>
