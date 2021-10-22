<template>
  <div class="LoadingContainer" v-if="this.dataMap.length<1">
    <Loading/>
  </div>

  <div class="LoadingContainer" v-if="this.dataMap.length<1">
    Chargement de la map en cours...
  </div>

  <div id="playContainer"
       ref="playContainer"
       v-if="this.dataMap.length>=1">
    <Map v-bind:map='dataMap' @changeTotalScore="onChangeTotalScore" v-bind:typeSelected="buildingType"/>
    <div class="buttons">
      <InGameButton
          v-for="(nberAvailable,buildingName) in buildings"
          v-bind:key="buildingName"
          v-bind:buildingName="buildingName"
          v-bind:numberAvailable=nberAvailable
          @onChangeButtonClick="onChangeButtonClick"
      />

      <SurrenderButton v-bind:totalScore="this.totalScore" v-bind:end-game="this.endGame" />
      <ScoreBar v-bind:totalScore="this.totalScore"/>
    </div>

  </div>
</template>

<script>
import Map from "../components/Map/Map";
import MapHttpServices from "../http/MapHttpServices";
import Loading from "../components/Loading/Loading"
import InGameButton from "../components/InGameButton/InGameButton"
import mapConstants from "../components/Map/MapConstants";
import ScoreBar from "../components/ScoreBar/ScoreBar"
import SurrenderButton from "../components/SurrenderButton/SurrenderButton.vue"

let scaleRatio = window.innerHeight / (mapConstants.NUMBER_TILE_ROW * mapConstants.TILE_SIZE + 300)

export default {
  name: "Play.vue",
  components:{
    "InGameButton" : InGameButton,
    'Loading' : Loading,
    'Map' : Map,
    'ScoreBar' : ScoreBar,
    'SurrenderButton' : SurrenderButton
  },
  methods: {  
    onChangeTotalScore(payload) {
     this.totalScore = payload.totalScore;
     this.buildings[this.buildingType]= this.buildings[this.buildingType]-1
     if (this.buildings[this.buildingType]<1){
       this.buildingType = "None"
     }
     const sumValues = buildings => Object.values(buildings).reduce((a, b) => a + b);
     sumValues(this.buildings) === 0 ? this.endGame=true : this.endGame=false
    },

    onChangeButtonClick(buildingName) {
      this.buildingType = buildingName.buildingName
    },

    getScaleRatio(){
      return scaleRatio
    },
  },
  data(){
    return {
      numberAvailable:[],
      dataMap : [],
      buildings : mapConstants.SRC_BUILDINGS_NBER_AVAILABLE_ROUND1,
      totalScore: 0,
      buildingType: "None",
      round:1,
      endGame:false,
    }
  },
  mounted() {
    const onResolve = (res) => {
      this.dataMap = res.data
    }
    const onError = (err) => {
      console.log(err)
    }
    MapHttpServices.generateMap(onResolve, onError)
  },
  watch:{
    totalScore: function (){
      if (this.totalScore>=30  && this.totalScore<50){
        if (this.round<2){
          for (let building in this.buildings) {
                this.buildings[building]+=mapConstants.SRC_BUILDINGS_NBER_AVAILABLE_ROUND2[building]
              }
          this.round=2
        }
      }
      if (this.score>=150){
        if (this.round<3){
          for (let building in this.buildings) {
            this.buildings[building]+=mapConstants.SRC_BUILDINGS_NBER_AVAILABLE_ROUND3[building]
          }
          this.round=3
        }
      }
    }
  }
}
</script>

<style scoped>

  .LoadingContainer{
    width: fit-content;
    height: 150px;
    margin-left: auto;
    margin-right: auto;
  }

  .LoadingContainer:nth-child(1){
    transform: translateY(175%);
  }
  .LoadingContainer:nth-child(2){
    transform: translateY(125%);
  }

  .buttons{
    padding-top: 30px;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    flex-wrap: wrap;
    width: 952px;
  }

  #playContainer{
    margin: auto;
    transition: transform 0.5s;
    transform-origin: 50% 0;
  }
</style>