<template>
  <div>
    <h1>Classement</h1>
    <table id="Table">
      <thead id="thead">
        <tr id="titleTable">
          <th class="contentTitle">Joueur</th>
          <th class="contentTitle">Score</th>
        </tr>
      </thead>
      <tbody id="lines">
        <tr>
          <td class="contentTable">PP_gangSwag</td>
          <td class="contentTable">1250</td>
        </tr>
        <tr>
          <td class="contentTable">jujitsu98</td>
          <td class="contentTable">950</td>
        </tr>
        <tr>
          <td class="contentTable">Xx_RoroDu13_xX</td>
          <td class="contentTable">13950</td>
        </tr>
        {{ log(this.rankingData) }}
        <tr v-for="(user,index) in users" :key="index">
          {{ log("gf") }}
          <td class="contentTable">{{user[0]}}</td>
          <td class="contentTable">{{user[1]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Ranking from "../../http/RankingHttpServices";
export default {
  name: "Ranking.vue",
  methods:{
    log(message){
      console.log(message)
    }
  },
  data(){
    const onResolve = (res) => {
      let rankingData = res.data
      return{
        rankingData
      }
    }
    const onError = (err) => {
      console.log(err)
    }
    Ranking.rankingData(onResolve, onError)
  },
}

</script>

<style scoped>
h1{
  font-weight: normal;
}
#Table{
  border-collapse: collapse;
  width: 30vw;
  text-align: center;
}

#titleTable{
  background: #008CFF;
  color: white;
  text-align: left;
  font-size: 1.5em;
}
#lines{
  font-family: 'Roboto', sans-serif;
}
.contentTable{
  padding: 1.5vh 0 1.5vh 0;
}
.contentTitle{
  width: 20vw;
  padding: 1vh 0 1vh 0;
  font-weight: normal;
  text-align: center;
}
</style>