<template>
  <div id="mapComponent" @mousemove="onMouseMove" @mouseout="onMouseOut">
    <canvas id="buildingsCanvas" ref="buildingsCanvas" v-bind:height="mapHeight" v-bind:width="mapWidth"/>
    <canvas id="hoverCanvas" ref="hoverCanvas" v-bind:height="mapHeight" v-bind:width="mapWidth"/>
    <canvas id="backgroundMap" ref="backgroundMap" v-bind:height="mapHeight" v-bind:width="mapWidth"/>
  </div>
</template>

<script>
import mapConstants from "/src/components/Map/MapConstants"
import MapHttpServices from "../../http/MapHttpServices"

const randomMap = []
for (let row = 0; row < 32; row++){
  const rowList = []
  for (let col = 0; col < 56; col++){
    const minIndexColor = Math.ceil(0)
    const maxIndexColor = Math.floor(4)
    const indexColor = Math.floor(Math.random() * (maxIndexColor - minIndexColor +1)) + minIndexColor
    rowList[col] = indexColor
  }
  randomMap.push(rowList)
}

const pickColorPool = (value) => {
  let envColors
  switch (value){
    case mapConstants.PLAIN_ENV:
      envColors = mapConstants.PLAIN_COLORS
      break
    case mapConstants.FOREST_ENV:
      envColors = mapConstants.FOREST_COLORS
      break
    case mapConstants.MOUNTAIN_ENV:
      envColors = mapConstants.MOUNTAIN_COLORS
      break
    case mapConstants.BEACH_ENV:
      envColors = mapConstants.BEACH_COLORS
      break
    case mapConstants.LAKE_ENV:
      envColors = mapConstants.LAKE_COLORS
      break
    default:
      envColors = mapConstants.PLAIN_COLORS
  }
  return envColors
}

const drawRectOnCanvas = (col, row, color, context) => {
  context.fillStyle = color
  context.fillRect(
      col * mapConstants.TILE_SIZE,
      row * mapConstants.TILE_SIZE,
      mapConstants.TILE_SIZE,
      mapConstants.TILE_SIZE
  )
}

export default {
  name: 'Map',
  props: {
    map: Array(String),
    typeSelected: String,
  },
  data() {
    return {
      buildings: [
        {id: 1, type: "manoir"}
      ],
      mapWidth: mapConstants.TILE_SIZE * mapConstants.NUMBER_TILE_COL,
      mapHeight: mapConstants.TILE_SIZE * mapConstants.NUMBER_TILE_ROW,
    }
  },
  mounted() {
    const onResolve = (res) => {
      this.buildMap(res.data)
    }
    const onError = (err) => {
      console.log(err)
    }
    MapHttpServices.generateMap(onResolve, onError)
  },
  methods: {
    buildMap(generatedMap) {
      const canvas = this.$refs["backgroundMap"]
      const context2D = canvas.getContext("2d")

      generatedMap.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          /* random index [int] for random variant of the color */
          const minIndexColor = Math.ceil(1)
          const maxIndexColor = Math.floor(3)
          const indexColor = Math.floor(Math.random() * (maxIndexColor - minIndexColor +1)) + minIndexColor

          /* pick env colors */
          const envColors = pickColorPool(col)

          /* draw on canvas */
          context2D.fillStyle = envColors[indexColor]
          context2D.fillRect(
              colIndex * mapConstants.TILE_SIZE,
              rowIndex * mapConstants.TILE_SIZE,
              mapConstants.TILE_SIZE,
              mapConstants.TILE_SIZE
          )
        })
      })
    },

    onMouseOut(){
      /* reset hover canvas */
      const canvas = this.$refs["hoverCanvas"]
      const context2D = canvas.getContext("2d")
      context2D.clearRect(0, 0, this.mapWidth, this.mapHeight)
    },

    onMouseMove(eventMouseMove){
      /* compute row and col numbers */
      const rectCanvas = this.$refs["hoverCanvas"].getBoundingClientRect()
      let row = Math.floor((eventMouseMove.clientY - rectCanvas.top)/mapConstants.TILE_SIZE)
      let col = Math.floor((eventMouseMove.clientX - rectCanvas.left)/mapConstants.TILE_SIZE)

      /* avoid going outside */
      if (row < 0){
        row = 0
      } else if (row >= mapConstants.NUMBER_TILE_ROW){
         row = mapConstants.NUMBER_TILE_ROW - 1
      }
      if (col < 0){
        col = 0
      } else if (col >= mapConstants.NUMBER_TILE_COL){
        col = mapConstants.NUMBER_TILE_COL - 1
      }

      /* draw on canvas */
      const canvas = this.$refs["hoverCanvas"]
      const context2D = canvas.getContext("2d")

      /* reset canvas before draw */
      context2D.clearRect(0, 0, this.mapWidth, this.mapHeight)
      drawRectOnCanvas(col, row, mapConstants.INFLUENCE_COLOR, context2D)
      drawRectOnCanvas(col + 1, row + 1, mapConstants.INFLUENCE_COLOR, context2D)
      drawRectOnCanvas(col - 1, row - 1, mapConstants.INFLUENCE_COLOR, context2D)
      drawRectOnCanvas(col + 1, row - 1, mapConstants.INFLUENCE_COLOR, context2D)
      drawRectOnCanvas(col - 1, row + 1, mapConstants.INFLUENCE_COLOR, context2D)
      drawRectOnCanvas(col + 1, row, mapConstants.INFLUENCE_COLOR, context2D)
      drawRectOnCanvas(col - 1, row, mapConstants.INFLUENCE_COLOR, context2D)
      drawRectOnCanvas(col, row + 1, mapConstants.INFLUENCE_COLOR, context2D)
      drawRectOnCanvas(col, row - 1, mapConstants.INFLUENCE_COLOR, context2D)
    }
  }
}

</script>

<style>

#mapComponent{
  height: 544px;
  width: 952px;
  overflow: hidden;
  border: 2px solid #008CFF;
  margin: auto;
  position: relative;
  cursor: none;
}

#mapComponent canvas{
  position: absolute;
  top: 0;
  left: 0;
}

#backgroundMap{
  z-index: 0;
}

#hoverCanvas{
  z-index: 1;
}

#buildingsCanvas{
  z-index: 2;
}

</style>