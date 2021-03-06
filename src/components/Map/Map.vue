<template>
  <div id="mapComponent"
       v-bind:style="{height: `${mapHeight}px`, width: `${mapWidth}px`}"
       @mousemove="onMouseMove"
       @mouseout="onMouseOut"
       @click="onClick">
    <canvas id="hoverBuildingsCanvas" ref="hoverBuildingsCanvas" v-bind:height="mapHeight" v-bind:width="mapWidth"/>
    <canvas id="hoverInfluenceCanvas" ref="hoverInfluenceCanvas" v-bind:height="mapHeight" v-bind:width="mapWidth"/>
    <canvas id="buildingsCanvas" ref="buildingsCanvas" v-bind:height="mapHeight" v-bind:width="mapWidth"/>
    <canvas id="backgroundMap" ref="backgroundMap" v-bind:height="mapHeight" v-bind:width="mapWidth"/>
  </div>
</template>

<script>
import mapConstants from "/src/components/Map/MapConstants"

const state = {
  buildings: []
}

export default {
  name: 'Map',
  props: {
    map: Array,
    typeSelected: String,
  },
  emits: ['changeTotalScore'],
  data() {
    return {
      mapWidth: mapConstants.TILE_SIZE * mapConstants.NUMBER_TILE_COL,
      mapHeight: mapConstants.TILE_SIZE * mapConstants.NUMBER_TILE_ROW,
      totalScore: 0,
      score: 0
    }
  },

  mounted() {
    this.buildMap(this.map)
    this.initBuildings()
  },

  methods: {
    initBuildings(){
      const startBuildings = []
      for (let rowIndex = 0; rowIndex < mapConstants.NUMBER_TILE_ROW; rowIndex++ ){
        const rowBuildings = []
        for (let colIndex = 0; colIndex < mapConstants.NUMBER_TILE_COL; colIndex++ ){
          rowBuildings.push({
            id: 'none',
            type: 'none',
          })
        }
        startBuildings.push(rowBuildings)
      }
      state.buildings = startBuildings
    },

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
          const envColors = this.pickColorPool(col)

          this.drawRectOnCanvas(colIndex, rowIndex, envColors[indexColor], context2D)
        })
      })
    },

    onMouseOut() {
      /* reset hover canvas */
      const hoverInfluenceCanvas = this.$refs["hoverInfluenceCanvas"]
      const hoverBuildingsCanvas = this.$refs["hoverBuildingsCanvas"]
      const hoverInfluenceContext = hoverInfluenceCanvas.getContext("2d")
      const hoverBuildingsContext = hoverBuildingsCanvas.getContext("2d")
      hoverInfluenceContext.clearRect(0, 0, this.mapWidth, this.mapHeight)
      hoverBuildingsContext.clearRect(0, 0, this.mapWidth, this.mapHeight)
    },

    onMouseMove(eventMouseMove) {
      this.clearHoverCanvas()
      if (this.typeSelected !== "None") {
        /* compute row and col numbers */
        const rectCanvas = this.$refs["hoverInfluenceCanvas"].getBoundingClientRect()
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
        const hoverInfluenceCanvas = this.$refs["hoverInfluenceCanvas"]
        const hoverInfluenceContext = hoverInfluenceCanvas.getContext("2d")
        const hoverBuildingsCanvas = this.$refs["hoverBuildingsCanvas"]
        const hoverBuildingsContext = hoverBuildingsCanvas.getContext("2d")

        /* draw influence */
        const buildingType = this.typeSelected

        const squaresToFill = this.computeInfluenceSphere(col, row, buildingType)

        let influenceColor = mapConstants.INFLUENCE_COLOR
        const canBeBuildConst = this.canBeBuild(col, row, buildingType, state.buildings)
        if (!canBeBuildConst){
          influenceColor = mapConstants.NOT_ALLOWED_COLOR
        }

        squaresToFill.forEach((square) => {
          this.drawRectOnCanvas(square[0], square[1], influenceColor, hoverInfluenceContext)
        })

        this.score = canBeBuildConst ? this.computeScore(col, row, buildingType, state.buildings) : ''
        this.drawScoreOnCanvas(col, row, this.score, buildingType, hoverBuildingsContext)

        /* draw building */
        this.drawBuildingOnCanvas(col, row, buildingType, hoverBuildingsContext)
      }
    },

    onClick(eventMouseClick) {
      if (this.typeSelected !== "None") {
        const rectCanvas = this.$refs["hoverBuildingsCanvas"].getBoundingClientRect()
        let row = Math.floor((eventMouseClick.clientY - rectCanvas.top) / mapConstants.TILE_SIZE)
        let col = Math.floor((eventMouseClick.clientX - rectCanvas.left) / mapConstants.TILE_SIZE)

        /* avoid going outside */
        if (row < 0) {
          row = 0
        } else if (row >= mapConstants.NUMBER_TILE_ROW) {
          row = mapConstants.NUMBER_TILE_ROW - 1
        }
        if (col < 0) {
          col = 0
        } else if (col >= mapConstants.NUMBER_TILE_COL - 1) {
          col = mapConstants.NUMBER_TILE_COL - 2
        }

        const buildingType = this.typeSelected

        if (this.canBeBuild(col, row, buildingType, state.buildings)) {
          this.setBuilding(col, row, buildingType, state.buildings)
          const buildingCanvas = this.$refs["buildingsCanvas"]
          const buildingContext = buildingCanvas.getContext('2d')
          this.drawBuildingOnCanvas(col, row, buildingType, buildingContext)

          //Update totalScore
          this.totalScore += this.score
          this.$emit('changeTotalScore', {totalScore: this.totalScore})
        }
      }
    },

    clearHoverCanvas() {
      /* pick canvas to draw on */
      const hoverInfluenceCanvas = this.$refs["hoverInfluenceCanvas"]
      const hoverInfluenceContext = hoverInfluenceCanvas.getContext("2d")
      const hoverBuildingsCanvas = this.$refs["hoverBuildingsCanvas"]
      const hoverBuildingsContext = hoverBuildingsCanvas.getContext("2d")

      /* reset canvas then draw */
      hoverInfluenceContext.clearRect(0, 0, this.mapWidth, this.mapHeight)
      hoverBuildingsContext.clearRect(0, 0, this.mapWidth, this.mapHeight)
    },

    canBeBuild(col, row, buildingType, buildingsArray){
      const env = this.getEnvBuilding(col, row, buildingType)

      const envScore = this.getEnvScore(env, buildingType)
      if (envScore === 'notAllowed'){
        return false
      } else {
        const buildingSize = this.getSizeBuilding(buildingType)
        const buildingWidth = buildingSize[1]
        const buildingHeight = buildingSize[0]
        for (let colIndex = 0; colIndex < buildingWidth; colIndex++){
          for (let rowIndex = 0; rowIndex < buildingHeight; rowIndex++){
            if (buildingsArray[row + rowIndex][col + colIndex].id !== 'none'){
              return false
            }
          }
        }
        return true
      }
    },

    computeNextId(buildingsArray){
      let nextId = 0
      buildingsArray.forEach(rows => {
        rows.forEach(building => {
          if (building.id >= nextId) {
            nextId = building.id + 1
          }
        })
      })
      return nextId
    },

    setBuilding(col, row, buildingType, buildingsArray) {
      const buildingSize = this.getSizeBuilding(buildingType)
      const buildingWidth = buildingSize[1]
      const buildingHeight = buildingSize[0]

      const buildingId = this.computeNextId(buildingsArray)

      for (let colIndex = 0; colIndex < buildingWidth; colIndex++){
        for (let rowIndex = 0; rowIndex < buildingHeight; rowIndex++){
          buildingsArray[row + rowIndex][col + colIndex] = {
            id: buildingId,
            type: buildingType
          }
        }
      }
    },

    pickColorPool(value) {
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
    },

    drawBuildingOnCanvas(col, row, buildingType, context) {
      const imageSrc = this.getBuildingImageSource(buildingType)
      const buildingSize = this.getSizeBuilding(buildingType)
      const imageWidth = buildingSize[1] * mapConstants.TILE_SIZE
      const imageHeight = buildingSize[0] * mapConstants.TILE_SIZE
      const imageToDraw = new Image(imageWidth, imageHeight)
      imageToDraw.src = `buildings/${imageSrc}`

      context.drawImage(
          imageToDraw,
          col * mapConstants.TILE_SIZE,
          row * mapConstants.TILE_SIZE,
          imageWidth,
          imageHeight
      )
    },

    drawRectOnCanvas(col, row, color, context) {
      context.fillStyle = color
      context.fillRect(
          col * mapConstants.TILE_SIZE,
          row * mapConstants.TILE_SIZE,
          mapConstants.TILE_SIZE,
          mapConstants.TILE_SIZE
      )
    },

    drawScoreOnCanvas(col, row, score, buildingType, context) {
      context.font = "20px Slackey"
      context.fillStyle = 'black'

      const buildingSize = this.getSizeBuilding(buildingType)
      const buildingWidth = buildingSize[1]
      const buildingHeight = buildingSize[0]
      const [centerBuildingCol, centerBuildingRow] = this.computeBuildingCenter(col, row, buildingWidth, buildingHeight)

      let colScore = col - buildingWidth/2 - 1
      let rowScore = centerBuildingRow + 1

      if (centerBuildingCol < (buildingWidth + 1)) {
        colScore = centerBuildingCol
        rowScore = row - 0.5
      }
      if (row < (buildingHeight + 1) && centerBuildingCol < (buildingWidth + 1)){
        colScore = col + buildingWidth + 0.5
        rowScore = row + buildingHeight + 0.5
      }

      context.fillText(
          score.toString(),
          colScore * mapConstants.TILE_SIZE,
          rowScore * mapConstants.TILE_SIZE
      )
    },

    computeDist(dx, dy) {
      return Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2))
    },

    computeBuildingCenter(col, row, buildingWidth, buildingHeight){
      const centerBuildingRow = row + (buildingHeight - 1) / 2
      const centerBuildingCol = col + (buildingWidth - 1) / 2

      return [centerBuildingCol, centerBuildingRow]
    },

    computeInfluenceSphere(col, row, buildingType) {
      const buildingSize = this.getSizeBuilding(buildingType)
      const buildingWidth = buildingSize[1]
      const buildingHeight = buildingSize[0]
      const [centerBuildingCol, centerBuildingRow] = this.computeBuildingCenter(col, row, buildingWidth, buildingHeight)

      const range = mapConstants.INFLUENCE_RANGES[buildingType]
      const squaresToFill = []
      for (let rowRange = 0; rowRange < range; rowRange++){
        for (let colRange = 0; colRange < range; colRange++){
          const dist = this.computeDist(rowRange, colRange);
          if (dist < range){
            squaresToFill.push([centerBuildingCol + colRange, centerBuildingRow + rowRange])
            squaresToFill.push([centerBuildingCol - colRange, centerBuildingRow - rowRange])
            squaresToFill.push([centerBuildingCol + colRange, centerBuildingRow - rowRange])
            squaresToFill.push([centerBuildingCol - colRange, centerBuildingRow + rowRange])
          }
        }
      }
      return squaresToFill
    },

    getBuildingImageSource(buildingType) {
      return mapConstants.SRC_BUILDINGS[buildingType]
    },

    getSizeBuilding(buildingType) {
      return mapConstants.SIZE_BUILDING[buildingType]
    },

    getEnvScore(env, buildingType){
      return mapConstants.SCORE_ENV[env][buildingType]
    },

    getEnv(col, row){
      let env
      switch (this.map[row][col]){
        case mapConstants.PLAIN_ENV:
          env = 'plain'
          break
        case mapConstants.FOREST_ENV:
          env = 'forest'
          break
        case mapConstants.MOUNTAIN_ENV:
          env = 'mountain'
          break
        case mapConstants.BEACH_ENV:
          env = 'beach'
          break
        case mapConstants.LAKE_ENV:
          env = 'water'
          break
        default:
          env = 'plain'
      }
      return env
    },

    getEnvBuilding(col, row, buildingType){
      let env = []
      const buildingSize = this.getSizeBuilding(buildingType)
      const buildingWidth = buildingSize[1]
      const buildingHeight = buildingSize[0]

      for (let colIndex = 0; colIndex < buildingWidth; colIndex++){
        for (let rowIndex = 0; rowIndex < buildingHeight; rowIndex++){
          env.push(this.getEnv(col + colIndex, row + rowIndex))
        }
      }

      let finalEnv;
      if (env.includes('plain')){
        finalEnv = 'plain'
      }
      if (env.includes('forest')){
        finalEnv = 'forest'
      }
      if (env.includes('mountain')){
        finalEnv = 'mountain'
      }
      if (env.includes('beach')){
        finalEnv = 'beach'
      }
      if (env.includes('water')){
        finalEnv = 'water'
      }
      if (buildingType === 'Harbour'){
        env.forEach(e => {
          if (e !== 'beach'){
            finalEnv = 'plain' // Harbour are notAllowed outside beach
          }
        })
      }

      return finalEnv
    },

    computeScore(col, row, buildingType, buildingsArray)  {
      const envBuiltOn = this.getEnvBuilding(col, row, buildingType)
      const range = mapConstants.INFLUENCE_RANGES[buildingType]
      const buildingsId = []

      const buildingSize = this.getSizeBuilding(buildingType)
      const buildingWidth = buildingSize[1]
      const buildingHeight = buildingSize[0]
      const [centerBuildingCol, centerBuildingRow] = this.computeBuildingCenter(col, row, buildingWidth, buildingHeight)

      let score = this.getEnvScore(envBuiltOn, buildingType)
      if (score === 'notAllowed'){
        score = ''
      } else {
        buildingsArray.forEach((buildingsRow, buildingsRowIndex) => {
          buildingsRow.forEach((building, buildingColIndex) => {
            const dx = Math.abs(centerBuildingRow - buildingsRowIndex)
            const dy = Math.abs(centerBuildingCol - buildingColIndex)
            const dist = this.computeDist(dx, dy)
            if (dist < range && !buildingsId.includes(building.id) && building.id !== 'none'){
              buildingsId.push(building.id)
              const toAdd = mapConstants.SCORE_BUILDINGS[buildingType][building.type]
              score += toAdd
            }
          })
        })
      }
      return score
    }
  }
}

</script>

<style>

#mapComponent{
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

#hoverInfluenceCanvas{
  z-index: 2;
  opacity: 0.6;
}

#hoverBuildingsCanvas{
  z-index: 3;
}

#buildingsCanvas{
  z-index: 1;
}

</style>