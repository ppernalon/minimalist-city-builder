<template>
  <div id="mapComponent" @mousemove="onMouseMove" @mouseout="onMouseOut">
    <canvas id="buildingsCanvas" ref="buildingsCanvas" v-bind:height="mapHeight" v-bind:width="mapWidth"/>
    <canvas id="hoverCanvas" ref="hoverCanvas" v-bind:height="mapHeight" v-bind:width="mapWidth"/>
    <canvas id="backgroundMap" ref="backgroundMap" v-bind:height="mapHeight" v-bind:width="mapWidth"/>
  </div>
</template>

<script>
import mapConstants from "/src/components/Map/MapConstants"
// import MapHttpServices from "../../http/MapHttpServices"

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

const getSizeBuilding = (buildingType) => {
  return mapConstants.SIZE_BUILDING[buildingType]
}

const getBuildingImageSource = (buildingType) => {
  return mapConstants.SRC_BUILDINGS[buildingType]
}
const drawBuildingOnCanvas = (col, row, buildingType, context) => {
  const imageSrc = getBuildingImageSource(buildingType)
  const buildingSize = getSizeBuilding(buildingType)
  const imageWidth = buildingSize[1] * mapConstants.TILE_SIZE
  const imageHeight = buildingSize[0] * mapConstants.TILE_SIZE
  const imageToDraw = new Image(imageWidth, imageHeight)
  imageToDraw.src = imageSrc

  context.drawImage(
      imageToDraw,
      col * mapConstants.TILE_SIZE,
      row * mapConstants.TILE_SIZE,
      imageWidth,
      imageHeight
  )
}

const computeInfluenceSphere = (col, row, buildingType) => {
  const range = mapConstants.INFLUENCE_RANGES[buildingType]
  const squaresToFill = []
  for (let rowRange = 0; rowRange < range; rowRange++){
    for (let colRange = 0; colRange < range; colRange++){
      const dist = Math.sqrt(Math.pow(colRange, 2) + Math.pow(rowRange, 2))
      if (dist < range){
        squaresToFill.push([col + colRange, row + rowRange])
        squaresToFill.push([col - colRange, row - rowRange])
        squaresToFill.push([col + colRange, row - rowRange])
        squaresToFill.push([col - colRange, row + rowRange])
      }
    }
  }
  return squaresToFill
}

export default {
  name: 'Map',
  props: {
    map: Array,
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
    this.buildMap(this.map)
    // const onResolve = (res) => {
    //   this.buildMap(res.data)
    // }
    // const onError = (err) => {
    //   console.log(err)
    // }
    // MapHttpServices.generateMap(onResolve, onError)
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
          const indexColor = Math.floor(Math.random() * (maxIndexColor - minIndexColor + 1)) + minIndexColor

          /* pick env colors */
          const envColors = pickColorPool(col)

          drawRectOnCanvas(colIndex, rowIndex, envColors[indexColor], context2D)
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

      /* pick canvas to draw on */
      const hoverCanvas = this.$refs["hoverCanvas"]
      const hoverContext = hoverCanvas.getContext("2d")

      /* reset canvas then draw */
      hoverContext.clearRect(0, 0, this.mapWidth, this.mapHeight)

      /* draw influence */
      const buildingType = "TownCenter" // TODO change with props after
      const buildingSize = getSizeBuilding(buildingType)

      let squaresToFill
      if (buildingSize[0] > 1 && buildingSize[1] > 1){
        const centerBuildingRow = row + (buildingSize[0]-1)/2
        const centerBuildingCol = col + (buildingSize[1]-1)/2
        squaresToFill = computeInfluenceSphere(centerBuildingCol, centerBuildingRow, buildingType)
      } else {
        squaresToFill = computeInfluenceSphere(col, row, buildingType)
      }
      squaresToFill.forEach((square) => {
        drawRectOnCanvas(square[0], square[1], mapConstants.INFLUENCE_COLOR, hoverContext)
      })

      /* draw building */
      drawBuildingOnCanvas(col, row, buildingType, hoverContext)
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
  opacity: 0.8;
}

#buildingsCanvas{
  z-index: 2;
}

</style>