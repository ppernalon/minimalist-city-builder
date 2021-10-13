<template>
  <div class="LoadingContainer" v-if="this.dataMap.length<1">
      <Loading/>
  </div>
  <div class="LoadingContainer">
    Chargement de la map en cours...
  </div>
  <Map v-if="this.dataMap.length>=1" v-bind:map='dataMap'/>
</template>

<script>
import Map from "../components/Map/Map";
import MapHttpServices from "../http/MapHttpServices";
import Loading from "../components/Loading/Loading"
export default {
  name: "Play.vue",
  components:{
    'Loading' : Loading,
    'Map' : Map
  },
  data(){
    return {
      dataMap : []
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
.LoadingComponent{}
.LoadingContainer{
  transform: scale(1.5) translateY(-50%);
  width: fit-content;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  top:50%;
}
</style>