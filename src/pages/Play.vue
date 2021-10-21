<template>
  <div class="LoadingContainer" v-if="this.dataMap.length<1">
      <Loading/>
  </div>
  <div class="LoadingContainer" v-if="this.dataMap.length<1">
    Chargement de la map en cours...
  </div>
  <div  id="playContainer" v-if="this.dataMap.length>=1">
    <Map v-bind:map='dataMap' @changeTotalScore="onChangeTotalScore" v-bind:typeSelected="buildingType"/>
    <div class="buttons">
      <InGameButton
          v-for="(nberAvailable,buildingName) in buildings"
          v-bind:key="buildingName"
          v-bind:buildingName="buildingName"
          v-bind:numberAvailable=nberAvailable
          @onChangeButtonClick="onChangeButtonClick"
      />
      <SurrenderButton v-bind:totalScore="this.totalScore" />
      <ScoreBar v-bind:totalScore="this.totalScore" />
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
       this.buildingType=""
     }
    },
    onChangeButtonClick(buildingName) {
      this.buildingType = buildingName.buildingName
    }
  },
  data(){
    return {
      numberAvailable:[],
      dataMap : [],
      buildings : mapConstants.SRC_BUILDINGS_NBER_AVAILABLE,
      totalScore: 0,
      buildingType:""
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
}
</script>

<style scoped>

.LoadingContainer{
  transform: scale(1.5) translateY(-50%);
  width: fit-content;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  top:50%;
}

.buttons{
  padding-top: 2vh;
  display: flex;
  margin-right: auto;
  margin-left: auto;
  flex-wrap: wrap;
  width: auto;
}

#playContainer{
  position: absolute;
  top: 2vh;
  left: 50%;
  transform: translateX(-50%) scale(1);
  transform-origin: top;
  width: 90vw;
}

</style>